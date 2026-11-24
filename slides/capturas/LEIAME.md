# Capturas usadas nos slides

Capturas do Módulo 2 feitas em 21/10/2026 num Mac (macOS), com Node 24.19.0, npm 11.17.0,
create-vue 3.24.0, Vite 8.3.5 e Chrome 155. Caminhos pessoais foram abreviados para `~`; a pasta
do pacote aparece como `~/modulo-2`.

| Pasta | Conteúdo |
|---|---|
| `telas/` | Imagens PNG das etapas e do projeto |
| `terminal/` | Saídas de terminal em texto; `indice.json` registra pasta, comando, código de saída e notas |
| `navegador/` | Console, Network, DOM e valores em breakpoint |
| `codigo/` | Diferenças entre versões de arquivos (`diff -u`) |

Processos longos (`npm run dev`, `npm run preview`, nodemon, `node --watch`) foram interrompidos
após alguns segundos, o equivalente a Ctrl+C; o detalhe está no campo `nota` de
`terminal/indice.json`. Algumas telas do VS Code e do DevTools são mostradas ao vivo em aula.

## Capturas reais e onde aparecem

| Arquivo | Slides | Descrição |
|---|---|---|
| `codigo/b1-alteracao-index.diff` | 5 | Diferença entre o arquivo antes e depois da alteração |
| `codigo/b5-alteracao-app.diff` | 54 | Diferença entre o arquivo antes e depois da alteração |
| `navegador/b1-rede-arquivo-vs-servidor.txt` | 8 | Recursos carregados com file:// e com servidor HTTP local |
| `navegador/b2-breakpoint.txt` | 21 | Valores observados em um breakpoint na linha 27 de app.js |
| `navegador/b2-console.txt` | 19 | Mensagens do Console ao carregar a etapa 02 |
| `navegador/b2-elements-lista.txt` | 21 | Itens presentes no DOM (Elements) |
| `navegador/b2-network.txt` | 22 | Requisições observadas ao carregar a etapa 02 |
| `navegador/b3-console-ambiente.txt` | 32 | ambiente.js executado no Console do Chrome |
| `navegador/b3-console-tarefas.txt` | 26 | tarefas.js executado no Console do Chrome |
| `navegador/b3-console-titulo.txt` | 32 | titulo-da-pagina.js executado no Console do Chrome |
| `navegador/b5-dist-direto-do-disco.txt` | 57 | Requisições ao abrir dist/index.html por file:// |
| `telas/b1-alterada.png` | 5 | Após editar título e uma tarefa, salvar e recarregar |
| `telas/b1-caixa-marcada.png` | 5 | Após marcar a 2ª tarefa: o resumo muda sem recarregar |
| `telas/b1-inicial.png` | 2, 5, 6, 26 | Etapa 01 aberta do disco (file://), antes da edição |
| `telas/b1-servida-http.png` | — | Mesma página servida em http://localhost:8089 |
| `telas/b1-versao-antiga.png` | 6 | Arquivo errado: versao-antiga/index.html aberto em outra aba |
| `telas/b2-correcao-1-css.png` | 23 | Depois da 1ª correção (estilos.css): estilo volta, ainda 3 tarefas e resumo parado |
| `telas/b2-correcao-2-resumo.png` | 23 | Depois da 2ª correção (#contador): resumo aparece, ainda 3 tarefas |
| `telas/b2-corrigida.png` | 18, 23 | Versão corrigida: 4 tarefas, estilo e resumo |
| `telas/b2-defeituosa.png` | 13 | Etapa 02 com os três defeitos (servida em localhost:8088) |
| `telas/b2-elements-alterado.png` | 18 | Alteração feita no documento carregado (equivalente a editar no Elements) |
| `telas/b2-elements-recarregado.png` | 18 | Após recarregar: a alteração desapareceu, o arquivo não mudou |
| `telas/b5-app-alterado.png` | 54 | App.vue com título e lista estática, atualizado pelo servidor de desenvolvimento |
| `telas/b5-dist-direto-do-disco.png` | 57 | dist/index.html aberto direto do disco: página em branco |
| `telas/b5-preview.png` | 57 | npm run preview: o build servido em http://localhost:4173 |
| `telas/b5-projeto-gerado.png` | 52, 54 | Projeto recém-criado (opção sem código de exemplo) em npm run dev |
| `telas/e13-componentes.png` | 59 | Etapa 13 (antiga 06): componentes e reatividade em memória |

### Unidade 5 — roteamento (etapas 15 a 17), 23/11/2026

| Arquivo | Slide | Conteúdo |
|---|---|---|
| `telas/u5-e15-lista.png` | 135 | Etapa 15: Lista com as abas trocadas à mão |
| `telas/u5-e15-resumo.png` | 135 | Etapa 15: Resumo com números e barra de progresso |
| `telas/u5-e16-resumo.png` | 143 | Etapa 16: Resumo com o link ativo marcado pelo roteador |
| `telas/u5-e17-tarefa.png` | 151 | Etapa 17: tela de uma tarefa (`/tarefa/1`) |
| `telas/u5-e17-id-inexistente.png` | 151 | Etapa 17: `/tarefa/999` — a rota casou, o dado não existe |
| `telas/u5-e17-404.png` | 151 | Etapa 17: `/nao-existe` — nenhuma rota casou |
| `navegador/u5-e16-network-sem-recarga.txt` | 143 | Network, filtro Doc: zero documentos em quatro navegações |
| `terminal/u5-e16-404-servidor-estatico.txt` | 146 | `npm run build` e 404 num servidor estático |
| `navegador/u5-e17-onmounted-componente-reaproveitado.txt` | 154 | As duas versões da `TarefaView` medidas lado a lado |

Telas feitas com Chromium 1600×900 (janela de 920×760), Vue 3.5.44, Vue Router 4.6.5 e Vite 8.3.5.

### Unidade 6 — interação com APIs (etapas 18 a 20), 23/11/2026

| Arquivo | Slide | Conteúdo |
|---|---|---|
| `telas/u6-e18-lista-da-api.png` | 159 | Etapa 18: a lista com os dados vindos do json-server |
| `telas/u6-e18-api-fora-do-ar.png` | 162 | Etapa 18: a tela que mente — “Nenhuma tarefa cadastrada.” com a API desligada |
| `telas/u6-e19-carregando.png` | 167 | Etapa 19: estado de carregamento (resposta segurada por 3 s) |
| `telas/u6-e19-erro.png` | 167 | Etapa 19: mensagem de erro e botão “Tentar de novo” |
| `telas/u6-e20-lista.png` | 175 | Etapa 20: a lista carregada, antes das ações |
| `telas/u6-e20-acao-falhou.png` | 175 | Etapa 20: erro de ação acima da lista, que continua visível |
| `navegador/u6-e18-network-get-tarefas.txt` | 159, 162 | O `GET`, o tipo do id e a falha com a API desligada |
| `terminal/u6-e19-catch-sem-await.txt` | 170 | O `try`/`catch` sem `await` que não pega a falha |
| `navegador/u6-e20-crud-network.txt` | 175 | `POST`, `PATCH`, `DELETE`, o id do servidor e a ação que falha |

### Unidade 7 — gerenciamento de estado (etapas 21 a 23), 23/11/2026

| Arquivo | Slide | Conteúdo |
|---|---|---|
| `telas/u7-e21-com-storetorefs.png` | 183 | Etapa 21: o Resumo correto, com `storeToRefs` |
| `telas/u7-e21-sem-storetorefs.png` | 186 | Etapa 21: o Resumo congelado em zero, sem `storeToRefs` |
| `telas/u7-e23-tres-stores.png` | 199 | Etapa 23: filtro ativo, lista vinda de duas stores |
| `navegador/u7-e21-storetorefs.txt` | 186 | As duas versões medidas lado a lado |
| `navegador/u7-e22-getter-cache.txt` | 191 | Getter 0 × função 5, nas mesmas cinco teclas |
| `navegador/u7-e22-reset-setup-store.txt` | 194 | A mensagem real do `$reset` numa setup store |

Capturas com Pinia 3.0.4.

Capturas com json-server 1.0.0-beta.15 e Axios 1.21.1. Os estados de carregamento e de erro foram
provocados segurando ou abortando a requisição no navegador — o equivalente ao Slow 3G e ao Ctrl+C
no terminal da API.
| `terminal/b1-servidor-local.txt` | 8 | Saída real do servidor local |
| `terminal/b2-porta-ocupada.txt` | 58 | `node ../ferramentas/servidor-local.mjs` (saída 1) |
| `terminal/b2-servidor-local.txt` | 22 | Saída real do servidor local |
| `terminal/b3-ambiente.txt` | 32 | `node ambiente.js` (saída 0) |
| `terminal/b3-comando-inexistente-zsh.txt` | 30 | `nodee tarefas.js` (saída 127) |
| `terminal/b3-comando-inexistente.txt` | 30 | `nodee tarefas.js` (saída 127) |
| `terminal/b3-commonjs.txt` | 34 | `node resumo.cjs` (saída 0) |
| `terminal/b3-document.txt` | 32 | `node titulo-da-pagina.js` (saída 1) |
| `terminal/b3-esm.txt` | 34 | `node resumo.mjs` (saída 0) |
| `terminal/b3-incoerente.txt` | 34 | `node resumo.cjs` (saída 1) |
| `terminal/b3-pasta-errada.txt` | 30 | `node tarefas.js` (saída 1) |
| `terminal/b3-tarefas.txt` | 30 | `node tarefas.js` (saída 0) |
| `terminal/b3-versoes.txt` | 28 | `node --version && npm --version` (saída 0) |
| `terminal/b3-which-node.txt` | 29 | `command -v node && echo $PATH | tr ':' '\n' | grep -n node` (saída 0) |
| `terminal/b4-antes-de-instalar.txt` | 40, 45 | `node relatorio.js` (saída 1) |
| `terminal/b4-audit.txt` | 43 | `npm audit` (saída 1) |
| `terminal/b4-ci-incoerente.txt` | 47 | `npm pkg set dependencies.picocolors="1.0.1" && npm ci` (saída 1) |
| `terminal/b4-contagem-node-modules.txt` | 42 | `ls node_modules | wc -l` (saída 0) |
| `terminal/b4-descartavel-instalar.txt` | 42 | `npm install dayjs && npm pkg get dependencies` (saída 0) |
| `terminal/b4-descartavel-remover.txt` | 42 | `npm uninstall dayjs && npm pkg get dependencies` (saída 0) |
| `terminal/b4-exata.txt` | 44 | `npm view picocolors version && npm ls picocolors` (saída 0) |
| `terminal/b4-explain-chokidar.txt` | 42 | `npm explain chokidar` (saída 0) |
| `terminal/b4-install-nodemon.txt` | 43 | `npm install --save-dev nodemon` (saída 0) |
| `terminal/b4-install-picocolors.txt` | 40 | `npm install picocolors` (saída 0) |
| `terminal/b4-lock-picocolors.txt` | 40 | `grep -A 6 '"node_modules/picocolors"' package-lock.json` (saída 0) |
| `terminal/b4-ls-apos.txt` | 40 | `ls && ls node_modules` (saída 0) |
| `terminal/b4-ls-depth0.txt` | 42 | `npm ls --depth=0` (saída 0) |
| `terminal/b4-ls-inicial.txt` | — | `ls` (saída 0) |
| `terminal/b4-manifesto-apos.txt` | 40 | `cat package.json` (saída 0) |
| `terminal/b4-manifesto-final.txt` | — | `cat package.json` (saída 0) |
| `terminal/b4-npm-ci.txt` | 47 | `npm ci` (saída 0) |
| `terminal/b4-npm-init.txt` | 38 | `npm init -y` (saída 0) |
| `terminal/b4-npm-run-dev-nativo.txt` | 43 | `npm run dev:nativo` (saída 0) |
| `terminal/b4-npm-run-dev.txt` | 43 | `npm run dev` (saída 0) |
| `terminal/b4-npm-run-lista.txt` | 43 | `npm run` (saída 0) |
| `terminal/b4-npm-sem-run.txt` | 48 | `npm relatorio:nativo` (saída 1) |
| `terminal/b4-npm-start-restaurado.txt` | 47 | `npm start` (saída 0) |
| `terminal/b4-npm-start.txt` | — | `npm start` (saída 0) |
| `terminal/b4-pkg-set.txt` | 43 | `npm pkg set scripts.start="node relatorio.js" scripts.dev="nodemon relatorio.js" scripts.dev:nativo="node --watch relatorio.js" && npm pkg delete scripts.test && npm pkg get scripts` (saída 0) |
| `terminal/b4-relatorio-nativo.txt` | 41 | `node relatorio-nativo.js` (saída 0) |
| `terminal/b4-relatorio.txt` | 40 | `node relatorio.js` (saída 0) |
| `terminal/b4-remover-node-modules.txt` | 37, 47 | `rm -rf node_modules && npm start` (saída 1) |
| `terminal/b4-script-inexistente.txt` | 45 | `npm run inicio` (saída 1) |
| `terminal/b5-create-vue-interativo.txt` | 51, 52 | Saída real do servidor local |
| `terminal/b5-dist-sem-servidor.txt` | — | `grep -o 'src="[^"]*"' dist/index.html` (saída 0) |
| `terminal/b5-dist.txt` | 57 | `find dist -type f | sort && head -c 600 dist/index.html` (saída 0) |
| `terminal/b5-estrutura.txt` | 53 | `find . -type f -not -path './node_modules/*' | sort` (saída 0) |
| `terminal/b5-npm-install.txt` | 52 | `npm install` (saída 0) |
| `terminal/b5-npm-run-build.txt` | 57 | `npm run build` (saída 0) |
| `terminal/b5-npm-run-dev.txt` | 52 | `npm run dev` (saída 0) |
| `terminal/b5-npm-run-lint.txt` | — | `npm run lint` (saída 0) |
| `terminal/b5-npm-run-preview.txt` | 57 | `npm run preview` (saída 0) |
| `terminal/b5-pasta-errada.txt` | 58 | `npm run dev` (saída 254) |
| `terminal/b5-script-serve.txt` | 58 | `npm run serve` (saída 1) |
| `terminal/b5-scripts-gerados.txt` | 56 | `npm pkg get scripts` (saída 0) |

## Módulo 3 (etapas 06–14) — capturas de 04/11/2026

Feitas num Mac com Node 24.19.0, Vue 3.5.44 e Vite 8.3.5. Os defeitos das investigações foram
provocados em cópias das etapas, nunca nas pastas entregues.

### Capturas reais e onde aparecem

| Arquivo | Slides | Descrição |
|---|---|---|
| `navegador/m3-e06-network.txt` | 63 | Três requisições da etapa 06 servida pelo servidor local |
| `telas/m3-e06-inicial.png` | 63 | Etapa 06: lista desenhada pelo JavaScript a partir do array |
| `telas/m3-e06-sincronia.png` | 66 | Variante com defeito: resumo “3 tarefas”, lista com 2 |
| `telas/m3-e07-vue.png` | 71 | Etapa 07: mesma página, desenhada pelo Vue |
| `navegador/m3-e07-typo.txt` | 74 | Aviso “Property … was accessed during render but is not defined” |
| `telas/m3-e08-sfc.png` | 79 | Etapa 08: `App.vue` estático com estilo global e `scoped` |
| `navegador/m3-e08-app-vue-transformado.txt` | 79, 81 | Resposta do Vite a `GET /src/App.vue`: `_sfc_render` e `__scopeId` |
| `navegador/m3-e08-mount.txt` | 82 | Aviso “Failed to mount app: mount target selector "#App" returned null” |
| `telas/m3-e09-reativo.png` | 87 | Etapa 09 após um clique: resumo, barra e classes mudam juntos |
| `terminal/m3-lint-e09-sem-value.txt` · `navegador/m3-e09-sem-value.txt` | 90 | `vue/no-ref-as-operand` e `TypeError: Assignment to constant variable` |
| `telas/m3-e10-lista.png` · `telas/m3-e10-vazio.png` | 95 | Lista com `v-for` e estado vazio com `v-else` |
| `terminal/m3-lint-e10-vif-vfor.txt` · `navegador/m3-e10-vif-vfor.txt` | 98 | `vue/no-use-v-if-with-v-for` e erro de renderização |
| `terminal/m3-lint-e10-sem-key.txt` | 98 | `vue/require-v-for-key` |
| `telas/m3-e11-validacao.png` | 103 | Validação de título repetido com `aria-invalid` |
| `navegador/m3-e11-efeito-computed.txt` · `terminal/m3-lint-e11-efeito-computed.txt` | 106 | Defeito silencioso no navegador: Console vazio e `npx eslint src` sem nada; `npm run lint` acusa pelo oxlint; “criar tarefas” vira “criartarefas” |
| `navegador/m3-e11-vmodel-computed.txt` | 106 | “Write operation failed: computed value is readonly” |
| `telas/m3-e12-escuro.png` | 111 | Etapa 12 com o tema escuro escolhido |
| `navegador/m3-e12-foco-setup.txt` | 114 | `TypeError: Cannot read properties of null (reading 'focus')` no setup |
| `telas/e13-componentes.png` | 59, 119 | Etapa 13 com componentes (recapturada em 04/11/2026) |
| `terminal/m3-lint-e13-muta-prop.txt` | 122 | `vue/no-mutating-props` |
| `telas/m3-e14-final.png` | 127 | Estado final do Módulo 3 |

Verificações feitas sem captura gravada (citadas nas notas): foco após marcar uma caixa pelo
teclado (etapa 06: `BODY`; etapa 07: a própria caixa); ordem `setup → null → montado` no ciclo de
vida; `v-model:procura` sem aviso e sem filtrar; texto digitado que “pula” de tarefa com
`:key="indice"`.
