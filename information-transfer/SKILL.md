---
name: information-transfer
description: >
  Transfere conteúdo de páginas do Notion para arquivos markdown prontos para o
  Obsidian, adaptando a formatação (toggles, callouts coloridos, texto colorido,
  tabelas) para o equivalente nativo do Obsidian, sem exigir que o usuário escreva
  sintaxe manualmente. Use esta skill sempre que o usuário pedir para passar,
  transferir, migrar, levar ou adaptar conteúdo do Notion para o Obsidian, ou para
  o segundo cérebro dele, mesmo que ele não use exatamente essas palavras (por
  exemplo: pega esse doc do Notion e bota no meu vault). Também use quando o
  usuário pedir para atualizar ou sincronizar uma nota do Obsidian com uma página
  do Notion que já foi transferida antes.
---

# Information Transfer — Notion → Obsidian

Skill para replicar o fluxo de trabalho de pegar uma página do Notion e recriá-la como
um arquivo `.md` pronto para o Obsidian do usuário, mantendo a estrutura e a intenção
visual original, mas usando apenas recursos **nativos** do Obsidian (sem exigir plugins
nem sintaxe complexa da parte do usuário).

O usuário é leigo em código/sintaxe markdown avançada. A skill deve fazer todo o trabalho
de tradução por ele — ele só precisa colar o resultado final no vault (ou, se disponível,
recebê-lo já no lugar certo).

## Quando usar

- Usuário pede para transferir/migrar/adaptar uma página ou seção do Notion para o Obsidian
- Usuário menciona "segundo cérebro", "vault" e um doc do Notion na mesma frase
- Usuário pede para "atualizar" uma nota do Obsidian com base em algo que mudou no Notion

## Passo a passo

### 1. Localizar a página no Notion
Use `Notion:notion-search` com uma query curta baseada no que o usuário descreveu
(nome da página, tema, projeto). Se o usuário já deu o link ou ID da página, pule a busca
e vá direto para o fetch.

### 2. Buscar o conteúdo completo
Use `Notion:notion-fetch` com o `id` (ou URL) da página encontrada. Isso retorna o
conteúdo em Notion-flavored Markdown, incluindo toggles (`<details><summary>`), callouts
coloridos, spans de texto colorido, tabelas, e blocos sincronizados.

Se a página tiver subpáginas relevantes ao pedido, decida com o usuário se elas também
devem ser transferidas (não assuma — pergunte se não estiver claro).

### 3. Traduzir a estrutura para o Obsidian
Aplique esta tabela de conversão (é o núcleo da skill):

| Elemento no Notion | Tradução para Obsidian |
|---|---|
| Toggle (`<details><summary>Título</summary>`) | Título vira cabeçalho (`##`, `###`, `####` dependendo do nível). Cabeçalhos já dobram/recolhem nativamente no Obsidian ao clicar na seta — não precisa de plugin nem sintaxe especial |
| Toggle aninhado (toggle dentro de toggle) | Nível de cabeçalho mais profundo (`###` → `####` → `#####`) |
| Callout com ícone de lâmpada / "insight" / dica prática | `> [!tip] Título opcional` |
| Callout informativo / contexto geral | `> [!info] Título opcional` |
| Callout com pergunta reflexiva | `> [!question] Título opcional` |
| Callout com exemplo | `> [!example] Título opcional` |
| Bloco de citação de autoridade/livro | `>` simples (blockquote nativo, sem tipo) |
| `<span color="...">texto</span>` (destaque de termo) | `**texto**` (negrito). Não usar sintaxe de cor — exige plugin extra e o usuário pediu simplicidade |
| Tabela do Notion | Tabela markdown nativa (`\| coluna \| coluna \|`) — o Obsidian renderiza sem plugin |
| Divisor (`---` no Notion) | `---` (funciona igual, nativo) |
| Ícone da página | Pode virar um emoji no título principal do arquivo (`# 📖 Título`), sem depender de plugin de ícones |

Regras gerais:
- **Nunca** usar sintaxe de callout colorida (`|purple`, `|yellow` etc.) nem CSS custom —
  isso depende de um tema específico (ex: Notation 2) que o usuário pode não ter instalado.
  Manter tudo no padrão nativo do Obsidian.
- Preservar a hierarquia lógica do conteúdo (fonte → capítulo/seção → subtópico), mesmo
  que isso signifique simplificar 3-4 níveis de toggle aninhado em cabeçalhos de
  `##` a `#####`.
- Preservar 100% do conteúdo textual — isto é uma migração de formatação, não um resumo.
  Não cortar informação a menos que o usuário peça explicitamente um resumo.
- Não é necessário citar fontes/copyright aqui: o conteúdo pertence ao usuário (é o
  vault pessoal dele no Notion), então a política normal de citação de busca na web não
  se aplica — é apenas realocação do próprio conteúdo do usuário.

### 4. Gerar o arquivo
Use `create_file` para salvar o `.md` resultante em `/mnt/user-data/outputs/`, com o
nome da página do Notion como nome do arquivo (mantendo espaços, sem caracteres especiais
problemáticos).

### 5. Entregar o arquivo
- Use `present_files` para deixar o arquivo disponível para download — isso **sempre**
  funciona neste ambiente e deve ser feito em todo caso.
- **Tentativa de salvar direto no Drive/vault**: se, na sessão atual, houver uma
  ferramenta de escrita em Google Drive ou acesso de sistema de arquivos ao vault
  sincronizado (ex: Claude Desktop/Code apontando para a pasta local do Drive), use-a
  para colocar o arquivo diretamente na subpasta correta da estrutura do vault
  (pergunte ou infira pela categoria do conteúdo, ex: `30 Conhecimento & Frameworks/Copywriting`).
  Isso elimina o passo de copiar/colar do usuário.
- **Se não houver essa ferramenta disponível** (caso do Claude.ai web/mobile sem
  filesystem conectado ao Drive): avise o usuário de forma direta e breve que a
  entrega automática direto no Drive não está disponível nesta sessão, e que o arquivo
  baixado precisa ser movido manualmente para a pasta do vault. Não prometa a entrega
  automática se a ferramenta não estiver de fato disponível.

### 6. Sugerir conexões (opcional, só se fizer sentido)
Se o conteúdo transferido tiver overlap temático com notas que já existem no vault do
usuário (baseado no que foi discutido na conversa), sugerir — não criar automaticamente —
um link cruzado (`[[Nota#Cabeçalho]]`) entre os dois documentos.

## Exemplo de tradução (referência rápida)

Notion:
```
<details>
<summary>Podcast Vturb - Derick Carneiro</summary>
	#### Os 3 níveis de mecanismo {color="purple_bg"}
	- <span color="purple">Mecanismo do problema</span>: causa raiz da dor
	<callout icon="/icons/light-bulb_yellow.svg" color="yellow_bg">
		Pegar um mecanismo que o público já acredita tende a funcionar melhor.
	</callout>
</details>
```

Obsidian:
```
## Podcast Vturb - Derick Carneiro

### Os 3 níveis de mecanismo
- **Mecanismo do problema**: causa raiz da dor

> [!tip] O segredo
> Pegar um mecanismo que o público já acredita tende a funcionar melhor.
```

## Erros comuns a evitar
- Não inventar cabeçalhos que não existiam no Notion só para "organizar melhor" — seguir
  a estrutura original do usuário, mesmo que pareça bagunçada.
- Não resumir nem cortar conteúdo silenciosamente.
- Não usar sintaxe de callout colorida sem confirmar que o usuário já tem o tema/plugin
  necessário instalado.
- Não afirmar que o arquivo foi salvo no Google Drive/vault se isso não foi de fato
  executado por uma ferramenta real na sessão.
