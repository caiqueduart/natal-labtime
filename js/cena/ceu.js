/* ===== Céu: brilho atrás da árvore e nuvens ===== */
(function (N) {
  N.ceu = () => {
    let h = '<div class="abs" style="left:210px;top:10px;width:1500px;height:1100px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.45) 0%,rgba(255,255,255,0) 60%)"></div>';
    // [topo, escala, duração, atraso, opacidade]
    [[330, 1, 90, -10, .6], [470, .7, 110, -55, .5], [300, .85, 100, -75, .55], [560, .6, 130, -30, .45], [400, 1.15, 120, -100, .55]].forEach((c) => {
      h += '<div class="cloud" style="top:' + c[0] + 'px;animation-duration:' + c[2] + 's;animation-delay:' + c[3] + 's;opacity:' + c[4] + '">' +
        '<div style="position:relative;width:260px;height:110px;transform:scale(' + c[1] + ');transform-origin:0 100%">' +
        '<div class="abs" style="left:0;top:50px;width:260px;height:60px;border-radius:30px;background:#fff"></div>' +
        '<div class="abs" style="left:40px;top:18px;width:90px;height:90px;border-radius:50%;background:#fff"></div>' +
        '<div class="abs" style="left:105px;top:0;width:110px;height:110px;border-radius:50%;background:#fff"></div>' +
        '</div></div>';
    });
    return h;
  };
})(window.Natal);
