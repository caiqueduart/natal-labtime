/* ===== Duendes correndo atrás do café (líder com a jarra, a turma com copinhos) =====
   O corpo do duende (N.corpoDuende) também é usado nas cenas dos piratas (piratas.js). */
(function (N) {
  const C = window.NATAL_CONFIG;

  // cada perna é um svg próprio (animado pela GPU), girando a partir do quadril
  const perna = (x, cls) =>
    '<svg class="pe ' + cls + '" width="110" height="150" viewBox="0 0 110 150" aria-hidden="true" style="transform-origin:' + (x + 5) + 'px 110px"><rect x="' + x + '" y="110" width="10" height="26" rx="3" fill="#fff"/>' +
    '<rect x="' + x + '" y="114" width="10" height="5" fill="#E5383B"/><rect x="' + x + '" y="124" width="10" height="5" fill="#E5383B"/>' +
    '<path d="M' + (x - 3) + ' 134 h14 q10 0 13 -9 q3 8 -4 13 h-23 z" fill="#1F9D55" stroke="#11673A" stroke-width="1.5"/></svg>';

  // item: desenho parado na mão; animado: svgs próprios por cima (picareta, braços), que a GPU anima sozinhos
  const corpo = (item, animado) =>
    perna(44, 'tras') + perna(58, 'frente') +
    '<svg width="110" height="150" viewBox="0 0 110 150" aria-hidden="true">' +
      '<ellipse cx="55" cy="148" rx="30" ry="4" fill="rgba(40,90,140,.18)"/>' +
      '<path d="M34 70 Q55 62 76 70 L84 112 l-7 -6 -7 6 -7 -6 -7 6 -7 -6 -7 6 -7 -6 -7 6 Z" fill="#2FB863" stroke="#11673A" stroke-width="2" stroke-linejoin="round"/>' +
      '<rect x="31" y="93" width="50" height="7" rx="2" fill="#2B2D42"/><rect x="51" y="91" width="10" height="11" rx="2" fill="none" stroke="#FFD43B" stroke-width="2.5"/>' +
      '<path d="M34 68 l5 9 5 -8 5 9 5 -8 5 9 5 -8 5 9 5 -8 5 9 3 -9 Z" fill="#E5383B"/>' +
      '<path d="M31 38 L14 28 L28 50 Z M79 38 L96 28 L82 50 Z" fill="#F1C27D" stroke="#C68642" stroke-width="2" stroke-linejoin="round"/>' +
    '</svg>' + '<svg width="110" height="150" viewBox="0 0 110 150" aria-hidden="true" style="z-index:2">' +
      '<path d="M26 18 Q36 -34 100 -10 Q74 -8 84 18 Z" fill="#E5383B" stroke="#8A0F1E" stroke-width="2" stroke-linejoin="round"/>' +
      '<circle cx="100" cy="-10" r="6" fill="#FFD43B" stroke="#C98A00" stroke-width="1.5"/>' +
      '<rect x="24" y="12" width="62" height="10" rx="5" fill="#2FB863" stroke="#11673A" stroke-width="1.5"/>' + (item || '') + '</svg>' + (animado || '');
  N.corpoDuende = corpo;

  const JARRA =
    '<path d="M64 78 Q78 72 86 58" fill="none" stroke="#2FB863" stroke-width="9" stroke-linecap="round"/>' +
    '<g transform="rotate(-12 98 46)"><path d="M86 30 h22 l7 26 q1 8 -7 8 h-22 q-8 0 -7 -8 z" fill="rgba(225,242,255,.9)" stroke="#8C9AA8" stroke-width="2"/>' +
    '<path d="M83 46 h31 l2 10 q1 8 -7 8 h-22 q-8 0 -7 -8 z" fill="#6F3B1E"/>' +
    '<rect x="84" y="25" width="26" height="8" rx="3" fill="#2B2D42"/><path d="M86 34 q-12 2 -10 16 q2 8 8 8" fill="none" stroke="#2B2D42" stroke-width="4" stroke-linecap="round"/>' +
    '<path class="vapor" d="M92 20 q-4 -6 0 -12 q4 -6 0 -12 M100 20 q-4 -6 0 -12 q4 -6 0 -12" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></g>' +
    '<circle cx="86" cy="58" r="5" fill="#F1C27D" stroke="#C68642" stroke-width="1.5"/>';
  const COPO =
    '<path d="M64 78 Q80 70 92 64" fill="none" stroke="#2FB863" stroke-width="9" stroke-linecap="round"/>' +
    '<g transform="rotate(8 100 58)"><path d="M92 50 h18 l-3 16 h-12 z" fill="#fff" stroke="#8C9AA8" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M110 54 q7 0 6 5 q-1 4 -7 4" fill="none" stroke="#8C9AA8" stroke-width="2"/><rect x="93" y="50" width="16" height="3" fill="#E9DCCB"/></g>' +
    '<circle cx="92" cy="64" r="5" fill="#F1C27D" stroke="#C68642" stroke-width="1.5"/>';
  const POS = [[0, 2], [128, -6], [232, 4], [338, -4], [446, 6], [552, 0]];

  N.duendes = () =>
    '<div class="tropa" data-cena="cafe" aria-label="Duendes da equipe correndo atrás do café do ' + C.liderDuendes + '">' +
    POS.map((p, i) => '<div class="duende" style="left:' + p[0] + 'px;top:' + p[1] + 'px;animation-delay:' + (-(i * 0.11)).toFixed(2) + 's">' +
      (i === 2 ? '<div class="balao">café!!</div>' : '') +
      '<div class="corpo">' + corpo(i === 0 ? JARRA : COPO) + '</div><img class="rosto" alt="" decoding="async"></div>').join('') + '</div>';

  // rostos sorteados a cada vez que a cena entra; fixo (o líder) sempre no primeiro duende
  N.sortearRostos = (cena, fixo) => {
    const rostos = [...cena.querySelectorAll('.duende .rosto')];
    const lider = N.foto(C.liderDuendes);
    const turma = N.embaralhar(N.FOTOS.filter((p) => p !== lider && p.nome !== C.papaiNoel));
    if (!turma.length) return;
    rostos.forEach((r, i) => {
      const p = fixo ? (i === 0 ? fixo : turma[(i - 1) % turma.length]) : turma[i % turma.length];
      if (p) { r.src = p.src; r.alt = p.nome; }
    });
  };
})(window.Natal);
