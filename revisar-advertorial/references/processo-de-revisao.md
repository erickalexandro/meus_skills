# Processo de revisão — detalhado

## 0. Preparar o material (5 minutos, não mais)

- **Peça em HTML único de terceiros (modo A)**: não edite o HTML. Extraia o texto por bloco (Node lendo o DOM ou regex nos headings) e as imagens base64 (Node → arquivos) para o inventário. Se a decisão for otimizar, reconstrua como projeto ecotoken da `criar-advertorial` antes de mexer — edição na mão em HTML de 1 MB custa caro e quebra.
- **Peça nossa (modos B–D)**: projeto ecotoken já existe (`data.js`, CSS, `build.mjs`). Rebuild e rode `node tools/shot.mjs "<entregável>"`; leia só as fatias necessárias.
- Contagem rápida: palavras, imagens, posição (% da página) do 1º nome do produto, do 1º CTA e do mecanismo. Ajuda a medir congruência e ritmo sem ler tudo de novo.

## 1. Premissas (escrever antes de dar nota)

```
Tráfego: <de onde vem · o que os criativos costumam mostrar/esconder, em padrão geral>
Consciência de quem clica: <nível> · já conhece o produto? <sim/não/parcial>
Mecanismo oficial do avatar/oferta: <nome e pilares, ou "não há">
Decisões já tomadas pelo Erick (não reabrir): <headline, visual, mecanismo, remoções…>
Restrições do briefing/compliance: <linhas vermelhas>
```

Se uma premissa estiver faltando e mudar a nota de congruência, pergunte **uma vez** e siga com a hipótese marcada.

## 2. Rubrica das notas

| Nota | Significa |
|---|---|
| 9–10 | Nada relevante a mexer; referência para outras peças |
| 7–8 | Funciona; ajustes finos com ganho pequeno |
| 5–6 | Funciona pela metade; há buraco que custa conversão |
| 3–4 | Falha visível para o leitor; prioridade |
| 0–2 | Ausente ou contraproducente |

- Nota sempre com **evidência** (trecho curto, posição na página ou fatia do print).
- Em rodada comparativa, mostre três colunas: **rodada anterior · agora · com as imagens pendentes** (quando parte da nota depende de imagem que ainda vai chegar).
- Compliance recebe nota, mas é **trava**: nota baixa bloqueia publicação independentemente do resto.

## 3. Peso de impacto e prioridade

| Alavanca | Peso | Custo típico |
|---|---|---|
| Ângulo | 3 | 3 (peça nova) |
| Congruência e estratégia | 3 | 2 |
| Topo | 2,5 | 1 |
| Lead | 2,5 | 1 |
| Big idea e nomes | 2 | 2 |
| História e dor | 2 | 2 |
| Prova | 2 | 2 (depende de material) |
| Demolição e mecanismo | 2 | 2 |
| Objeções | 1,5 | 1 |
| Oferta e fechamento | 1,5 | 1 |
| Retenção e escaneabilidade | 1 | 1 |
| Credibilidade visual | 1 | 1 |
| Compliance | trava | 1 |

`prioridade = peso × (10 − nota) ÷ custo` → ordene. Nota geral = média ponderada pelos pesos (sem compliance), uma casa decimal, com "~".

Em peça **no ar**, a ordem de mexer continua: lead → topo (headline + imagem) → sub-headlines → fechamento. Ângulo novo é peça nova.

## 4. Formato de saída aprovado (análise)

Arquivo no Workspace: `Copy/Advertoriais/<peça> — análise por alavanca.md` (rodada 2+: `<peça vX> — análise por alavanca.md`), com carimbo de data e sessão no topo.

```
# <peça> — análise por alavanca (Nª rodada)
Peça: <caminho> · Checklist: [[Checklist de alavancas do advertorial]] · rodada anterior: [[…]]
**Premissa de tráfego:** …

## Placar
| # | Alavanca | Rodada anterior | Agora | Com as imagens | Principal ponto em aberto |
**Geral: ~X → ~Y hoje → ~Z com as imagens.** <1–2 frases do diagnóstico>

## 1. <Alavanca de maior prioridade> — nota · prioridade 1
**Hoje:** <o que está na página, curto>
**Melhorou:** …
**Ainda falta**
- **<buraco>:** por que custa conversão.
**Sugestões**
1. <ação> — *"copy exata em inglês/idioma da página"*
…(uma seção por alavanca, na ordem de prioridade)

## Plano de ação (ordem)
| # | Ação | Alavancas | Depende de |
```

- Topo: usar a tabela do **checklist de 5** da headline (simples · seleciona · benefício · acreditável · específica) com ✅/⚠️.
- Headlines: **3 finalistas realmente diferentes** (controle, benefício + mecanismo, cena/vergonha…) com o motivo de cada; nunca substituir a headline aprovada sem pedido.
- Compliance: tabela **risco × situação** (✅ resolvido / ⚠️ decisão do Erick / ❌ bloqueia).
- No chat: placar + top 5 ações + o que depende do Erick. Máximo ~20 linhas; o detalhe fica no arquivo.

## 5. Pacote de imagens (quando a análise pede imagem)

Arquivo `<peça> — pacote de imagens.md` com:
- onde salvar (pasta `_novas` do projeto) e **nome exato** de cada arquivo;
- **bloco fixo de consistência** para colar antes de cada prompt (identidade da narradora com fotos de referência anexadas, estilo foto real de celular, cenário, sem texto/logo, formato);
- descrição física explícita **em cada cena do passado** (peso, roupa, postura) — não confiar em "versão antes" genérica;
- tabela: # · arquivo · onde entra · formato (3:2 ou 1:1, nunca vertical) · o que precisa fazer sentir;
- critérios de descarte (rosto divergente, mãos, texto deformado, texto em outro idioma, corpo errado para a cena).
Poucas e estratégicas: cenas de trama (vergonha, fundo do poço, descoberta), prova pessoal (antes/depois), encruzilhada com cor, concorrente na ancoragem.

## 6. Aplicação (modo C)

- Copy → `data.js`; visual → CSS; tipo de bloco novo → `render.mjs`. Nunca o HTML final.
- Mudanças grandes (ex.: trocar o mecanismo inteiro) por **script Node** que substitui blocos entre âncoras e **lista o que não encontrou** + procura sobras do texto antigo (nomes velhos, termos removidos). Heredoc no shell quebra com aspas; escreva o script com a ferramenta de arquivo e rode com `node`.
- Depois de cada rodada: rebuild → fatias do shot nas seções mexidas → registrar no log do Workspace.
- Imagens novas recebidas: renomear para as chaves, arquivar originais (e versão anterior) na pasta de imagens do projeto, `node tools/prep-img.mjs`, rebuild, conferir rosto e corpo em cada uma.

## 7. Registro

- Log append-only do projeto (`Log — Advertoriais.md`) com o que mudou e as decisões.
- Estado atual do projeto atualizado.
- Playbook do vault: correções do Erick → regra; erros; linha da peça.
