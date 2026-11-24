# Etapa 17 — Rotas dinâmicas, parâmetros e endereço não encontrado

**Unidade 5 · slides 149–156 · 40 min.** Uma rota para cada tarefa: `/tarefa/1`, `/tarefa/2`. O
endereço deixa de ser um menu fixo e passa a carregar **dado** — o `:id`. Entram `useRoute` (onde
estou), `useRouter` (para onde vou), a rota curinga para endereços desconhecidos e a armadilha mais
cara do Vue Router: o componente reaproveitado quando só o parâmetro muda.

| | |
|---|---|
| Pré-requisitos | Etapa 16 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | `/tarefa/:id` com `useRoute`; id inexistente × endereço inexistente; `router.push` |
| Os alunos implementam | O link “Abrir” em cada item e a rota curinga com a `NaoEncontradaView` |
| Evidência de conclusão | `/tarefa/2` abre a tarefa 2 depois de um F5; `/tarefa/999` e `/nao-existe` dão mensagens **diferentes** |

## O que mudou em relação à etapa 16

| Arquivo | Mudança |
|---|---|
| `src/views/TarefaView.vue` | **Novo.** Lê `route.params.id`, mostra a tarefa, conclui, remove e navega |
| `src/views/NaoEncontradaView.vue` | **Novo.** Resposta para endereços sem rota |
| `src/router/index.js` | Rotas `/tarefa/:id` e `/:caminho(.*)*` (curinga, sempre por último) |
| `src/components/TarefaItem.vue` | Link “Abrir” montado com `:to="{ name: 'tarefa', params: { id } }"` |

## Roteiro

### Conhecer

- **Parâmetro de rota:** `/tarefa/:id` casa com `/tarefa/1` e `/tarefa/42`. O valor chega em
  `route.params.id` e é **sempre texto** — daí o `Number()` antes de comparar com `tarefa.id`.
- **`useRoute()` × `useRouter()`:** o primeiro é o endereço atual (de onde estamos); o segundo é o
  roteador (com quem se navega). `router.push('/')` navega a partir do código.
- **Rota por nome:** `:to="{ name: 'tarefa', params: { id } }"` em vez de montar a string à mão.
  Se o caminho mudar um dia, o nome continua valendo.
- **Curinga:** `/:caminho(.*)*` é a última regra, porque a primeira que casa vence.
- **Dois “não existe” diferentes:** `/tarefa/999` casa com a rota (o endereço existe), mas a tarefa
  não está na lista; `/nao-existe` não casa com rota nenhuma. Mensagens diferentes, causas
  diferentes.

### Executar

```bash
npm ci
npm run dev
```

1. Clicar em **Abrir** num item: o endereço vira `/tarefa/1`.
2. Apertar F5 ali: a mesma tarefa continua aberta.
3. Clicar em **Próxima tarefa →**: muda só o parâmetro, e o conteúdo acompanha.
4. Abrir `/tarefa/999` e depois `/nao-existe`: duas mensagens diferentes.

### Entender — a armadilha (investigação da etapa)

Trocar `/tarefa/1` por `/tarefa/2` **não cria um componente novo**: o Vue Router reaproveita o que
já está na tela, porque a rota é a mesma. Quem lê o parâmetro num `computed` não sente nada. Quem o
lê uma vez, no `onMounted`, trava na primeira tarefa — e **nenhum aviso aparece** no Console.

```js
// ❌ roda uma vez só; ao ir de /tarefa/1 para /tarefa/2 o conteúdo não muda
onMounted(() => {
  tarefa.value = tarefas.value.find((item) => item.id === Number(route.params.id))
})

// ✅ relê o parâmetro sempre que ele muda
const tarefa = computed(() => tarefas.value.find((item) => item.id === Number(route.params.id)))
```

É o mesmo defeito de família da etapa 10 (`:key` pela posição): o framework reaproveita um elemento
e o que não é reativo fica para trás. Quando a tela precisa **buscar dados** ao mudar de parâmetro,
a saída é `watch(() => route.params.id, …)` — ou forçar a recriação com `<RouterView :key="…">`.

### Pesquisar

- [Dynamic Route Matching](https://router.vuejs.org/guide/essentials/dynamic-matching.html)
  (seção “Reacting to Params Changes”)
- [Catch all / 404 Not found Route](https://router.vuejs.org/guide/essentials/dynamic-matching.html#Catch-all-404-Not-found-Route)
- [Programmatic Navigation](https://router.vuejs.org/guide/essentials/navigation.html)
