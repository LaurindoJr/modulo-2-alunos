# Etapa 16 — Vue Router: rotas, `RouterLink` e `RouterView`

**Unidade 5 · slides 141–148 · 40 min.** O roteador assume o que a etapa 15 fazia à mão. O endereço
passa a dizer em que tela estamos: dá para recarregar, enviar o link e usar os botões Voltar e
Avançar. E, como o `RouterView` não passa props, o estado sai da árvore de componentes e vai para um
composable — a primeira forma de estado compartilhado do curso.

| | |
|---|---|
| Pré-requisitos | Etapa 15 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | `createRouter`/`createWebHistory`; `app.use(router)`; `RouterLink`/`RouterView`; o Network sem novos documentos |
| Os alunos implementam | A rota `/resumo`, o link no topo e a classe do link ativo |
| Evidência de conclusão | Navegar muda o endereço com **zero** requisições de documento no Network; F5 em `/resumo` abre o Resumo |

## O que mudou em relação à etapa 15

| Arquivo | Mudança |
|---|---|
| `src/router/index.js` | **Novo.** A tabela endereço → tela |
| `src/composables/useTarefas.js` | **Novo.** O estado sai do `App.vue` e passa a ser compartilhado |
| `src/main.js` | `.use(router)` antes do `.mount('#app')` |
| `src/App.vue` | Os botões viram `RouterLink`; o `v-if` vira `RouterView`; sobrou o topo e o tema |
| `src/views/*.vue` | Deixam de receber props: chamam `useTarefas()` |
| `package.json` | `vue-router` nas dependências |

## Roteiro

### Conhecer

```js
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'lista', component: ListaView },
    { path: '/resumo', name: 'resumo', component: SobreView },
  ],
})
```

- **`createWebHistory`** usa a History API: o endereço muda sem recarregar.
- **`RouterLink`** vira um `<a href>` de verdade (dá para copiar e abrir em outra aba), mas o clique
  é interceptado para não recarregar a página.
- **`RouterView`** é o buraco onde a tela do endereço atual é desenhada.
- **Por que um composable?** Porque o `RouterView` decide sozinho qual componente desenhar — não há
  onde pendurar props. Os `ref` ficam **fora** da função, no módulo: carregado uma vez, todos
  recebem os mesmos refs. Na Unidade 7 isso vira uma store do Pinia.

### Executar

```bash
npm ci
npm run dev
```

1. Abrir o Network, marcar **Doc** e navegar entre as telas: nenhuma requisição nova.
2. Copiar `http://localhost:5173/resumo`, abrir em outra aba: o Resumo abre direto.
3. Usar Voltar e Avançar do navegador.
4. Criar uma tarefa na Lista, ir ao Resumo e voltar: a tarefa continua lá (o estado é do módulo).

### Entender

- **Ativo × exatamente ativo:** o Vue Router põe duas classes no link da tela atual.
  `router-link-active` acende também quando a rota atual é **filha** da rota do link (rotas
  aninhadas); `router-link-exact-active`, só no casamento exato. Com as rotas planas desta etapa as
  duas coincidem (verificado: em `/resumo`, o link `/` fica sem classe nenhuma) — o estilo usa a
  exata porque é a que continua certa quando houver rotas aninhadas. O `aria-current="page"` vem
  junto, de graça.
- **O F5 funciona no `npm run dev`, e quebra em produção.** É a investigação da etapa: o Vite
  devolve o `index.html` para qualquer endereço, mas um servidor estático comum procura um arquivo
  chamado `resumo` e não acha. Verificado com o servidor do próprio curso:

  ```text
  GET /        → 200 text/html
  GET /resumo  → 404 "Arquivo não encontrado: /resumo"
  ```

  As duas saídas: configurar o servidor para devolver `index.html` em qualquer caminho, ou trocar
  para `createWebHashHistory` (endereços com `#/resumo`, que o servidor nunca vê — verificado: 200).

### Pesquisar

- [Vue Router — Getting Started](https://router.vuejs.org/guide/)
- [RouterLink API](https://router.vuejs.org/api/#RouterLink) (classes `active` e `exact-active`)
- [HTML5 History Mode — configuração do servidor](https://router.vuejs.org/guide/essentials/history-mode.html)
