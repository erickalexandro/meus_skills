# Regras da OND e QA antes de subir

Fonte: memórias `regras-de-copy-ond.md` e `compliance-slimsoda-nao-e-regra-da-ond.md`, `Revisão de ads — erros comuns e correções.md`, `Blueprint da operação orgânica.md`, briefing 2.0 e o feedback do Erick (seção Regras aprendidas, que **prevalece** sobre as fixas quando conflitar). Se o vault mudar, vale o vault.

## Regras fixas

0. **Regra do editor manda no tamanho** (`regra-do-editor.md`): caracteres da copy = da referência (até +20% se o público é pouco consciente), máx. 12 cenas de até 24 palavras, até 1:36, só fala limpa.
1. **Espelho de blocos (R02).** A copy tem **os mesmos blocos da referência, na mesma ordem e com a mesma função** (hook, receita, ritual, benefício, isca, follow…). Troca-se o recheio de cada bloco, não a arquitetura. As outras regras (benefício sentimental, objeção, mecanismo da VSL) entram **dentro** dos blocos que já existem, não como blocos novos. Se a referência não tem aterrissagem, o primeiro bloco do corpo faz esse papel.
2. **CTA pela duração da copy (R01).**
   - **Até 50 s: só o CTA final**, no bloco de CTA da referência. Sem CTA no meio.
   - **Acima de 50 s: CTA no meio + CTA final.** O do meio é curto, adaptado ao ângulo, colado no fim de um bloco perto dos 20–30 s (*"If you want my exact recipe, comment RECIPE and follow me."*). Logo depois vem **fascination + quebra de objeção**, no bloco seguinte.
   - **CTA final:** "comment RECIPE and follow me" + o que ela ganha (o vídeo / a versão completa) + quebra de objeção, se couber no bloco.
3. **Benefício funcional + sentimental** (a calça que fecha + a vergonha que some), nunca poético.
4. **Sem promessa médica** (não diagnosticar, não prometer cura, não falar em tratar doença; nada de diabetes, insulina ou "toxinas").
5. **Congruência com a VSL.** O mecanismo da VSL aparece no texto (bicarbonato, a versão da internet × a correta, o ingrediente que falta, intestino ácido, células que adormeceram), nem que seja como "o ingrediente secreto".
6. **Palavra-chave**: **RECIPE** é o padrão desde 23/09/2026. Trocar só se o Erick pedir. Sempre preencher `ctaKeyword`.
7. **Follow** junto da palavra-chave, senão a DM pode ser bloqueada.
8. **Produto e pote nunca aparecem** (nem na fala, nem na mão, nem no briefing de cena).
9. **Alavancas de compliance** (Ozempic/Mounjaro, número de peso, comparação de custo) podem ser usadas com cautela **na fala do vídeo** quando o ângulo pedir; marcar no briefing quais anúncios usam. **Nunca no título nem na descrição de postagem** (R12): a legenda é lida inteira pelos classificadores e o `post-fields.js` barra.
10. **Infos da copy obrigatórias (R03):** `angulo` com número (`angulos-numerados.md`), `formato` (nome da Biblioteca de formatos + detalhe da cena), `publicoFatia` (quem, idade, situação vivida, o que já tentou).
11. **Título e descrição de postagem (R12).** Todo anúncio leva `fbTitleEn/Pt`, `fbDescEn/Pt`, `ytTitleEn/Pt`, `ytDescEn/Pt`, `fbDescMode` e `ytDescMode`, com os modos alternados e as 3 hashtags da página. O primary text não existe mais. Detalhe: `titulo-descricao-hashtags.md`.

## Checklist de QA (tudo ✅ ou reescreve)

- [ ] Checklist do editor inteiro (`regra-do-editor.md`)?
- [ ] Triagem 🟢🟡🔴 feita e, em 🟡/🔴, DIREÇÃO VISUAL com cenário, figurino, ajuste e no máximo 1 virada (R10)? DIREÇÃO VISUAL, COERÊNCIA DE CENA e ALERTAS não se contradizem?
- [ ] Nomenclatura `SS-PGnn-ADS_YYY-V_ZZZ` com o próximo ADS da página, e referência citada como `SW_nnn` (R11)?
- [ ] Mesmos blocos da referência, mesma ordem, mesma função? (conferir bloco a bloco com o pacote)
- [ ] Copy ≤ 50 s sem CTA no meio? Copy > 50 s com CTA no meio + fascination/objeção logo depois?
- [ ] CTA final com "comment RECIPE and follow me" + o que ela ganha?
- [ ] Benefício funcional + sentimental, cru e visualizável?
- [ ] Nenhuma promessa médica?
- [ ] O bicarbonato / o mecanismo da VSL aparece no texto?
- [ ] Gancho validado da referência mantido (adaptado só no necessário)?
- [ ] Mecanismo explicável numa frase e compatível com quem fala?
- [ ] O que é do produto do original (receita, mecanismo, promessa) foi trocado?
- [ ] `angulo` (#N), `formato`, `publicoFatia` e `ctaKeyword` preenchidos?
- [ ] **R12 completa** (checklist inteiro em `titulo-descricao-hashtags.md`): os 10 campos de postagem preenchidos (`fbTitleEn/Pt`, `fbDescEn/Pt`, `ytTitleEn/Pt`, `ytDescEn/Pt`, `fbDescMode`, `ytDescMode`) · título do YouTube com a palavra-chave primeiro (ideal ≤ 45, nunca > 60) e título do Facebook de curiosidade (≤ 60), diferentes entre si · descrição de até 3 linhas, **sem bullet/✅/fascination** · modos alternados (ímpar: FB `hook_cta` / YT `cta`; par: o contrário) · exatamente 3 hashtags da página na última linha · nada da lista negra · `node scripts/post-fields.js` sem ERRO?
- [ ] Nenhum `primaryEn`/`primaryPt` (primary text) no anúncio novo?
- [ ] Referência recente e com comentário por mil views alto (R14)? Fala do validado mantida e variação medida com `variacao.js` quando pedida (R13)? Variações da mesma família distintas por página e nada repetido (R16)? Entrega avisa se não houve leitura de sinal da página (R17)?
- [ ] Cada anúncio da leva com argumento e prova diferentes (R05), e a tabela "Já usados" atualizada?

## Regras aprendidas (feedback do Copy App, edições na página e métricas)

Formato: `R0N · [escopo] · regra · origem`. Prevalecem sobre as regras fixas.

- **R01 · geral** · CTA no meio **só em copy acima de 50 s**; até 50 s, só o CTA final. · origem: Erick sobre o AD02 da leva 01 do AV_001 (CV-15, ~49 s), 23/09/2026.
- **R02 · geral** · A modelagem **segue os mesmos blocos da referência**; não se acrescenta bloco (aterrissagem, fascination, mecanismo) que a referência não tem, encaixa-se dentro dos blocos existentes. · origem: Erick sobre o AD02, 23/09/2026 (a v1 tinha 9 blocos pra uma referência de 6).
- **R03 · Copy App** · Todo anúncio sobe com ângulo numerado, formato, fatia de público e palavra-chave. · origem: pedido do Erick, 23/09/2026.
- **R04 · primary text** · ~~Curto, sempre neste molde~~ **APOSENTADA DE VEZ pela R12 (substituída em 02/10/2026; aposentadoria confirmada pelo estudo de 03/10/2026). Não gerar primary text em anúncio nenhum; o texto abaixo fica só como registro histórico.** Molde antigo (modelo escrito pelo Erick no ADS_002 do AV_001):
  ```
  <hook de 1 linha: curiosidade, conspiração, permissão ou qualificação do público>

  Comment RECIPE below and follow me to see:

  ✅ <fascination 1>
  ✅ <fascination 2>
  ✅ <fascination 3>
  ```
  3 fascinations fortes e curiosas, que deem vontade de comentar pra descobrir o que está escondido; cada uma de uma fórmula diferente (skill `gerador-de-bullets`), com parênteses de reforço quando couber, e testando ângulos novos a cada leva. Pode usar prova da VSL (Oprah, a doutora). Sem CTA repetido no fim. · origem: feedback no Copy App (ADS_002 do AV_001) + edição do Erick no mesmo anúncio, 23/09/2026.
- **R06 · fascinations (dentro da fala do vídeo; **não** mais na descrição, ver R12)** · Soam como bullets de carta de vendas de verdade, não como resumo de benefício. Antes de escrever, ler bullets reais da coleção **Legendary Bullets Vault** do vault (`Swipe/Cartas antigas/Coleções/`, DOCX no Drive; Mel Martin e Bencivenga primeiro). O que faz um bullet forte:
  - nomear a **frustração pequena e exata** que ela vive ("If your jeans button fine at breakfast and dig into your waist by 3 p.m.…"), não o benefício genérico;
  - um **detalhe estranho e concreto** que obriga a descobrir o resto (Mel Martin: "Asparagus spears should be cut underwater. (Why?)");
  - acusar o **erro que ela comete sem saber** ("Have you been… wrong (and can it really matter?)");
  - **parêntese que vira o jogo** ou dá o golpe final (Bencivenga: "(Beware – a trap!)");
  - contradizer "os especialistas" / "normal depois dos 40";
  - nunca entregar a resposta, nunca inventar número ou estudo.
  Dentro da copy, o mesmo recurso aparece como resultado concreto por dia ("by day three… by day seven…") e como isca no CTA ("the one step most people skip"). · origem: feedback no Copy App ("fascinations muito ruins, fracos, sem curiosidade nem conexão… busque referências de bullets em cartas de vendas"), 23/09/2026.
- **R07 · CTA** · Todo CTA final leva o reason why do follow: *"Comment RECIPE below … and follow me, or I cannot reach you."* · origem: feedback no Copy App (SS-FB-AV_005-ADS_001), 24/09/2026.
- **R08 · coerência de cena** · Os vídeos são gerados por IA (o Gustavo opera as ferramentas), então tudo o que a fala cita tem que aparecer igual na tela. O briefing traz uma seção **"COERÊNCIA DE CENA"** listando o que aparece (ex.: copo de água morna, bicarbonato comum, limão espremido, fatia de gengibre) e o que da referência NÃO pode aparecer (açafrão, mel, coco…). Ambiente e roupa do avatar se adaptam ao formato do vídeo modelado **só pelo campo DIREÇÃO VISUAL** (a roupa padrão é a da foto MASTER; ver R10). · origem: feedback no Copy App (SS-FB-AV_005-ADS_001 e SS-FB-AV_003-ADS_002), 24/09/2026; ajustada em 25/09/2026 pelo doc da produção.
- **R09 · modelagem fiel** · A copy segue a estrutura e o formato do vídeo modelado, adaptando só pra oferta e pra vender a VSL. Se o vídeo é um comparativo no mercado, a copy é um comparativo no mercado. Benefícios e bullets crus e realistas, nada vago nem poético. · origem: feedback no Copy App (SS-FB-AV_004-ADS_001 e SS-FB-AV_006-ADS_001), 24/09/2026.
- **R10 · encaixe avatar × referência** · A referência é escolhida pensando no avatar (pessoa e cenário compatíveis, mesmo formato e beats). Todo briefing traz `ENCAIXE AVATAR × REFERÊNCIA` (🟢🟡🔴) e, em 🟡/🔴, `DIREÇÃO VISUAL` (cenário, figurino, ajuste de cena, no máximo 1 virada, sem caricatura). DIREÇÃO VISUAL prevalece sobre ALERTAS PRO EDITOR e COERÊNCIA DE CENA. 🔴 sem direção não sobe. Detalhe: `encaixe-avatar-referencia.md`. · origem: doc do Marlon (produção), 25/09/2026 — ADS_001 da Sarah travou 27 min no Motion Flow (avatar americana + copy na cozinha + referência vovó japonesa no jardim).
- **R11 · nomenclatura** · `SS-PGnn-ADS_YYY-V_ZZZ`: página no lugar de rede e avatar; ADS na sequência da página; V = mesma copy e referência com outro avatar, figurino ou edição. Referência sempre pelo `SW_nnn` do app. Detalhe: `nomenclatura.md`. · origem: Erick, 25/09/2026 (só Facebook; a MIX não tem avatar fixo).
- **R12 · título e descrição de postagem (Facebook e YouTube separados)** · Todo anúncio sobe com título + descrição **curtos e diretos** para o **Facebook** e para o **YouTube Shorts**, em EN + PT, já com **3 hashtags** no fim da descrição (público da página + ingrediente + nicho). **Nada de bullets, ✅ ou fascinations na descrição** (nem no Facebook, nem no YouTube). A descrição é só **hook + CTA** ou só **CTA**, **intercalando** os dois formatos (ADS ímpar: Facebook hook+CTA, YouTube só CTA; par: o contrário). CTA do Facebook = palavra-chave + follow; CTA do YouTube = link do perfil (descrição e comentário de Short não clicam). Títulos: Facebook ≤ 60 car. e curiosidade; YouTube ideal ≤ 45, palavra-chave primeiro, sem emoji. Os dois títulos nunca são iguais. Proibido no título e na descrição: Ozempic/GLP-1, cura, prazo ou número de resultado (em algarismo ou por extenso), tamanho de roupa, "queima/derrete gordura", credencial do avatar ("as a nurse", "my patients"), nome do produto, link. Hashtags proibidas: `#shorts`, `#ozempic` e afins, `#weightloss`, `#loseweight`, `#diet`. **Vale pra toda copy da OND-organic, sem exceção, e aposenta de vez o primary text (R04).** Você escreve 6 textos curtos por anúncio (título YT, título FB e linha de hook, em EN + PT); o resto é gerado e validado por `scripts/post-fields.js` (teste do script: `scripts/post-fields.test.js`). Detalhe, fórmulas de título, tabelas de hashtags, CTAs e exemplos: `references/titulo-descricao-hashtags.md`. · origem: Erick, 02/10/2026 (descrições "simples e muito diretas"; app mostra Facebook e YouTube separados pra copiar e colar na hora de postar) + estudo "Títulos, descrições e hashtags validados (Facebook e YouTube)", 03/10/2026, no vault em `Projects & context/OND-organic/Copy/`.
- **R05 · leva** · Variar ângulo, **prova e argumento** entre os anúncios da leva; não repetir o mesmo argumento (ex.: "a versão online dura poucas horas + ingrediente secreto") em vários anúncios. Consultar `banco-de-argumentos.md` (Biblioteca de cartas + "Já usados") e atualizar a tabela ao fim da leva. · origem: feedback no Copy App, 23/09/2026.
- **R13 · copiar o validado (aula de 02/10)** · O mercado ainda está fácil: o que dá retorno é copiar a fala e o formato de quem vende agora, não sofisticar. Num vídeo validado, mantém-se a fala e troca-se o mínimo (pessoa, prova do avatar, mecanismo/CTA da oferta). Quando o Erick pedir "variação de X%", a variação é **medida** (`scripts/variacao.js`: % de palavras que mudaram em relação à fala da referência) e entregue junto com o tamanho; fora do pedido, o padrão é variar só o necessário. Copy "inteligente demais" é erro, e nunca se infla a copy "porque ficou boa" (a regra do editor continua mandando no tamanho). · origem: aula de 02/10/2026 ("copia o vídeo, é só isso") + pedido do Erick de 08/10/2026 (variação de 20 a 30%).
- **R14 · escolha da referência (recência e venda)** · Preferir referências **recentes** (o formato é cíclico: modelar o que estourou há 2 ou 3 dias; conferir `posted_at`/janela do card no Swipe) e que **vendem**, medidas por **comentário por mil views** (a RECIPE é o sinal de lead), não só por view. Muita view com quase nenhum comentário é alerta. Referência antiga só entra com justificativa. · origem: aula de 02/10/2026 (princípios 2 e 3).
- **R15 · avatar: biotipo importa, identidade não** · O avatar tem que parecer com quem compra: pessoa comum, americana de meia-idade ou mais, que se veria na rua. Não gastar esforço com detalhe (cor da roupa, pinta, kit elaborado) nem com personagem chamativo (roupão, colares, figura estilizada: vem do DTC e dissocia o lead). Página com vários avatares não é problema. Na triagem 🟢🟡🔴 pesa o **biotipo e o cenário compatíveis**, não a identidade do avatar; a segunda pessoa de um antes e depois (paciente, mãe, avó, amiga) segue o mesmo princípio. · origem: aula de 02/10/2026 (princípio 8).
- **R16 · um validado, muitas variações** · Um vídeo validado rende 20 a 30 variações bobas de propósito (outra parte do corpo, outra pessoa, outro biotipo, outro lugar), espalhadas em várias páginas, porque a mesma variação rende diferente em cada uma. Ao receber um validado: (1) listar as variações já feitas nele (família de cópias literais incluídas) e **não repetir** a mesma frase na mesma página; (2) uma variação distinta por página; (3) registrar a família no Log. · origem: aula de 02/10/2026 (princípio 4).
- **R17 · sinal da própria página** · Antes de uma leva grande, ler as views por vídeo da página: achar os vídeos ~4× acima da média, perguntar o que têm em comum (em geral o **hook visual**, não o formato) e repetir **essa característica**, combinando com o formato em alta. Testar uns 10 vídeos no padrão; se a página continuar fraca, a decisão de descartar é do Erick. Sem métrica própria coletada isso não se aplica: **avisar na entrega** que a leva foi escrita sem leitura de sinal da página. · origem: aula de 02/10/2026 (princípio 6; pendência de coleta de métricas seguia aberta em 08/10/2026).
