# Etapa 12 — Watchers e ciclo de vida

**Módulo 3 · slides 109–116 · 40 min.** Conceitos “Instância e Ciclo de Vida” e “watchers” da
Aula 3, com o prático 3 (tema claro/escuro) corrigido e aplicado à Todo List.

| | |
|---|---|
| Pré-requisitos | Etapa 11 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | `watch` aplicando e salvando o tema; `onMounted` + `useTemplateRef` focando o campo |
| Os alunos implementam | Salvar também a **busca** no `localStorage` com `watch` e restaurá-la ao abrir |
| Evidência de conclusão | Recarregar mantém tema e busca; o aluno explica por que isso é `watch` e não `computed` |

## O que mudou em relação à etapa 11

| Arquivo | Mudança |
|---|---|
| `src/utils/tema.js` | **Novo.** `lerTemaSalvo`, `salvarTema`, `temaDoSistema`, `aplicarTema` (JavaScript comum, com `try/catch`) |
| `src/App.vue` | Botão de tema com `aria-pressed`; `watch(temaEscuro, …)`; `onMounted` foca o campo via `useTemplateRef` |

O `main.css` (desde a etapa 08) já define as cores com `light-dark()` e respeita `data-tema` no
`<html>`: sem escolha salva, vale a preferência do sistema.

## Roteiro

### Conhecer

| | `computed` | `watch` |
|---|---|---|
| Para quê | **Calcular** um valor a partir do estado | **Executar um efeito** quando o estado muda |
| Retorna | Um valor (somente leitura) | Nada; roda uma função |
| Exemplo | `visiveis`, `concluidas` | Gravar no `localStorage`, mudar o `<html>`, chamar uma API |

- Opções do `watch`: `{ immediate: true }` (roda já na criação) e `{ deep: true }` (observa
  mudanças **dentro** de objetos/arrays). Nesta Todo List as ações trocam o array inteiro (`map`,
  `filter`), então um `watch` simples já percebe.
- **Ciclo de vida:** `setup` (o código do `<script setup>`) → montagem → `onMounted` → atualizações
  (`onUpdated`) → `onUnmounted`. O DOM do componente só existe a partir de `onMounted`.
- **Refs de template:** `ref="campoTitulo"` no elemento + `useTemplateRef('campoTitulo')` no script.

### Executar

1. Alterne o tema, recarregue: a escolha continua. Em **Application › Local Storage** veja
   `todo-list:tema`. Apague a chave e recarregue: volta a seguir o sistema.
2. Recarregue a página: o cursor já está no campo “Nova tarefa” (`onMounted`).
3. **Prática:** crie `CHAVE_BUSCA`, inicialize `busca` com o valor salvo e use `watch(busca, …)`
   para gravá-lo. Use `try/catch` como em `utils/tema.js`.

### Entender

- **Ordem real:** coloque `console.log('setup')` no topo do script, `console.log('montado')` dentro
  do `onMounted` e `console.log('campo no setup:', campoTitulo.value)` logo após o
  `useTemplateRef`. O Console mostra `setup`, `campo no setup: null`, depois `montado`. Retire os
  logs.
- **Por que não `computed` para salvar:** gravar no `localStorage` é efeito colateral; `computed`
  deve só calcular (etapa 11).
- **Acessibilidade:** o botão de tema tem nome fixo (“Tema escuro”) e informa o estado com
  `aria-pressed`. Foco automático só faz sentido quando o campo é a ação principal da página.
- **Investigação:** troque `onMounted(() => …)` por chamar `campoTitulo.value.focus()` direto no
  setup. O Console mostra `TypeError: Cannot read properties of null (reading 'focus')`: o
  elemento ainda não existe.

### Pesquisar

- [Vue — Watchers](https://vuejs.org/guide/essentials/watchers.html)
- [Vue — Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html) (diagrama)
- [Vue — Template Refs](https://vuejs.org/guide/essentials/template-refs.html)
- [MDN — prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) · [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)

## Checklist do dev frontend

- [ ] **Conhecer:** `watch` (e `immediate`/`deep`), hooks de ciclo de vida, refs de template
- [ ] **Executar:** persistir uma preferência e restaurá-la; focar um elemento depois de montar
- [ ] **Entender:** `computed` calcula, `watch` executa efeitos; o DOM só existe após a montagem
- [ ] **Pesquisar:** ler o diagrama de ciclo de vida da documentação

## Origem e correções

- Prático 3 original: alterna uma classe no `<body>` sem considerar a preferência do sistema, sem
  informar o estado do botão a leitores de tela e sem lembrar a escolha. Aqui: `prefers-color-scheme`
  como ponto de partida, `aria-pressed`, `localStorage` com tratamento de erro.
