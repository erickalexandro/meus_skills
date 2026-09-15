# QA pré-entrega e entrega

Rodar **inteiro** antes de dizer que está pronto. Cada item ✅ ou pendência declarada no resumo. Quase todos os itens abaixo já escaparam uma vez.

## 1. Consistência de fatos (buscar no `data.js`, não de memória)

- [ ] **Tempo de preparo/uso** igual em toda a página (grep por `seconds`, `minutes`, `segundos`).
- [ ] **Preços**: concorrente (mês e dia), produto por pote/dia, bundles — as contas batem e aparecem iguais em todos os pontos.
- [ ] **Garantia**: mesmo número de dias no texto, no selo e no painel.
- [ ] **Quantidade** por pote (doses/scoops = dias) coerente com o preço por dia.
- [ ] **Linha do tempo da narradora**: idade, anos, meses, pesos e nomes da família iguais no lead, na história, na timeline e na assinatura.
- [ ] **Nomes do mecanismo** iguais do teaser ao P.S.; nenhuma sobra de nome antigo (grep pelos nomes superados).
- [ ] Nenhuma referência a um criativo específico ("in my video", "you've seen…", "the ingredient I didn't name").
- [ ] Nada que o Erick mandou tirar voltou (ex.: FAQ, totais dos bundles, rodapé ADVERTISEMENT, frase removida).

## 2. Oferta e links

- [ ] Todos os CTAs apontam para o **checkout oficial com o parâmetro de afiliado intacto** (conferir que a URL é idêntica em todos).
- [ ] Nenhum link para outra URL antes da oferta.
- [ ] Bundles com miniatura, quantidade e selo com reason why; sem total se essa for a regra do playbook.
- [ ] Selo de garantia transparente, número certo, no painel e no último CTA.

## 3. Visual (fatias 390px do `tools/shot.mjs`)

- [ ] Topo: headline + sub + hero cabem e a 1ª linha do corpo aparece.
- [ ] Hero sem produto (se o padrão da peça for esse) e com a emoção da headline.
- [ ] Todas as imagens: **mesmo rosto** da narradora, **corpo certo para a fase da história**, sem texto deformado/idioma errado, sem mão errada, nenhuma vertical.
- [ ] Recortes quadrados com rosto e produto inteiros.
- [ ] Byline com a foto de perfil oficial.
- [ ] Build sem aviso de imagem faltando (ou falta declarada e bloco pulado de propósito).
- [ ] Nada cortado na lateral; caixas, depoimentos e comentários legíveis.

## 4. Compliance

- [ ] Tabela da alavanca 13 atualizada; itens ⚠️ listados no resumo para o Erick.
- [ ] Nenhuma promessa proibida pelo briefing; disclaimers de resultado individual onde há antes/depois.

## 5. Entrega (fluxo usado na operação orgânica)

1. **Build final** para o caminho do entregável (padrão `Downloads/Entregável V<n> - <avatar>.html`). Tamanho do arquivo anotado.
2. **Drive — pasta do avatar** (dentro da pasta de avatares do projeto orgânico):
   - se já existe um arquivo com o mesmo nome (ex.: versão subida antes pelo Erick para o time), **sobrescrever** pelo espelho local do Google Drive para desktop — mantém o **mesmo ID e o mesmo link**;
   - confirmar pelo conector do Drive (metadados: tamanho e data de modificação novos) antes de passar o link adiante;
   - lembrar que o visualizador do Drive não roda HTML: quem abre precisa baixar.
3. **ClickUp — tarefa de copy do avatar** (lista de Copy do projeto; são 5 tarefas "Revisão de Persona e Entregável – AV_00X"):
   - achar a tarefa com `filter_tasks` na lista (a busca por palavra-chave falhou; há 2 workspaces e as chamadas exigem `workspace_id`);
   - **colar o link no lugar indicado na descrição** (campo "cole o link do HTML aqui"), preservando o resto da descrição;
   - **comentário** com o link, dizendo que é a versão revisada final do entregável, se substituiu uma versão anterior e as principais mudanças em 1 parágrafo;
   - **mover o status para o próximo** da lista (confira a ordem com `get_task` + `expand_statuses`; na lista de copy: a fazer → fazendo → concluido);
   - se o Erick pedir, mover a **próxima tarefa de avatar** para "fazendo".
4. **Log e estado** do projeto no Workspace + linha da peça no playbook (status "entregue", data, link).
5. **Resumo ao Erick**: link do Drive, link da tarefa, o que ficou pendente (decisões ⚠️, imagens, validações).

IDs de workspace, lista e pastas ficam no estado do projeto no vault — não neste repo público.
