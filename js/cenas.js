/* ===== Cenas que se revezam: café, hackers, picaretas e trenó — uma de cada vez =====
   Cada cena atravessa a tela inteira; só quando ela sai começa a contagem de
   intervaloEntreCenas (config.js) para a próxima. Fora de cena, a tropa fica escondida
   e com as animações paradas (personagens.css), para não gastar nada na TV. */
(function (N) {
  const C = window.NATAL_CONFIG;
  const VELOCIDADE = 170; // px/s de quem corre no chão
  const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

  N.iniciarCenas = (stage) => {
    const lider = N.foto(C.liderDuendes);
    const noChao = (nome, de, ate, fixo) => ({
      el: stage.querySelector('[data-cena="' + nome + '"]'),
      de: 'translate3d(' + de + 'px,0,0)', ate: 'translate3d(' + ate + 'px,0,0)',
      ms: Math.abs(ate - de) / VELOCIDADE * 1000,
      antes: (el) => N.sortearRostos(el, fixo)
    });
    const V = N.VOO_TRENO;
    const cenas = [
      noChao('cafe', 2000, -780, lider),
      noChao('hackers', -1100, 1960),
      noChao('picaretas', 2000, -1000),
      { el: stage.querySelector('.sleigh'), treno: true, ms: V.ms,
        de: 'translate(' + V.de[0] + 'px,' + V.de[1] + 'px)', ate: 'translate(' + V.ate[0] + 'px,' + V.ate[1] + 'px)' }
    ].filter((c) => c.el);
    if (!cenas.length) return;
    const intervalo = Math.max(0, Number(C.intervaloEntreCenas) || 0) * 1000;

    const rodar = async () => {
      for (let i = 0; ; i = (i + 1) % cenas.length) {
        const c = cenas[i];
        if (c.antes) c.antes(c.el);
        c.el.classList.add('ativa');
        const a = c.el.animate([{ transform: c.de }, { transform: c.ate }], { duration: c.ms, easing: 'linear' });
        if (c.treno) N.vooTreno = a; // as issues saem do saco enquanto o trenó voa
        try { await a.finished; } catch (e) { /* cancelada: segue para a próxima */ }
        if (c.treno) N.vooTreno = null;
        c.el.classList.remove('ativa');
        a.cancel();
        await esperar(intervalo);
      }
    };
    rodar();
  };
})(window.Natal);
