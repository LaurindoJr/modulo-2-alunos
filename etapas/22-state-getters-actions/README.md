# Etapa 22 — State, getters e actions

**Unidade 7 · slides 189–196 · 40 min.** A anatomia da store, com nome para cada parte. Entram
getters derivados de outros getters, o `$patch`, o `$reset` que **não existe** em setup store, e a
medição que mostra que getter tem cache e função não.

| | |
|---|---|
| Pré-requisitos | Etapa 21 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | As três partes; a linha do tempo do DevTools; `$patch` como uma entrada só |
| Os alunos implementam | O getter `pendentes`, a função `contarPor` e os dois botões de limpar filtros |
| Evidência de conclusão | O Resumo mostra pendentes pelo getter; o `$patch` aparece como **uma** entrada no DevTools |

## O que mudou em relação à etapa 21

| Arquivo | Mudança |
|---|---|
| `src/stores/tarefas.js` | Getter `pendentes`; função `contarPor`; actions `limparFiltros` e `reiniciar` |
| `src/views/ListaView.vue` | Dois botões: um com `$patch`, outro com uma action |
| `src/views/SobreView.vue` | Usa o getter `pendentes` da store, em vez de calcular na tela |

## Roteiro

### Conhecer

| Parte | Na setup store | Na options store (material original) |
|---|---|---|
| state | `const x = ref(0)` | `state: () => ({ x: 0 })` |
| getter | `const dobro = computed(() => x.value * 2)` | `getters: { dobro: (state) => state.x * 2 }` |
| action | `function somar() { x.value++ }` | `actions: { somar() { this.x++ } }` |

As duas formas produzem a mesma store. A setup store não tem `this`; os refs estão ali mesmo.

- **`$patch`** muda vários campos de uma vez e aparece como **uma** entrada no DevTools.
- **`$reset`** só existe em options store. Em setup store, escreva a sua `reiniciar()`.
- **Getter com parâmetro não existe.** O que existe é um getter que devolve uma função — e o
  resultado dela não é guardado.

### Executar

1. Vue DevTools › **Timeline** › Pinia: fazer três ações e ver as três entradas.
2. Clicar em **Limpar filtros ($patch)** e em **Limpar filtros (action)**: comparar as entradas.
3. No painel Pinia, usar o botão de **reset**: a store volta ao estado inicial.

### Entender — getter tem cache, função não

Medido com `console.log` dentro de cada um, na tela da Lista:

| | Ao carregar | 5 letras na busca | Concluir 1 tarefa |
|---|---|---|---|
| `concluidas` (getter) | 1 | **0** | 1 |
| `contarPor()` (função) | 1 | **5** | 2 |

Digitar na busca redesenha a tela cinco vezes. A função roda nas cinco; o getter roda zero, porque
nada do que **ele** lê mudou. É a medição da etapa 11 (`computed` × método), agora dentro da store.

### Investigação — o `$reset` que não existe

Numa setup store, o método **existe** (`typeof store.$reset === 'function'`) e lança ao ser
chamado. Mensagem real, verificada:

```text
Error: 🍍: Store "tarefas" is built using the setup syntax and does not implement $reset().
```

Não é defeito: o Pinia não sabe qual era o estado inicial, porque quem criou os refs foi você,
dentro de uma função que já rodou. Em options store ele funciona porque o `state: () => ({...})`
pode ser chamado de novo.

Duas saídas: escrever a sua `reiniciar()` (o que fazemos) ou usar a options store.

### Pesquisar

- [Pinia — State, incluindo `$patch` e `$reset`](https://pinia.vuejs.org/core-concepts/state.html)
- [Pinia — Getters](https://pinia.vuejs.org/core-concepts/getters.html)
- [Pinia — Actions](https://pinia.vuejs.org/core-concepts/actions.html)
