/* ===== "Feliz Natal!" com neve nas letras, azevinho e estrelinhas ===== */
(function (N) {
  const CONTORNO = '5px 0 0 #fff,-5px 0 0 #fff,0 5px 0 #fff,0 -5px 0 #fff,4px 4px 0 #fff,-4px 4px 0 #fff,4px -4px 0 #fff,-4px -4px 0 #fff';
  const VERMELHO = { light: '#FF8A8A', base: '#E5383B', dark: '#A4161A', deep: '#7A0F17' };
  const VERDE = { light: '#7BEA9E', base: '#2BA14F', dark: '#17703A', deep: '#0E4D27' };
  // altura (%) onde termina a neve em cima de cada letra
  const alturaNeve = (c) => /[FNl!]/.test(c) ? 27 : (c === 't' ? 36 : (c === 'i' ? 34 : 44));

  const palavra = (txt, c, atraso0) => [...txt].map((ch, i) => {
    const y = alturaNeve(ch);
    const clip = 'polygon(0 0,100% 0,100% ' + (y + 2) + '%,86% ' + (y + 6) + '%,72% ' + (y - 1) + '%,58% ' + (y + 7) + '%,46% ' + (y + 1) + '%,33% ' + (y + 6) + '%,20% ' + y + '%,8% ' + (y + 5) + '%,0 ' + (y + 1) + '%)';
    return '<span class="ch" style="animation-delay:' + (atraso0 + i * 0.09).toFixed(2) + 's">' +
      '<span class="b" style="color:' + c.base + ';text-shadow:' + CONTORNO + ',0 9px 0 #fff,0 16px 0 ' + c.deep + ',0 26px 30px rgba(20,60,110,.28)">' + ch + '</span>' +
      '<span class="f" aria-hidden="true" style="background-image:linear-gradient(180deg,' + c.light + ' 0%,' + c.base + ' 48%,' + c.dark + ' 100%)">' + ch + '</span>' +
      '<span class="s" aria-hidden="true" style="clip-path:' + clip + '">' + ch + '</span></span>';
  }).join('');

  const AZEVINHO =
    '<svg class="abs" style="left:-78px;top:-14px;width:120px;height:90px;transform:rotate(-18deg)" viewBox="0 0 120 90" aria-hidden="true">' +
    '<path d="M60 48 C48 30 30 34 14 22 C20 34 10 38 18 46 C8 50 14 58 4 64 C24 66 44 64 60 48Z" fill="#1F9D55" stroke="#0E6B36" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M60 48 C40 52 30 44 8 64" fill="none" stroke="#0E6B36" stroke-width="2"/>' +
    '<path d="M60 48 C72 28 92 30 104 16 C100 30 112 34 104 42 C114 48 106 54 116 62 C96 64 76 64 60 48Z" fill="#2FB863" stroke="#11673A" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M60 48 C80 48 92 54 116 62" fill="none" stroke="#11673A" stroke-width="2"/>' +
    '<circle cx="52" cy="54" r="10" fill="#E5383B" stroke="#8A0F1E" stroke-width="2"/><circle cx="66" cy="58" r="9" fill="#FF4D5E" stroke="#8A0F1E" stroke-width="2"/><circle cx="60" cy="44" r="9" fill="#E5383B" stroke="#8A0F1E" stroke-width="2"/>' +
    '<circle cx="49" cy="50" r="3" fill="#fff" opacity=".8"/><circle cx="63" cy="54" r="2.5" fill="#fff" opacity=".8"/><circle cx="57" cy="40" r="2.5" fill="#fff" opacity=".8"/></svg>';

  const brilho = (l, t, sz, dl) => '<div class="tsp" style="left:' + l + 'px;top:' + t + 'px;width:' + sz + 'px;height:' + sz + 'px;animation-delay:' + dl + 's">' + N.SPARK('#FFF3BF') + '</div>';

  N.textos = () =>
    '<div class="abs" style="left:120px;top:116px;width:680px;display:flex;justify-content:flex-end;z-index:8">' +
      '<div style="position:relative;white-space:nowrap" aria-label="Feliz">' + AZEVINHO + palavra('Feliz', VERMELHO, 0) +
      brilho(-30, 120, 30, -0.3) + brilho(150, -36, 36, -1.4) + brilho(392, 6, 26, -2.1) + '</div></div>' +
    '<div class="abs" style="left:1110px;top:116px;width:700px;display:flex;flex-direction:column;align-items:flex-start;z-index:8">' +
      '<div style="position:relative;white-space:nowrap" aria-label="Natal!">' + palavra('Natal!', VERDE, 0.5) +
      brilho(-24, -30, 30, -0.9) + brilho(270, -40, 34, -1.8) + brilho(470, 60, 28, -2.5) + '</div></div>';
})(window.Natal);
