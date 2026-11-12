# Etapa 10 — Listas, condicionais, classes e eventos

**Módulo 3 · slides 93–100 · 40 min.** Conceito “Diretivas” da Aula 3, aplicado à Todo List: a
lista vira um **array de objetos** e o template a desenha com `v-for`, decide o que aparece com
`v-if`/`v-show` e reage a cliques com `@`.

| | |
|---|---|
| Pré-requisitos | Etapa 09 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | Lista estática → `ref([...])` + `v-for`; concluir e remover; estado vazio com `v-if`/`v-else` |
| Os alunos implementam | Botões “Remover concluídas” e “Concluir todas”, este desabilitado (`:disabled`) quando não há pendentes |
| Evidência de conclusão | Remover todas mostra o estado vazio; “Restaurar exemplo” volta a lista; no Elements, o aluno distingue `v-if` de `v-show` |

## O que mudou em relação à etapa 09

Só `src/App.vue`: o estado é um array de tarefas; o template usa `v-for` + `:key`, `v-if`/`v-else`,
`v-show`, `:class` e eventos com argumento (`@change="alternar(tarefa.id)"`).

## Roteiro

### Conhecer

| Diretiva | O que faz | Na Todo List |
|---|---|---|
| `v-for="item in lista"` + `:key` | Repete o elemento para cada item | Um `<li>` por tarefa, `:key="tarefa.id"` |
| `v-if` / `v-else-if` / `v-else` | Cria ou destrói o elemento | Lista **ou** “Nenhuma tarefa” |
| `v-show` | Mostra/esconde com `display: none` | Dica que some ao clicar “Entendi” |
| `:class="{ nome: cond }"` | Liga classes ao estado | `concluida` quando `tarefa.concluida` |
| `@evento="f(arg)"` | Chama a função com argumento | `remover(tarefa.id)` |
| Modificadores | Ajustam o evento | `@submit.prevent` (etapa 11), `@keyup.enter`, `@click.once` |

### Executar

1. Remova as quatro tarefas e observe o `v-else`. Clique “Restaurar exemplo”.
2. No **Elements**: clique “Entendi” — o `<p class="dica">` continua lá com `display: none`
   (`v-show`). Esvazie a lista — o `<ul>` **some** do DOM (`v-if`).
3. **Prática:** “Remover concluídas” (um `filter` que fica só com as pendentes) e “Concluir todas”
   (um `map`), com `:disabled` quando não houver pendentes.

### Entender

- **Por que `:key` com id:** o Vue reaproveita elementos para economizar trabalho. A chave diz
  *qual item é qual*. Experimento: acrescente dentro do `<li>` um campo **não ligado a dados**
  (`<input placeholder="observação" />`), troque `:key="tarefa.id"` por
  `v-for="(tarefa, indice) in tarefas" :key="indice"`, escreva algo na observação da 1ª tarefa e
  remova a 1ª. O texto “pula” para a tarefa seguinte. Com `:key="tarefa.id"`, ele vai embora junto.
- **`v-if` × `v-show`:** `v-if` tem custo ao alternar (cria/destrói); `v-show` tem custo inicial
  (sempre renderiza). Use `v-show` para alternâncias frequentes.
- **Investigação:** coloque `v-if="!tarefa.concluida"` no mesmo `<li>` do `v-for` para mostrar só
  pendentes. O lint acusa `vue/no-use-v-if-with-v-for` e o Console mostra erro: no Vue 3 o `v-if`
  é avaliado **antes** do `v-for`, quando `tarefa` ainda não existe. Solução: uma lista filtrada
  (`computed`, etapa 11). Também experimente apagar o `:key`: o lint acusa `vue/require-v-for-key`.

### Pesquisar

- [Vue — List Rendering](https://vuejs.org/guide/essentials/list.html) (seção “Maintaining State with `key`”)
- [Vue — Conditional Rendering](https://vuejs.org/guide/essentials/conditional.html) (`v-if` × `v-show`)
- [Vue — Event Handling](https://vuejs.org/guide/essentials/event-handling.html) (modificadores)
- [Vue — Class and Style Bindings](https://vuejs.org/guide/essentials/class-and-style.html)

## Checklist do dev frontend

- [ ] **Conhecer:** `v-for`/`:key`, `v-if`/`v-else`, `v-show`, `:class`, `@evento(arg)`, modificadores
- [ ] **Executar:** desenhar, concluir e remover itens a partir de um array
- [ ] **Entender:** o papel da chave; custo de `v-if` × `v-show`; por que não misturar `v-if` com `v-for`
- [ ] **Pesquisar:** encontrar na documentação a explicação da chave em listas

## Origem e correções

- Prático 2 original usa `:key="index"` numa lista **filtrada**: com filtro, a posição de um item
  muda e o Vue pode reaproveitar o elemento errado. Use uma chave estável (o próprio texto, quando
  é único, ou um id).
