# Encaixe avatar × referência

Fonte: doc do Marlon (produção, lado do Gustavo), "Encaixe entre avatar e referência no briefing de copy", 25/09/2026. **Vale para toda copy que vira vídeo no Motion Flow.** Complementa `regra-do-editor.md` (tamanho e cenas) com a parte visual: quem aparece, onde e com que roupa.

## Como a produção gera o vídeo

O Motion Flow v2 (Antigravity + Google Flow) recebe **copy + vídeo de referência + avatar** e gera uma imagem por cena com o avatar dentro da cena da referência.
- **Roupa e aparência vêm da foto MASTER do avatar.** A Sarah sai sempre de suéter cinza com broche da bandeira dos EUA. A ferramenta não troca roupa pra combinar com a referência.
- **O cenário vem da referência.** Modo 1 copia ações, pessoas e câmera; Modo 2 adapta as ações à copy, mas mantém o cenário.

Quando **avatar, copy e referência são de "mundos" diferentes** (outra cultura, outra idade, cenário que a copy contradiz), a geração trava. Caso real: ADS_001 da Sarah (copy de food noise na cozinha à noite + SW_012, vovó japonesa num jardim de templo com uma paciente) levou ~27 min e não saiu; os vídeos da mesma leva com referência compatível saíram em 10–15 min.

O Swipe tem quase metade de pessoas asiáticas idosas (vovó japonesa, doutor chinês, monge) e o molde que mais escala é "vovó japonesa + receita" (SW_007/SW_008, 30 mi). Os avatares são americanos. Sem triagem, o choque se repete em quase toda leva.

## 1. Escolher a referência pensando no avatar

Ordem de preferência, para cada copy:
1. **Pessoa e cenário compatíveis com o avatar**, com o mesmo formato e a mesma estrutura de beats que se quer testar.
2. **Molde campeão de outro mundo**: pode, **desde que o briefing diga como o avatar entra nele** (DIREÇÃO VISUAL com virada). É quebra de padrão proposital, nunca acidente.

Para achar compatíveis, consultar o Swipe no Supabase (`czvscrixfrksgeucecdc`):
```sql
select code, avatar, format, angle, duration_s, views, comments
from swipe_creatives where status = 'ready' order by views desc nulls last;
```
A coluna `avatar` é o arquétipo de quem fala. Retrato em 25/09 para avatares americanos: SW_049 (branca meia-idade, cozinha americana, receita com bicarbonato), SW_048 (branca idosa), SW_039 (latina 40+), SW_031 (curandeira caribenha), SW_030/038 (curandeira indígena), SW_032–036 (mãe amish), SW_040/041 (mulher jovem, antes e depois), SW_043 (camponesa europeia).

Na página de avatar único, trocar uma referência 🔴 por uma 🟢 do mesmo formato **não fere** a modelagem fiel (R09): o formato e os beats continuam os do vídeo escolhido.

## 2. Triagem 🟢 🟡 🔴

Comparar o **avatar** (idade, etnia, figurino da MASTER, cenário do kit), a **copy** (onde a cena acontece, o que ela cita) e a **referência** (quem aparece, quantas pessoas, cenário, objetos na mão):

| Cor | Quando | O que fazer |
|---|---|---|
| 🟢 | A referência já combina com o avatar (mesmo tipo de pessoa e cenário) | Só trocar a pessoa |
| 🟡 | Combina com **1 ajuste** (tirar uma 2ª pessoa, trocar o objeto na mão) | DIREÇÃO VISUAL com o ajuste |
| 🔴 | Mundos diferentes (outra cultura, outra idade, cenário que a copy contradiz) | Trocar a referência **ou** manter com uma virada escrita |

## 3. Campos no briefing (logo antes de ALERTAS PRO EDITOR)

```
ENCAIXE AVATAR × REFERÊNCIA: 🟢 | 🟡 | 🔴 — <uma linha: por quê>
DIREÇÃO VISUAL (obrigatório se 🟡 ou 🔴):
  - Cenário: <manter o da referência | outro, qual>
  - Figurino: <roupa da MASTER | variante: quimono, roupa amish, jaleco…>
  - Ajuste de cena: <ex.: Sarah sozinha, sem a paciente; chá → copo d'água com limão>
  - Virada (se houver): <1 só. Ex.: "Sarah no lugar da vovó japonesa, mesma roupa e jardim">
```

Em 🟢 a DIREÇÃO VISUAL é opcional; se vier, só confirma "manter cenário, roupa da MASTER".

## 4. Regras

- **Uma virada por vídeo, no máximo.** Duas confundem e deixam a geração lenta.
- **A virada é visual.** Se pedir uma frase diferente na copy, a copy já sai escrita assim (o Erick aprova).
- **Sem caricatura:** nada de sotaque imitado nem roupa como piada. O avatar tem que parecer que pertence ao lugar.
- **DIREÇÃO VISUAL manda:** se ALERTAS PRO EDITOR ou COERÊNCIA DE CENA (R08) disserem uma coisa e a referência mostrar outra, a DIREÇÃO VISUAL decide qual vale. Os três campos não podem se contradizer.
- A copy **não pede cenário que a referência não tem** sem dizer isso na DIREÇÃO VISUAL (ex.: copy "na cozinha à noite" em cima de referência no jardim = 🔴).
- **🔴 sem direção não sobe.** A produção para e pergunta; melhor resolver aqui.
- Na **MIX**, a triagem decide também **qual avatar vai em qual referência**: preferir o par avatar × vídeo que dá 🟢, e usar a virada como variação consciente.

## 5. Na entrega

A tabela de entrega da leva ganha a coluna **Encaixe** (🟢/🟡/🔴 + virada, se houver). A produção mede por vídeo postado (cor × virada × views e comentários RECIPE); quando esses números voltarem, o que funcionar vira regra em `regras-e-qa.md`.
