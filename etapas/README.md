# Construção guiada da Todo List — etapas numeradas

Esta pasta reúne as atividades práticas que a turma constrói ao longo dos Módulos 2 e 3.

Cada etapa é um estado executável e independente. Quem perder uma aula pode continuar a partir da
pasta seguinte. Cada `README.md` separa **o que o professor demonstra** do **que os alunos
implementam** e indica a evidência observável de conclusão.

## Módulo 2 — ambientes, ferramentas e dependências

| Etapa | Bloco / slides | O que a turma monta | Evidência de conclusão |
|---|---|---|---|
| `01-pagina-estatica` | Bloco 1 (1–12) | Alterar título e tarefas de uma página HTML/CSS/JS | Texto alterado após salvar e recarregar; explicação de onde a mudança existe |
| `02-erros-controlados` | Bloco 2 (13–24) | Localizar três defeitos com Network, Console e breakpoint | Registro hipótese → evidência → correção para cada defeito |
| `03-node-tarefas` | Bloco 3 (25–36) | Executar o mesmo cálculo no navegador e no Node; módulos | Mesma contagem nos dois ambientes; erro de `document` explicado |
| `04-dependencias-scripts` | Bloco 4 (37–48) | Manifesto, dependência, ferramenta local, scripts, `npm ci` | Pasta restaurada sem `node_modules` com `npm ci` e `npm start` funcionando |
| `05-vue-inicial` | Bloco 5 (49–60) | Projeto create-vue, `App.vue` estático, build | Lista visível no navegador; `dist/` gerado e explicado |

## Módulo 3 — do DOM ao Vue, parte por parte (etapas de 40 min)

Cada etapa segue o roteiro **Conhecer → Executar → Entender → Pesquisar** (checklist em
`../materiais/mapa-dev-frontend-modulo-3.md`).

| Etapa | Slides | O que a turma monta | Evidência de conclusão |
|---|---|---|---|
| `06-dom-imperativo` | 61–68 | Lista desenhada a partir de um array em JS puro; Flexbox | Ação nova com estado + `render()`; defeito de sincronia explicado com o Console |
| `07-vue-na-pagina` | 69–76 | Vue montado em parte da página, sem build | Lista e resumo atualizados sem chamada de redesenho |
| `08-projeto-sfc` | 77–84 | Leitura do projeto: `index.html → main.js → App.vue`; global × `scoped` | As duas regras de estilo apontadas no Elements; tela em branco diagnosticada |
| `09-template-reatividade` | 85–92 | `ref`, interpolação, `v-bind`, `v-on` | Botões mudam o estado e a tela acompanha; uso de `.value` explicado |
| `10-listas-eventos` | 93–100 | `v-for` + `:key`, `v-if`/`v-show`, `:class`, eventos | Estado vazio e restauração; `v-if` × `v-show` no Elements |
| `11-formularios-computed` | 101–108 | Formulário com validação acessível; busca e filtro com `computed` | Mensagens e `aria-invalid` corretos; filtros combinados |
| `12-watchers-ciclo-de-vida` | 109–116 | Tema salvo com `watch`; foco com `onMounted` | Tema mantido após recarregar; `computed` × `watch` justificado |
| `13-componentes-props-eventos` | 117–124 | `TarefaForm` e `TarefaItem` com props e eventos | Mesmo comportamento da etapa 12; árvore com props ↓ e eventos ↑ |
| `14-v-model-slots` | 125–132 | `AlternarTema` e `TarefaFiltros` com `v-model`; `PainelCartao` com slots | Tema e filtros por `v-model`; prop × slot explicados |

## Como usar uma etapa

Etapas 01 a 03, 06 e 07 não têm dependências: abra o `index.html` (ou rode o script) direto da
pasta. Nas etapas 04, 05 e 08 a 14, `node_modules/` não acompanha a pasta:

```bash
cd 08-projeto-sfc
npm ci
npm run dev
```

`npm ci` instala exatamente as versões de `package-lock.json` (verificadas com Node 24 LTS e npm 11).

## Ferramentas

`ferramentas/servidor-local.mjs` — servidor HTTP mínimo (só módulos nativos do Node) para observar
requisições no painel Network nas etapas 01, 02 e 06. Executar de dentro da pasta da etapa:

```bash
node ../ferramentas/servidor-local.mjs
```

Porta padrão 8088. Se estiver ocupada, a mensagem explica como escolher outra.
