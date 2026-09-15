---
name: revisar-advertorial
description: "Revisão com melhoria de advertoriais de resposta direta: passa a peça pelo checklist das 13 alavancas (ângulo, congruência, topo, lead, big idea, história, prova, mecanismo, objeções, oferta, retenção, credibilidade visual, compliance), dá nota com evidência, prioriza por impacto × buraco × custo, entrega sugestões com copy pronta pra colar, plano de ação e pacote de prompts de imagem, aplica o que o Erick aprovar, faz o QA pré-entrega e entrega (Drive + ClickUp). Use SEMPRE que o Erick pedir para revisar, auditar, analisar, dar nota, otimizar, 'passar o checklist', fazer uma nova rodada de análise, conferir antes de entregar ou revisar o entregável/V1 de outra pessoa de um advertorial / ADV / página de pré-venda — mesmo sem dizer 'skill'. Complementa a criar-advertorial (que escreve e constrói a peça); não é para escrever do zero."
---

# Revisar advertorial

Revisão **com melhoria**: não basta apontar defeito. Cada alavanca sai com nota, evidência, o que melhorou, o que falta e **a correção pronta** (copy para colar, imagem para gerar, decisão para o Erick). A ordem é por **impacto no resultado**, não pela ordem da página.

Esta skill fecha os furos da `criar-advertorial`: aquela escreve e constrói; esta mede, prioriza, corrige, confere e entrega. Numa peça nova, as duas se alternam: criar → revisar (rodada 1) → aplicar → revisar (rodada 2) → QA → entrega.

## Antes de tudo (sempre)

1. No vault (`Skills & knowledge/Copywriting/Advertorial/`), leia **inteiros**:
   - `Checklist de alavancas do advertorial.md` — as perguntas de cada alavanca (fonte da verdade do checklist);
   - `Advertorial — playbook de aprendizados.md` — decisões e correções do Erick que valem para toda peça.
   Masterclass (Parte 1/2) só por seção, se uma alavanca exigir (mapa em `criar-advertorial/references/mapa-do-conhecimento.md`).
2. Leia `references/armadilhas-por-alavanca.md` (desta skill): o que já deu errado na prática em cada alavanca e como corrigir.
3. Contexto da peça no Claude Workspace (`Copy/Advertoriais/`): estado, log, diagnóstico e análises anteriores. Se já existe rodada anterior, a nova é **comparativa**.
4. Contexto da oferta e do avatar (`Projects & context/<projeto>/`): persona, briefing do produto, **mecanismo oficial do avatar/oferta** (se houver, é lei de congruência), outras páginas do mesmo avatar.

## Modos (entre no certo)

| Pedido | Modo | O que sai |
|---|---|---|
| "revisa o V1 / entregável de fulano" | **A. Auditoria de peça de terceiros** | Placar + diagnóstico bloco a bloco + decisão **otimizar × reescrever** (reescrever → chama `criar-advertorial`) |
| "passa o checklist", "analisa de novo", "nova rodada" | **B. Rodada de otimização** | Placar comparativo + análise por alavanca + plano de ação + pacote de imagens |
| "aplica", "faz as revisões" | **C. Aplicação** | Mudanças cirúrgicas no `data.js`/CSS + rebuild + conferência visual |
| "tá pronto?", antes de subir | **D. QA pré-entrega** | `references/qa-pre-entrega.md` inteiro, tudo ✅ ou pendência declarada |
| "sobe / entrega" | **E. Entrega** | Drive + ClickUp + log (ver QA, seção Entrega) |
| peça já no ar com métricas | **F. Otimização com dado** | Hipótese por alavanca, 1 variável por teste, ordem lead → topo → sub-headlines → fechamento |

Processo detalhado, fórmulas e formatos de saída: `references/processo-de-revisao.md`.

## Resumo do processo (modo B, o mais comum)

1. **Ler como o leitor lê**: build atual renderizado em 390px (fatias do `tools/shot.mjs`), escaneando, antes de abrir o checklist. Anote a primeira impressão em 3 linhas.
2. **Premissas escritas**: de onde vem o tráfego e o que ele já viu (padrão geral dos criativos, nunca um roteiro único), nível de consciência de quem clica, mecanismo oficial, restrições do briefing.
3. **Nota 0–10 nas 13 alavancas**, cada nota com evidência (trecho ou print). Rubrica e pesos no processo.
4. **Priorizar**: `prioridade = peso de impacto × (10 − nota) ÷ custo`. Compliance não entra na conta: é trava.
5. **Analisar uma alavanca de cada vez, em ordem de prioridade**: melhorou (se houver rodada anterior) · ainda falta · sugestões com copy pronta.
6. **Plano de ação** numerado (ação · alavancas · depende de quem) + **pacote de prompts de imagem** quando faltar imagem.
7. Salvar a análise no Workspace (`<peça> — análise por alavanca.md`), resumir no chat, esperar o Erick aprovar o que aplicar.

## Regras que valem sempre

- **Não trocar o que o Erick decidiu** (headline mantida, mecanismo oficial, visual aprovado). Alternativas entram como **finalistas de teste A/B**, não como substituição.
- **Congruência sem amarrar a um criativo**: a página serve de pouso para muitos anúncios; nunca presumir uma fala de um roteiro específico.
- **Mecanismo oficial do avatar vence nome inventado**: se o avatar tem outras páginas com um mecanismo definido, a revisão alinha a peça a ele em vez de criar vilão novo.
- **Toda sugestão testável e específica**: copy exata, onde entra, por quê. Nada de "melhorar o lead".
- **Nunca inventar prova**. Prova construída (comentários, contadores) e alegações em zona cinza são **decisão do Erick**, listadas na alavanca 13.
- **Eficiência**: ler só o necessário, editar cirurgicamente, conferir por fatias, uma rodada completa em vez de idas e vindas.

## A skill tem que melhorar com o tempo

Ao fim de cada rodada ou entrega:
1. **Playbook no vault** — cada correção do Erick vira linha em "Correções do Erick → regra"; erro cometido vai para "Erros a não repetir"; peça atualizada no registro (nota por rodada quando houver).
2. **Esta skill** — se a correção é um padrão de revisão (armadilha nova, item de QA, formato de saída), acrescente em `references/armadilhas-por-alavanca.md` ou `references/qa-pre-entrega.md`, registre no histórico abaixo, commit + push no clone `C:\Users\alexa\Dev\meus_skills\` e rode `bash "C:/Users/alexa/.claude/scripts/sync-skills.sh"`. Nunca editar em `~/.claude/skills`. Repo público: nada de copy de cliente, link de afiliado, IDs internos ou conteúdo integral de curso — isso fica no vault.
3. Se a pergunta do checklist mudou (item novo ou superado), edite a nota do checklist no vault, não uma cópia aqui.

## Histórico de versões

| Versão | Data | O que mudou |
|---|---|---|
| 1.0 | 2026-09-14 | Criada a partir das 2 rodadas de checklist e das revisões finais do 1º advertorial feito com o processo completo (suplemento de emagrecimento, narradora 50+ ex-usuária de injeção, Personal Story/Exposé em peer trust; nota ~6,3 → ~7,4 → entregue). Inclui modos A–F, fórmula de prioridade, formatos de saída aprovados, armadilhas por alavanca e QA pré-entrega com o fluxo Drive + ClickUp. |
