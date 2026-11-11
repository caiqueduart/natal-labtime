/* ===== Árvore: galhos, neve nas pontas, cordões, luzes, estrela e enfeites pequenos ===== */
(function (N) {
  const f = N.f;
  const cx = 960;
  const tiers = [
    { top: 150, bottom: 330, hw: 150, n: 3, g: 255 },
    { top: 220, bottom: 480, hw: 240, n: 4, g: 395 },
    { top: 330, bottom: 640, hw: 340, n: 5, g: 545 },
    { top: 460, bottom: 800, hw: 440, n: 6, g: 700 },
    { top: 590, bottom: 950, hw: 540, n: 7, g: 860 }
  ];

  const tierPath = (t, off) => {
    const top = t.top + off, b = t.bottom + off, hw = t.hw;
    const by = (x) => b + 24 * (1 - Math.pow((x - cx) / hw, 2));
    const ctrlY = top + (b - top) * 0.62;
    let d = 'M ' + cx + ' ' + top + ' Q ' + f(cx + hw * 0.38) + ' ' + f(ctrlY) + ' ' + (cx + hw) + ' ' + f(by(cx + hw));
    for (let k = 0; k < t.n; k++) {
      const x0 = cx + hw - (2 * hw) * k / t.n, x1 = cx + hw - (2 * hw) * (k + 1) / t.n, xm = (x0 + x1) / 2;
      d += ' Q ' + f(xm) + ' ' + f(by(xm) + 32) + ' ' + f(x1) + ' ' + f(by(x1));
    }
    return d + ' Q ' + f(cx - hw * 0.38) + ' ' + f(ctrlY) + ' ' + cx + ' ' + top + ' Z';
  };
  const halfAt = (t, y) => {
    const cyc = t.top + (t.bottom - t.top) * 0.62;
    let lo = 0, hi = 1, s = 0.5;
    for (let i = 0; i < 40; i++) {
      s = (lo + hi) / 2;
      const yy = (1 - s) * (1 - s) * t.top + 2 * (1 - s) * s * cyc + s * s * t.bottom;
      if (yy < y) lo = s; else hi = s;
    }
    return 2 * (1 - s) * s * 0.38 * t.hw + s * s * t.hw;
  };
  const quad = (p0, c, p2, s) => [
    (1 - s) * (1 - s) * p0[0] + 2 * (1 - s) * s * c[0] + s * s * p2[0],
    (1 - s) * (1 - s) * p0[1] + 2 * (1 - s) * s * c[1] + s * s * p2[1]
  ];

  const galhos = () => {
    let svg = '<svg class="abs" style="left:0;top:0" width="1920" height="1080" viewBox="0 0 1920 1080" aria-hidden="true"><defs>' +
      '<linearGradient id="tierFill" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4BD97C"/><stop offset="0.5" stop-color="#22B158"/><stop offset="1" stop-color="#138A40"/></linearGradient>' +
      '<linearGradient id="trunkFill" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A0673C"/><stop offset="1" stop-color="#6B4023"/></linearGradient></defs>' +
      '<ellipse cx="190" cy="1090" rx="560" ry="150" fill="#EAF6FD"/><ellipse cx="1740" cy="1090" rx="560" ry="150" fill="#EAF6FD"/>' +
      '<rect x="930" y="920" width="60" height="90" rx="6" fill="url(#trunkFill)"/>';
    const luzes = [];
    const r = N.rng(7);
    const cores = [
      ['#FF4D6D', 'rgba(255,77,109,.7)'], ['#FFD43B', 'rgba(255,212,59,.8)'], ['#4DABF7', 'rgba(77,171,247,.7)'],
      ['#FF922B', 'rgba(255,146,43,.7)'], ['#DA77F2', 'rgba(218,119,242,.7)'], ['#FFFFFF', 'rgba(255,255,255,.9)']
    ];
    const camadas = [];
    tiers.forEach((t, idx) => {
      const by = (x) => t.bottom + 24 * (1 - Math.pow((x - cx) / t.hw, 2));
      let pontas = '';
      for (let k = 1; k < t.n; k++) {
        const x = cx + t.hw - (2 * t.hw) * k / t.n;
        pontas += '<ellipse cx="' + f(x) + '" cy="' + f(by(x) - 3) + '" rx="20" ry="8" fill="#fff"/><ellipse cx="' + f(x - 4) + '" cy="' + f(by(x) - 6) + '" rx="8" ry="3.5" fill="#fff"/>';
      }
      const hwB = halfAt(t, t.g) - 12;
      camadas.push({ t: tierPath(t, 0), s: tierPath(t, 16), pontas, b: 'M ' + f(cx - hwB) + ' ' + t.g + ' Q ' + cx + ' ' + (t.g + 70) + ' ' + f(cx + hwB) + ' ' + t.g });
      const yL = t.g + 46, yR = t.g + 6;
      const p0 = [cx - (halfAt(t, yL) - 14), yL], c = [cx, t.g + 96], p2 = [cx + (halfAt(t, yR) - 14), yR];
      const count = 7 + idx * 3;
      for (let k = 0; k < count; k++) {
        const pt = quad(p0, c, p2, (k + 0.5) / count);
        const cor = cores[(k + idx) % cores.length];
        luzes.push({ x: f(pt[0]), y: f(pt[1]), c: cor[0], glow: cor[1], d: f(0.5 + r() * 1.1), dl: f(-r() * 2) });
      }
    });
    for (let i = camadas.length - 1; i >= 0; i--) {
      if (i < camadas.length - 1) svg += '<path d="' + camadas[i].s + '" fill="rgba(5,80,35,.38)"/>';
      svg += '<path d="' + camadas[i].t + '" fill="url(#tierFill)"/>' + camadas[i].pontas;
      svg += '<path d="' + camadas[i].b + '" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>';
      svg += '<path d="' + camadas[i].b + '" fill="none" stroke="#E5383B" stroke-width="9" stroke-dasharray="10 10"/>';
    }
    svg += '<ellipse cx="960" cy="1110" rx="1180" ry="160" fill="#fff"/><ellipse cx="960" cy="1150" rx="1100" ry="150" fill="#E3F2FC"/></svg>';

    let h = svg;
    // as luzes piscam em 3 grupos (3 animações no total, em vez de uma por luz)
    const grupos = ['', '', ''];
    luzes.forEach((l, i) => {
      grupos[i % 3] += '<div class="luz" style="left:' + l.x + 'px;top:' + l.y + 'px;background:' + l.c + ';box-shadow:0 0 12px 4px ' + l.glow + ',inset 0 -3px 0 rgba(0,0,0,.15)"></div>';
    });
    grupos.forEach((g, i) => { h += '<div class="grupo-luz g' + i + '">' + g + '</div>'; });
    return h;
  };

  const estrela = () => {
    const pts = [];
    for (let k = 0; k < 10; k++) {
      const ang = -Math.PI / 2 + k * Math.PI / 5, rad = k % 2 === 0 ? 78 : 34;
      pts.push(f(85 + rad * Math.cos(ang)) + ',' + f(88 + rad * Math.sin(ang)));
    }
    let raios = '';
    for (let k = 0; k < 16; k++) {
      const ang = k * Math.PI / 8, r0 = 96, r1 = k % 2 === 0 ? 156 : 128;
      raios += 'M ' + f(160 + r0 * Math.cos(ang)) + ' ' + f(160 + r0 * Math.sin(ang)) + ' L ' + f(160 + r1 * Math.cos(ang)) + ' ' + f(160 + r1 * Math.sin(ang)) + ' ';
    }
    return '<div class="abs halo" style="left:790px;top:-60px;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(255,240,170,.9) 0%,rgba(255,230,120,.35) 35%,rgba(255,230,120,0) 70%)"></div>' +
      '<svg class="abs rays" style="left:800px;top:-50px;opacity:.8" width="320" height="320" viewBox="0 0 320 320" aria-hidden="true"><path d="' + raios + '" fill="none" stroke="#FFF3BF" stroke-width="4" stroke-linecap="round"/></svg>' +
      '<svg class="abs star" style="left:875px;top:25px" width="170" height="170" viewBox="0 0 170 170" aria-hidden="true"><polygon points="' + pts.join(' ') + '" fill="#FFD43B" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></svg>';
  };

  const enfeitesPequenos = () => {
    const pal = [['#FF4D6D', '#A61E4D'], ['#FFD43B', '#E67700'], ['#4DABF7', '#1864AB'], ['#B197FC', '#5F3DC4'], ['#FF922B', '#C2410C']];
    let h = '';
    [[1224, 720, 40], [768, 584, 40]].forEach((p, k) => {
      const w = p[2], st = 18, c = pal[k % pal.length];
      h += '<div class="swing" style="left:' + (p[0] - w / 2) + 'px;top:' + (p[1] - w / 2 - st - 5) + 'px;width:' + w + 'px;height:' + (st + 5 + w) + 'px;z-index:2;animation-duration:' + (1.6 + (k % 4) * 0.3).toFixed(2) + 's;animation-delay:' + (-(k * 0.61) % 3).toFixed(2) + 's">' +
        '<div class="abs" style="left:50%;top:0;width:2px;height:' + st + 'px;margin-left:-1px;background:#fff"></div>' +
        '<div class="abs" style="left:50%;top:' + (st - 2) + 'px;width:12px;height:9px;margin-left:-6px;border-radius:3px 3px 1px 1px;background:#FFD43B;z-index:2"></div>' +
        '<div class="abs" style="left:0;top:' + (st + 5) + 'px;width:' + w + 'px;height:' + w + 'px;border-radius:50%;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.85) 0%,rgba(255,255,255,0) 26%),radial-gradient(circle at 50% 50%,' + c[0] + ' 55%,' + c[1] + ' 100%);box-shadow:0 6px 12px rgba(0,60,30,.3)"></div></div>';
    });
    return h;
  };

  N.arvore = () => galhos() + estrela() + enfeitesPequenos();
})(window.Natal);
