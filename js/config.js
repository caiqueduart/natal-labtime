/* ===== Ajustes da árvore — edite aqui ===== */
window.NATAL_CONFIG = {
  segundosEntreTrocas: 3,   // a cada X segundos, fotos trocam de bolinha
  trocasPorVez: 2,          // quantas bolinhas mudam em cada troca
  bolinhasMacicas: 6,       // bolinhas sem foto (só cor)
  neve: true,
  flocosDeNeve: 110,
  recarregarACadaHoras: 6,  // recarrega a página sozinha de tempos em tempos (memória sempre limpa na TV); 0 desliga

  papaiNoel: 'Adelaide',        // rosto do Papai Noel no trenó
  liderDuendes: 'Paulo Sérgio', // duende da frente, com a jarra de café
  surpresaPresentes: ['Elvia', 'Gilson'], // de vez em quando saem das caixas grandes da frente (esquerda, direita) jogando bolsinhas de dinheiro
  surpresaACadaSegundos: 20,              // de quanto em quanto tempo alguém sai (um de cada vez, alternando); 0 desliga
  intervaloEntreCenas: 3,       // segundos de cena vazia entre café, hackers, picaretas e trenó (uma por vez)
  mascote: 'img/mascote.png',

  // ===== Fotos da equipe =====
  // Basta colocar a foto na pasta abaixo com o nome da pessoa no nome do arquivo
  // (ex.: "Maria Silva.jpg"). A árvore encontra as fotos sozinha:
  //  - no GitHub Pages, lendo a pasta pelo GitHub;
  //  - num servidor local (ex.: "python -m http.server"), lendo a listagem da pasta.
  pastaEquipe: 'team',
  github: { dono: 'caiqueduart', repo: 'natal-labtime', branch: 'main' },
  verificarNovasFotosACadaMinutos: 30, // no ar, procura fotos novas sem precisar recarregar a TV

  // Só é usada quando a página é aberta direto do arquivo (dois cliques no index.html),
  // onde o navegador não deixa ler a pasta. Ao adicionar uma foto e abrir assim, inclua o nome aqui.
  fotosLocais: [
    'Rhandy.png', 'Caique.webp', 'Adelaide.png', 'Ana.png', 'Paulo Sérgio.png',
    'Elvia.png', 'Isadora.png', 'Flávia.png', 'Geovanna.png', 'Vinicio.png',
    'Diego.png', 'Carol.png', 'Bruno.png', 'Luiz.png', 'Paulo Vitor.png'
  ]
};
