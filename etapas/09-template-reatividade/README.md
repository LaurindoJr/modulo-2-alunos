# Etapa 09 — Template e reatividade

**Módulo 3 · slides 85–92 · 40 min.** Aula 4 (“Reactivity: keeping the state and the view in
sync”) e prático 1 (contador). O `App.vue` estático da etapa 08 passa a ter **estado**: valores
que, ao mudar, mudam a tela.

| | |
|---|---|
| Pré-requisitos | Etapa 08 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | `ref` + `{{ }}`; `:disabled`, `:class`, `@click`; Vue DevTools mostrando `concluidas` mudar |
| Os alunos implementam | Botão “Desfazer” (desabilitado em zero) e título que muda quando tudo está concluído |
| Evidência de conclusão | Os botões alteram o estado e a tela acompanha; o aluno explica onde usou `.value` e por quê |

## O que mudou em relação à etapa 08

Só `src/App.vue`: estado com `ref`, interpolação, `v-bind` (`:`) e `v-on` (`@`).

## Roteiro

### Conhecer

| Sintaxe | Nome | Exemplo nesta etapa |
|---|---|---|
| `{{ expr }}` | Interpolação de texto | `{{ concluidas }} de {{ TOTAL }}` |
| `:atributo="expr"` | `v-bind` | `:disabled="concluidas === TOTAL"`, `:value`, `:max` |
| `:class="{ nome: condição }"` | Classe condicional | `:class="{ concluida: concluidas >= 1 }"` |
| `@evento="função"` | `v-on` | `@click="concluirProxima"` |
| `ref(valor)` | Estado reativo | `const concluidas = ref(2)` |

- Dentro de `{{ }}` e de `:attr` vai **uma expressão** (algo que produz um valor). `if`, `for`
  e declarações não são aceitos; o ternário `a ? b : c` é.
- `ref` × `reactive`: `ref` serve para qualquer valor (número, texto, array, objeto) e é a
  recomendação da documentação como API principal. `reactive` só aceita objetos e perde a
  reatividade ao desestruturar (`const { x } = estado`).

### Executar

1. Clique em “Concluir próxima” e observe no **Vue DevTools** (aba Components → `App`) o valor de
   `concluidas` mudar junto com a tela.
2. **Prática (prático 1 adaptado):** acrescente “Desfazer” (`concluidas.value -= 1`), desabilitado
   quando `concluidas === 0`. Depois, faça o `<h1>` mostrar `titulo` + ` ✓` quando tudo estiver
   concluído, **sem** criar outro `ref`.

### Entender

- **Modelo:** ao desenhar o template, o Vue **lê** `concluidas.value` e anota a dependência.
  Quando alguém **escreve** um valor novo, o Vue agenda um redesenho só do que dependia dele.
- **Atualização em lote:** o DOM não muda no mesmo instante da atribuição. Experimento:

  ```js
  import { nextTick, ref } from 'vue'
  // dentro de concluirProxima, depois de concluidas.value += 1:
  console.log(document.querySelector('.resumo').textContent) // ainda o texto antigo
  await nextTick()
  console.log(document.querySelector('.resumo').textContent) // texto novo
  ```

  (Torne a função `async` para usar `await`. Retire o experimento depois.)
- **Investigação — esquecer `.value`:** escreva `concluidas += 1` e salve. O lint acusa
  `vue/no-ref-as-operand` (“Must use `.value` to read or write the value wrapped by `ref()`”). Se
  rodar mesmo assim, o clique não muda nada e o Console mostra
  `Uncaught TypeError: Assignment to constant variable.` Desfaça e escreva `if (concluidas < TOTAL)`:
  sem o lint, nada avisaria — a comparação usa o **objeto** ref, não o número, e o botão para de
  funcionar em silêncio. Por isso o hábito: no `<script>`, sempre `.value`.

### Pesquisar

- [Vue — Template Syntax](https://vuejs.org/guide/essentials/template-syntax.html)
- [Vue — Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- Aprofundamento: [Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)
  (como `ref` usa getter/setter e `reactive` usa `Proxy`)

## Checklist do dev frontend

- [ ] **Conhecer:** interpolação, `v-bind`, `v-on`, `ref`, `.value`
- [ ] **Executar:** observar estado no Vue DevTools; ligar atributo e evento ao estado
- [ ] **Entender:** leitura registra dependência, escrita agenda atualização; DOM em lote (`nextTick`)
- [ ] **Pesquisar:** diferença entre `ref` e `reactive` na documentação oficial

## Origem e correções

- Teórico 4 original: “funciona através do sistema de proxy”. Mais preciso: `reactive()` usa
  `Proxy`; `ref()` usa getter/setter na propriedade `.value`; e as atualizações do DOM são
  agrupadas (`nextTick`), não imediatas.
