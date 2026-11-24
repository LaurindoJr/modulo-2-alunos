# Etapa 23 — Várias stores, e o que não vai para a store

**Unidade 7 · slides 197–204 · 40 min.** Uma store não é um depósito de tudo. Aqui a aplicação passa
a ter **três**, cada uma com um assunto: tarefas (dados do servidor), filtros (preferência de quem
olha) e tema. Entram a comunicação entre stores, o `$subscribe` para persistir, e o critério do que
deve ficar **fora** de qualquer store.

| | |
|---|---|
| Pré-requisitos | Etapa 22 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | Três stores no DevTools; uma store usando a outra; `$subscribe` gravando |
| Os alunos implementam | `stores/tema.js` e a persistência dos filtros com `$subscribe` |
| Evidência de conclusão | Busca e tema sobrevivem ao F5; o `App.vue` fica com 8 linhas de script |

## O que mudou em relação à etapa 22

| Arquivo | Mudança |
|---|---|
| `src/stores/tema.js` | **Novo.** Estado, `watch` e persistência do tema |
| `src/stores/filtros.js` | **Novo.** Busca, situação, `visiveis` (lendo a store de tarefas) e `$subscribe` |
| `src/stores/tarefas.js` | Enxugou: cuida só dos dados do servidor |
| `src/App.vue` | O tema saiu; sobraram 8 linhas de script |
| `src/main.js` | `guardarFiltros()` depois do `use(createPinia())` |

## Roteiro

### Conhecer

- **Uma store por assunto**, não por tela. `tarefas` é dado do servidor; `filtros` é preferência de
  quem está olhando; `tema` é aparência. Três coisas com ciclos de vida diferentes.
- **Uma store pode usar outra**: dentro de `filtros`, chamamos `useTarefasStore()`. Não é truque —
  é a mesma chamada que um componente faz.
- **`$subscribe`** é o `watch` da store inteira: roda a cada mudança de estado. Serve para
  persistir, registrar, sincronizar.
- **O que NÃO vai para a store:** o que é de um componente só. O texto sendo digitado no
  `TarefaForm`, a aba aberta de um `<details>`, a posição da rolagem. Estado local continua sendo a
  escolha certa na maior parte das vezes.

### Executar

```bash
npm ci && npm run api   # terminal 1
npm run dev             # terminal 2
```

1. Digitar algo na busca e apertar **F5**: o filtro volta (verificado).
2. Trocar o tema e apertar F5: o tema volta.
3. Olhar o `localStorage` no DevTools: duas chaves, `todo-list:tema` e `todo-list:filtros`.
4. Vue DevTools › Pinia: três stores na lista.

### Entender — o critério

| Pergunta | Se sim | Se não |
|---|---|---|
| Mais de um componente precisa? | candidato a store | estado local |
| Sobrevive à troca de tela? | store | local |
| Faz sentido num link? | **endereço** (etapa 17) | store ou local |
| É dado do servidor? | store de dados | — |

Repare que a terceira linha é um aviso: nem tudo que é compartilhado vira store. Busca e filtro
poderiam ir para a URL — e, numa aplicação de verdade, provavelmente iriam. Aqui ficam na store para
mostrar o `$subscribe`; o exercício extra 2 leva para o endereço.

### Investigação — a store que não some

Com os filtros persistidos, apague a chave `todo-list:filtros` no DevTools (Application › Local
Storage) **sem** recarregar e repare: nada muda na tela. O `$subscribe` grava, não lê. A leitura
acontece uma vez, na criação da store — e a store é criada uma vez por carregamento da página.

É a mesma assimetria da etapa 18: a aplicação pergunta uma vez. Sincronizar nos dois sentidos é
outro problema, e tem solução pronta (`pinia-plugin-persistedstate`).

### Pesquisar

- [Pinia — Using a store inside another store](https://pinia.vuejs.org/core-concepts/actions.html#Accessing-other-stores-actions)
- [Pinia — Subscribing to the state](https://pinia.vuejs.org/core-concepts/state.html#Subscribing-to-the-state)
- [Vue — State Management: quando usar store](https://vuejs.org/guide/scaling-up/state-management.html)
