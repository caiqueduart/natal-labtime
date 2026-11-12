/* ===== Trenó com o mascote e o Papai Noel (saco do GitLab arremessando issues) ===== */
(function (N) {
  const C = window.NATAL_CONFIG;
  const f = N.f;
  const GITLAB = 'M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.919 1.263a.455.455 0 00-.867 0L1.388 9.452.046 13.587a.924.924 0 00.331 1.023L12 23.054l11.623-8.443a.92.92 0 00.332-1.024';

  const papaiNoel = () => {
    const rosto = (N.foto(C.papaiNoel) || {}).src || '';
    return (
      // logo do GitLab saindo do saco (svg próprio, animado pela GPU)
      '<svg class="abs treno-git" style="left:-18px;top:-26px;overflow:visible" width="46" height="46" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="' + GITLAB + '" fill="#FC6D26" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/>' +
        '<path d="M12 23.054 7.582 9.45h8.836z" fill="#E24329"/><path d="M.046 13.587l1.342-4.135L7.582 9.45 12 23.054.377 14.61a.924.924 0 01-.331-1.023z" fill="#FCA326"/></svg>' +
      // saco na traseira (por cima da base do logo)
      '<svg class="abs" style="left:-34px;top:-30px;overflow:visible" width="80" height="100" viewBox="0 0 80 100" aria-hidden="true">' +
        '<path d="M16 40 Q0 70 12 92 Q38 104 64 90 Q76 66 62 40 Q40 30 16 40 Z" fill="#B07A43" stroke="#6B3E1C" stroke-width="3"/>' +
        '<path d="M12 42 Q38 30 66 44 L64 52 Q38 40 16 52 Z" fill="#C48B52" stroke="#6B3E1C" stroke-width="2.5" stroke-linejoin="round"/>' +
        '<path d="M22 50 Q40 44 58 52" fill="none" stroke="#5A3418" stroke-width="5" stroke-linecap="round"/></svg>' +
      // casaco, rosto, barba e gorro
      '<div class="abs" style="left:30px;top:28px;width:56px;height:36px;border-radius:18px 18px 6px 6px;background:linear-gradient(90deg,#FF5A5F,#E5383B 55%,#A4161A)"></div>' +
      '<div class="abs" style="left:54px;top:30px;width:8px;height:34px;border-radius:4px;background:#fff"></div>' +
      '<img class="abs treno-rosto" src="' + rosto + '" alt="' + C.papaiNoel + ' de Papai Noel" style="left:33px;top:-18px;width:50px;height:50px">' +
      '<svg class="abs" style="left:28px;top:-40px;overflow:visible" width="60" height="100" viewBox="0 0 60 100" aria-hidden="true">' +
        '<g fill="#fff" stroke="#DCEEFA" stroke-width="1.5"><circle cx="14" cy="68" r="8"/><circle cx="22" cy="75" r="9"/><circle cx="30" cy="78" r="10"/><circle cx="38" cy="75" r="9"/><circle cx="46" cy="68" r="8"/><circle cx="30" cy="70" r="7"/></g>' +
        '<path d="M5 24 C8 4 24 -6 42 0 C52 4 56 14 56 24 Z" fill="#E5383B" stroke="#8A0F1E" stroke-width="1.5"/>' +
        '<path d="M30 2 C18 -4 6 0 0 12 L7 15 C12 6 22 4 34 6 Z" fill="#E5383B" stroke="#8A0F1E" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<circle cx="1" cy="14" r="6" fill="#fff" stroke="#DCEEFA" stroke-width="1.5"/>' +
        '<rect x="2" y="19" width="56" height="10" rx="5" fill="#fff" stroke="#DCEEFA" stroke-width="1.5"/></svg>'
    );
  };

  // voo do trenó pela tela; quem dispara é a sequência de cenas (cenas.js)
  N.VOO_TRENO = { de: [-400, 420], ate: [2240, 250], ms: 9200 };

  N.treno = () => {
    let rastro = '';
    for (let k = 0; k < 7; k++) {
      const s = 12 - k * 1.3;
      rastro += '<div class="abs" style="border-radius:50%;left:' + (-20 - k * 22) + 'px;top:' + f(70 + Math.sin(k * 1.3) * 12) + 'px;width:' + f(s) + 'px;height:' + f(s) + 'px;background:#FFE066;box-shadow:0 0 10px 3px rgba(255,224,102,.8)"></div>';
    }
    return '<div class="sleigh"><div class="bob" style="position:relative;width:240px;height:120px">' +
      '<div class="abs" style="left:0;top:0;width:240px;height:120px;transform:scale(1.35);transform-origin:50% 100%"><div class="abs rastro" style="left:0;top:0">' + rastro + '</div>' +
      '<div class="abs" style="left:28px;top:24px;width:42px;height:70px;border-radius:16px 16px 4px 4px;background:#D62839"></div>' +
      '<img src="' + C.mascote + '" alt="Mascote da equipe andando de trenó" class="abs" style="left:80px;top:-24px;width:80px;height:auto;filter:drop-shadow(0 3px 5px rgba(0,0,0,.25))">' +
      papaiNoel() +
      '<div class="abs" style="left:28px;top:46px;width:156px;height:48px;box-sizing:border-box;border-top:7px solid #FFD43B;border-radius:8px 10px 34px 24px;background:#E5383B"></div>' +
      '<div class="abs" style="left:62px;top:92px;width:7px;height:14px;background:#F2B705"></div>' +
      '<div class="abs" style="left:150px;top:92px;width:7px;height:14px;background:#F2B705"></div>' +
      '<div class="abs" style="left:18px;top:84px;width:186px;height:26px;box-sizing:border-box;border-bottom:7px solid #FFD43B;border-radius:0 0 22px 22px"></div>' +
      '<div class="abs" style="left:190px;top:70px;width:28px;height:28px;box-sizing:border-box;border:7px solid #FFD43B;border-left-color:transparent;border-bottom-color:transparent;border-radius:50%;transform:rotate(45deg)"></div>' +
      '</div></div></div>';
  };

  // ===== Papai Noel arremessando issues do saco =====
  const ISSUES = ['funciona na minha máquina', 'NullPointerException', '500 ao salvar', 'botão não faz nada', 'timeout no relatório',
    'CSS quebrado no Safari', 'deploy na sexta 18h', 'token expirado', 'migration duplicada', 'loop infinito no cron',
    'N+1 na listagem', 'merge conflict', 'cache não invalida', 'PDF sai em branco', 'fuso horário errado'];
  const BUG = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="#1AAA55" stroke-width="2"/><circle cx="8" cy="8" r="2" fill="#1AAA55"/></svg>';

  N.iniciarIssues = (stage) => {
    const camada = document.createElement('div');
    camada.id = 'issues';
    stage.appendChild(camada);
    const treno = stage.querySelector('.sleigh');
    // posição do trenó calculada pelo tempo do voo em curso (sem medir a página)
    const V = N.VOO_TRENO;
    const posTreno = () => {
      const voo = N.vooTreno;
      if (!treno || !voo || voo.playState !== 'running') return null;
      const k = Math.min(1, (voo.currentTime || 0) / V.ms);
      return { x: V.de[0] + (V.ate[0] - V.de[0]) * k, y: V.de[1] + (V.ate[1] - V.de[1]) * k };
    };
    // 5 cartões reaproveitados para sempre: nada é criado ou destruído durante o loop
    const cartoes = [];
    for (let i = 0; i < 5; i++) {
      const el = document.createElement('div');
      el.className = 'issue';
      el.style.opacity = '0';
      el.innerHTML = '<div class="topo">' + BUG + '<span class="num"></span><span class="lbl">bug</span></div><div class="tit"></div>';
      camada.appendChild(el);
      cartoes.push({ el, num: el.querySelector('.num'), tit: el.querySelector('.tit'), livre: true });
    }
    let sorteio = 0;
    const arremessar = () => {
      if (document.hidden) return;
      const c = cartoes.find((k) => k.livre);
      const p = posTreno();
      if (!c || !p || p.x < -40 || p.x > 1840) return;
      c.livre = false;
      const num = 3000 + Math.floor(Math.random() * 400);
      c.num.textContent = '#' + num;
      c.tit.textContent = ISSUES[(sorteio++ * 7 + num) % ISSUES.length];
      const x0 = p.x - 130, y0 = p.y - 30;
      const dx = -60 + Math.random() * 360, alto = 60 + Math.random() * 110;
      const yChao = 905 + Math.random() * 70, giro = (Math.random() * 2 - 1) * 120;
      const quadros = [];
      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        quadros.push({ transform: 'translate3d(' + (x0 + dx * t).toFixed(1) + 'px,' + (y0 + (yChao - y0) * t - alto * 4 * t * (1 - t)).toFixed(1) + 'px,0) rotate(' + (giro * t).toFixed(1) + 'deg) scale(' + (0.4 + 0.6 * Math.min(1, t * 3)).toFixed(2) + ')', opacity: 1, offset: t * 0.62 });
      }
      quadros.push({ transform: quadros[12].transform, opacity: 1, offset: 0.85 });
      quadros.push({ transform: quadros[12].transform, opacity: 0, offset: 1 });
      const anim = c.el.animate(quadros, { duration: 3400, easing: 'linear' });
      anim.onfinish = () => { anim.cancel(); c.livre = true; };
    };
    setInterval(arremessar, 900);
  };
})(window.Natal);
