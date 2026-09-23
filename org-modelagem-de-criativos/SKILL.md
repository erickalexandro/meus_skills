---
name: org-modelagem-de-criativos
description: "Use quando o Erick pedir para modelar, escrever, adaptar ou criar copy/roteiro de criativos orgânicos (ORG / OND-organic, SlimSoda) a partir de uma análise, de um criativo do swipe ou de um vídeo de referência — 'modela esse', 'modela 5 do swipe pro avatar 1', 'escreve a leva do AV_001', 'faz variações desse criativo', 'sobe no Copy App' — ou quando a skill org-analise-de-criativos entregar um Pacote de modelagem. Não serve para analisar o criativo (org-analise-de-criativos) nem para advertorial."
---

# ORG · Modelagem de criativos orgânicos

Segunda metade da esteira: **Pacote de modelagem → copy EN + PT + briefing → Copy App → editor (Motion Flow)**.
Modelar é **manter o esqueleto validado e trocar o recheio**. Fica o que fez o original performar: gancho, ordem dos elementos, ritmo, tipo de cena e **tamanho**. O que é do produto dele (mecanismo, receita, promessa, CTA) vira SlimSoda.

A copy vira vídeo no Motion Flow **em cima do vídeo de referência**. Por isso tamanho e contexto de cena são regra dura: `references/regra-do-editor.md`.

## Entrada obrigatória (sem isso, parar e pedir)

1. **Pacote de modelagem** (seção 14 da ficha `AN-<id>`). Sem ele, rodar antes a `org-analise-de-criativos`; numa leva, uma ficha por referência.
2. **Briefing mínimo**: **avatar + vídeo de referência + ângulo + formato** (memória `operacao-propria-ond-nando.md`).
3. **Tempo médio de vídeo desejado para a leva.** Se o Erick não disse, **perguntar** junto com o resto que faltar, numa mensagem só (hoje o padrão é curto, 30–70 s; vai crescer). O tempo decide quais referências servem: a copy tem o tamanho da referência, e o teto é 1 min 36 s.
4. **Nomenclatura**: `SS-<REDE>-AV_XXX-ADS_YYY-V_ZZZ` (`HIB` padrão, `FB`, `IG`). ADS continua a sequência do avatar (conferir `ads` no Copy App); V sobe quando o mesmo anúncio ganha variação.

Quando o Erick manda "escolhe do swipe", a escolha de referência é sua: filtrar pelo avatar (arquétipo, cenário do kit), pela faixa de tempo, por nicho próximo de emagrecimento e pela métrica, e variar o ângulo entre os anúncios da leva.

## Antes de escrever (sempre): o ciclo de feedback

O Erick ensina esta skill de três jeitos. Os três são lidos **antes** de escrever qualquer leva:
1. **Feedback escrito no Copy App** (campo "Feedback desta copy" em cada anúncio + aba `#feedback`): `ArtifactData query` em `feedback` com `status == "novo"`.
2. **Edições que ele fez direto na copy**: `ArtifactData query` em `ads` com `out_dir` numa pasta do worktree, depois `node scripts/diff-edicoes.js <snapshot> <pasta>/ads` (versão acima da que você subiu = mexido por ele). Depois de processar, regravar o snapshot com `node scripts/make-snapshots.js <pasta>/ads <pasta de snapshots do vault>`. Detalhe: comparar com o snapshot da leva (`Claude Workspace/OND-organic/Copy App — snapshots/<levaId>.json` no vault) e entender o que mudou e por quê.
3. **Feedback no chat.**

Para cada item: aplicar na leva atual; se é regra (repetiu em 2 anúncios, ou veio em tom de regra, ou corrige a estrutura), registrar em `references/regras-e-qa.md` › Regras aprendidas (`R0N · escopo · regra · origem`), commitar a skill e recopiar pra `~/.claude/skills/`. Marcar o feedback como `lido`. Na entrega, dizer quais regras novas entraram.

Depois:
1. **Regras**: `references/regra-do-editor.md` e `references/regras-e-qa.md` inteiros (as Regras aprendidas prevalecem) + `Aprendizado de copy — SlimSoda.md` (Regras ativas) no vault.
2. **Vocabulário da VSL**: briefing 2.0, seções 6.2 (nomes chiclete), 8.1 (Won't Tell), 8.6 (VOC), 11 (consciência) e 12 (o que o ad planta). Um nome por conceito.
2b. **Argumentos e provas (R05)**: `references/banco-de-argumentos.md`. Escolha um argumento central e uma prova **diferentes** pra cada anúncio da leva, puxando da **Biblioteca de cartas** do vault (`Swipe/Cartas antigas/Nichos/Emagrecimento/`: headlines, bullets, analogias, provas sociais e de mídia) e da seção "Ainda não usados". Pra fascinations, carregue a skill `gerador-de-bullets`.
3. **Avatar**: `avatars` no Copy App + `avatars` no Supabase do OPS-organic (projeto `czvscrixfrksgeucecdc`: `code, name, age, archetype`; as imagens do kit ficam em `kit->'_imageUrl'`, base64, então salvar em arquivo e abrir pra ver cenário e visual). A voz e a situação de vida do avatar mandam na escolha das palavras.

## Fluxo por anúncio

| # | Passo | Saída |
|---|---|---|
| 1 | Contar os caracteres da fala da referência e definir o alvo: consciente = 0 a +5%; média = até +12%; pouco consciente = até +20% | `refChars` + faixa-alvo |
| 2 | **Numerar os blocos da referência** (cada frase/ideia com função própria) e mapear o que aparece em cada um | lista de blocos |
| 3 | Escrever o **EN bloco a bloco**: mesmo nº de blocos, mesma ordem, mesma função; cada frase casa com a cena daquele bloco; máx. 24 palavras por cena (bloco longo vira 2 cenas) | hook, body, CTA final |
| 4 | Encaixar a persuasão **dentro** dos blocos (abaixo); decidir o CTA pela duração estimada (≤ 50 s: só final; > 50 s: meio + final) | — |
| 5 | Contar de novo. Passou do alvo: cortar. Faltou: completar com causa/qualificação, nunca com enfeite | contagem final |
| 6 | **PT**: tradução fiel pra revisão (não é outra copy) | hookPT, bodyPT, ctaFinalPT |
| 7 | **Primary text** no molde da R04: hook de 1 linha → "Comment RECIPE below and follow me to see:" → 3 fascinations ✅ (skill `gerador-de-bullets`, fórmulas diferentes, inspiração na Biblioteca de cartas) | primaryTextEN/PT |
| 8 | **Briefing** completo (modelo abaixo) + **infos da copy**: `angulo` (#N de `references/angulos-numerados.md`), `formato`, `publicoFatia`, `ctaKeyword` | campos |
| 9 | **QA**: `node scripts/check-leva.js <copies.json>` (tamanho, cenas, palavras, símbolos, 1:36, espelho de blocos, regra do CTA) + checklist de copy de `regras-e-qa.md`. Qualquer falha, reescrever | ok |
| 10 | Subir no Copy App (`references/copy-app.md`), salvar o **snapshot** da leva no vault, **criar os cards em Roteiro no pipeline do OPS-organic** (mesma referência) e entregar: tabela nomenclatura · referência · chars ref × copy (+%) · CTA no meio sim/não · gancho · link | resposta |

## Persuasão dentro do espelho de blocos

A arquitetura é a da referência (R02). Dentro dela, cada bloco recebe o recheio mais forte possível:
- **Hook:** o gancho validado da referência, adaptado só no necessário (1 ideia, qualifica pela situação vivida).
- **Blocos de demonstração/receita:** a receita vira o bicarbonato; mantêm o mesmo passo a passo e o mesmo tipo de cena.
- **Bloco de benefício:** funcional + sentimental, cru (a calça que fecha, os netos tirando foto).
- **Bloco de mecanismo:** vocabulário da VSL (ácido no intestino, células que adormeceram, a versão da internet dura poucas horas).
- **Bloco de autoridade/inimigo/transparência:** mantém a função (tradição, "o médico nunca contou", "a maioria erra a quantidade").
- **CTA:** pela duração (R01). Até 50 s, o CTA fica só no bloco de CTA da referência, com a objeção/isca dentro dele. Acima de 50 s, o CTA do meio fecha um bloco perto dos 20–30 s e a fascination/objeção entra no bloco seguinte.
Se não couber, cortar palavras dentro do bloco, nunca apagar um bloco nem estourar o tamanho.

## O que cada campo recebe

| Campo | Conteúdo |
|---|---|
| `hookEN/PT` | Só o gancho falado |
| `bodyEN/PT` | Da aterrissagem até antes do CTA final, com o CTA 1 dentro. **Só fala**: sem colchetes, sem direção de cena |
| `ctaFinalEN/PT` | O fecho falado |
| `primaryTextEN/PT` | Legenda do post no molde da R04 (hook · "Comment RECIPE below and follow me to see:" · 3 ✅) |
| `refChars` | Número: caracteres da fala da referência (a página calcula o %) |
| `ctaKeyword` | Palavra-chave comentada (RECIPE), mostrada na caixa Edição |
| `angulo` · `formato` · `publicoFatia` | Caixa "Informações da copy": `#N Nome (secundário: #N Nome)` · formato da Biblioteca + cena · quem, idade, situação vivida, o que já tentou |
| `briefing` | Texto em PT pro Erick e pro editor (modelo abaixo) |
| `avatarUsado` · `videoModeladoUrl` | Nome do avatar · link do vídeo de referência |

## Modelo do briefing (campo `briefing`)

```
AVATAR: <nome, código, idade, arquétipo> · cenário: <do kit>
REFERÊNCIA: <id do swipe> · <link> · <duração> · <métricas>
ÂNGULO: <ângulo + big idea em uma frase>
FORMATO: <tipo de vídeo> · público/consciência: <nível 1–5 e por quê>
TAMANHO: referência <N> caracteres · copy <M> (+X%) · justificativa se passou
ESTRUTURA INVISÍVEL: <em uma linha>
O QUE FOI MANTIDO DA REFERÊNCIA: <gancho, sequência, tipo de cena>
O QUE FOI TROCADO: <mecanismo, receita, promessa, CTA>
MAPA DE CENAS (máx. 12): 
  C1 · <o que a referência mostra> → fala: "<trecho da copy>"
  C2 ...
CTA: RECIPE + follow · CTA 1 na cena <n> · CTA final na cena <n>
CONGRUÊNCIA COM A VSL: <termos plantados>
ALERTAS PRO EDITOR: <o que não mostrar: pote, outra pessoa, ambiente novo; cuidados>
```

## Erros comuns

| Erro | Correção |
|---|---|
| Acrescentar blocos que a referência não tem (aterrissagem, fascination, mecanismo extra) | Espelho de blocos: encaixar dentro dos blocos existentes (R02) |
| CTA no meio em copy curta | Até 50 s, só o CTA final (R01) |
| Copy bem maior que a referência "porque ficou boa" | Cortar até o alvo; o excedente só entra se eleva consciência/qualifica |
| Direção de cena ou colchetes dentro da fala | Fala limpa; cena vai no briefing |
| Números em algarismo, "$", "%", travessão | Por extenso, sem símbolo |
| Frase de 30 palavras | Quebrar: máximo de 24 por cena |
| Copy falando de algo que a referência não mostra | Reescrever o trecho pra casar com a cena daquele momento |
| Reescrever o gancho validado "pra melhorar" | Manter e adaptar; alternativas entram como variação |
| Mecanismo do original ("toxinas", uso tópico como solução) | Mecanismo da VSL |
| Mostrar ou citar o SlimSoda / o pote | O ad vende o vídeo |
| Benefício poético | Benefício cru e visualizável + sentimental |
| Leva sem tempo médio definido | Perguntar antes de escolher as referências |

## Evolução

Feedback do Copy App e métricas viram regra: correção que apareceu em 2 anúncios, ou que o Erick escreveu em tom de regra → propor e, com o ok, registrar em `references/regras-e-qa.md` (Regras aprendidas). Regra de produção nova do editor → `references/regra-do-editor.md`. Commitar no repo `erickalexandro/meus_skills` e copiar pra `~/.claude/skills/`.
