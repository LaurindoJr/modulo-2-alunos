# Etapa 08 — Anatomia do projeto Vue e do arquivo `.vue`

**Módulo 3 · slides 77–84 · 40 min.** Aula 4, “Criando uma aplicação”. O projeto da etapa 05 é
lido arquivo por arquivo: quem o navegador recebe, onde o Vue começa, o que é um SFC e o que o
Vite faz com ele.

| | |
|---|---|
| Pré-requisitos | Etapa 05 (projeto criado com `npm create vue@latest`) e etapa 07 (`createApp`/`mount`) |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | O caminho `index.html → main.js → App.vue`; HMR; `data-v-…` no Elements; o `App.vue` chegando como JS no Network |
| Os alunos implementam | Estilo global em `src/assets/main.css` importado no `main.js`; alterações no `App.vue` observadas sem recarregar |
| Evidência de conclusão | O aluno aponta, no Elements, um estilo global e um `scoped`, e explica a diferença |

## O que mudou em relação à etapa 05

| Arquivo | Mudança |
|---|---|
| `index.html` | Comentários: `<div id="app">` vazia e `<script type="module">` |
| `src/main.js` | Importa `./assets/main.css` (estilo global) e explica cada linha |
| `src/assets/main.css` | **Novo.** Tokens de cor (claro/escuro com `light-dark()`), espaços e estilos base da Todo List |
| `src/App.vue` | Três blocos comentados; estilo `scoped` usando os tokens globais |

Nenhuma dependência nova: `package.json` e `package-lock.json` são os da etapa 05.

## Executar

```bash
cd etapas/08-projeto-sfc
npm ci
npm run dev
```

## Roteiro

### Conhecer

| Arquivo | Quem usa | Papel |
|---|---|---|
| `index.html` | Navegador | Única página recebida; tem `<div id="app">` vazia e carrega `/src/main.js` |
| `src/main.js` | Navegador (via Vite) | `createApp(App)` cria a aplicação; `.mount('#app')` a coloca na div |
| `src/App.vue` | Vite → navegador | Componente raiz: `<script setup>`, `<template>`, `<style scoped>` |
| `vite.config.js` | Vite (Node) | Plugin que entende `.vue`, Vue DevTools, atalho `@` → `src` |
| `package.json` | npm | `vue` em `dependencies` (vai para o navegador); `vite` em `devDependencies` |

### Executar

1. Com `npm run dev` ativo, abra **Elements**: a `<div id="app">` está cheia. Abra o arquivo
   `index.html` no editor: ela está vazia. Quem a preencheu?
2. Altere o texto de uma tarefa no `App.vue` e salve **sem recarregar**: a página muda sozinha
   (HMR — *Hot Module Replacement*).
3. No **Network**, filtre por `App.vue`: a resposta é **JavaScript**, não o arquivo original. O
   navegador não entende `.vue`; o Vite transforma antes de entregar.
4. **Prática:** no `App.vue`, acrescente uma regra `scoped` `h1 { color: var(--cor-primaria) }`;
   depois, em `main.css`, mude `--cor-primaria` e veja o título mudar. No Elements, compare: a regra
   do `App.vue` tem `[data-v-…]`; a do `main.css`, não.

### Entender

- **Global × scoped:** `main.css` vale para a página toda. `<style scoped>` recebe um atributo
  único (`data-v-7a7a37b1`, por exemplo) e só alcança elementos deste componente.
- **Modelo:** navegador pede `index.html` → executa `main.js` → `createApp(App)` → `mount('#app')`
  → o template compilado desenha o DOM dentro da div.
- **Investigação:** troque `mount('#app')` por `mount('#App')` e veja o Console:
  `[Vue warn]: Failed to mount app: mount target selector "#App" returned null.` A página fica em
  branco **sem erro de sintaxe**: o seletor não encontrou elemento. Volte para `#app`.

### Pesquisar

- [Vue — Creating an Application](https://vuejs.org/guide/essentials/application.html)
- [Vue — Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html)
- [Vue — SFC CSS Features (scoped)](https://vuejs.org/api/sfc-css-features.html)
- [Vite — Features (HMR)](https://vite.dev/guide/features.html#hot-module-replacement)

## Checklist do dev frontend

- [ ] **Conhecer:** o papel de `index.html`, `main.js`, `App.vue`, `vite.config.js`, `package.json`
- [ ] **Executar:** iniciar o projeto, usar HMR, achar um arquivo transformado no Network
- [ ] **Entender:** por que `#app` está vazia no arquivo; global × `scoped`
- [ ] **Pesquisar:** ler um `[Vue warn]` e achar a seção da documentação que o explica

## Origem e correções

- As telas do create-vue da Aula 4 mostram perguntas de uma versão antiga (uma pergunta por
  recurso, “Add JSX Support?”) e Vue 3.5.13 / Vite 6. As telas reais do create-vue 3.24 estão no
  bloco 5 do Módulo 2 (`slides/capturas/terminal/b5-create-vue-interativo.txt`).
- A Aula 4 apresenta `HelloWorld.vue` e `TheWelcome.vue`, que só existem quando se responde
  **No** a “Skip all example code”. Esta turma criou o projeto em branco; os componentes da Todo
  List aparecem nas etapas 13 e 14.
