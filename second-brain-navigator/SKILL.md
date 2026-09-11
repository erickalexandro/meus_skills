---
name: second-brain-navigator
description: >
  Orienta o Claude a se situar dentro do segundo cérebro (vault Obsidian +
  hub no Notion) do usuário antes de executar qualquer tarefa que dependa de
  contexto já existente — lendo a estrutura de pastas, os mapas de categoria
  e as notas relevantes, para evitar duplicar conteúdo, contradizer decisões
  já tomadas, ou perder contexto entre conversas e entre diferentes IAs. Use
  esta skill sempre que o usuário pedir para criar, atualizar, conectar ou
  usar como base algo do segundo cérebro, ou quando a tarefa depender de
  contexto de projetos/frameworks que provavelmente já estão documentados
  (ex: "cria um doc sobre X", "atualiza a nota Y", "usa o que já sabemos
  sobre Z", "faz um PRD/relatório completo sobre [projeto]"). Rode esta
  skill ANTES de qualquer skill de execução (como information-transfer),
  como uma etapa de orientação.
---

# Second Brain Navigator

## Objetivo
Antes de criar, editar ou basear qualquer resposta em contexto do segundo
cérebro do usuário, esta skill garante que o Claude se **oriente primeiro**
— em vez de agir às cegas, presumir que nada existe, ou perguntar ao usuário
algo que já está documentado em algum lugar acessível.

## Mapa da estrutura do vault (referência — híbrida PARA + códigos)

```
00 SISTEMA           → meta: README, prompt padrão, glossário
10 CONTEXTO GLOBAL   → perfil, habilidades, tom de voz
20 PROJETOS          → 21 PataView / 22 Controlar+ / 23 Lomove / 24 Infoprodutos
30 CONHECIMENTO      → copywriting, tráfego pago, funis, pesquisa de público
40 TEMPLATES & SOPs  → templates de anúncio, checklists
50 FERRAMENTAS       → vibe coding, prompts de IA, automações
90 ARQUIVO           → projetos pausados/encerrados
```

Cada pasta pode (eventualmente) ter uma nota-mapa própria — se existir,
ela é sempre o primeiro lugar a checar dentro daquela categoria.

## Passo a passo antes de qualquer tarefa

1. **Perguntar internamente**: essa tarefa depende de contexto que
   provavelmente já foi documentado antes (projeto, framework, pesquisa,
   decisão)? Se a resposta for não (pergunta genérica, tarefa isolada),
   pule esta skill e siga direto para a execução.

2. **Se depende, checar as fontes disponíveis nesta sessão, nesta ordem
   de prioridade:**
   - **a. Filesystem direto** (Claude Desktop/Code apontando pro vault
     sincronizado) — se disponível, é a fonte mais confiável e atualizada.
     Navegar primeiro até a pasta da categoria certa (usar o mapa acima),
     ler a nota-mapa da pasta se existir, depois as notas específicas.
   - **b. Notion** (`Notion:notion-search` / `notion-fetch`) — fonte
     original de boa parte do conteúdo ainda não transferido pro Obsidian.
     Buscar por palavras-chave do projeto/tema antes de assumir que não
     existe nada.
   - **c. Google Drive** (`google_drive_search` / `google_drive_fetch`) —
     útil se o vault estiver sincronizado lá, mas lembrar da limitação:
     só lê Google Docs nativos, não arquivos `.md` sincronizados nem PDFs
     diretamente.
   - **d. Memória de conversas anteriores e o histórico da conversa atual**
     — sempre disponível, mas pode estar desatualizada ou incompleta.
   - **e. Perguntar ao usuário** — só como último recurso, e sendo
     específico sobre o que já foi checado ("procurei X e Y no Notion e
     não achei — você tem isso documentado em algum outro lugar?"), nunca
     como primeira reação.

3. **Nunca duplicar ou contradizer** um documento já existente sem avisar
   explicitamente sobre o que foi encontrado e a diferença/atualização.

4. **Ao criar conteúdo novo**, verificar se há documentos irmãos/relacionados
   no vault para linkar de volta (`[[Nota#Seção]]`), mantendo o ecossistema
   conectado em vez de criar ilhas de conteúdo isoladas.

5. **Ao final de uma tarefa de criação**, sugerir (sem forçar) a pasta
   correta de destino dentro da estrutura de códigos, baseado no tema.

## Erros a evitar
- Perguntar "onde fica isso no seu vault?" antes de tentar localizar
  sozinho nas fontes disponíveis.
- Assumir que não existe contexto só porque não foi mencionado nesta
  conversa específica.
- Ignorar a estrutura de pastas/códigos ao sugerir onde salvar algo novo.
- Insistir em buscar em fontes que já falharam nesta mesma sessão sem
  motivo novo para tentar de novo.
