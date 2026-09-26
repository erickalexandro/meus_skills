# Nomenclatura dos anúncios (por página)

Definida pelo Erick em 25/09/2026. Substitui `SS-<REDE>-AV_XXX-ADS_YYY-V_ZZZ`.

## O código

```
SS-PG01-ADS_007-V_001
```

| Parte | O que é | Regra |
|---|---|---|
| `SS` | Oferta (SlimSoda) | Fica: custa 3 letras e separa quando entrar outra oferta |
| `PG01` | **Página onde o vídeo é postado** | Número fixo da página, 2 dígitos. Nunca reaproveitar número de página apagada |
| `ADS_007` | A copy (hook + body) | Sequência **da página**: continua do maior ADS já usado nela, códigos antigos incluídos |
| `V_001` | Variação da mesma copy | Mesma copy + mesmo vídeo de referência, com outro avatar, ambiente, figurino ou edição |

Sem rede (só Facebook) e sem avatar (a MIX não tem avatar fixo, e o avatar fica no campo `avatarUsado` do Copy App e no card do pipeline).

**Copy nova ou vídeo de referência novo → ADS novo. Mesma copy e mesma referência com outra roupa, avatar ou edição → V nova.**

## Páginas (ordem de criação no OPS-organic, `account_pages.created_at`)

| Código | Página | Avatar | Grupo no Copy App (`avatarId`) |
|---|---|---|---|
| `PG01` | Harper Wilson (no app: "Hasper Wilson") | AV_001 Harper Wilson | `AV_001` |
| `PG02` | Sophia Brown | Sophia Brown | `SOPHIA_BROWN` |
| `PG03` | Emma Davys | Emma Davys | `EMMA_DAVYS` |
| `PG04` | MIX | vários (`mix_avatar_ids`) | `MIX` |
| `PG05` | Sarah Miller | AV_002 Sarah Miller | `AV_002` |

Página nova = próximo número (`PG06`…). Fonte de verdade: coluna `code` de `account_pages` no OPS-organic (Supabase `czvscrixfrksgeucecdc`), que é obrigatória e única; antes de uma leva, conferir esta tabela contra ela e, se divergir, vale o app e esta tabela é corrigida no mesmo commit. O próximo código livre de uma página sai pronto no MCP `ops_generate_nomenclature` (página → próximo ADS) ou no botão "Usar o próximo da página" do modal Novo vídeo.

No Copy App, cada grupo de `avatars` tem o campo `pg` (PG01…PG05) e a página abre por `#PG05`.

Pastas das páginas no Drive (pasta `AVATARES`): `PG01_Hasper Wilson`, `PG02_Sophia Brown`, `PG03_Emma Davys`, `PG04_MIX 1`, `PG05_Sarah Miller`.

No OPS-organic, um vídeo com código `SS-PGnn-…` é ligado sozinho à página do código (e ao avatar, se a página é de avatar único); na MIX, mandar o avatar que fala no campo `avatar` do card.

## Leva

`<PGnn>__leva-<NN>` (ex.: `PG05__leva-02`). A numeração da leva continua a da página (a leva 01 da Sarah foi `AV_002__leva-01`, então a próxima é `PG05__leva-02`).

## Próximo ADS de cada página (conferir no Copy App antes de usar)

| Página | Já usados (código antigo) | Próximo |
|---|---|---|
| PG01 Harper | `SS-FB-AV_001-ADS_002` a `006` | `ADS_007` |
| PG05 Sarah | `SS-FB-AV_002-ADS_001` a `005` (apagados em 25/09, nunca produzidos) · `SS-PG05-ADS_001` a `005` (leva 02, reaproveitou os números a pedido do Erick) | `ADS_006` |

**Exceção (Erick, 25/09/2026):** quando uma leva é apagada e substituída **antes de virar vídeo** (cards ainda em Roteiro, nada no Drive), os números podem ser reaproveitados se o Erick pedir. Conferir antes que nenhum card, arquivo ou pasta usa o código antigo.
| PG04 MIX | `SS-FB-AV_003…008-ADS_001/002` (por avatar) | `ADS_003` |
| PG02, PG03 | nenhum | `ADS_001` |

## Códigos antigos

Os anúncios já criados **não são renomeados** (links do Copy App, pipeline e pastas do Drive dependem deles). Ao citar um antigo, usar o código como está.

## Referências do Swipe

Sempre pelo código do app com underline: `SW_049`. Nunca só `CV-nn` (swipe ColdClick no vault) nem `SW-nnn` com hífen (swipe antigo do Nando, que **não** é o `SW_nnn` do app). Se a referência vier de fora do Swipe, dizer isso no briefing e colar o link.
