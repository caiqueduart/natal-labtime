/* ===== Chão: presentes pulando e bonecos de neve ===== */
(function (N) {
  const PRESENTES = [
    { x: 380, w: 130, h: 110, cor: '#E5383B', fita: '#FFD43B', z: 4, surpresa: 0, bolsas: [[170, 240], [560, 640]] }, // 1ª pessoa de surpresaPresentes sai daqui; bolsinhas caem nessas faixas de x
    { x: 270, w: 96, h: 82, cor: '#7048E8', fita: '#FFFFFF', z: 4 },
    { x: 460, w: 78, h: 64, cor: '#20C997', fita: '#FF4D6D', z: 6 },
    { x: 1410, w: 130, h: 110, cor: '#FFD43B', fita: '#E5383B', z: 4, surpresa: 1, bolsas: [[1240, 1320], [1665, 1730]] }, // 2ª pessoa sai daqui
    { x: 1554, w: 96, h: 82, cor: '#339AF0', fita: '#FFFFFF', z: 4 },
    { x: 1350, w: 78, h: 64, cor: '#FF6FAE', fita: '#FFD43B', z: 6 }
  ];
  const BONECOS = [
    { x: 50, flip: 'none', cachecol: '#E5383B', cachecol2: '#FFFFFF', cartola: true, dl: 0 },
    { x: 1630, flip: 'scaleX(-1)', cachecol: '#339AF0', cachecol2: '#FFD43B', cartola: false, dl: -0.9 }
  ];

  // a tampa (com o laço) é um bloco só, para poder pular na surpresa (js/cena/surpresa.js);
  // nas caixas com surpresa, quem sai fica escondido dentro, atrás da frente da caixa
  const presentes = () => PRESENTES.map((g, k) =>
    '<div class="abs" style="left:' + g.x + 'px;top:' + (1066 - g.h) + 'px;width:' + g.w + 'px;height:' + g.h + 'px;z-index:' + g.z + '">' +
      '<div class="abs hop" style="left:0;top:0;width:' + g.w + 'px;height:' + g.h + 'px;animation-delay:' + (-(k * 0.83)).toFixed(2) + 's">' +
      (g.surpresa !== undefined ? N.saidaSurpresa(g.surpresa, g.w) : '') +
      '<div class="abs" style="left:0;top:14px;width:' + g.w + 'px;height:' + (g.h - 14) + 'px;border-radius:6px;background:' + g.cor + ';box-shadow:inset -14px 0 0 rgba(0,0,0,.12),0 8px 16px rgba(30,80,120,.25)"></div>' +
      '<div class="abs" style="left:50%;top:14px;width:18px;height:' + (g.h - 14) + 'px;margin-left:-9px;background:' + g.fita + '"></div>' +
      '<div class="abs tampa"' + (g.surpresa !== undefined ? ' data-tampa="' + g.surpresa + '"' : '') + ' style="left:0;top:0;width:' + g.w + 'px;height:24px">' +
        '<div class="abs" style="left:-7px;top:0;width:' + (g.w + 14) + 'px;height:24px;border-radius:6px;background:' + g.cor + ';box-shadow:inset 0 -5px 0 rgba(0,0,0,.15)"></div>' +
        '<div class="abs" style="left:50%;top:0;width:18px;height:24px;margin-left:-9px;background:' + g.fita + '"></div>' +
        '<div class="abs" style="left:50%;top:-24px;width:38px;height:26px;margin-left:-38px;box-sizing:border-box;border:8px solid ' + g.fita + ';border-radius:50%;transform:rotate(-24deg)"></div>' +
        '<div class="abs" style="left:50%;top:-24px;width:38px;height:26px;box-sizing:border-box;border:8px solid ' + g.fita + ';border-radius:50%;transform:rotate(24deg)"></div>' +
        '<div class="abs" style="left:50%;top:-7px;width:16px;height:14px;margin-left:-8px;border-radius:5px;background:' + g.fita + '"></div>' +
      '</div>' +
      '</div></div>').join('');

  // onde as caixas com surpresa estão no palco (para as bolsinhas saírem da mão de quem sai)
  N.PRESENTES_SURPRESA = PRESENTES.filter((g) => g.surpresa !== undefined)
    .map((g) => ({ i: g.surpresa, x: g.x, w: g.w, topo: 1066 - g.h, bolsas: g.bolsas }));

  const bonecos = () => {
    const neve = 'radial-gradient(circle at 38% 32%,#FFFFFF 0%,#FFFFFF 45%,#D3E8F5 100%)';
    return BONECOS.map((m) => {
      const chapeu = m.cartola
        ? '<div class="abs" style="left:56px;top:24px;width:128px;height:16px;border-radius:8px;background:#2B2D42"></div>' +
          '<div class="abs" style="left:80px;top:-44px;width:80px;height:72px;border-radius:6px 6px 2px 2px;background:#2B2D42"></div>' +
          '<div class="abs" style="left:80px;top:8px;width:80px;height:14px;background:' + m.cachecol + '"></div>'
        : '<div class="abs" style="left:70px;top:0;width:100px;height:58px;border-radius:52px 52px 8px 8px;background:repeating-linear-gradient(90deg,' + m.cachecol + ' 0 16px,' + m.cachecol2 + ' 16px 26px)"></div>' +
          '<div class="abs" style="left:62px;top:40px;width:116px;height:22px;border-radius:11px;background:' + m.cachecol2 + '"></div>' +
          '<div class="abs" style="left:104px;top:-22px;width:32px;height:32px;border-radius:50%;background:#fff;box-shadow:inset -4px -4px 0 #D3E8F5"></div>';
      return '<div class="abs" style="left:' + m.x + 'px;top:670px;width:240px;height:410px;z-index:5;transform:' + m.flip + '">' +
        '<div class="abs sway" style="left:0;top:0;width:240px;height:410px;animation-delay:' + m.dl + 's">' +
        '<div class="abs" style="left:-46px;top:176px;width:96px;height:8px;border-radius:4px;background:#7A4A28;transform:rotate(24deg);transform-origin:100% 50%"></div>' +
        '<div class="abs" style="left:-54px;top:196px;width:26px;height:26px;border-radius:50%;background:' + m.cachecol + '"></div>' +
        '<div class="abs wave" style="left:182px;top:168px;width:112px;height:8px;animation-delay:' + m.dl + 's">' +
          '<div class="abs" style="left:0;top:0;width:100px;height:8px;border-radius:4px;background:#7A4A28"></div>' +
          '<div class="abs" style="left:92px;top:-10px;width:28px;height:28px;border-radius:50%;background:' + m.cachecol + '"></div></div>' +
        '<div class="abs" style="left:22px;top:214px;width:196px;height:190px;border-radius:50%;background:' + neve + ';box-shadow:0 10px 20px rgba(40,100,150,.2)"></div>' +
        '<div class="abs" style="left:48px;top:110px;width:144px;height:140px;border-radius:50%;background:' + neve + '"></div>' +
        '<div class="abs" style="left:114px;top:160px;width:13px;height:13px;border-radius:50%;background:#2B2D42"></div>' +
        '<div class="abs" style="left:114px;top:192px;width:13px;height:13px;border-radius:50%;background:#2B2D42"></div>' +
        '<div class="abs" style="left:114px;top:250px;width:15px;height:15px;border-radius:50%;background:#2B2D42"></div>' +
        '<div class="abs" style="left:66px;top:20px;width:108px;height:108px;border-radius:50%;background:' + neve + '"></div>' +
        '<div class="abs blink" style="left:98px;top:64px;width:12px;height:15px;border-radius:50%;background:#2B2D42"></div>' +
        '<div class="abs blink" style="left:132px;top:64px;width:12px;height:15px;border-radius:50%;background:#2B2D42"></div>' +
        '<div class="abs" style="left:82px;top:84px;width:18px;height:12px;border-radius:50%;background:#FF8FA3;opacity:.7"></div>' +
        '<div class="abs" style="left:142px;top:84px;width:18px;height:12px;border-radius:50%;background:#FF8FA3;opacity:.7"></div>' +
        '<div class="abs" style="left:120px;top:78px;width:50px;height:15px;background:#FF8A1F;clip-path:polygon(0 0,100% 55%,0 100%)"></div>' +
        '<div class="abs" style="left:102px;top:92px;width:36px;height:16px;box-sizing:border-box;border-bottom:4px solid #2B2D42;border-radius:0 0 20px 20px"></div>' +
        '<div class="abs" style="left:56px;top:116px;width:128px;height:28px;border-radius:14px;background:repeating-linear-gradient(90deg,' + m.cachecol + ' 0 18px,' + m.cachecol2 + ' 18px 30px)"></div>' +
        '<div class="abs flutter" style="left:74px;top:128px;width:28px;height:78px;border-radius:8px 8px 6px 6px;background:repeating-linear-gradient(180deg,' + m.cachecol + ' 0 18px,' + m.cachecol2 + ' 18px 28px)"></div>' +
        chapeu + '</div></div>';
    }).join('');
  };

  N.chao = () => presentes() + bonecos();
})(window.Natal);
