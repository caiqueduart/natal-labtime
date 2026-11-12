/* ===== Hackers: correndo atrás da equipe, e depois fugindo das picaretas e do caramelo =====
   Cena "hackers": da esquerda para a direita, três hackers de moletom com notebook atrás de cinco duendes em pânico.
   Cena "picaretas": da direita para a esquerda, a equipe de picareta e o mascote atrás de um hacker.
   Quem põe cada cena na tela é a sequência de cenas (cenas.js). */
(function (N) {
  const C = window.NATAL_CONFIG;

  // svg sobreposto do tamanho do corpo; o que anima nele gira a partir de (ox, oy)
  const camada = (cls, w, h, ox, oy, conteudo) =>
    '<svg class="' + cls + '" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true" style="z-index:2;transform-origin:' + ox + 'px ' + oy + 'px">' + conteudo + '</svg>';
  const MAO = (x, y, r) => '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 5) + '" fill="#F1C27D" stroke="#C68642" stroke-width="1.5"/>';
  // braço verde com contorno escuro, para não sumir no verde da árvore
  const BRACO = (d) => '<path d="' + d + '" fill="none" stroke="#11673A" stroke-width="12" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="#2FB863" stroke-width="8" stroke-linecap="round"/>';
  // manga do moletom do hacker
  const MANGA = (d) => '<path d="' + d + '" fill="none" stroke="#15161F" stroke-width="13" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="#2B2D42" stroke-width="10" stroke-linecap="round"/>';
  const VERDE = '#39FF88';

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

  // ===== hacker de moletom com capuz (desenhado virado para a direita, como o duende) =====
  const pernaHacker = (cls, x) =>
    '<svg class="pe ' + cls + '" width="120" height="160" viewBox="0 0 120 160" aria-hidden="true" style="transform-origin:' + (x + 6) + 'px 114px">' +
      '<rect x="' + x + '" y="114" width="13" height="28" rx="3" fill="#2B3A67"/>' +
      '<path d="M' + (x - 4) + ' 140 h18 q10 0 12 8 h-30 z" fill="#F4F4F4" stroke="#1C1C28" stroke-width="1.5"/>' +
      '<rect x="' + (x - 4) + '" y="146" width="30" height="3" fill="#E5383B"/></svg>';
  const hacker = (armado) =>
    pernaHacker('tras', 48) + pernaHacker('frente', 62) +
    '<svg width="120" height="160" viewBox="0 0 120 160" aria-hidden="true">' +
      '<ellipse cx="60" cy="158" rx="32" ry="4" fill="rgba(40,90,140,.18)"/>' +
      // braço de trás
      MANGA('M44 84 Q30 94 28 108') + MAO(28, 110) +
      // moletom com bolso canguru e cordões
      '<path d="M34 78 Q60 66 86 78 L90 120 H30 Z" fill="#2B2D42" stroke="#15161F" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M44 100 h32 l4 16 h-40 z" fill="#23242F" stroke="#15161F" stroke-width="1.5"/>' +
      '<path d="M54 80 v14 M66 80 v14" stroke="#DDE6EE" stroke-width="2.5" stroke-linecap="round"/>' +
      // capuz com o rosto na sombra
      '<path d="M32 58 Q30 16 62 14 Q94 16 90 60 Q88 84 60 84 Q34 84 32 58 Z" fill="#2B2D42" stroke="#15161F" stroke-width="2"/>' +
      '<path d="M62 14 Q50 30 48 50" fill="none" stroke="#15161F" stroke-width="1.5" opacity=".6"/>' +
      '<ellipse cx="65" cy="52" rx="17" ry="20" fill="#0B0C10"/>' +
      '<ellipse cx="66" cy="49" rx="14" ry="6" fill="' + VERDE + '" opacity=".18"/>' +
      (armado
        // olhos apertados e sorriso de quem vai invadir
        ? '<path d="M55 46 l9 3 l-9 2 z M78 46 l-9 3 l9 2 z" fill="' + VERDE + '"/><path d="M58 62 q8 6 16 0" fill="none" stroke="' + VERDE + '" stroke-width="2" stroke-linecap="round"/>'
        // olhos arregalados e boca de susto
        : '<circle cx="59" cy="48" r="4.5" fill="' + VERDE + '"/><circle cx="73" cy="48" r="4.5" fill="' + VERDE + '"/><ellipse cx="66" cy="63" rx="3.5" ry="4.5" fill="none" stroke="' + VERDE + '" stroke-width="2"/>') +
      (armado ? MANGA('M74 86 Q86 92 94 90') : '') +
    '</svg>' +
    // braço da frente: segurando o notebook com código na tela, ou erguido de medo
    (armado
      ? camada('notebook', 120, 160, 94, 90,
          '<path d="M84 92 L88 60 H118 L114 92 Z" fill="#1C1C28" stroke="#4A545E" stroke-width="2" stroke-linejoin="round"/>' +
          '<rect x="92" y="66" width="14" height="2.5" fill="' + VERDE + '"/><rect x="91" y="72" width="20" height="2.5" fill="' + VERDE + '" opacity=".75"/>' +
          '<rect x="90" y="78" width="10" height="2.5" fill="' + VERDE + '"/><rect class="cursor" x="102" y="78" width="5" height="2.5" fill="' + VERDE + '"/>' +
          '<path d="M80 92 h38 l-5 6 h-36 z" fill="#8C9AA8" stroke="#4A545E" stroke-width="1.5" stroke-linejoin="round"/>' + MAO(94, 92, 6))
      : camada('panico', 120, 160, 74, 84, MANGA('M74 86 Q90 72 94 48') + MAO(94, 44, 6)));

  const umHacker = (x, y, i, armado, balao) =>
    '<div class="duende hacker" style="left:' + x + 'px;top:' + y + 'px;animation-delay:' + (-(i * 0.13)).toFixed(2) + 's">' +
      (balao ? '<div class="balao">' + balao + '</div>' : '') +
      '<div class="corpo">' + hacker(armado) + '</div></div>';

  const ALTURAS = [2, -6, 4, -4, 6];
  N.hackers = () =>
    // hackers atrás da equipe (esquerda → direita)
    '<div class="tropa dir" data-cena="hackers" style="width:1060px" aria-label="Hackers correndo atrás da equipe">' +
      umHacker(0, -8, 0, true, '') + umHacker(150, -14, 1, true, 'hackeado!') + umHacker(300, -6, 2, true, '') +
      [500, 610, 720, 830, 940].map((x, i) => duende(x, ALTURAS[i], i, '', PANICO, i === 2 ? 'socorro!!' : '', true)).join('') +
    '</div>' +
    // a equipe de picareta e o caramelo atrás do hacker (direita → esquerda)
    '<div class="tropa" data-cena="picaretas" style="width:960px" aria-label="Equipe com picaretas e o mascote atrás do hacker">' +
      umHacker(0, -10, 0, false, 'ctrl+z!') +
      '<div class="cao" style="left:250px;top:0"><img src="' + C.mascote + '" alt="Mascote da equipe correndo">' +
        [[-14, 34, 0], [10, 44, -0.15], [40, 48, -0.3], [72, 40, -0.1], [92, 30, -0.25]]
          .map((q) => '<div class="poeira" style="left:' + q[0] + 'px;width:' + q[1] + 'px;height:' + q[1] + 'px;animation-delay:' + q[2] + 's"></div>').join('') +
      '</div>' +
      [400, 510, 620, 730, 840].map((x, i) => duende(x, ALTURAS[i], i, PICARETA_BRACO, PICARETA, i === 1 ? 'pega!!' : '', false)).join('') +
    '</div>';
})(window.Natal);
