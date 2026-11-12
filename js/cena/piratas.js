/* ===== Piratas: correndo atrás da equipe, e depois fugindo das picaretas e do caramelo =====
   Cena "piratas": da esquerda para a direita, três piratas de sabre atrás de cinco duendes em pânico.
   Cena "picaretas": da direita para a esquerda, a equipe de picareta e o mascote atrás de um pirata.
   Quem põe cada cena na tela é a sequência de cenas (cenas.js). */
(function (N) {
  const C = window.NATAL_CONFIG;

  // svg sobreposto do tamanho do corpo; o que anima nele gira a partir de (ox, oy)
  const camada = (cls, w, h, ox, oy, conteudo) =>
    '<svg class="' + cls + '" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true" style="z-index:2;transform-origin:' + ox + 'px ' + oy + 'px">' + conteudo + '</svg>';
  const MAO = (x, y, r) => '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 5) + '" fill="#F1C27D" stroke="#C68642" stroke-width="1.5"/>';
  // braço verde com contorno escuro, para não sumir no verde da árvore
  const BRACO = (d) => '<path d="' + d + '" fill="none" stroke="#11673A" stroke-width="12" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="#2FB863" stroke-width="8" stroke-linecap="round"/>';

  // ===== duendes =====
  const PANICO = camada('panico', 110, 150, 56, 78, BRACO('M66 78 Q84 64 88 34') + MAO(88, 32) + BRACO('M46 78 Q28 64 22 34') + MAO(22, 32)) +
    camada('gota', 110, 150, 16, 14, '<path d="M16 8 q5 7 0 11 q-5 -4 0 -11 z" fill="#A5D8FF" stroke="#4DABF7" stroke-width="1.2"/>');
  const PICARETA_BRACO = BRACO('M66 80 Q84 74 92 54');
  const PICARETA = camada('picareta', 110, 150, 92, 56,
    '<path d="M92 56 L108 -18" fill="none" stroke="#5A3418" stroke-width="8" stroke-linecap="round"/><path d="M92 56 L108 -18" fill="none" stroke="#B07A43" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M80 -14 Q108 -40 140 -18 L136 -10 Q108 -28 84 -4 Z" fill="#D5DEE6" stroke="#4A545E" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<rect x="102" y="-26" width="12" height="12" rx="2" fill="#6B7783" stroke="#4A545E" stroke-width="1.5"/>' + MAO(92, 54));

  const duende = (x, y, i, item, animado, balao, medo) =>
    '<div class="duende" style="left:' + x + 'px;top:' + y + 'px;animation-delay:' + (-(i * 0.11)).toFixed(2) + 's">' +
      (balao ? '<div class="balao' + (medo ? ' medo' : '') + '">' + balao + '</div>' : '') +
      '<div class="corpo">' + N.corpoDuende(item, animado) + '</div><img class="rosto" alt="" decoding="async"></div>';

  // ===== pirata (desenhado virado para a direita, como o duende) =====
  const pernaPirata = (cls, ox, conteudo) =>
    '<svg class="pe ' + cls + '" width="120" height="160" viewBox="0 0 120 160" aria-hidden="true" style="transform-origin:' + ox + 'px 114px">' + conteudo + '</svg>';
  const pirata = (armado) =>
    // perna de pau atrás, bota na frente
    pernaPirata('tras', 54, '<rect x="48" y="114" width="13" height="18" rx="3" fill="#2B3A67"/><rect x="51" y="130" width="7" height="24" rx="3" fill="#A0673C" stroke="#6B4023" stroke-width="1.5"/>') +
    pernaPirata('frente', 68, '<rect x="62" y="114" width="13" height="28" rx="3" fill="#2B3A67"/><path d="M58 140 h18 q12 0 14 10 h-32 z" fill="#1C1C28"/>') +
    '<svg width="120" height="160" viewBox="0 0 120 160" aria-hidden="true">' +
      '<defs><pattern id="pirListra" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fff"/><rect width="8" height="4" fill="#E5383B"/></pattern></defs>' +
      '<ellipse cx="60" cy="158" rx="32" ry="4" fill="rgba(40,90,140,.18)"/>' +
      // braço de trás com o gancho
      '<path d="M46 82 Q32 90 28 102" fill="none" stroke="#F4F4F4" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M28 104 q-8 2 -6 10 q3 6 9 2" fill="none" stroke="#9AA5B1" stroke-width="3.5" stroke-linecap="round"/>' +
      // camisa listrada, colete e cinto
      '<path d="M36 76 Q60 66 84 76 L88 118 H32 Z" fill="url(#pirListra)" stroke="#7A0F17" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M36 76 L48 72 L46 118 H32 Z M84 76 L72 72 L74 118 H88 Z" fill="#6B3E1C"/>' +
      '<rect x="31" y="102" width="58" height="8" rx="2" fill="#1C1C28"/><rect x="54" y="100" width="12" height="12" rx="2" fill="none" stroke="#FFD43B" stroke-width="2.5"/>' +
      // cabeça, barba, boca, olho e tapa-olho
      '<circle cx="60" cy="50" r="23" fill="#F1C27D" stroke="#C68642" stroke-width="2"/>' +
      '<path d="M37 52 Q38 82 60 84 Q82 82 83 52 Q74 64 60 64 Q46 64 37 52 Z" fill="#3B2416"/>' +
      (armado
        ? '<path d="M60 66 q8 8 16 0 z" fill="#7A0F17"/><circle cx="68" cy="44" r="3.5" fill="#1C1C28"/><path d="M61 35 L75 40" stroke="#1C1C28" stroke-width="3" stroke-linecap="round"/>'
        : '<ellipse cx="68" cy="68" rx="5" ry="6.5" fill="#7A0F17"/><circle cx="68" cy="44" r="6" fill="#fff" stroke="#1C1C28" stroke-width="1.5"/><circle cx="69" cy="44" r="2.5" fill="#1C1C28"/><path d="M61 33 Q68 28 75 33" fill="none" stroke="#1C1C28" stroke-width="3" stroke-linecap="round"/>') +
      '<circle cx="77" cy="53" r="5" fill="#E8A87C" stroke="#C68642" stroke-width="1.5"/>' +
      '<path d="M37 38 L82 33" stroke="#1C1C28" stroke-width="2.5"/><ellipse cx="50" cy="44" rx="7" ry="6" fill="#1C1C28"/>' +
      // chapéu de três pontas com caveira
      '<path d="M26 34 Q34 28 38 12 Q60 -2 82 12 Q86 28 94 34 Q60 24 26 34 Z" fill="#1C1C28" stroke="#FFD43B" stroke-width="2" stroke-linejoin="round"/>' +
      '<circle cx="60" cy="17" r="5" fill="#fff"/><path d="M53 25 L67 29 M67 25 L53 29" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>' +
      (armado ? '<path d="M74 84 Q88 78 92 64" fill="none" stroke="#F4F4F4" stroke-width="10" stroke-linecap="round"/>' : '') +
    '</svg>' +
    // braço da frente: sabre balançando, ou erguido de medo
    (armado
      ? camada('sabre', 120, 160, 92, 64, '<path d="M92 62 Q106 36 98 8 Q116 32 98 64 Z" fill="#DDE6EE" stroke="#8C9AA8" stroke-width="1.5"/><rect x="85" y="60" width="14" height="5" rx="2" fill="#FFD43B"/>' + MAO(92, 64, 6))
      : camada('panico', 120, 160, 74, 84, '<path d="M74 84 Q90 70 94 46" fill="none" stroke="#F4F4F4" stroke-width="10" stroke-linecap="round"/>' + MAO(94, 44, 6)));

  const umPirata = (x, y, i, armado, balao) =>
    '<div class="duende pirata" style="left:' + x + 'px;top:' + y + 'px;animation-delay:' + (-(i * 0.13)).toFixed(2) + 's">' +
      (balao ? '<div class="balao">' + balao + '</div>' : '') +
      '<div class="corpo">' + pirata(armado) + '</div></div>';

  const ALTURAS = [2, -6, 4, -4, 6];
  N.piratas = () =>
    // piratas atrás da equipe (esquerda → direita)
    '<div class="tropa dir" data-cena="piratas" style="width:1060px" aria-label="Piratas correndo atrás da equipe">' +
      umPirata(0, -8, 0, true, '') + umPirata(150, -14, 1, true, 'Arrr!') + umPirata(300, -6, 2, true, '') +
      [500, 610, 720, 830, 940].map((x, i) => duende(x, ALTURAS[i], i, '', PANICO, i === 2 ? 'socorro!!' : '', true)).join('') +
    '</div>' +
    // a equipe de picareta e o caramelo atrás do pirata (direita → esquerda)
    '<div class="tropa" data-cena="picaretas" style="width:960px" aria-label="Equipe com picaretas e o mascote atrás do pirata">' +
      umPirata(0, -10, 0, false, 'socorro!') +
      '<div class="cao" style="left:250px;top:0"><img src="' + C.mascote + '" alt="Mascote da equipe correndo">' +
        [[-14, 34, 0], [10, 44, -0.15], [40, 48, -0.3], [72, 40, -0.1], [92, 30, -0.25]]
          .map((q) => '<div class="poeira" style="left:' + q[0] + 'px;width:' + q[1] + 'px;height:' + q[1] + 'px;animation-delay:' + q[2] + 's"></div>').join('') +
      '</div>' +
      [400, 510, 620, 730, 840].map((x, i) => duende(x, ALTURAS[i], i, PICARETA_BRACO, PICARETA, i === 1 ? 'pega!!' : '', false)).join('') +
    '</div>';
})(window.Natal);
