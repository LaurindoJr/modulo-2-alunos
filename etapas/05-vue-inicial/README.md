# Etapa 05 — Projeto Vue criado com create-vue

**Bloco 5 · slides 49 a 60.** Criar o projeto, localizar os arquivos de entrada, alterar o
componente raiz, gerar o build e explicar a diferença entre desenvolvimento, build, preview e
publicação.

| | |
|---|---|
| Pré-requisitos | Etapas 03 e 04; Node 24 LTS; internet para baixar o gerador e as dependências |
| Tempo da prática | 20 min (criação) + 20 min (estrutura e App.vue) + 25 min (build e diagnóstico) |
| Demonstração do professor | Slides 50–52 (criar e iniciar), 53–55 (estrutura, App.vue), 56–59 (build, dist, diagnóstico) |
| Implementação dos alunos | Criar o próprio projeto com as mesmas respostas, trocar o conteúdo de `App.vue`, gerar e inspecionar `dist/` |

## Como esta pasta foi criada (21/10/2026, create-vue 3.24.0)

```bash
npm create vue@latest
```

Respostas usadas (registro completo das telas em `slides/capturas/terminal/b5-create-vue-interativo.txt`):

| Pergunta | Resposta | Por quê |
|---|---|---|
| Project name (target directory) | `todo-list` | Nome da pasta e do pacote |
| Use TypeScript? | **No** | O padrão é *Yes*; o percurso básico usa JavaScript. TypeScript chega na etapa 07 |
| Select features | **Linter** e **Prettier** | Ferramentas de qualidade configuradas pelo próprio gerador (flat config) |
| Select experimental features | nenhuma | Evita recursos ainda instáveis |
| Skip all example code…? | **Yes** | Projeto em branco: fica fácil achar `index.html`, `main.js` e `App.vue` |

A pasta gerada `todo-list` foi renomeada para `05-vue-inicial` para manter a numeração das etapas.
O gerador não foi instalado globalmente: `npm create vue@latest` o baixa sob demanda.

## Executar

```bash
npm ci
npm run dev
```

Abra o endereço da linha `Local:` (normalmente `http://localhost:5173/`; se a porta estiver
ocupada, o Vite escolhe outra e informa no terminal). `Ctrl+C` encerra o servidor.

## Mapa dos arquivos (slide 53)

| Arquivo | Papel |
|---|---|
| `index.html` | Página que o navegador recebe; contém `<div id="app">` e carrega `/src/main.js` |
| `src/main.js` | Ponto de entrada do JavaScript: cria a aplicação Vue e a monta em `#app` |
| `src/App.vue` | Componente raiz (template, script e estilo no mesmo arquivo) |
| `public/` | Arquivos copiados como estão para o build (ex.: `favicon.ico`) |
| `vite.config.js` | Configuração do Vite: plugin do Vue, DevTools do Vue e atalho `@` para `src` |
| `eslint.config.js`, `.oxlintrc.json`, `.prettierrc.json` | Análise estática e formatação |
| `package.json` | Scripts `dev`, `build`, `preview`, `lint`, `format` e dependências |

## Alteração feita pelos alunos (slide 54)

`src/App.vue` recebeu um título e uma lista **escrita no template** (ainda sem reatividade).
`index.html` recebeu `lang="pt-BR"` e o título `Todo List`.

## Build e preview (slides 56–57)

```bash
npm run build     # gera dist/ (index.html, assets/*.js, assets/*.css, favicon.ico)
npm run preview   # serve dist/ em http://localhost:4173/ para conferência
```

- `npm run dev` serve os **fontes** e transforma cada arquivo sob demanda; não publica nada.
- `npm run build` gera **artefatos** otimizados com nomes com hash (`index-CsxmxGsD.js`).
- `npm run preview` confere o build localmente; **não é publicação** nem servidor de produção.
- Abrir `dist/index.html` direto do disco mostra página em branco: os caminhos começam com
  `/assets/…`, que só fazem sentido quando um servidor entrega a pasta.

Publicar exige enviar `dist/` a uma hospedagem de arquivos estáticos — fora do escopo deste módulo.

## Diagnóstico (slide 58)

| Sintoma real | Causa | Verificação |
|---|---|---|
| `npm error enoent Could not read package.json` | Comando executado fora da pasta do projeto | `pwd`/`cd` e `ls`/`dir`: há `package.json`? |
| `npm error Missing script: "serve"` | Script de outro gerador (Vue CLI); este projeto usa `dev` | `npm run` lista os scripts disponíveis |
| `Port 5173 is in use, trying another one...` | Outro processo usa a porta | Não é erro: use o endereço que o terminal mostrar |
