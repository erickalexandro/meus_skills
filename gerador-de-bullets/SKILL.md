---
name: gerador-de-bullets
description: "Gera bullets e fascinações (as 21 fórmulas clássicas de Clayton Makepeace) em português para corpo de copy, cards, advertorial/VSL e teste de headline. Use sempre que o usuário pedir bullets, fascinações, 'rajada de ganchos pro corpo do texto', 'ângulos pra esse benefício', 'makeover de bullet' (deixar um bullet fraco mais forte), ou quando ele colar um benefício/mecanismo de produto e pedir variações prontas pra usar. NÃO é a skill certa para o hook de abertura de vídeo/anúncio (isso é `gerador-de-hooks`) nem para a estrutura completa de uma Native Sales Letter longa (isso é `escrever-nsl`) — esta skill entra no meio do processo, gerando munição de frases pra alimentar essas duas."
---

# Gerador de Bullets e Fascinações

Baseada no relatório "21 Bullet Secrets" de Clayton Makepeace (tradução e análise completa em `C:\SEGUNDO-CEREBRO\_knowledge\copywriting\21-bullets-fascinacoes-clayton-makepeace.md` no vault, caso precise do material fonte na íntegra ou da análise de como isso cruza com as outras skills). Um bullet/fascinação é uma linha de uma ou duas frases que promete um benefício de um jeito que dá vontade de continuar lendo — a unidade básica que sustenta cards de copy, corpo de advertorial/VSL, deck copy e teste de headline.

## Quando usar e quando não usar

**Use esta skill para:** gerar um lote de bullets/fascinações a partir de um benefício de produto (corpo de copy, cards, seções de VSL, testar qual vira headline).

**Não é esta skill para:**
- O hook de abertura de vídeo (os 2-3 segundos que prendem o scroll) → use `gerador-de-hooks`.
- Montar a Native Sales Letter inteira, com catálogo de ganchos G1-G25, VOC e scripting slot a slot → use `escrever-nsl`. Esta skill pode alimentar o corpo dela com bullets prontos, mas não decide estrutura.
- Roteirizar blocos de vídeo pra avatar falando → isso é `avatar-vsl-video-prompts` / `skill-black-belt`. Bullets gerados aqui podem virar frases dentro de um bloco, mas a skill não formata bloco de vídeo.

Se o pedido do usuário for claramente sobre um desses três casos, direcione pra skill certa em vez de tentar cobrir tudo aqui.

## Input (capture rápido, sem fricção)

Extraia do que o usuário já colou antes de perguntar. Só pergunte o que faltar de verdade, numa linha:

1. **Benefício central** — o que o produto entrega (obrigatório)
2. **Mecanismo** — o "como": o sistema, nutriente, método ou tecnologia por trás do benefício (se o usuário não souber, pergunte ou puxe do que já existe em `_knowledge/business/` ou no pipeline do produto)
3. **Prova/credibilidade** — número, estudo, autoridade, resultado real (se não existir prova real, ver seção "Honestidade radical" abaixo — nunca inventar)
4. **Quantas fórmulas gerar** — padrão é cobrir as 21; se o usuário pedir "só umas 5" ou citar fórmulas específicas ("me dá uns 'o que nunca' e 'verdade'"), respeite o recorte

## O catálogo de 21 fórmulas

A lista completa com exemplo de cada uma está em [references/catalogo-21-formulas.md](references/catalogo-21-formulas.md) — abra esse arquivo antes de gerar, é a referência rápida pra não ter que reconstruir as fórmulas de memória a cada rodada.

Regra de ouro: ataque o mesmo benefício por 2-3 fórmulas diferentes antes de descartar qualquer uma. A variedade entre fórmulas é o que evita a "síndrome do benefício chapado" (bullets todos com a mesma cara, que fazem o leitor começar a escanear em vez de ler).

## O Makeover de 3 passos (aplique em TODO bullet antes de entregar)

Um bullet cru quase sempre sai fraco na primeira tentativa. Antes de colocar na lista final, passe cada um por isto:

1. **Especificidade** — troque número vago por número real ("lucrar mais" vira "lucrar 307%"; "rápido" vira "em 14 dias"). Se não há dado real disponível, não invente — deixe genérico e sinalize (ver honestidade radical).
2. **Mecanismo** — o bullet mostra o "como", não só o "o quê"? Um mecanismo nomeado (o nutriente X, o sistema Y) diferencia o bullet de qualquer promessa genérica do nicho.
3. **Credibilidade ou prazo** — feche com algo que trava a confiança: uma autoridade, um estudo, um prazo específico. É isso que separa "mais um bullet" de um bullet que o leitor não consegue ignorar.

Um bullet que já nasce específico, com mecanismo e prova não precisa de reforço artificial — o objetivo do Makeover é elevar o piso, não inflar todo bullet até ficar artificial.

## Guardrails do vault (não negociáveis, aplique sempre)

- **Nunca use em dash.** Travessão vira hífen simples, com moderação.
- **Nunca cite nome de país específico** em qualquer bullet que vá servir de abertura de anúncio, headline ou CTA — risco de geo-targeting quebrar o delivery americano dos ads. Bullets de meio de copy/corpo têm mais liberdade, mas na dúvida, evite.
- **Voz do avatar, não estrutura de funil exposta.** O rótulo de fórmula (`[Como fazer]`, `[O que nunca]` etc.) é só pra revisão interna do Fernando — nunca aparece no material final que vai pro anúncio, card ou script. Deixe isso claro na entrega.
- **Honestidade radical:** se o benefício não tem prova real disponível (estudo, número, resultado), não fabrique. Gere o bullet com o benefício real e marque `(sem prova disponível — validar antes de usar)` em vez de inventar uma estatística.
- **Português (BR)**, sem emoji a menos que o usuário use primeiro.

## Formato de saída

Agrupe por fórmula, uma linha por bullet, com a etiqueta da fórmula entre colchetes no final (só pra revisão, remover antes de publicar):

```
1. [texto do bullet em português, já passado pelo Makeover] [Fórmula]
2. [texto do bullet] [Fórmula]
...
```

Depois da lista, se algum bullet ficou sem prova real disponível, liste separado em "Precisa validar prova" para o Fernando não esquecer de checar antes de usar.

Se o usuário pedir explicitamente "as 21", cubra as 21 com pelo menos 1 bullet cada. Se pedir "uma rajada" sem número, entregue 15-20 bullets cobrindo pelo menos 8 fórmulas diferentes, priorizando as que melhor servem o benefício central (nem toda fórmula cabe em todo produto — não force uma fórmula "Sneaky"/sonegado num benefício que não tem nenhum elemento de conspiração ou informação escondida, por exemplo).

## Makeover isolado

Se o usuário colar um bullet específico e pedir só pra melhorá-lo ("esse bullet tá fraco, dá um upgrade"), não gere a lista inteira — aplique o Makeover de 3 passos só nele, mostre o antes/depois, e explique em 1 linha o que mudou (especificidade, mecanismo ou credibilidade/prazo).

## Exemplo

**Input do usuário:** "Preciso de bullets pro corpo de um advertorial de um suplemento de sono. Benefício: dorme mais rápido e acorda sem cansaço. Mecanismo: uma combinação de magnésio glicinato com L-teanina que age no sistema nervoso. Prova: estudo mostrando redução de 40% no tempo pra pegar no sono."

**Saída esperada:** lista de 15-20 bullets em português cobrindo fórmulas variadas (Como fazer, O que nunca, Certo/Errado, Alerta, Verdade, Único etc.), cada um já com especificidade + mecanismo (magnésio glicinato + L-teanina) + prova (os 40%) onde fizer sentido, etiquetados por fórmula pra revisão interna, prontos pra virar frases dentro do advertorial ou virar candidatos a headline.
