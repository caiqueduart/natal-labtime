/* ===== Neve =====
   Um único canvas, redesenhado a ~30 quadros por segundo (o olho não percebe diferença
   na neve, e o trabalho cai pela metade). Nada é criado durante o loop: os mesmos
   flocos voltam ao topo para sempre, então a memória fica estável por dias. */
(function (N) {
  const C = window.NATAL_CONFIG;

  N.iniciarNeve = (stage) => {
    if (!C.neve) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'neve';
    canvas.width = 1920;
    canvas.height = 1080;
    stage.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const r = N.rng(42);
    const flocos = [];
    for (let k = 0; k < C.flocosDeNeve; k++) {
      flocos.push({
        x: r() * 1920, y: r() * 1080, raio: 1.5 + r() * 3,
        vy: 60 + r() * 70,                                   // px por segundo
        amp: 10 + r() * 30, fase: r() * Math.PI * 2, freq: 0.4 + r() * 0.8,
        alpha: +(0.6 + r() * 0.4).toFixed(2)
      });
    }
    // agrupa por transparência para trocar o estilo do pincel poucas vezes por quadro
    flocos.sort((a, b) => a.alpha - b.alpha);

    const INTERVALO = 1000 / 30;
    let ultimo = performance.now(), acumulado = 0;
    const quadro = (agora) => {
      requestAnimationFrame(quadro);
      acumulado += agora - ultimo;
      const dt = Math.min(0.1, (agora - ultimo) / 1000);
      ultimo = agora;
      if (acumulado < INTERVALO) {
        // ainda assim move os flocos, para a velocidade ser a mesma em qualquer taxa de quadros
        for (const f of flocos) { f.y += f.vy * dt; f.fase += f.freq * dt; }
        return;
      }
      acumulado = 0;
      ctx.clearRect(0, 0, 1920, 1080);
      ctx.fillStyle = '#fff';
      let alphaAtual = -1;
      for (const f of flocos) {
        f.y += f.vy * dt;
        f.fase += f.freq * dt;
        if (f.y > 1090) { f.y = -10; f.x = Math.random() * 1920; }
        if (f.alpha !== alphaAtual) { ctx.globalAlpha = alphaAtual = f.alpha; }
        ctx.beginPath();
        ctx.arc(f.x + Math.sin(f.fase) * f.amp, f.y, f.raio, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    requestAnimationFrame(quadro);
  };
})(window.Natal);
