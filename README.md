# 🎄 Natal LabTIME

Árvore de Natal digital da equipe LabTIME, feita para rodar em loop na TV da sala Dev.

As fotos da equipe aparecem nas bolinhas e vão trocando de lugar. Na frente da árvore, quatro cenas se revezam, uma de cada vez, com 3 s de pausa entre elas:

1. **Café:** os duendes da equipe correm atrás do líder com a jarra de café.
2. **Hackers:** hackers de moletom, com o notebook na mão, correm atrás da equipe de duendes, em pânico.
3. **Picaretas:** a equipe, de picareta na mão, e o mascote caramelo correm atrás do hacker.
4. **Trenó:** o Papai Noel com o mascote atravessa o céu arremessando issues do saco do GitLab.

## Feita para rodar por dias

- Animações só de `transform`/`opacity`, que a placa de vídeo faz sem redesenhar a tela.
- Luzes da árvore piscam em 3 grupos (3 animações para ~65 luzes).
- Neve num único canvas a 30 quadros/s, sempre com os mesmos flocos.
- Os cartões de issue são 5 elementos reaproveitados: nada é criado ou destruído durante o loop.
- Só a cena da vez fica visível; as outras ficam escondidas e com as animações paradas.
- Nada roda com a aba escondida, e a página recarrega sozinha a cada 6 h (configurável) para começar sempre limpa.

## Como abrir

- **Online (GitHub Pages):** `https://caiqueduart.github.io/natal-labtime/`
- **Local:** abra o `index.html` no navegador. Não precisa de servidor nem de internet.

Na TV, clique na tela (ou aperte **F**) para entrar em tela cheia. A cena se ajusta a qualquer resolução 16:9 (Full HD, 4K…).

## Estrutura

```
index.html            página que carrega tudo
css/
  base.css            fontes, palco 1920×1080, animações comuns
  arvore.css          céu, árvore, estrela e bolinhas com fotos
  personagens.css     trenó, issues, presentes, bonecos de neve, duendes, hackers
  textos.css          "Feliz Natal!"
js/
  config.js           ⚙️ ajustes (edite aqui)
  util.js             funções compartilhadas e descoberta das fotos em /team
  cena/
    ceu.js            nuvens e brilho do fundo
    treno.js          trenó, Papai Noel e issues arremessadas
    arvore.js         galhos, luzes, estrela e enfeites pequenos
    bolinhas.js       bolinhas com fotos e a lógica de troca
    placa.js          placa "EQUIPE LabTIME"
    chao.js           presentes e bonecos de neve
    duendes.js        duendes correndo atrás do café (e o corpo do duende das outras cenas)
    hackers.js        cenas dos hackers e das picaretas com o mascote
    textos.js         letras do "Feliz Natal!"
    moldura.js        adorno nos cantos da tela
    neve.js           neve (desenhada uma vez, só desliza)
  cenas.js            revezamento das cenas: café, hackers, picaretas e trenó
  tela.js             encaixe na tela, tela cheia, cursor, tela sempre ligada
  main.js             monta a cena
team/                 fotos da equipe (o nome do arquivo é o nome da pessoa)
img/mascote.png       mascote no trenó
fonts/                fonte Fredoka (funciona offline)
```

## Adicionar uma pessoa

Coloque a foto na pasta `team/` com o nome da pessoa no nome do arquivo, por exemplo `Maria Silva.jpg`, e faça o push. Pronto: ela entra na árvore como as outras, sem mexer em código.

- Formatos aceitos: `.jpg`, `.png`, `.webp`, `.gif`, `.avif`. Fotos com o rosto no centro ficam melhores.
- Acentos e espaços podem (e devem) ficar no nome: `Flávia.png`, `Paulo Sérgio.png`.
- Para trocar a foto de alguém, substitua o arquivo. Para tirar, apague.

Como a árvore descobre as fotos:

| Onde está aberta | Como lê a pasta `team/` |
|---|---|
| GitHub Pages | pela API do GitHub; a TV confere a cada 30 min e recarrega sozinha se a pasta mudou |
| Servidor local (`python -m http.server`, Live Server…) | pela listagem da pasta |
| Dois cliques no `index.html` | o navegador não deixa ler pastas nesse modo, então usa a lista `fotosLocais` do `js/config.js` |

## Ajustes (`js/config.js`)

| Opção | O que faz |
|---|---|
| `segundosEntreTrocas` | de quantos em quantos segundos as fotos trocam |
| `trocasPorVez` | quantas bolinhas mudam em cada troca |
| `bolinhasMacicas` | quantas bolinhas ficam sem foto |
| `neve` / `flocosDeNeve` | liga a neve e define a quantidade de flocos |
| `recarregarACadaHoras` | recarrega a página sozinha a cada X horas (0 desliga) |
| `verificarNovasFotosACadaMinutos` | de quanto em quanto tempo procura fotos novas no ar |
| `pastaEquipe` / `github` | pasta das fotos e repositório de onde ela é lida |
| `papaiNoel` | quem é o Papai Noel no trenó |
| `liderDuendes` | duende da frente, com a jarra de café |
| `intervaloEntreCenas` | segundos de cena vazia entre uma cena e a próxima |

## Publicação (GitHub Pages)

O site é estático, então o GitHub Pages publica direto da branch, sem build:

1. No repositório, vá em **Settings → Pages**.
2. Em **Build and deployment**, escolha **Source: Deploy from a branch**, branch **main**, pasta **/ (root)** e salve.
3. Em 1 ou 2 minutos o site fica no ar em `https://caiqueduart.github.io/natal-labtime/`.

O arquivo `.nojekyll` (vazio) avisa o GitHub Pages para **não** processar o site com o Jekyll, o gerador de sites que ele usa por padrão. Sem ele, o GitHub poderia ignorar arquivos ou demorar mais para publicar; com ele, os arquivos são servidos exatamente como estão. A cada push na `main`, o site é atualizado sozinho.
