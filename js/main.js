/* ===== Monta a cena na ordem das camadas e liga as animações ===== */
(function (N) {
  const stage = document.getElementById('stage');

  // primeiro descobre quem está na pasta da equipe, depois monta a cena
  N.carregarEquipe().then(() => {
    stage.innerHTML =
      N.ceu() +
      N.treno() +
      '<div class="arvore">' + N.arvore() + N.bolinhas() + N.placa() + '</div>' +
      N.chao() +
      N.duendes() +
      N.textos() +
      N.moldura();

    N.iniciarTela(stage);
    N.iniciarNeve(stage);
    N.iniciarIssues(stage);
    N.iniciarDuendes(stage);
    // as trocas de fotos começam só depois que todas estão carregadas
    N.preCarregar().then(() => N.iniciarBolinhas(stage));
    N.vigiarEquipe();
  });
})(window.Natal);
