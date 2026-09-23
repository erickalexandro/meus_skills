# Regra do editor — tamanho e contexto da copy × vídeo de referência

Fonte: especificação do editor da SlimSoda, repassada pelo Erick em 23/09/2026. **Vale para toda copy que vira vídeo no Motion Flow.**

## Por que existe

A copy vira vídeo no **Motion Flow**, que usa o vídeo de referência como base das cenas. Copy muito maior que a referência, ou falando de coisa que não aparece no vídeo, trava a produção: a ferramenta recusa, as cenas não cabem ou precisam ser refeitas. A copy já sai do tamanho e no contexto certos.

## Regra 1 — o tamanho segue a referência

1. Antes de escrever, **contar os caracteres da fala da referência** (transcrição EN inteira, com espaços).
2. A copy nova (hook + body + CTA final, só a fala EN) tem o **mesmo número de caracteres ou passa um pouco**.
   - **Público mais consciente** (já conhece o problema e a solução caseira): no tamanho da referência (0 a +5%).
   - **Público menos consciente** (precisa entender o problema): até **+10 a 20%**. O que entra a mais serve **só** pra elevar o nível de consciência e qualificar o lead (explicar a causa, filtrar o público certo). Nunca enfeite, repetição ou frase de efeito sobrando.
3. Nunca escrever bem maior "porque ficou boa". Não coube, corta.
4. Na entrega, sempre informar: **caracteres da referência × caracteres da copy (+%)**. No Copy App o campo `refChars` guarda o número da referência e a página mostra o % sozinha.

Contar com PowerShell: `("<texto>").Length`, ou somar `hookEN + " " + bodyEN + " " + ctaFinalEN`.

## Regra 2 — leve contexto com o vídeo de referência

- Modelada, não copiada. Mas mantém uma ligação leve com o que o vídeo mostra: **mesma sequência geral de ideias, mesmo tipo de cena** (se a referência prepara uma receita, a copy fala de preparar a receita; se é talking head, a copy é fala direta).
- **Cada trecho da copy faz sentido com o que está acontecendo naquele trecho da referência.** Assim as cenas saem certas de primeira. O briefing traz o mapa cena a cena.
- Não pedir o que a referência não consegue mostrar: outro ambiente, outra pessoa, o pote do produto.

## Limites fixos da produção (nunca passar, mesmo com a Regra 1)

- Vídeo de no máximo **1 min 36 s**. Referência mais longa que isso não serve pra esta regra: escolher outra.
- No máximo **12 cenas**, cada uma com no máximo **24 palavras** (~130 caracteres). Uma frase longa demais pra caber numa cena quebra a produção.
- **Escrito pra ser falado:** números por extenso, sem travessão (— ou –), sem símbolos ($, %, &, /), sem colchetes nem marcação de direção. **Só o texto em inglês que o avatar vai falar.** Direção de cena vai no **briefing**, nunca na copy.

## As outras regras do Erick continuam valendo

Frase de aterrissagem depois do hook · benefício funcional + sentimental · CTA 1 adaptado ao ângulo · fascination + quebra de objeção depois do CTA 1 · o pote nunca aparece · sem promessa médica · **"comment RECIPE and follow me"**.

## Checklist do editor (antes de entregar)

- [ ] Contei os caracteres da referência e da copy
- [ ] A copy está no tamanho da referência, ou passou só um pouco, com justificativa (nível de consciência / qualificação do lead)
- [ ] A copy conversa com o que a referência mostra, trecho por trecho (mapa de cenas no briefing)
- [ ] Nenhuma frase passa de 24 palavras; no máximo 12 cenas; até 1 min 36 s
- [ ] Números por extenso, sem travessão, sem símbolos, sem colchetes
