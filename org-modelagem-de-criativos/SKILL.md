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

## Antes de escrever (sempre)

1. **Feedback pendente do Copy App**: `ArtifactData query` em `feedback` com `status == "novo"`. Aplicar e marcar `lido`.
2. **Regras**: `references/regra-do-editor.md` e `references/regras-e-qa.md` inteiros + `Aprendizado de copy — SlimSoda.md` (Regras ativas) no vault.
3. **Vocabulário da VSL**: briefing 2.0, seções 6.2 (nomes chiclete), 8.6 (VOC), 11 (consciência) e 12 (o que o ad planta). Um nome por conceito.
4. **Avatar**: `avatars` no Copy App + `avatars` no Supabase do OPS-organic (projeto `czvscrixfrksgeucecdc`: `code, name, age, archetype`; as imagens do kit ficam em `kit->'_imageUrl'`, base64, então salvar em arquivo e abrir pra ver cenário e visual). A voz e a situação de vida do avatar mandam na escolha das palavras.

## Fluxo por anúncio

| # | Passo | Saída |
|---|---|---|
| 1 | Contar os caracteres da fala da referência e definir o alvo: consciente = 0 a +5%; pouco consciente = até +20% | `refChars` + faixa-alvo |
| 2 | Mapear as cenas da referência (máx. 12), cada uma com o que aparece e a função | mapa de cenas |
| 3 | Escrever o **EN** cena a cena: cada frase casa com o que a referência mostra naquele trecho, máx. 24 palavras por cena | hook, body, CTA final |
| 4 | Aplicar a estrutura de persuasão (abaixo) dentro do tamanho | — |
| 5 | Contar de novo. Passou do alvo: cortar. Faltou: completar com causa/qualificação, nunca com enfeite | contagem final |
| 6 | **PT**: tradução fiel pra revisão (não é outra copy) | hookPT, bodyPT, ctaFinalPT |
| 7 | **Primary text** (legenda do post): 1–2 linhas + RECIPE | primaryTextEN/PT |
| 8 | **Briefing** completo (modelo abaixo) | `briefing` |
| 9 | **QA**: checklist do editor + checklist de copy. Qualquer falha, reescrever | ok |
| 10 | Subir no Copy App (`references/copy-app.md`) e entregar: tabela nomenclatura · referência · chars ref × copy (+%) · gancho · link | resposta |

## Estrutura de persuasão dentro do tamanho

Hook (1 frase, 1 ideia, gancho validado da referência adaptado) → **frase de aterrissagem** voltada pra ela → dor/situação vivida → benefício **funcional + sentimental** (cru, visualizável) → **CTA 1 adaptado ao ângulo** (curto; nos vídeos ≥ 40 s, perto dos 20–30 s) → **fascination + quebra de objeção** → virada/mecanismo com o vocabulário da VSL (a versão da internet × a correta, o ingrediente que falta, intestino ácido, células que adormeceram) → **CTA final**: "comment RECIPE and follow me" + o que ela ganha (o vídeo) + urgência leve.
Referência curta demais pra tudo isso: priorizar hook, aterrissagem, benefício, CTA, fascination/objeção; cortar o que não cabe; nunca estourar o tamanho.

## O que cada campo recebe

| Campo | Conteúdo |
|---|---|
| `hookEN/PT` | Só o gancho falado |
| `bodyEN/PT` | Da aterrissagem até antes do CTA final, com o CTA 1 dentro. **Só fala**: sem colchetes, sem direção de cena |
| `ctaFinalEN/PT` | O fecho falado |
| `primaryTextEN/PT` | Legenda do post |
| `refChars` | Número: caracteres da fala da referência (a página calcula o %) |
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
