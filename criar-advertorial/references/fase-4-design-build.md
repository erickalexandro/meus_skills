# Fase 4 — Design, imagens e build

## Princípio

Advertorial não é landing page bonita. É uma **matéria simples, clara e escaneável**, desenhada para quem vai ler: no caso padrão (público 45+, celular, às vezes de madrugada), texto grande, contraste alto, blocos curtos e zero enfeite que distraia. **Filtro de toda decisão visual:** *um senhor de 65 anos, de óculos, no celular, na cama às 3h da manhã, consegue escanear isto com conforto?*

## Design system padrão (aprovado pelo Erick)

É o do template (`assets/template/assets/css/`), copiado do advertorial de referência da marca ("Healthy Digest"):

| Token | Valor |
|---|---|
| Fontes | **Poppins** (corpo) + **Bitter** (títulos, 800) via Google Fonts |
| Cor de título/marca | azul-marinho `#0C2E5C` |
| CTA | verde `#479C1A` (hover `#3B8215`), fonte 18px peso 800, raio 8px |
| Marca-texto do sub-headline | amarelo `#FDCC5E` |
| Estrelas | laranja `#FF8C00` |
| Fundo | branco; blocos de apoio `#F2F5FC` (azul claro) e `#f0fae8` (verde claro) |
| Corpo | 16,5px celular / 17px desktop, entrelinha 1,5, cor `#333` |

Componentes (tipos de bloco do `data.js`): barra azul do veículo + faixa "Advertorial" · h1 + sub com marca-texto · byline com foto e linha azul · lead com 1º parágrafo em negrito · citação com borda azul · caixa **teaser** (azul, setas) · caixa **auto-identificação/aviso** (amarela tracejada vermelha) · checklist verde / X vermelho · passos numerados · caixas de opção (último caminho em verde) · timeline · **depoimento em grade (imagem menor à esquerda, texto ao lado, título curto)** · comparação · tabela de bundles · painel de garantia com **selo** · CTA (com caixa e título opcional, selo opcional) · assinatura · P.S. · comentários estilo Facebook · rodapé legal · barra fixa de CTA.

**Mudar o design só se o público pedir** (ex.: público masculino jovem, nicho de finanças) ou se o Erick pedir. Nesse caso registre a variação no playbook com o motivo.

## Regras de imagem (vieram de erro e acerto reais)

1. **Uma imagem a cada ~200 palavras.** O build mostra a proporção.
2. **Imagem de topo pesa igual à headline.** Tipos fortes: ligada à história, antes, depois, problema cru, rosto que dá credibilidade, produto na mão (este só quando o ad já mostrou o produto).
3. **Produto não aparece antes do mecanismo.** Se a única foto da narradora mostra o pote, **recorte** (ffmpeg `crop`) para o rosto no topo e use a foto inteira na revelação do produto.
4. **Nunca legendar foto de outra pessoa como se fosse a narradora.** Se o acervo só tem outra mulher na cena da história, use imagem sem rosto (mãos, objeto, bancada) ou sem imagem. Rosto inconsistente derruba credibilidade.
5. **Foto de celular > banco de imagem.** Imperfeito e real converte mais que perfeito e falso.
6. **Frasco no contexto** (na mão, no criado-mudo, na bancada), nunca sozinho num fundo.
7. **Depoimentos**: antes/depois em grade com o texto ao lado; título curto por card; disclaimer de resultados abaixo.
8. **Selos**: garantia com o selo ao lado do número certo de dias. Se só existir o selo com outro número, **gere a variação** a partir do mesmo selo (HTML com o selo de fundo + remendo escuro + número em gradiente dourado, screenshot no Edge com `--default-background-color=00000000` para manter transparência) e salve também no acervo do projeto.
9. **Camadas baratas antes de trocar a foto**: selo "visto em", foto de autoridade em círculo, X/check, zoom num detalhe, GIF no topo.
10. Diagramas simples ajudam o mecanismo (queimar × estocar, 3 passos, os caminhos que falham).
11. Converter tudo pra **webp, largura máx. 760px** (`ffmpeg -i in -vf "scale='min(760,iw)':-2" -q:v 78 out.webp`). Selo/PNG com transparência: `-pix_fmt yuva420p`.

Na máquina do Erick: ffmpeg arm64 em `C:\Users\alexa\OND-organic\_tools\ffmpeg\ffmpeg-master-latest-winarm64-gpl\bin\`; webp animado precisa de `-frames:v 1 -update 1`.

## Arquitetura do projeto (ECOTOKEN)

Copie `assets/template/` para a pasta de trabalho do projeto (ex.: `C:\Users\alexa\OND-organic\_trabalho\adv-<peça>\`):

```
<projeto>/
  CLAUDE.md                 (copie o modelo abaixo e ajuste)
  build.mjs                 (gera o HTML único)
  tools/shot.mjs            (screenshots de conferência)
  assets/css/base.css       (tokens e tipografia)
  assets/css/layout.css     (barra do veículo, largura, byline, barra fixa)
  assets/css/components.css (todos os blocos)
  assets/js/data.js         (TODA a copy — copie de data.example.js)
  assets/js/render.mjs      (bloco → HTML)
  assets/img/*.webp         (nome do arquivo = chave usada no data.js)
```

- Texto/preço/ordem → só `data.js`. Visual → só CSS. Novo tipo de bloco → `render.mjs` + CSS (e documente o tipo no `data.example.js` da skill).
- **Nunca editar o HTML final na mão.** Edições pontuais com `Edit`, nunca reescrever arquivo inteiro sem necessidade.
- Build: `OUT="C:/Users/alexa/Downloads/Entregável V<n> - <peça>.html" node build.mjs` → HTML único com CSS inline e imagens base64 (fácil de subir em qualquer host). O build avisa imagem citada que não existe e mostra palavras/imagens.

Modelo de `CLAUDE.md` do projeto:

```
# Advertorial <peça> · <produto>
Projeto ECOTOKEN gerado pela skill criar-advertorial. Nunca editar o HTML final na mão.
Copy/preço/ordem: assets/js/data.js · Visual: assets/css/* · Estrutura de bloco: assets/js/render.mjs · Imagens: assets/img
Build: OUT="<caminho do entregável>" node build.mjs · Conferência: node tools/shot.mjs "<entregável>"
Regras da peça: <linhas vermelhas de compliance> · <garantia> · <checkout>
```

## Conferência visual (obrigatória antes de entregar)

`node tools/shot.mjs "<entregável.html>"` → fatias de 2200px da página renderizada em 390px de largura, em `_shots/`. Leia as fatias (uma por vez, só as necessárias) e confira:
- topo cabe e a primeira linha do corpo aparece;
- nenhuma imagem mostra o produto antes da hora; rostos consistentes;
- caixas, listas e depoimentos legíveis; selo com fundo transparente;
- CTAs, preço e garantia claros; comentários com cara de comentário;
- nada cortado na lateral.

Por que o iframe no script: o Edge headless desta máquina aplica um fator ~1,26 na largura da janela e corta a lateral; renderizar dentro de um iframe de largura fixa resolve.

## Imagens novas: formato, quantidade e geração (aprendido na v2.2 da 1ª peça)

- **Formato:** só **horizontal (3:2 ou 16:9)** ou **quadrado (1:1)** para o que merece destaque (antes/depois da narradora, encruzilhada). **Nunca vertical.** No `data.js`, `sq: true` centraliza e limita a largura da quadrada.
- **Poucas e estratégicas:** imagem nova só onde ela faz a pessoa **viver a cena**. Os momentos de trama (vergonha com plateia, fundo do poço, descoberta), a prova pessoal e a encruzilhada. O resto é diagrama, produto ou nada.
- **Encruzilhada ("two versions")**: imagem dividida com a **cor contando a história**. Lado frio e dessaturado = a vida se não agir (mesma pessoa, sozinha, fora da foto). Lado quente e dourado = a vida com a solução (dentro da foto, com a família).
- **Hero** com contraste que combine com a headline (se a headline é dor, o hero não sorri).
- **Oferta clara sem excesso:**
  - card de comparação com a **foto do concorrente** e a **foto do produto**, preço por mês **e por dia**;
  - bundles com **miniatura do pote + quantidade (×2/×4/×6) + total**;
  - selo de garantia no painel e no último CTA, sem repetir colado.
- **Consistência do avatar:** anexar as fotos reais da narradora como referência de identidade e colar um **bloco fixo de consistência** em todo prompt (idade, cabelo, rosto, estilo foto de iPhone, cenário da casa, sem texto). Para "antes", descrever a mesma mulher mais pesada. Descartar qualquer imagem com rosto divergente, mãos erradas ou texto deformado.
- **Geração:** via ChatGPT no navegador. Se o navegador não estiver controlável na sessão, escreva o **pacote de prompts** (arquivo no Workspace com nome exato de cada arquivo, formato, onde entra e o que precisa fazer sentir) e peça ao Erick para salvar em `assets/img/_novas/`. Depois `node tools/prep-img.mjs` converte para webp leve.
- **Imagem que ainda não existe não quebra a página:** o render pula o bloco. `ifMissing: "<chave>"` faz um placeholder sumir sozinho quando a imagem definitiva chegar.
