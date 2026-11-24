# Etapa 06 — A web em três camadas e o DOM (JavaScript puro)

**Módulo 3 · slides 61–68 · 40 min.** Revisão compacta das Aulas 1 e 2: de onde a página vem,
quem cuida de quê (HTML, CSS, JS) e o que significa desenhar a tela a partir de dados. Termina no
problema que motiva os frameworks: manter estado e tela em sincronia.

| | |
|---|---|
| Pré-requisitos | Módulo 2 (blocos 1–3): arquivo × servidor, Elements, Console, Network |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | Network com as três requisições; `estado → render()`; o defeito de `investigacao-sincronia/` |
| Os alunos implementam | Uma ação nova (ex.: “Concluir todas”) usando estado + `render()`; ajuste de Flexbox |
| Evidência de conclusão | A ação nova funciona e o resumo continua certo; o aluno explica por que chamou `render()` |

## Arquivos

| Arquivo | Camada | Papel |
|---|---|---|
| `index.html` | Estrutura | Título, resumo, formulário e uma `<ul>` **vazia** |
| `estilos.css` | Apresentação | Tokens de cor e Flexbox (container × itens) na linha da tarefa e do formulário |
| `app.js` | Comportamento | Estado (array `tarefas`), `render()`, validação e eventos |
| `investigacao-sincronia/` | — | Mesma página **sem** `render()`: cada ação atualiza a tela à mão e uma delas esquece um pedaço |

## Executar

Duplo clique em `index.html` já funciona. Para observar requisições, sirva a pasta:

```bash
cd etapas/06-dom-imperativo
node ../ferramentas/servidor-local.mjs
```

Abra `http://localhost:8088/` e o painel **Network** (recarregue com ele aberto).

## Roteiro

### Conhecer

- **Cliente e servidor:** o navegador pede (*request*) e recebe (*response*) `index.html`; ao ler
  o HTML, pede `estilos.css` e `app.js`. O frontend é **entregue** por um servidor, mas
  **executa** no navegador. Backend é o código que executa no servidor (a partir da etapa 18, o
  json-server responde `GET /tarefas` com JSON).
- **Três camadas:** HTML = estrutura, CSS = apresentação, JS = comportamento.
- **DOM:** a árvore de objetos que o navegador monta a partir do HTML. O JavaScript altera o DOM,
  não o arquivo (Elements mostra o DOM; o editor mostra o arquivo).
- **Flexbox:** `display: flex` torna um elemento **container**; seus filhos diretos viram
  **itens**. `gap`, `align-items`, `justify-content` e `flex: 1` organizam a linha da tarefa.

### Executar

1. Network: conte as requisições e identifique o tipo de cada uma (document, stylesheet, script).
2. Leia `render()` e responda: o que a tela mostra é cópia de quê?
3. **Prática:** acrescente um botão “Concluir todas” que crie um novo array com todas as tarefas
   concluídas e chame `render()`. Depois, em `estilos.css`, troque `justify-content` da `.tarefa`
   e explique o efeito.

### Entender

- **Modelo:** ação → muda o estado → `render()` redesenha → tela. A tela é uma *consequência* do
  estado. Quem garante isso é você, chamando `render()` em todo lugar certo.
- **Investigação** (`investigacao-sincronia/index.html`): remova uma tarefa. O resumo está certo?
  No Console, compare `tarefas.length` com o texto do resumo. Hipótese → evidência → correção.
- **Custo escondido:** `render()` recria todos os `<li>`. Use <kbd>Tab</kbd> até uma caixa e
  marque com <kbd>Espaço</kbd>: o foco some, porque o elemento focado foi substituído.

### Pesquisar

- [MDN — How the web works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)
- [MDN — Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN — Basic concepts of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)
- [MDN — Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) (por que não `innerHTML` com texto do usuário)

## Checklist do dev frontend

- [ ] **Conhecer:** request/response; estrutura × apresentação × comportamento; DOM; container × itens
- [ ] **Executar:** ler o Network; criar elementos com `createElement`/`textContent`; tratar `submit`
- [ ] **Entender:** por que a tela fica errada quando o estado muda e ninguém redesenha
- [ ] **Pesquisar:** achar a propriedade Flexbox certa na MDN sem decorar

## Desafios opcionais (casa)

- **Tema claro/escuro** (prático 3 original, corrigido): um botão com `aria-pressed` que alterna
  `data-tema` no `<html>`; respeite `prefers-color-scheme` como ponto de partida.
- **Validação** (prático 4 original, corrigido): use `classList.toggle` em vez de
  `className = ''` (que apaga as outras classes) e `aria-invalid` + `aria-describedby` para
  leitores de tela.
