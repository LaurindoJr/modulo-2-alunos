# Etapa 21 — Pinia: a primeira store

**Unidade 7 · slides 181–188 · 40 min.** O composable da etapa 20 vira uma store do Pinia. A
mudança no código é pequena de propósito — e é esse o conteúdo da aula: **o composable já era uma
store**. O que o Pinia acrescenta não é poder, é ferramenta: nome, inspeção no DevTools, histórico
de alterações e um lugar combinado para o estado morar.

| | |
|---|---|
| Pré-requisitos | Etapa 20 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | `createPinia()`, `defineStore`, a store no Vue DevTools, o `storeToRefs` |
| Os alunos implementam | A conversão do composable em `stores/tarefas.js` e o uso nas três views |
| Evidência de conclusão | A aplicação funciona igual; a store aparece no DevTools com estado e ações |

## O que mudou em relação à etapa 20

| Arquivo | Mudança |
|---|---|
| `src/stores/tarefas.js` | **Novo.** O composable embrulhado em `defineStore('tarefas', () => …)` |
| `src/composables/` | **Removido.** Virou `stores/` |
| `src/main.js` | `.use(createPinia())` antes do roteador |
| `src/views/*.vue` | `storeToRefs` para o estado; actions direto da store |

## Roteiro

### Conhecer

```js
export const useTarefasStore = defineStore('tarefas', () => {
  const tarefas = ref([])                                  // state
  const concluidas = computed(() => …)                     // getter
  async function carregar() { … }                          // action
  return { tarefas, concluidas, carregar }
})
```

- **Setup store** é esta forma, com uma função — igual a um `<script setup>`. Existe também a
  **options store** (`{ state, getters, actions }`), que é a do material original; as duas fazem a
  mesma coisa, e esta combina com o resto do curso.
- **`createPinia()`** cria o lugar onde as stores moram. Sem ele, chamar a store dá erro.
- **O nome `'tarefas'`** é o identificador no DevTools e na persistência. Precisa ser único.
- **`storeToRefs`** mantém a reatividade ao desestruturar estado e getters. Actions não precisam.

### Executar

```bash
npm ci
npm run api    # terminal 1
npm run dev    # terminal 2
```

1. Conferir que **tudo funciona igual** à etapa 20. Essa é a primeira evidência.
2. Abrir o Vue DevTools, aba **Pinia**: a store `tarefas` aparece com estado e getters.
3. Criar uma tarefa e ver o estado mudar no painel, ao vivo.
4. Alterar `busca` **pelo painel** do DevTools e ver a lista filtrar na tela.

### Entender

O composable e a store fazem a mesma coisa. O que a store acrescenta:

| | Composable | Store |
|---|---|---|
| Estado compartilhado | sim | sim |
| Aparece no DevTools | não | **sim** |
| Histórico de alterações | não | **sim** |
| Nome e identidade | não | **sim** |
| Pode ser recriada nos testes | difícil | **sim** (`createPinia()` por teste) |

Nada disso muda o que o programa **faz**. Muda o que você consegue **ver** quando ele faz errado.

### Investigação — desestruturar sem `storeToRefs`

```js
const { tarefas, concluidas } = useTarefasStore()   // ❌
```

Abrindo `/resumo` direto, com 4 tarefas na API, a tela mostra **0 de 0**, 0% — e o Console fica
**vazio** (verificado). A desestruturação copia o valor do momento, e no momento da criação a
requisição ainda não voltou.

O detalhe cruel: sair da tela e voltar **conserta**, porque o componente é recriado. O defeito só
aparece para quem abre a tela direto pelo endereço — ou seja, para quem recebeu um link.

### Pesquisar

- [Pinia — Defining a Store](https://pinia.vuejs.org/core-concepts/)
- [Pinia — storeToRefs](https://pinia.vuejs.org/core-concepts/#Destructuring-from-a-Store)
