# Etapa 14 — `v-model` em componente, slots e revisão do módulo

**Módulo 3 · slides 125–132 · 40 min.** Prático 5 (toggle que emite eventos) corrigido, slots
(conceito “componentes, props, eventos e **slots**” da Aula 3) e a revisão da Aula 5 em forma de
desafios. É o estado final do Módulo 3.

| | |
|---|---|
| Pré-requisitos | Etapa 13 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | `AlternarTema` com `defineModel`; por que o prático 5 original não sincroniza; `PainelCartao` com slots |
| Os alunos implementam | `TarefaFiltros` com dois `v-model` (`v-model:busca`, `v-model:situacao`) |
| Evidência de conclusão | Tema e filtros funcionam por `v-model`; o aluno explica a diferença entre prop e slot com um exemplo da Todo List |

## O que mudou em relação à etapa 13

| Arquivo | Mudança |
|---|---|
| `src/components/AlternarTema.vue` | **Novo.** `defineModel` (booleano) e `aria-pressed` |
| `src/components/TarefaFiltros.vue` | **Novo.** Busca e situação com dois `defineModel` nomeados |
| `src/components/PainelCartao.vue` | **Novo.** Slots `titulo` (com conteúdo de reserva), `subtitulo` e padrão |
| `src/App.vue` | Usa os três componentes; o estado (tema, busca, situação, tarefas) continua no `App` |

## Roteiro

### Conhecer

- **`v-model` em componente** é a combinação de uma prop e um evento:

  ```vue
  <AlternarTema v-model="temaEscuro" />
  <!-- equivale a -->
  <AlternarTema :model-value="temaEscuro" @update:model-value="(valor) => (temaEscuro = valor)" />
  ```

  No filho, `defineModel()` devolve um ref: ler = ler a prop; atribuir = emitir o evento.
  Com nome: `v-model:busca` ↔ `defineModel('busca')`.
- **Slots** passam **conteúdo** (marcação) do pai para dentro do filho:
  `<slot />` (padrão), `<slot name="titulo">` (nomeado; no pai, `<template #titulo>`), e o texto
  dentro do `<slot>` é o conteúdo de reserva.
- **Prop × slot:** prop passa **dados** que o filho exibe do seu jeito (`tarefa`); slot passa
  **pedaços de interface** que o pai monta (o subtítulo com o resumo).
- Para dados que muitos componentes distantes precisam, existem `provide`/`inject` e stores
  (Pinia, etapa 15).

### Executar

1. Vue DevTools: selecione `AlternarTema` e veja a prop `modelValue`; clique e veja o evento
   `update:modelValue` na Timeline.
2. Remova o `<template #titulo>` do `App`: aparece “Todo List” (conteúdo de reserva). Devolva.
3. **Prática**, numa cópia da etapa 13 (esta pasta já traz a solução): extraia os campos de
   filtro para `TarefaFiltros.vue` com `defineModel('busca')` e `defineModel('situacao')`; no
   `App`, `v-model:busca="busca" v-model:situacao="situacao"`. Os `ref` `busca` e `situacao`
   continuam no `App`.

### Entender

- **Por que o prático 5 original não funciona com `v-model`:** ele declara a prop `initialValue`,
  copia o valor para um `ref` local e emite `update:modelValue`. Com `<Toggle v-model="ligado" />`,
  o pai envia `modelValue` — que o filho não declarou — e `initialValue` fica no padrão (`false`).
  Se o pai mudar o valor por outro caminho, a cópia local não acompanha. `defineModel()` resolve
  as duas coisas.
- **Quem manda no estado:** mesmo com `v-model`, o dado mora no `App`; o filho só pede a mudança.
  É o fluxo da etapa 13 com uma sintaxe mais curta.
- **Investigação:** no `App`, troque `v-model:busca` por `v-model:procura`. A busca para de
  funcionar e o Vue DevTools mostra `procura` como atributo solto, não como prop. Nome do
  `v-model` e de `defineModel` precisam coincidir.

### Revisão do Módulo 3 (Aula 5, em desafios)

| Desafio | Etapa de origem |
|---|---|
| Explique, com o Network, de onde vêm `index.html`, CSS e JS | 06 |
| Mostre o defeito de sincronia e por que o Vue o elimina | 06, 07 |
| Siga `index.html → main.js → App.vue` e explique `#app` vazia × cheia | 08 |
| Diga onde usar `.value` e onde não | 09 |
| Explique por que `:key` usa o id | 10 |
| Diferencie `computed` de `watch` com um exemplo da Todo List | 11, 12 |
| Desenhe a árvore com props (↓), eventos (↑), `v-model` e slots | 13, 14 |

Próximos passos (fora do Módulo 3): TypeScript + Pinia (15), API (16), rotas (17), testes (18).

### Pesquisar

- [Vue — Component v-model](https://vuejs.org/guide/components/v-model.html)
- [Vue — Slots](https://vuejs.org/guide/components/slots.html)
- [Vue — Provide / Inject](https://vuejs.org/guide/components/provide-inject.html)
- [WAI-ARIA APG — Button (toggle)](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Checklist do dev frontend

- [ ] **Conhecer:** `defineModel`, `v-model` nomeado, slot padrão/nomeado/reserva
- [ ] **Executar:** criar um componente com `v-model` e outro com slots
- [ ] **Entender:** `v-model` = prop + evento; prop (dados) × slot (conteúdo)
- [ ] **Pesquisar:** o padrão de botão alternável acessível (`aria-pressed`)
