# Etapa 13 — Componentes: props e eventos

**Módulo 3 · slides 117–124 · 40 min.** Aula 4 (“Components: what about big apps?” e o
`HelloWorld` com a prop `msg`) aplicada à Todo List: o `App.vue` da etapa 12 é dividido em
componentes com responsabilidades claras.

| | |
|---|---|
| Pré-requisitos | Etapa 12 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | Extrair `TarefaItem` (prop `tarefa`, eventos `alternar`/`remover`); Vue DevTools com a árvore e a Timeline de eventos |
| Os alunos implementam | Extrair `TarefaForm` (prop `titulosExistentes`, evento `criar`) e conferir que nada mudou para o usuário |
| Evidência de conclusão | Criar, concluir, remover e validar funcionam igual à etapa 12; o aluno desenha a árvore e marca props (↓) e eventos (↑) |

## O que mudou em relação à etapa 12

| Arquivo | Mudança |
|---|---|
| `src/components/TarefaItem.vue` | **Novo.** Recebe `tarefa` (prop); emite `alternar` e `remover` com o id |
| `src/components/TarefaForm.vue` | **Novo.** Estado local do campo, validação, `onMounted` do foco; recebe `titulosExistentes`, emite `criar` |
| `src/App.vue` | Dono da lista; passa props, ouve eventos; filtros e tema continuam aqui |

## Roteiro

### Conhecer

```text
App.vue  (dono: tarefas, busca, situacao, tema)
├── TarefaForm   ↓ titulosExistentes      ↑ criar(titulo)
└── TarefaItem×n ↓ tarefa                 ↑ alternar(id) · remover(id)
```

- **Componente:** um `.vue` com estrutura, comportamento e aparência próprios, usado como tag
  (`<TarefaItem />`). Com `<script setup>`, importar já basta para usar.
- **`defineProps`:** declara o que o componente recebe (tipo, obrigatório, valor padrão). No
  template do pai, `:titulos-existentes` (kebab-case) chega como `titulosExistentes`.
- **`defineEmits`:** declara os eventos que o componente pode emitir; o pai ouve com `@nome`.
- **Fluxo em um sentido:** dados descem por props; pedidos de mudança sobem por eventos.

### Executar

1. Vue DevTools › Components: veja a árvore `App → TarefaForm, TarefaItem…` e as props de cada um.
2. Vue DevTools › Timeline (Component events): conclua uma tarefa e veja `alternar` sair do item.
3. **Prática:** partindo do `App.vue` da etapa 12, extraia o formulário. Pergunta-guia: que dados o
   formulário **precisa receber** e que **pedido** ele faz ao pai?

### Entender

- **Por que o item não muda a tarefa:** se cada filho alterasse os dados, haveria vários lugares
  mudando a mesma lista — o problema de sincronia da etapa 06 de volta. Um dono, muitas leituras.
- **Estado local × estado do pai:** o texto sendo digitado só interessa ao formulário (fica nele);
  a lista interessa a todos (fica no `App`).
- **Investigação 1 — alterar prop:** em `TarefaItem`, troque o `emit('alternar', …)` por
  `tarefa.concluida = !tarefa.concluida`. O lint acusa `vue/no-mutating-props`. O Vue não impede a
  escrita em propriedades **internas** do objeto (só avisa quando se tenta trocar a prop inteira),
  e o pai passa a ter dados mudados sem saber. Desfaça.
- **Investigação 2 — evento com nome errado:** no `App`, troque `@remover` por `@excluir`. Nada
  acontece ao clicar, sem erro no Console. A Timeline mostra que `remover` foi emitido — só que
  ninguém ouvia. Desfaça.

### Pesquisar

- [Vue — Components Basics](https://vuejs.org/guide/essentials/component-basics.html)
- [Vue — Props](https://vuejs.org/guide/components/props.html) (“One-Way Data Flow”, validação)
- [Vue — Component Events](https://vuejs.org/guide/components/events.html)

## Checklist do dev frontend

- [ ] **Conhecer:** componente, `defineProps`, `defineEmits`, kebab-case × camelCase
- [ ] **Executar:** extrair um componente sem mudar o comportamento; inspecionar a árvore no DevTools
- [ ] **Entender:** fluxo em um sentido; onde cada estado deve morar
- [ ] **Pesquisar:** validação de props (tipo, `required`, `default`) na documentação

## Origem e correções

- Teórico 5 original lista props, eventos, `provide`/`inject` e Pinia como formas de comunicação.
  Correto; nesta etapa ficam props e eventos. `provide`/`inject` é citado na etapa 14 e Pinia é a
  etapa 15.
