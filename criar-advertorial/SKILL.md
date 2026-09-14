---
name: criar-advertorial
description: "Cria, reescreve ou melhora advertoriais de resposta direta (páginas-matéria entre o anúncio e a oferta: personal story, exposé clínico, listicle, amplificador, híbrido) do zero até o HTML final pronto pra subir — pesquisa profunda de produto/público/mercado/avatar, estratégia (consciência, framework, categoria, ângulo, nome do vilão/mecanismo), copy bloco a bloco, design simples e legível pro público, imagens e build em arquitetura ecotoken. Use SEMPRE que o Erick pedir para escrever, refazer, adaptar para outro avatar/ângulo, revisar com checklist ou melhorar um advertorial / 'ADV' / página de pré-venda / native ad page, mesmo que ele não diga a palavra 'skill'. Não é a skill para o anúncio em si (use copywriting-para-criativos) nem para gerar só bullets (use gerador-de-bullets, que esta skill pode chamar no meio)."
---

# Criar advertorial

Processo validado na prática para advertoriais que pré-vendem: a página constrói a crença que a oferta assume que já existe. **O advertorial não é um texto, é uma estrutura preenchida com pesquisa** — por isso a maior parte do trabalho vem antes da escrita.

Esta skill é o **processo + o template técnico**. O **conhecimento** (masterclass de advertorial, peças dissecadas, checklist, aprendizados) mora no segundo cérebro do Erick e cresce com o tempo. A skill diz o que ler e quando.

## Antes de tudo (sempre)

1. Leia `references/mapa-do-conhecimento.md` — onde está cada coisa e o que ler em cada fase.
2. Leia **inteiros** no vault: o **playbook de aprendizados** e o **hub** (`Copy para advertorial Masterclass.md`, com os 15 princípios e o checklist). As notas longas da masterclass (Parte 1 e Parte 2) só por seção, sob demanda.
3. Veja se o projeto já tem estado no Claude Workspace (skill `workspace-e-memoria`) — pode ser continuação de uma peça.

## O processo em 5 fases

| Fase | O que sai | Referência |
|---|---|---|
| **1. Pesquisa profunda** — produto/oferta, público e mercado, VOC, avatar de conteúdo (quem fala), anúncio de entrada, peças existentes, inventário visual | **Brief** + inventário de imagens (salvos no Workspace) | `references/fase-1-pesquisa.md` |
| **2. Estratégia** — consciência → framework → categoria → ângulo (razão de compra, família, lente) → big idea e nomes chiclete (vilão contável + mecanismo) → ordem dos blocos → oferta → plano de imagens → 25–30 headlines | **Ficha da peça** (mostrar ao Erick em ~12 linhas e seguir) | `references/fase-2-estrategia.md` |
| **3. Escrita** — copy direto no `data.js`, bloco a bloco, com a emoção de cada bloco, fascinações, compliance como regra dura | `assets/js/data.js` completo | `references/fase-3-escrita.md` |
| **4. Design, imagens e build** — design system aprovado, regras de imagem, projeto ecotoken, build do HTML único, conferência visual em 390px | HTML final + screenshots conferidos | `references/fase-4-design-build.md` + `assets/template/` |
| **5. Entrega e evolução** — entrega com diagnóstico e pendências, revisão com checklist, **atualização do playbook e da skill** | Entregável + doc de decisões + aprendizados registrados | `references/fase-5-entrega-e-evolucao.md` |

Pedido parcial? Entre na fase certa: "revisa com o checklist" → fase 5 (mas leia o brief/ficha da peça se existirem); "faz a versão pro avatar 3" → fase 1 focada no avatar novo + fase 2 (troca de ângulo: congela mecanismo/prova/oferta, muda headline, imagem de topo e história/lead); "muda o visual" → fase 4.

## Regras que valem em todas as fases

- **Pesquisa antes de escrita.** Sem brief, não escreva. Sem pesquisa de público, avise em uma linha e use a linguagem dos materiais existentes (persona, briefing, ads, peças da marca).
- **Congruência com o anúncio**: a página continua a história do ad; nomes chiclete já usados na oferta são mantidos.
- **Inegociáveis da estrutura**: não abrir vendendo · nomear o culpado · demolir o que ele já tentou sem culpá-lo · prova em vários pontos · produto só depois do mecanismo · oferta depois de ~60% da página · terminar na vida, não no produto · nenhum link pra outra URL antes da oferta.
- **Compliance do produto é regra dura.** Nunca inventar estudo, número ou prova que não existe; o que for construído (comentários, contadores) é sinalizado ao Erick como decisão dele.
- **Design pensado para quem lê**: simples, claro, escaneável, fundo branco, texto grande; o design system do template é o padrão aprovado.
- **Eficiência (regra central do Erick)**: leia só o necessário, edite cirurgicamente (`data.js` e CSS, nunca o HTML final), confira o visual por fatias, pergunte só o que bloqueia.
- **Honestidade na entrega**: diga o que ficou pendente, o que é inferência e o que precisa de validação (garantia, política, fotos).

## Template técnico

`assets/template/` — `build.mjs` (HTML único com CSS inline e imagens base64), `assets/js/render.mjs` (tipos de bloco), `assets/js/data.example.js` (todos os tipos de bloco documentados), `assets/css/` (design system), `tools/shot.mjs` (screenshots de conferência). Copie a pasta inteira para a pasta de trabalho do projeto e siga a fase 4.

## A skill tem que melhorar com o tempo

Ao fim de cada peça ou rodada de revisão, **sempre**:
1. Registre no **playbook do vault**: a peça no registro, as correções do Erick e a regra que cada uma vira, padrões que funcionaram, erros a não repetir, resultados de teste quando houver.
2. Se o aprendizado muda o **processo**, edite esta skill no clone `C:\Users\alexa\Dev\meus_skills\criar-advertorial\`, anote no histórico abaixo, commit + push, e rode o sync. Nunca editar em `~/.claude/skills`. O repo é público: nada de copy de cliente, link de afiliado ou conteúdo integral de curso aqui.

Detalhes em `references/fase-5-entrega-e-evolucao.md`.

## Histórico de versões

| Versão | Data | O que mudou |
|---|---|---|
| 1.1 | 2026-09-14 | Fase 1 ganha a mecânica de entrada do tráfego (orgânico com palavra-chave: mapear o que o vídeo revelou e escondeu). Fase 4 ganha as regras de imagem nova (só horizontal/quadrada, poucas e estratégicas, encruzilhada com cor, hero coerente com a headline, consistência do avatar, pacote de prompts), oferta clara com foto do produto e do concorrente + preço por dia + miniaturas nos bundles. Template: blocos `faq`, `compare` com imagem, `price` com miniatura, `img` com `sq`/`ifMissing`, imagem ausente pulada, `tools/prep-img.mjs`. |
| 1.0 | 2026-09-14 | Criada a partir do 1º advertorial feito com o processo completo (SlimSoda · AV_001 Jenny · Personal Story / Exposé em peer trust). Inclui a revisão 1 do Erick: visual no design system do ADV1 da marca (Poppins/Bitter, azul #0C2E5C, CTA verde), depoimentos em grade com imagem menor ao lado do texto, selo de garantia na página. **Só um formato testado até aqui** — Listicle, Amplificador, Híbrido e ângulos de autoridade ainda sem peça própria. |
