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
3. **4 variações por copy base:**
   - 2 × **avatar e ambiente**: mesma copy, mesmo formato e mesmo vídeo de referência; muda quem fala e onde.
   - 2 × **formato e avatar**: mesma copy, formato de outro vídeo do swipe (mercado, carro, tela dividida, cozinha com filhos, caderno…), que vira o vídeo de referência de formato.
   Distribuir os avatares de forma equilibrada (com 6 avatares e 12 anúncios, 2 por avatar) e casar arquétipo com formato (médica no consultório, avó na cozinha, mãe no carro).
4. **A copy só muda no mínimo indispensável:** o nome na assinatura, uma linha de autoridade que não cabe no avatar (ex.: médica diz "in my practice"). Nada de reescrever.
5. **Primary text:** um por copy base, repetido nas 4 variações (molde R04, fascinations R06).
6. **Nomenclatura:** `SS-<REDE>-<AV do avatar que fala>-ADS_<sequência daquele avatar>-V_001`. No Copy App, `avatarId: "MIX"`, `estrategia: "mix"`, `copyBase`, e `avatarUsado` = "AV_00X · nome do app".
7. **Briefing:** começa pelo aviso "ESTRATÉGIA MIX", diz o tipo de variação, avatar (código, nome, perfil, foto), ambiente, formato, copy base + vídeo escalado, vídeo de formato (quando houver) e o mapa de cenas.
8. **Copy App:** a leva e os anúncios com `estrategia: "mix"` mostram o badge "ESTRATÉGIA MIX". **Pipeline:** cards em Roteiro com `targetPageName: "MIX"`.
