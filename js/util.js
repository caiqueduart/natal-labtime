/* ===== Utilitários compartilhados ===== */
window.Natal = window.Natal || {};
(function (N) {
  const C = window.NATAL_CONFIG;

  N.f = (v) => Math.round(v * 10) / 10;

  // gerador pseudoaleatório com semente (a cena sai sempre igual)
  N.rng = (seed) => { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };

  N.embaralhar = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };

  // estrelinha de 4 pontas
  N.SPARK = (cor) => '<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true"><path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" fill="' + cor + '"/></svg>';

  // lacinho vermelho usado nas bolinhas e na placa
  N.LACO = (estilo) =>
    '<div class="abs" style="' + (estilo || 'left:50%;top:0;margin-left:-22px') + ';width:44px;height:20px;z-index:3">' +
      '<div class="abs" style="left:0;top:1px;width:20px;height:15px;box-sizing:border-box;border:5px solid #D62839;border-radius:60% 30% 30% 60% / 60% 40% 40% 60%;transform:rotate(-12deg)"></div>' +
      '<div class="abs" style="right:0;top:1px;width:20px;height:15px;box-sizing:border-box;border:5px solid #D62839;border-radius:30% 60% 60% 30% / 40% 60% 60% 40%;transform:rotate(12deg)"></div>' +
      '<div class="abs" style="left:13px;top:12px;width:6px;height:14px;border-radius:2px;background:#B5172A;transform:rotate(22deg)"></div>' +
      '<div class="abs" style="left:25px;top:12px;width:6px;height:14px;border-radius:2px;background:#B5172A;transform:rotate(-22deg)"></div>' +
      '<div class="abs" style="left:17px;top:4px;width:10px;height:10px;border-radius:3px;background:#FF4D5E;box-shadow:inset 0 -2px 0 #B5172A"></div>' +
    '</div>';

  // ===== Fotos da equipe: descobertas automaticamente na pasta =====
  const EXT = /\.(png|jpe?g|webp|gif|avif)$/i;
  const nomeDoArquivo = (arq) => decodeURIComponent(arq).normalize('NFC').replace(EXT, '').replace(/[-_]+/g, ' ').trim();
  const montar = (arquivos) => arquivos
    .filter((a) => EXT.test(a))
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))
    .map((a) => ({ nome: nomeDoArquivo(a), arquivo: a, src: C.pastaEquipe + '/' + encodeURIComponent(decodeURIComponent(a)) }));

  // 1) GitHub Pages: lista a pasta pela API do GitHub
  const peloGitHub = async () => {
    const g = C.github;
    if (!g || !/github\.io$/.test(location.hostname)) return null;
    const url = 'https://api.github.com/repos/' + g.dono + '/' + g.repo + '/contents/' + C.pastaEquipe + '?ref=' + g.branch;
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) return null;
    const itens = await r.json();
    return itens.filter((i) => i.type === 'file').map((i) => i.name);
  };
  // 2) servidor local com listagem de pasta (python -m http.server, Live Server…)
  const pelaListagem = async () => {
    if (location.protocol === 'file:') return null;
    const r = await fetch(C.pastaEquipe + '/', { cache: 'no-store' });
    if (!r.ok) return null;
    const html = await r.text();
    const nomes = [...html.matchAll(/href="([^"?#]+)"/g)].map((m) => m[1].split('/').pop()).filter((n) => EXT.test(n));
    return nomes.length ? [...new Set(nomes)] : null;
  };

  N.FOTOS = [];
  N.foto = (nome) => N.FOTOS.find((p) => p.nome === String(nome).normalize('NFC')) || null;
  N.listarEquipe = async () => {
    for (const fonte of [peloGitHub, pelaListagem]) {
      try { const lista = await fonte(); if (lista && lista.length) return montar(lista); } catch (e) { /* tenta a próxima */ }
    }
    return montar(C.fotosLocais || []); // 3) aberto direto do arquivo
  };
  N.carregarEquipe = async () => { N.FOTOS = await N.listarEquipe(); return N.FOTOS; };

  // no ar por dias: de tempos em tempos procura fotos novas; se a pasta mudou, recarrega a cena
  N.vigiarEquipe = () => {
    const min = Number(C.verificarNovasFotosACadaMinutos) || 0;
    if (!min) return;
    const assinatura = (l) => l.map((p) => p.arquivo).join('|');
    let atual = assinatura(N.FOTOS);
    setInterval(async () => {
      if (document.hidden) return;
      try {
        const nova = await N.listarEquipe();
        if (nova.length && assinatura(nova) !== atual) location.reload();
      } catch (e) { /* sem rede: tenta de novo depois */ }
    }, min * 60 * 1000);
  };

  // carrega e decodifica as fotos antes de usar, para as trocas não engasgarem
  N.preCarregar = () => Promise.all(N.FOTOS.map((p) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = p.src;
    return (img.decode ? img.decode() : Promise.resolve()).catch(() => {});
  }));
})(window.Natal);
