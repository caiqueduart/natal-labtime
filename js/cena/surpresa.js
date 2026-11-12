/* ===== Surpresa nas caixas de presente: alguém da equipe sai jogando bolsinhas de dinheiro =====
   De surpresaACadaSegundos em surpresaACadaSegundos (config.js), a tampa de uma das caixas grandes
   da frente pula, a pessoa sobe acenando, joga quatro bolsinhas na neve ao lado das caixas e volta
   para dentro. Um de cada vez, alternando as caixas. As bolsinhas são 6 elementos reaproveitados. */
(function (N) {
  const C = window.NATAL_CONFIG;
  const FRASES = ['13º chegou!', 'PIX pra todos!', 'bônus de Natal!'];

  // quem sai da caixa: fica dentro de uma "boca" com overflow escondido, que fica atrás da frente da caixa
  N.saidaSurpresa = (i, larguraCaixa) =>
    '<div class="abs saida" data-saida="' + i + '" style="left:' + ((larguraCaixa - 90) / 2) + 'px;top:-150px;width:90px;height:170px">' +
      '<div class="surpresa">' +
        '<div class="balao"></div>' +
        '<div class="braco esq"></div><div class="braco dir"></div>' +
        '<div class="abs" style="left:15px;top:60px;width:60px;height:64px;border-radius:26px 26px 8px 8px;background:linear-gradient(90deg,#FF5A5F,#E5383B 55%,#A4161A)"></div>' +
        '<div class="abs" style="left:13px;top:57px;width:64px;height:12px;border-radius:6px;background:#fff"></div>' +
        '<div class="abs" style="left:42px;top:76px;width:6px;height:6px;border-radius:50%;background:#FFD43B"></div>' +
        '<div class="abs" style="left:42px;top:92px;width:6px;height:6px;border-radius:50%;background:#FFD43B"></div>' +
        '<img class="foto" alt="" decoding="async">' +
        // gorro de Papai Noel
        '<svg style="left:10px;top:-16px" width="72" height="40" viewBox="0 0 72 40" aria-hidden="true">' +
          '<path d="M8 30 Q12 2 42 4 Q62 6 66 22 L59 25 Q54 13 42 13 Q28 14 26 30 Z" fill="#E5383B" stroke="#8A0F1E" stroke-width="1.5" stroke-linejoin="round"/>' +
          '<circle cx="63" cy="25" r="6" fill="#fff" stroke="#DCEEFA" stroke-width="1.5"/>' +
          '<rect x="4" y="26" width="62" height="11" rx="5.5" fill="#fff" stroke="#DCEEFA" stroke-width="1.5"/></svg>' +
      '</div></div>';

  const BOLSA =
    '<svg viewBox="0 0 44 48" width="44" height="48" aria-hidden="true">' +
      '<path d="M15 13 Q8 5 13 2 Q22 7 31 2 Q36 5 29 13 Z" fill="#C9A15B" stroke="#7A5A2A" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M15 13 Q2 23 4 36 Q6 46 22 46 Q38 46 40 36 Q42 23 29 13 Z" fill="#E0BC72" stroke="#7A5A2A" stroke-width="2" stroke-linejoin="round"/>' +
      '<rect x="12" y="11" width="20" height="5" rx="2.5" fill="#2FB863" stroke="#11673A" stroke-width="1"/>' +
      '<text x="22" y="37" text-anchor="middle" font-family="Fredoka, Trebuchet MS, sans-serif" font-weight="700" font-size="14" fill="#1F7A3A">R$</text></svg>';

  N.iniciarSurpresas = (stage) => {
    const seg = Number(C.surpresaACadaSegundos) || 0;
    const nomes = C.surpresaPresentes || [];
    if (!seg || !N.PRESENTES_SURPRESA) return;

    const caixas = N.PRESENTES_SURPRESA.map((c) => {
      const pessoa = N.foto(nomes[c.i]);
      const saida = stage.querySelector('[data-saida="' + c.i + '"]');
      const tampa = stage.querySelector('[data-tampa="' + c.i + '"]');
      if (!pessoa || !saida || !tampa) return null;
      const foto = saida.querySelector('.foto');
      foto.src = pessoa.src;
      foto.alt = pessoa.nome + ' saindo do presente';
      return Object.assign({}, c, { saida, tampa, corpo: saida.querySelector('.surpresa'), balao: saida.querySelector('.balao') });
    }).filter(Boolean);
    if (!caixas.length) return;

    // 6 bolsinhas reaproveitadas para sempre
    const camada = document.createElement('div');
    camada.id = 'bolsinhas';
    stage.appendChild(camada);
    const bolsas = [];
    for (let k = 0; k < 6; k++) {
      const el = document.createElement('div');
      el.className = 'bolsinha';
      el.style.opacity = '0';
      el.innerHTML = BOLSA;
      camada.appendChild(el);
      bolsas.push({ el, livre: true });
    }

    // arco da mão de quem saiu até a neve, ao lado das caixas
    const jogar = (c, k) => {
      const b = bolsas.find((q) => q.livre);
      if (!b) return;
      b.livre = false;
      const zona = c.bolsas[k % 2];
      const x0 = c.x + (c.w - 90) / 2 + 70, y0 = c.topo - 70;
      const x1 = zona[0] + Math.random() * (zona[1] - zona[0]), y1 = 1008 + Math.random() * 22;
      const alto = 110 + Math.random() * 70, giro = (Math.random() * 2 - 1) * 30;
      const quadros = [];
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        quadros.push({ transform: 'translate3d(' + (x0 + (x1 - x0) * t).toFixed(1) + 'px,' + (y0 + (y1 - y0) * t - alto * 4 * t * (1 - t)).toFixed(1) + 'px,0) rotate(' + (giro * t + 360 * t).toFixed(1) + 'deg) scale(' + (0.5 + 0.5 * Math.min(1, t * 2)).toFixed(2) + ')', opacity: 1, offset: t * 0.3 });
      }
      quadros.push({ transform: quadros[10].transform, opacity: 1, offset: 0.85 });
      quadros.push({ transform: quadros[10].transform, opacity: 0, offset: 1 });
      const a = b.el.animate(quadros, { duration: 3600, easing: 'linear' });
      a.onfinish = () => { a.cancel(); b.livre = true; };
    };

    let vez = 0, ocupado = false;
    const surgir = () => {
      if (document.hidden || ocupado) return;
      const c = caixas[vez % caixas.length];
      c.balao.textContent = FRASES[vez % FRASES.length];
      vez++;
      ocupado = true;
      c.saida.classList.add('ativa');
      const D = 5600;
      // a tampa pula, cai encostada do lado da caixa (sem tapar quem sai) e volta no fim
      const lado = c.i % 2 ? 1 : -1;
      c.tampa.animate([
        { transform: 'none' },
        { transform: 'translate(' + (lado * 30) + 'px,-110px) rotate(' + (lado * 40) + 'deg)', offset: 0.08 },
        { transform: 'translate(' + (lado * (c.w / 2 + 40)) + 'px,30px) rotate(' + (lado * 80) + 'deg)', offset: 0.16 },
        { transform: 'translate(' + (lado * (c.w / 2 + 40)) + 'px,30px) rotate(' + (lado * 80) + 'deg)', offset: 0.84 },
        { transform: 'translate(' + (lado * 20) + 'px,-60px) rotate(' + (lado * 20) + 'deg)', offset: 0.92 },
        { transform: 'none', offset: 0.97 },
        { transform: 'none' }
      ], { duration: D });
      const sobe = c.corpo.animate([
        { transform: 'translateY(130px)' },
        { transform: 'translateY(130px)', offset: 0.06 },
        { transform: 'translateY(-8px)', offset: 0.16 },
        { transform: 'translateY(0)', offset: 0.2 },
        { transform: 'translateY(0)', offset: 0.8 },
        { transform: 'translateY(130px)', offset: 0.93 },
        { transform: 'translateY(130px)' }
      ], { duration: D });
      [1300, 2000, 2700, 3400].forEach((t, k) => setTimeout(() => jogar(c, k), t));
      sobe.onfinish = () => { sobe.cancel(); c.saida.classList.remove('ativa'); ocupado = false; };
    };
    setInterval(surgir, seg * 1000);
  };
})(window.Natal);
