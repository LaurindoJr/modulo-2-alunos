# Mapa do dev frontend — Módulo 3

O que o desenvolvedor frontend precisa **conhecer**, **executar**, **entender** e **pesquisar** em
cada etapa do Módulo 3. Use como checklist de estudo e de revisão: um item só vale quando você
consegue demonstrá-lo na etapa correspondente, rodando.

Cada etapa tem 40 minutos e 8 slides: abertura (3) · conhecer (6) · demonstração (7) · prática (10)
· modelo (5) · investigação (4) · pesquisa (3) · verificação sem IA (2).

## Etapa 06 — A web em três camadas e o DOM (slides 61–68)

- [ ] **Conhecer:** request/response; frontend entregue por servidor e executado no navegador; HTML (estrutura), CSS (apresentação), JS (comportamento); DOM; Flexbox (container × itens)
- [ ] **Executar:** ler as três requisições no Network; desenhar uma lista com `createElement` e `textContent`; tratar `submit` com `preventDefault`
- [ ] **Entender:** por que a tela fica errada quando o estado muda e ninguém chama `render()` (defeito de `investigacao-sincronia/`)
- [ ] **Pesquisar:** [How the web works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works) · [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) · [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)

## Etapa 07 — Frameworks e Vue direto na página (slides 69–76)

- [ ] **Conhecer:** ferramentas por papel (framework de UI, meta-framework, componentes/CSS, build); “progressivo”; os 13 conceitos da Aula 3 e onde cada um é estudado
- [ ] **Executar:** montar o Vue numa parte da página com `createApp({ setup }).mount('#app')`
- [ ] **Entender:** imperativo × declarativo; por que o defeito de sincronia desaparece; limites do template escrito no HTML
- [ ] **Pesquisar:** ler um `[Vue warn]` e achar a seção correspondente em [vuejs.org](https://vuejs.org/guide/introduction.html); ler o State of JS como pesquisa com respondentes voluntários

## Etapa 08 — Anatomia do projeto e do `.vue` (slides 77–84)

- [ ] **Conhecer:** papel de `index.html`, `main.js`, `App.vue`, `vite.config.js`, `package.json`; os três blocos de um SFC
- [ ] **Executar:** `npm ci` e `npm run dev`; observar HMR; achar `App.vue` transformado em JavaScript no Network
- [ ] **Entender:** por que `#app` está vazia no arquivo e cheia no DOM; estilo global × `scoped` (`data-v-…`)
- [ ] **Pesquisar:** [Creating an Application](https://vuejs.org/guide/essentials/application.html) · [SFC](https://vuejs.org/guide/scaling-up/sfc.html) · [SFC CSS Features](https://vuejs.org/api/sfc-css-features.html)

## Etapa 09 — Template e reatividade (slides 85–92)

- [ ] **Conhecer:** interpolação (só expressões), `v-bind`/`:`, `v-on`/`@`, `ref`, `.value`, `ref` × `reactive`
- [ ] **Executar:** ligar atributo e evento ao estado; observar o estado no Vue DevTools
- [ ] **Entender:** leitura registra dependência, escrita agenda atualização; DOM atualizado em lote (`nextTick`)
- [ ] **Pesquisar:** [Template Syntax](https://vuejs.org/guide/essentials/template-syntax.html) · [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) · [Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)

## Etapa 10 — Listas, condicionais e eventos (slides 93–100)

- [ ] **Conhecer:** `v-for` + `:key`, `v-if`/`v-else`, `v-show`, `:class`, eventos com argumento, modificadores
- [ ] **Executar:** desenhar, concluir e remover itens a partir de um array (com arrays novos)
- [ ] **Entender:** por que a chave é o id; custo de `v-if` × `v-show`; por que `v-if` e `v-for` não vão no mesmo elemento
- [ ] **Pesquisar:** [List Rendering](https://vuejs.org/guide/essentials/list.html) · [Conditional Rendering](https://vuejs.org/guide/essentials/conditional.html) · [Event Handling](https://vuejs.org/guide/essentials/event-handling.html) · páginas das regras `vue/…` do [eslint-plugin-vue](https://eslint.vuejs.org/rules/)

## Etapa 11 — Formulários e `computed` (slides 101–108)

- [ ] **Conhecer:** `v-model` em texto, rádio e select; `.trim`/`.number`/`.lazy`; `@submit.prevent`; `computed`
- [ ] **Executar:** formulário com validação acessível (`aria-invalid`, `aria-describedby`, `role="alert"`); lista filtrada por busca e situação
- [ ] **Entender:** `v-model` = `:value` + `@input`; cache do `computed` × método; um valor derivado não vai num `ref`; `computed` sem efeitos colaterais
- [ ] **Pesquisar:** [Form Input Bindings](https://vuejs.org/guide/essentials/forms.html) · [Computed Properties](https://vuejs.org/guide/essentials/computed.html) · [MDN — aria-invalid](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid)

## Etapa 12 — Watchers e ciclo de vida (slides 109–116)

- [ ] **Conhecer:** `watch` (e `immediate`/`deep`), hooks de ciclo de vida, refs de template (`useTemplateRef`)
- [ ] **Executar:** persistir uma preferência no `localStorage` com tratamento de erro; focar um elemento depois de montar
- [ ] **Entender:** `computed` calcula, `watch` executa efeitos; o DOM só existe a partir de `onMounted`
- [ ] **Pesquisar:** [Watchers](https://vuejs.org/guide/essentials/watchers.html) · [Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html) · [Template Refs](https://vuejs.org/guide/essentials/template-refs.html) · [MDN — light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)

## Etapa 13 — Componentes: props e eventos (slides 117–124)

- [ ] **Conhecer:** componente, `defineProps` (tipo, `required`, `default`), `defineEmits`, kebab-case × camelCase
- [ ] **Executar:** extrair um componente sem mudar o comportamento; inspecionar a árvore e os eventos no Vue DevTools
- [ ] **Entender:** fluxo em um sentido; onde cada estado deve morar (local × dono)
- [ ] **Pesquisar:** [Components Basics](https://vuejs.org/guide/essentials/component-basics.html) · [Props](https://vuejs.org/guide/components/props.html) · [Component Events](https://vuejs.org/guide/components/events.html)

## Etapa 14 — `v-model` em componente, slots e revisão (slides 125–132)

- [ ] **Conhecer:** `defineModel`, `v-model` nomeado, slot padrão, nomeado e conteúdo de reserva; `provide`/`inject` (menção)
- [ ] **Executar:** um componente com `v-model` (`AlternarTema`, `TarefaFiltros`) e outro com slots (`PainelCartao`)
- [ ] **Entender:** `v-model` = prop + evento; prop passa dados, slot passa conteúdo; por que o prático 5 original não sincroniza
- [ ] **Pesquisar:** [Component v-model](https://vuejs.org/guide/components/v-model.html) · [Slots](https://vuejs.org/guide/components/slots.html) · [WAI-ARIA APG — Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Depois do Módulo 3

Os demais conceitos da lista da Aula 3 estão nas etapas complementares: gerenciamento de estado com
Pinia (15), comunicação com API (16), roteamento (17) e testes (18). Build e deploy foram vistos no
Módulo 2 (bloco 5).
