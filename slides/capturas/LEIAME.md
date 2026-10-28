# Capturas usadas nos slides

Todas as capturas abaixo foram produzidas em 21/10/2026 num Mac (macOS), com Node 24.19.0, npm 11.17.0,
create-vue 3.24.0, Vite 8.3.5 e Chrome/155.0.8059.85 em modo automatizado (headless).
Caminhos pessoais foram abreviados para `~`; a pasta do pacote aparece como `~/modulo-2`.

| Pasta | Conteúdo | Como foi produzido |
|---|---|---|
| `telas/` | Imagens PNG de páginas | Chrome headless (puppeteer-core) abrindo as etapas e o projeto reais |
| `terminal/` | Saídas de terminal em texto | Comandos reais executados nas pastas das etapas; `indice.json` registra pasta, comando, código de saída e notas |
| `navegador/` | Console, Network, DOM e valores em breakpoint | Protocolo de depuração do Chrome (CDP) durante o carregamento real das páginas |
| `codigo/` | Diferenças entre versões de arquivos | `diff -u` entre o arquivo original e o alterado |

Registros automatizados de processos longos (`npm run dev`, `npm run preview`, nodemon, `node --watch`) foram
interrompidos após alguns segundos, o equivalente a Ctrl+C; o detalhe está no campo `nota` de `terminal/indice.json`.

## Capturas a produzir pelo professor

Telas do VS Code e dos painéis do DevTools não puderam ser capturadas neste ambiente (sem permissão de captura de tela).
Cada slide mostra uma caixa com a instrução; ao salvar a imagem com o nome indicado, ela aparece automaticamente.

| Slide | Arquivo | O que capturar |
|---|---|---|
| 14 | `telas/b2-vscode-pasta-aberta.png` | VS Code com a pasta 02-erros-controlados aberta: explorador lateral com index.html, app.js, estilos.css e corrigido/, app.js aberto no editor e terminal integrado mostrando a pasta atual. |
| 16 | `telas/b2-vscode-extensoes.png` | Painel Extensions do VS Code com a busca 'Vue - Official' e as extensões ESLint e Prettier visíveis, mostrando nome e publicador. |
| 18 | `telas/b2-devtools-elements.png` | DevTools › Elements com o `<h1>` selecionado e a propriedade color alterada no painel Styles. |
| 19 | `telas/b2-devtools-console.png` | DevTools › Console mostrando o 404 de estilo.css e o TypeError com o link app.js:34. |
| 21 | `telas/b2-devtools-sources-breakpoint.png` | DevTools › Sources com breakpoint na linha 27 de app.js pausado e a variável i = 2 visível em Scope. |
| 22 | `telas/b2-devtools-network.png` | DevTools › Network após recarregar: estilo.css em vermelho com status 404 e app.js com 200. |
| 26 | `telas/b3-console-devtools.png` | Abra a etapa 01 no Chrome, abra o Console (F12), cole o conteúdo de tarefas.js, pressione Enter e capture o painel com as quatro linhas de saída. |

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
| `navegador/ref-network.txt` | — | Requisições do projeto completo à API json-server |
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
| `telas/e06-componentes.png` | 59 | Etapa 06: componentes e reatividade em memória |
| `telas/e07-typescript-pinia.png` | 59 | Etapa 07: TypeScript e Pinia com dados em memória |
| `telas/ref-api-desligada.png` | 59 |  |
| `telas/ref-busca.png` | — | Busca por "npm" |
| `telas/ref-edicao.png` | — | Edição inline de uma tarefa |
| `telas/ref-lista.png` | 1 | Projeto completo: lista com resumo, formulário, filtros e tarefas |
| `telas/ref-perfil.png` | 10, 59 | Página de perfil com estatísticas por categoria |
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
