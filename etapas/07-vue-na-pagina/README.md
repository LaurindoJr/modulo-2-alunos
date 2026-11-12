# Etapa 07 — Frameworks e Vue direto na página

**Módulo 3 · slides 69–76 · 40 min.** Aula 3 (panorama dos frameworks) e início da Aula 4
(“Vue é progressivo”). A Todo List da etapa 06 ganha Vue **numa parte da página**, sem npm e sem
build, e o defeito de sincronia desaparece.

| | |
|---|---|
| Pré-requisitos | Etapa 06 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | Incluir o Vue, montar em `#app`, trocar `render()` por template; DevTools com avisos do Vue |
| Os alunos implementam | “Concluir todas” na versão Vue (só muda o estado) e comparação linha a linha com a etapa 06 |
| Evidência de conclusão | Remover uma tarefa atualiza lista **e** resumo sem nenhuma chamada de redesenho |

## Arquivos

| Arquivo | Papel |
|---|---|
| `index.html` | O `<h1>` é HTML comum; a `<section id="app">` é o **template** que o Vue controla |
| `app.js` | `createApp({ setup })`: estado com `ref`, ações que só mudam o estado, `.mount('#app')` |
| `estilos.css` | O da etapa 06 + `[v-cloak]` |
| `vendor/vue.global.js` | Vue 3.5.44 (build global de desenvolvimento) — ver `vendor/LEIAME.md` |

## Executar

Duplo clique em `index.html` (funciona via `file://`). Abra o Console: o build de
desenvolvimento avisa quando algo no template não existe.

## Roteiro

### Conhecer

**Ferramentas por papel** (correção da Aula 3, que misturava categorias):

| Papel | Exemplos | O que faz |
|---|---|---|
| Framework de UI | Vue, Angular, Svelte; React (se define como *biblioteca*) | Componentes, template/JSX, reatividade |
| Meta-framework | Nuxt (Vue), Next.js (React) | Rotas por arquivo, renderização no servidor, convenções de projeto |
| Componentes / CSS | Vuetify, Bootstrap, Tailwind CSS | Aparência e componentes prontos; não gerenciam estado |
| Build | Vite, webpack | Servidor de desenvolvimento e pacote de produção (Módulo 2, bloco 5) |

**Progressivo** (anotação original da Aula 4): dá para começar renderizando só uma parte de uma
página existente — é o que esta etapa faz — e crescer até uma aplicação completa com build.

**Os 13 conceitos da Aula 3 e onde aparecem na Todo List:**

| Conceito | Etapa |
|---|---|
| Template Syntax · Reatividade | 07 (prévia), 09 |
| Instância e Ciclo de Vida | 08 (`createApp`/`mount`), 12 (hooks) |
| Diretivas | 07 (prévia), 10, 11 |
| Componentes, props, eventos e slots | 13, 14 |
| Computed e watchers | 11, 12 |
| Formulários e validação | 11 |
| Gerenciamento de estado | 15 (Pinia) |
| Comunicação com APIs | 16 |
| Roteamento | 17 |
| Testes | 18 |
| Build e deploy · Performance | Módulo 2 (bloco 5), 08 |

### Executar

1. Compare `app.js` desta etapa com o da 06: o que sumiu? (`createElement`, `render()`,
   `replaceChildren`.) O que apareceu? (`ref`, `.value`, `return { … }`.)
2. Leia o template em `index.html`: `{{ }}`, `v-for`, `:key`, `:class`, `@click`, `v-model`. Cada
   um será detalhado nas etapas 09–11; aqui, só reconheça o que cada um substitui no JS puro.
3. **Prática:** acrescente “Concluir todas” **só mudando o estado** e confira que lista e resumo
   acompanham.

### Entender

- **Imperativo × declarativo:** na 06 você dizia *como* mudar a tela (crie este `li`, troque este
  texto). Aqui você declara *o que* a tela é em função do estado; o Vue calcula as mudanças.
- **Foco:** repita o teste da 06 (<kbd>Tab</kbd> até uma caixa, <kbd>Espaço</kbd>). O foco
  permanece: o Vue atualiza o elemento existente em vez de recriar a lista inteira.
- **Investigação:** troque `contarConcluidas()` por `contarConcluida()` no HTML e recarregue. Leia
  o aviso no Console (“Property … was accessed during render but is not defined”) e a mensagem de
  erro. Volte ao nome certo.
- **Limites do template no HTML:** o navegador lê o HTML **antes** do Vue (por isso `v-cloak`), e
  nomes em maiúsculas viram minúsculas. Arquivos `.vue` + build (etapa 08) resolvem isso.

### Pesquisar

- [Vue — Introduction](https://vuejs.org/guide/introduction.html) (o que é “progressivo”)
- [Vue — Quick Start: Using Vue from CDN](https://vuejs.org/guide/quick-start.html#using-vue-from-cdn)
- [Vue — in-DOM Template Parsing Caveats](https://vuejs.org/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)
- [State of JavaScript](https://stateofjs.com/) — leia como **pesquisa com respondentes
  voluntários**: mostra uso e satisfação entre quem respondeu, não participação de mercado.

## Checklist do dev frontend

- [ ] **Conhecer:** classificar uma ferramenta pelo papel (UI, meta-framework, componentes/CSS, build)
- [ ] **Executar:** montar Vue em parte de uma página com `createApp(...).mount(...)`
- [ ] **Entender:** imperativo × declarativo; por que o defeito de sincronia some
- [ ] **Pesquisar:** ler um aviso do Vue no Console e achar a página da documentação correspondente

## Origem e correções

- O exemplo da Aula 4 (`new Vue({ el: '#example-1', data: … })`, post de 2015) é sintaxe do
  Vue 1/2. Equivalente no Vue 3: `Vue.createApp({ setup() { … } }).mount('#example-1')`.
- A divisão “Desenvolvimento frontend / User Interface / Build” da Aula 3 foi refinada na tabela
  acima (meta-framework e biblioteca de componentes são papéis diferentes).
