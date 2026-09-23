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
9. **Alavancas de compliance** (Ozempic/Mounjaro, número de peso, comparação de custo) podem ser usadas com cautela quando o ângulo pedir; marcar no briefing quais anúncios usam.
10. **Infos da copy obrigatórias (R03):** `angulo` com número (`angulos-numerados.md`), `formato` (nome da Biblioteca de formatos + detalhe da cena), `publicoFatia` (quem, idade, situação vivida, o que já tentou).

## Checklist de QA (tudo ✅ ou reescreve)

- [ ] Checklist do editor inteiro (`regra-do-editor.md`)?
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
- [ ] Primary text no molde da R04 (hook, "Comment RECIPE below and follow me to see:", 3 ✅ de fórmulas diferentes)?
- [ ] Cada anúncio da leva com argumento e prova diferentes (R05), e a tabela "Já usados" atualizada?

## Regras aprendidas (feedback do Copy App, edições na página e métricas)

Formato: `R0N · [escopo] · regra · origem`. Prevalecem sobre as regras fixas.

- **R01 · geral** · CTA no meio **só em copy acima de 50 s**; até 50 s, só o CTA final. · origem: Erick sobre o AD02 da leva 01 do AV_001 (CV-15, ~49 s), 23/09/2026.
- **R02 · geral** · A modelagem **segue os mesmos blocos da referência**; não se acrescenta bloco (aterrissagem, fascination, mecanismo) que a referência não tem, encaixa-se dentro dos blocos existentes. · origem: Erick sobre o AD02, 23/09/2026 (a v1 tinha 9 blocos pra uma referência de 6).
- **R03 · Copy App** · Todo anúncio sobe com ângulo numerado, formato, fatia de público e palavra-chave. · origem: pedido do Erick, 23/09/2026.
- **R04 · primary text** · Curto, sempre neste molde (modelo escrito pelo Erick no ADS_002 do AV_001):
  ```
  <hook de 1 linha: curiosidade, conspiração, permissão ou qualificação do público>

  Comment RECIPE below and follow me to see:

  ✅ <fascination 1>
  ✅ <fascination 2>
  ✅ <fascination 3>
  ```
  3 fascinations fortes e curiosas, que deem vontade de comentar pra descobrir o que está escondido; cada uma de uma fórmula diferente (skill `gerador-de-bullets`), com parênteses de reforço quando couber, e testando ângulos novos a cada leva. Pode usar prova da VSL (Oprah, a doutora). Sem CTA repetido no fim. · origem: feedback no Copy App (ADS_002 do AV_001) + edição do Erick no mesmo anúncio, 23/09/2026.
- **R05 · leva** · Variar ângulo, **prova e argumento** entre os anúncios da leva; não repetir o mesmo argumento (ex.: "a versão online dura poucas horas + ingrediente secreto") em vários anúncios. Consultar `banco-de-argumentos.md` (Biblioteca de cartas + "Já usados") e atualizar a tabela ao fim da leva. · origem: feedback no Copy App, 23/09/2026.
