/* ===== Tela: encaixe em qualquer resolução 16:9, tela cheia, cursor e tela sempre ligada ===== */
(function (N) {
  N.iniciarTela = (stage) => {
    const encaixar = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      stage.style.transform = 'translate(' + ((window.innerWidth - 1920 * s) / 2) + 'px,' + ((window.innerHeight - 1080 * s) / 2) + 'px) scale(' + s + ')';
    };
    window.addEventListener('resize', encaixar);
    encaixar();

    const hint = document.getElementById('hint');
    setTimeout(() => hint.classList.add('hide'), 5000);

    let lock = null;
    const manterLigada = async () => {
      try {
        if ('wakeLock' in navigator && !lock) {
          lock = await navigator.wakeLock.request('screen');
          lock.addEventListener('release', () => { lock = null; });
        }
      } catch (e) { /* navegador sem suporte */ }
    };
    const telaCheia = () => {
      const el = document.documentElement;
      if (!document.fullscreenElement && el.requestFullscreen) el.requestFullscreen().catch(() => {});
      hint.classList.add('hide');
      manterLigada();
    };
    document.addEventListener('click', telaCheia);
    document.addEventListener('keydown', (e) => { if (e.key === 'f' || e.key === 'F' || e.key === 'Enter') telaCheia(); });

    let parado;
    const esconderCursor = () => { clearTimeout(parado); parado = setTimeout(() => document.body.classList.add('idle'), 2000); };
    document.addEventListener('mousemove', () => { document.body.classList.remove('idle'); esconderCursor(); });
    esconderCursor();
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') manterLigada(); });
    manterLigada();

    // rodando por dias: recarrega a página de tempos em tempos para começar sempre "limpa"
    const horas = Number(window.NATAL_CONFIG.recarregarACadaHoras) || 0;
    if (horas > 0) setTimeout(() => location.reload(), horas * 3600 * 1000);
  };
})(window.Natal);
