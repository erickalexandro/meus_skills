# Estratégia MIX (página de variação de avatar e formato)

Definida pelo Erick em 24/09/2026. **Vale só pra página MIX**; as páginas de avatar único seguem o fluxo normal (variar copy, ângulo e hook, R05).

## A diferença

| | Página de avatar único | Página MIX |
|---|---|---|
| O que se testa | Copy, ângulo, hook, argumento | **Avatar e formato** |
| Copy | Uma diferente por anúncio | **Repetida** entre vídeos |
| Origem | Swipe variado, cada anúncio com argumento próprio | **Os anúncios/formatos mais escalados do swipe** |

## Como montar uma leva MIX

1. **Avatares da página:** `account_pages.mix_avatar_ids` da página MIX no OPS-organic → `avatars` (código + nome). Fotos na pasta do Drive "MIX 1 DE AVATARES". No briefing, o avatar vai **com o código e o nome exatos do app** e, quando a grafia do Drive difere, entre parênteses.
2. **3 referências mais escaladas** do swipe (views e comentários), de **formatos diferentes entre si**, até 1:36. Cada uma vira **uma copy base**, modelada normalmente (espelho de blocos, regra do editor, R01 a R06).
3. **Variações: cada vídeo é uma modelagem FIEL do seu próprio vídeo de referência** (correção do Erick, 24/09/2026):
   - **Avatar e ambiente:** mesma copy, mesmo formato, mesmo vídeo de referência; muda quem fala, onde e a roupa, adaptados ao formato daquele vídeo.
   - **Outro formato = outro vídeo escalado modelado do zero**, seguindo fielmente a estrutura e as cenas DELE, adaptado à oferta pra vender a VSL (ex.: o comparativo de gengibre no mercado do CV-21 vira "never buy a ginger root like this", não uma receita de bicarbonato falada no mercado). **Nunca** colar uma copy num formato de outro vídeo: a IA do vídeo não consegue modelar, e o anúncio perde o encaixe.
   - Só entram vídeos **com métrica validada** no swipe (views/comentários anotados). Vídeo sem métrica não serve de base.
   - Pode repetir avatar em formatos diferentes; o importante é variar formatos e avatares.
   - Criatividade é bem-vinda: o anúncio não precisa ser 100% coerente, precisa **provocar curiosidade** e mandar o lead com o nível de consciência certo pra VSL, disfarçado de conteúdo de valor (UGC, matéria, dica).
4. **A copy da mesma referência só muda no mínimo indispensável** entre avatares: o nome na assinatura, uma linha de autoridade que não cabe no avatar (ex.: médica diz "in my practice"). Nada de reescrever.
5. **Primary text:** um por copy base, repetido nas 4 variações (molde R04, fascinations R06).
6. **Nomenclatura (desde 25/09/2026, `nomenclatura.md`):** `SS-PG04-ADS_<copy base>-V_<variação>`. Cada copy base (uma referência) é um ADS; cada avatar/ambiente/figurino sobre a mesma copy e a mesma referência é uma V (`V_001` a `V_004`). Referência nova (variação de formato) = ADS novo. O avatar não entra no código: vai em `avatarUsado` = "AV_00X · nome do app". No Copy App, `avatarId: "MIX"`, `estrategia: "mix"`, `copyBase`. (A leva MIX 01 ficou no código antigo `SS-FB-AV_00X-ADS_00N-V_001`.)
6b. **Encaixe (R10):** a triagem 🟢🟡🔴 decide qual avatar vai em qual referência. Preferir pares 🟢; uma virada (ex.: avatar americana no cenário da vovó japonesa) pode ser uma das variações, sempre escrita na DIREÇÃO VISUAL. Regras em `encaixe-avatar-referencia.md`.
7. **Briefing:** começa pelo aviso "ESTRATÉGIA MIX", diz o tipo de variação, avatar (código, nome, perfil, foto), ambiente, formato, copy base + vídeo escalado, vídeo de formato (quando houver), o mapa de cenas, o ENCAIXE e a DIREÇÃO VISUAL.
8. **Copy App:** a leva e os anúncios com `estrategia: "mix"` mostram o badge "ESTRATÉGIA MIX". **Pipeline:** cards em Roteiro com `targetPageName: "MIX"`.
