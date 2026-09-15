# Fase 5 — Entrega, revisão e evolução da skill

## Entrega

1. HTML final no caminho combinado (padrão: `C:\Users\alexa\Downloads\Entregável V<n> - <peça>.html`).
2. Doc de diagnóstico e decisões no Claude Workspace da pasta do projeto, com:
   - o que a versão anterior tinha de bom e o que faltava, bloco a bloco (se for reescrita);
   - as decisões da ficha da peça;
   - **decisões pendentes para o Erick** (compliance em zona cinza, prova construída, garantia a validar, fotos que faltam);
   - banco de headlines para teste.
3. Resumo curto no chat: onde está, o que mudou e por quê (máximo de ~15 linhas), o que precisa dele.
4. Atualizar estado e log do projeto no Claude Workspace (skill `workspace-e-memoria`).

## Revisão com o Erick

- Mudança de copy → `data.js`. Mudança visual → CSS. Rebuild + conferência visual a cada rodada.
- Quando ele pedir **checklist, análise, nota, nova rodada, QA ou entrega**, use a skill **`revisar-advertorial`** (13 alavancas com nota e prioridade, sugestões com copy pronta, pacote de imagens, QA pré-entrega e fluxo Drive + ClickUp). O checklist bloco a bloco do hub continua servindo para o diagnóstico rápido de uma versão anterior na fase 1.
- Cada correção do Erick é um dado de aprendizado (ver abaixo). Não é só "arrumar a página".

## Como a skill melhora (obrigatório ao fim de cada peça ou rodada de revisão)

A skill aprende em **duas camadas**, e cada coisa vai para o lugar certo:

### Camada 1 — Playbook no vault (conhecimento prático, privado)

Arquivo: `Skills & knowledge/Copywriting/Advertorial/Advertorial — playbook de aprendizados.md`

Acrescente (sem apagar o que já existe; se algo foi superado, marque como superado com a data):
- **Registro de peças**: nova linha na tabela (data, produto, avatar/narradora, framework, categoria, ângulo, headline, arquivo, status, métricas quando houver).
- **Correções do Erick**: o que ele mudou, por quê (se disse), e a regra geral que isso vira.
- **Padrões que funcionaram** e **erros que não repetir**.
- **Variações de formato/design** testadas e em que contexto.
- **Resultados de teste** (CTR, CPA, conversão, hook rate) quando o Erick trouxer — é o que transforma opinião em padrão validado. Padrão confirmado com dado sobe para `Copywriting/Pesquisa/Padrões validados de copy.md`.

### Camada 2 — A própria skill (processo, versionado no GitHub)

Se o aprendizado muda **o processo** (uma fase nova, uma checagem que faltou, um tipo de bloco novo, um comando que quebrou, uma regra de imagem), edite a skill:
- Clone de trabalho: `C:\Users\alexa\Dev\meus_skills\criar-advertorial\` (**nunca** editar em `~/.claude/skills`, o sync apaga).
- Edite a referência da fase certa (ou o template), acrescente uma linha no **Histórico de versões** do `SKILL.md` e faça commit + push (o repo é público: **nada de copy de cliente, link de afiliado, credencial ou conteúdo integral de curso** — isso fica no vault).
- Depois do push, rode `bash "C:/Users/alexa/.claude/scripts/sync-skills.sh"` para a skill atualizada valer já nesta máquina.

### O que NÃO fazer
- Não duplicar na skill o que já está no vault (a skill aponta, o vault ensina).
- Não transformar opinião de uma peça só em regra universal: registre no playbook como observação; vira regra quando se repetir ou tiver dado.
- Não criar skill irmã para cada formato novo; formatos novos entram como variação nesta (framework/categoria/design) até ficarem grandes o suficiente para merecer separação — e aí o Erick decide.
