---
name: ECOTOKEN
description: Estratégia de arquitetura para economia de tokens em projetos HTML/JS/CSS no Claude Code.
---

# SKILL-ECOTOKEN: Economia de Tokens para Projetos Web

Esta skill define a arquitetura de arquivos e padrões de interação para reduzir o consumo de tokens em até 80% ao iterar em projetos HTML.

## 1. Arquitetura de Arquivos Obrigatória
Divida o projeto monolítico para evitar que o Claude releia códigos desnecessários:

- `index.html`: Apenas estrutura HTML pura (< 150 linhas).
- `assets/css/`: 
    - `base.css` (reset/vars), `layout.css` (grid/seções), `components.css` (cards/botões), `animations.css`.
- `assets/js/`:
    - `data.js` (TODO o conteúdo de texto/copy), `ui.js` (DOM), `animations.js`.
- `CLAUDE.md`: Contexto fixo do projeto.

## 2. Regra de Ouro: data.js
Todos os textos visíveis devem ser movidos para um objeto JavaScript em `assets/js/data.js`. O `index.html` deve apenas referenciar IDs.
* **Ação:** Mudar headline ou preço = Editar apenas ~60 linhas do `data.js` em vez de 1.200 do `index.html`.

## 3. Padrões de Prompt Cirúrgico
Sempre utilize o formato: `[arquivo-alvo] + [operação específica] + [localização exata] + [o que muda]`.

**Exemplos de comando:**
- "Em `data.js`, no objeto `hero.headline1`, troque o valor para 'Novo Texto'."
- "Em `layout.css`, na classe `.fluxo-item`, adicione `align-items: flex-start`. Não abra outros arquivos."

## 4. Protocolo de Migração (Monolito para ECOTOKEN)
Para converter um `index.html` único, use:
"Migre o `index.html` atual para a arquitetura ECOTOKEN. 1. Crie pastas `assets/css/` e `assets/js/`. 2. Extraia `<style>` para os respectivos CSS e `<script>` para os JS. 3. Mova todos os textos para o objeto `CONFIG` no `data.js`. 4. O `index.html` deve ficar com < 150 linhas."

## 5. Regras para o Claude Code (Adicionar ao CLAUDE.md)
- NUNCA abra mais arquivos que o necessário.
- NUNCA reescreva o arquivo inteiro; use `str_replace` para mudanças pontuais.
- Antes de editar, declare: "Vou editar [arquivo] na [linha/classe]".
- Commit cirúrgico: `git add [arquivo-específico]`, nunca `git add .`.

## 6. Referência de Edição rápida
- **Copy/Preço:** `assets/js/data.js`
- **Design System/Cores:** `assets/css/base.css`
- **Layout/Grid:** `assets/css/layout.css`
- **Componentes (Botão/Card):** `assets/css/components.css`
- **Interação/Modal:** `assets/js/ui.js`
- **Estrutura:** `index.html`