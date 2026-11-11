/* ===== Adorno nos cantos da tela: linhas, flocos e bolinhas penduradas ===== */
(function (N) {
  N.moldura = () => {
    let h = '';
    [
      { v: 'top', hz: 'left', w: 400, h: 300 }, { v: 'top', hz: 'right', w: 400, h: 300 },
      { v: 'bottom', hz: 'left', w: 250, h: 320 }, { v: 'bottom', hz: 'right', w: 250, h: 320 }
    ].forEach((c) => {
      const at = (c.hz === 'left' ? '0' : '100%') + ' ' + (c.v === 'top' ? '0' : '100%');
      const mask = 'radial-gradient(ellipse 100% 100% at ' + at + ',#000 55%,transparent 100%)';
      const rad = 'border-' + c.v + '-' + c.hz + '-radius';
      h += '<div aria-hidden="true" class="abs" style="' + c.v + ':22px;' + c.hz + ':22px;width:' + c.w + 'px;height:' + c.h + 'px;box-sizing:border-box;border-' + c.v + ':2px solid rgba(255,255,255,.8);border-' + c.hz + ':2px solid rgba(255,255,255,.8);' + rad + ':30px;-webkit-mask-image:' + mask + ';mask-image:' + mask + ';z-index:4;pointer-events:none"></div>';
      h += '<div aria-hidden="true" class="abs" style="' + c.v + ':36px;' + c.hz + ':36px;width:' + (c.w - 30) + 'px;height:' + (c.h - 30) + 'px;box-sizing:border-box;border-' + c.v + ':1.5px dashed rgba(255,214,120,.8);border-' + c.hz + ':1.5px dashed rgba(255,214,120,.8);' + rad + ':22px;-webkit-mask-image:' + mask + ';mask-image:' + mask + ';z-index:4;pointer-events:none"></div>';
    });

    const braco = 'M30 30 L30 4 M30 12 L24 6 M30 12 L36 6 M30 21 L25 16 M30 21 L35 16';
    let floco = '';
    for (let k = 0; k < 6; k++) floco += '<path d="' + braco + '" transform="rotate(' + (k * 60) + ' 30 30)" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>';
    floco += '<circle cx="30" cy="30" r="5" fill="#FFD43B" stroke="#fff" stroke-width="2"/>';
    [[-10, -10], [1866, -10], [-10, 1026], [1866, 1026]].forEach((p) => {
      h += '<svg class="abs rays" width="64" height="64" viewBox="0 0 60 60" aria-hidden="true" style="left:' + p[0] + 'px;top:' + p[1] + 'px;z-index:16;animation-duration:24s">' + floco + '</svg>';
    });

    [
      { x: 96, len: 46, cor: '#E5383B', esc: '#8A0F1E', d: 2.2, dl: 0 },
      { x: 140, len: 78, cor: '#FFD43B', esc: '#C98A00', d: 2.6, dl: -0.8 },
      { x: 184, len: 36, cor: '#339AF0', esc: '#0B4F8A', d: 2.0, dl: -1.4 },
      { x: 1708, len: 36, cor: '#9775FA', esc: '#4B2A9E', d: 2.1, dl: -0.4 },
      { x: 1752, len: 78, cor: '#E5383B', esc: '#8A0F1E', d: 2.5, dl: -1.1 },
      { x: 1796, len: 46, cor: '#2FB863', esc: '#11673A', d: 2.3, dl: -1.8 }
    ].forEach((q) => {
      h += '<div class="swing" style="left:' + q.x + 'px;top:24px;width:28px;height:' + (q.len + 34) + 'px;z-index:16;animation-duration:' + q.d + 's;animation-delay:' + q.dl + 's">' +
        '<div class="abs" style="left:50%;top:0;width:1.5px;height:' + q.len + 'px;margin-left:-.75px;background:rgba(255,255,255,.9)"></div>' +
        '<div class="abs" style="left:50%;top:' + (q.len - 2) + 'px;width:10px;height:7px;margin-left:-5px;border-radius:2px 2px 1px 1px;background:#F2B705"></div>' +
        '<div class="abs" style="left:0;top:' + (q.len + 4) + 'px;width:28px;height:28px;border-radius:50%;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.85) 0%,rgba(255,255,255,0) 30%),radial-gradient(circle at 50% 50%,' + q.cor + ' 55%,' + q.esc + ' 100%);box-shadow:0 4px 8px rgba(30,60,100,.3)"></div></div>';
    });
    return h;
  };
})(window.Natal);
