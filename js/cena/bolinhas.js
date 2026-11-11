/* ===== Bolinhas com fotos: aparecem e somem sem repetir ninguém ===== */
(function (N) {
  const C = window.NATAL_CONFIG;

  // posição (centro) de cada bolinha, em coordenadas da árvore
  const SLOTS = [
    [984, 300], [852, 324], [1068, 402], [936, 438], [768, 474],
    [876, 558], [1002, 600], [672, 630], [816, 678], [942, 720],
    [1110, 738], [708, 768], [564, 798], [1362, 798], [845, 815],
    [1014, 834], [1218, 834]
  ];
  // cores metálicas: [claro, base, escuro]
  const METAIS = [
    ['#FFE3A0', '#F2B705', '#A86B00'], ['#FFC2CC', '#E5383B', '#8A0F1E'], ['#C8E6FF', '#339AF0', '#0B4F8A'],
    ['#E2D6FF', '#9775FA', '#4B2A9E'], ['#FFFFFF', '#D9E2EA', '#8C9AA8'], ['#C8F5D8', '#2FB863', '#11673A']
  ];

  N.bolinhas = () => {
    let h = '';
    SLOTS.forEach((pos, s) => {
      const m = METAIS[s % METAIS.length];
      const aro = 'conic-gradient(from 210deg,' + m[0] + ',' + m[1] + ' 18%,' + m[2] + ' 34%,' + m[1] + ' 50%,' + m[0] + ' 62%,' + m[1] + ' 78%,' + m[2] + ' 90%,' + m[0] + ')';
      const macica = 'radial-gradient(circle at 35% 30%,' + m[0] + ' 0%,' + m[1] + ' 48%,' + m[2] + ' 100%)';
      const d1 = (-(s * 0.57) % 3.6).toFixed(2);
      h += '<div class="swing" data-slot="' + s + '" style="left:' + (pos[0] - 61) + 'px;top:' + (pos[1] - 100) + 'px;width:122px;height:151px;z-index:3;animation-duration:' + (2 + (s % 5) * 0.3).toFixed(2) + 's;animation-delay:' + (-(s * 0.73) % 3).toFixed(2) + 's">' +
        '<div class="abs" style="left:0;top:0;width:122px;height:178px;transform:scale(.85);transform-origin:50% 0">' +
        '<div class="abs" style="left:50%;top:14px;width:2px;height:30px;margin-left:-1px;background:linear-gradient(90deg,#FFF6D6,#E0B54A)"></div>' + N.LACO() +
        '<div class="abs" style="left:50%;top:33px;width:14px;height:14px;margin-left:-7px;box-sizing:border-box;border:3px solid #E0B54A;border-radius:50%"></div>' +
        '<div class="abs" style="left:50%;top:42px;width:34px;height:18px;margin-left:-17px;border-radius:6px 6px 3px 3px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.35) 0 2px,rgba(0,0,0,0) 2px 6px),linear-gradient(90deg,#B8860B,#FFE79A 35%,#F2B705 60%,#9A6A00);box-shadow:0 3px 4px rgba(0,0,0,.25);z-index:2"></div>' +
        '<div class="ball" style="top:56px;width:122px;height:122px">' +
          '<div class="aura"></div>' +
          '<div class="abs" style="inset:0;border-radius:50%;background:' + aro + ';box-shadow:0 12px 22px rgba(0,60,30,.35),0 0 18px ' + m[1] + '66"></div>' +
          '<div class="face" style="background:' + macica + '"><img alt="" decoding="async"><div class="vig"></div></div>' +
          '<div class="gloss"></div><div class="arc"></div><div class="clarao"></div>' +
          '<div class="spark" style="left:14px;top:8px;animation-delay:' + d1 + 's">' + N.SPARK('#fff') + '</div>' +
        '</div></div></div>';
    });
    return h;
  };

  N.iniciarBolinhas = (stage) => {
    const FOTOS = N.FOTOS;
    const balls = [], imgs = [];
    stage.querySelectorAll('[data-slot]').forEach((el) => {
      const s = Number(el.dataset.slot);
      balls[s] = el.querySelector('.ball');
      imgs[s] = el.querySelector('.face img');
    });
    const total = SLOTS.length;
    // duas bolinhas sem foto nunca ficam lado a lado nem uma embaixo da outra
    const vizinhas = (a, b) => Math.hypot(SLOTS[a][0] - SLOTS[b][0], SLOTS[a][1] - SLOTS[b][1]) < 175;
    const nVazias = Math.min(total, Math.max(C.bolinhasMacicas, total - FOTOS.length));
    let vazias = [];
    for (let t = 0; t < 300; t++) {
      vazias = [];
      N.embaralhar([...Array(total).keys()]).forEach((s) => {
        if (vazias.length < nVazias && vazias.every((v) => !vizinhas(s, v))) vazias.push(s);
      });
      if (vazias.length === nVazias) break;
    }
    const ordem = N.embaralhar(FOTOS.map((_, i) => i));
    let k0 = 0;
    const assign = [...Array(total).keys()].map((s) => (vazias.indexOf(s) >= 0 ? -1 : ordem[k0++]));
    const busy = {};
    assign.forEach((fi, s) => {
      if (fi >= 0) { imgs[s].src = FOTOS[fi].src; imgs[s].alt = FOTOS[fi].nome; imgs[s].classList.add('show'); }
    });

    // a foto some devagar e a bolinha fica maciça
    const apagar = (s) => {
      busy[s] = true;
      imgs[s].classList.remove('show');
      setTimeout(() => { assign[s] = -1; imgs[s].removeAttribute('src'); imgs[s].alt = ''; busy[s] = false; }, 1300);
    };
    // uma pessoa da reserva aparece com fade, zoom e brilho
    const acender = (s, fi) => {
      busy[s] = true;
      assign[s] = fi;
      const img = imgs[s], ball = balls[s];
      img.classList.remove('show');
      img.src = FOTOS[fi].src;
      img.alt = FOTOS[fi].nome;
      ball.classList.add('on');
      ball.classList.remove('flash'); void ball.offsetWidth; ball.classList.add('flash');
      setTimeout(() => img.classList.add('show'), 80);
      setTimeout(() => ball.classList.remove('flash'), 900);
      setTimeout(() => { ball.classList.remove('on'); busy[s] = false; }, 2000);
    };
    const passo = () => {
      if (document.hidden) return;
      const a = assign.slice();
      const todas = [...Array(total).keys()];
      const usadas = {};
      for (let vez = 0; vez < C.trocasPorVez; vez++) {
        const vaziasAgora = todas.filter((s) => a[s] < 0);
        const entradas = N.embaralhar(vaziasAgora.filter((s) => !busy[s]));
        for (let i = 0; i < entradas.length; i++) {
          const entra = entradas[i];
          const outras = vaziasAgora.filter((v) => v !== entra);
          const saidas = todas.filter((s) => a[s] >= 0 && !busy[s] && s !== entra && outras.every((v) => !vizinhas(s, v)));
          const reserva = FOTOS.map((_, k) => k).filter((k) => a.indexOf(k) < 0 && !usadas[k]);
          if (!saidas.length || !reserva.length) continue;
          const sai = saidas[Math.floor(Math.random() * saidas.length)];
          const foto = reserva[Math.floor(Math.random() * reserva.length)];
          usadas[foto] = true; usadas[a[sai]] = true;
          busy[entra] = true;
          apagar(sai);
          setTimeout(() => acender(entra, foto), 600 + vez * 350);
          a[sai] = -1; a[entra] = foto;
          break;
        }
      }
    };
    setInterval(passo, C.segundosEntreTrocas * 1000);
  };
})(window.Natal);
