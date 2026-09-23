---
name: org-modelagem-de-criativos
description: "Use quando o Erick pedir para modelar, escrever, adaptar ou criar copy/roteiro de criativos orgânicos (ORG / OND-organic, SlimSoda) a partir de uma análise, de um criativo do swipe ou de um vídeo de referência — 'modela esse', 'escreve a leva do AV_001', 'faz 5 variações desse criativo', 'sobe no Copy App' — ou quando a skill org-analise-de-criativos entregar um Pacote de modelagem. Não serve para analisar o criativo (org-analise-de-criativos) nem para advertorial."
---

# ORG · Modelagem de criativos orgânicos

Segunda metade da esteira: **Pacote de modelagem → copy EN + PT → Copy App**.
Modelar é **manter o esqueleto validado e trocar o recheio**. O que fez o original performar (gancho, ordem dos elementos, ritmo, formato) fica. O que é do produto dele (mecanismo, receita, promessa, CTA) vira SlimSoda.

## Entrada obrigatória (sem isso, parar e pedir)

1. **Pacote de modelagem** (seção 14 da ficha `AN-<id>`). Se só houver o vídeo ou a nota do swipe, rodar antes a skill `org-analise-de-criativos`.
2. **Briefing** com **avatar + vídeo modelado de referência + ângulo + formato** (regra da operação própria, memória `operacao-propria-ond-nando.md`). O briefing mora no Google Doc do Drive. O que faltar: perguntar em uma mensagem só, com a sugestão do pacote já preenchida pra ele só confirmar.
3. **Nomenclatura**: `SS-<REDE>-AV_XXX-ADS_YYY-V_ZZZ` (`HIB` padrão, `FB`, `IG`). ADS continua a sequência do avatar (ver `ads` no Copy App); V sobe quando o mesmo anúncio ganha variação.

## Antes de escrever (sempre)

1. **Feedback pendente do Copy App**: `ArtifactData query` em `feedback` com `status == "novo"`. Aplicar o que vale e marcar `lido` depois de tratar. Feedback que se repete vira regra nesta skill (ver Evolução).
2. **Regras**: `references/regras-e-qa.md` inteiro + `Aprendizado de copy — SlimSoda.md` (seções Regras ativas e Padrões validados) no vault.
3. **Vocabulário da VSL**: briefing 2.0, seções 6.2 (nomes chiclete) e 12 (vocabulário que o ad planta). Um nome por conceito, nada de mecanismo paralelo.
4. **Avatar**: `ArtifactData list avatars` + nota do avatar no vault. A voz e a situação de vida do avatar mandam na escolha de palavras.

## Fluxo

| # | Passo | Saída |
|---|---|---|
| 1 | Confirmar entrada (pacote + briefing + nomenclatura) | ficha de 6 linhas pro Erick: avatar · referência · ângulo · formato · palavra-chave · nº de anúncios |
| 2 | Mapear o esqueleto: cada bloco do pacote vira um slot com função e tempo-alvo | tabela de slots |
| 3 | Escrever o **EN primeiro** (é o que vai ao ar), slot a slot, na voz do avatar | hook, body, CTA final |
| 4 | Dimensionar tempo: ~2,5 palavras/s falado. Body até o CTA 1 com ~45–60 palavras, pro CTA 1 cair entre 20 e 30 s | contagem por bloco |
| 5 | Escrever o **PT** (tradução fiel, pra revisão do Erick; não é outra copy) | hookPT, bodyPT, ctaFinalPT |
| 6 | **Primary text** (legenda do post): 1–2 linhas + palavra-chave + emoji de seta | primaryTextEN/PT |
| 7 | **QA**: checklist de `references/regras-e-qa.md`. Qualquer item falhando, reescrever antes de subir | checklist ok |
| 8 | **Subir no Copy App** (ver `references/copy-app.md`) | docs em `levas` e `ads` |
| 9 | Entregar: link do anúncio no app + tabela curta (nomenclatura · gancho · palavra-chave · o que foi mantido × trocado do original) | resposta ao Erick |

Variações: para "N variações", manter o body e variar o **gancho** primeiro (3 ganchos por anúncio é o padrão). Depois varie a abertura segmentada e só então o formato. Nunca mexer no coração do que está escalando.

## O que cada campo recebe

| Campo | Conteúdo |
|---|---|
| `hookEN/PT` | Só o gancho falado (1 frase, 1 ideia) + indicação do gancho visual entre colchetes na linha de baixo |
| `bodyEN/PT` | Da frase de aterrissagem até antes do CTA final, **com o CTA 1 dentro**. Indicações de B-roll/tela entre colchetes `[ ]` em linha própria |
| `ctaFinalEN/PT` | CTA 2 completo: follow + palavra-chave + o que ela ganha (o vídeo) + urgência/escassez + quebra de objeção |
| `primaryTextEN/PT` | Legenda do post |
| `avatarUsado` | Nome do avatar (obrigatório na página MIX) |
| `videoModeladoUrl` | Link do vídeo de referência (o do swipe ou o que o Erick mandou) |

## Erros comuns

| Erro | Correção |
|---|---|
| Reescrever o gancho validado "pra ficar melhor" | O gancho do original é a variável mais validada: manter e adaptar só o necessário; criar alternativas como variação, não como substituto |
| Copiar o mecanismo do original (ex.: "toxinas", uso tópico) | Mecanismo é sempre o da VSL (intestino ácido, células que adormeceram, a versão correta) |
| Mostrar ou citar o SlimSoda | O ad vende **o vídeo**, não o produto |
| Benefício poético de IA ("sentir-se leve de novo") | Benefício cru e visualizável (a calça que fecha, o marido perguntando) |
| Só um CTA no fim | CTA duplo sempre |
| Palavra-chave longa ou em duas palavras | UMA palavra curta |
| Subir sem briefing completo | Parar e pedir: avatar, referência, ângulo e formato |

## Evolução

Esta skill melhora com o **feedback do Copy App** e com métricas. Critério: correção que apareceu em 2 anúncios ou que o Erick escreveu em tom de regra ("sempre", "nunca") → propor a regra, e com o ok dele adicionar em `references/regras-e-qa.md` (seção Regras aprendidas, com data e origem). Commitar no repo `erickalexandro/meus_skills` e copiar pra `~/.claude/skills/`.
