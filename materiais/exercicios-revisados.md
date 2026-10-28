# Exercícios revisados e redistribuídos

Revisão dos arquivos `Exercicios Teóricos - Unidade 2.docx`, `Exercicios Práticos - Unidade 2.docx`
e `Laboratório 2.docx`. Os originais não foram alterados. Gabaritos aparecem **depois** da tentativa
e explicam por que as outras alternativas falham.

## Distribuição pelos blocos

| Material | Bloco | Ajuste |
|---|---|---|
| Teórico 1 (Node.js) | 3 | Explicação ampliada: Node também roda scripts e ferramentas locais |
| Teórico 2 (npm × Yarn) | 4 | Afirmação IV retirada (afirmação histórica atemporal) |
| Teórico 3 (V8) | 3 | Foco no papel da engine; detalhes internos como aprofundamento |
| Teórico 4 (VS Code) | 2 | “Volar” → Vue - Official; distinguir extensão, pacote e extensão do navegador |
| Teórico 5 (package.json) | 4 e 5 | Manifesto atual gerado pelo create-vue |
| Prático 1 (editor) | 2 e 5 | Extensões no bloco 2; ESLint configurado pelo gerador no bloco 5 |
| Prático 2 (Node e npm) | Preparação e 3 | Sem `npm install -g npm@latest` e sem Vue CLI |
| Prático 3 (Vue com Vite) | 5 | `npm create vue@latest`, sem instalação global |
| Prático 4 (dependências) | 4 | ESLint mantido; remoção com pacote descartável; sem lodash 4.17.20 |
| Prático 5 (Yarn) | Opcional, após o bloco 4 | Comparação de comandos e arquivos, sem ranking de velocidade |
| Laboratório 1–2 | Preparação e 3 | Instruções por sistema operacional |
| Laboratório 3–6 | 4 | Sem contagens fixas de pacotes nem “todos gratuitos” |
| Laboratório 7 | 3 e 4 | `require` é válido em CommonJS; dados de tarefas no lugar de números soltos |
| Laboratório 8–9 | 4 | nodemon **local** (`--save-dev`) e alternativa nativa `node --watch` |
| Laboratório 10 | 4 e 5 | Restauração com `npm ci`, comandos multiplataforma |

---

## Exercícios teóricos (versão revisada)

### 1. Node.js — bloco 3

Sobre o Node.js, assinale a alternativa correta:

a) Executa JavaScript apenas no navegador.
b) Executa JavaScript apenas em servidores web.
c) É um navegador sem interface gráfica.
d) É um ambiente de execução (runtime) de JavaScript fora do navegador, usado em servidores e também em scripts e ferramentas de desenvolvimento.
e) É um gerenciador de pacotes.

**Gabarito: d.** a) O Node roda fora do navegador. b) Servidores são um uso comum, não o único:
no bloco 3 o Node executa `tarefas.js`, e no bloco 5 executa o Vite. c) Não há DOM nem
renderização: `document is not defined`. e) O gerenciador é o npm, distribuído junto com o Node.

### 2. npm e Yarn — bloco 4

Analise as afirmações:

I. O npm é distribuído junto com o Node.js.
II. O Yarn foi criado pelo Facebook (hoje Meta) como alternativa ao npm.
III. npm e Yarn usam o `package.json` para declarar dependências.

a) Apenas I · b) Apenas I e II · c) Apenas II e III · **d) I, II e III** · e) Nenhuma

**Gabarito: d.** A afirmação antiga “o npm instala em série e o Yarn em paralelo” foi retirada:
descrevia versões específicas e não vale como regra atual. Velocidade só pode ser comparada com
medição controlada, nas mesmas condições. Cada gerenciador gera seu próprio lockfile
(`package-lock.json`, `yarn.lock`); use um gerenciador por projeto.

### 3. V8 — bloco 3

Explique o que é o V8 e qual a sua relação com o Chrome e com o Node.js.

**Resposta esperada:** o V8 é uma *engine* JavaScript de código aberto (Google): executa o código,
combinando interpretação e compilação durante a execução. O Chrome e o Node.js **usam** o V8, mas
cada um é um ambiente hospedeiro diferente: o navegador fornece APIs como `document`; o Node
fornece APIs como `process` e acesso a arquivos. Por isso o mesmo cálculo roda nos dois, e
`document` só existe no navegador. Detalhes como *hidden classes* e *inlining* são aprofundamento,
não requisito para configurar o ambiente.

### 4. Ferramentas do editor — bloco 2

Classifique cada item como **extensão do editor**, **pacote do projeto** ou **extensão do
navegador**, e diga para que serve: Vue - Official · `eslint` · Prettier (extensão) · Vue DevTools.

**Gabarito:** Vue - Official — extensão do editor (suporte a arquivos `.vue`; antigo “Volar”).
`eslint` — pacote do projeto (análise estática executada por `npm run lint`). Prettier
(extensão) — extensão do editor que usa o Prettier do projeto para formatar. Vue DevTools —
extensão do navegador ou plugin do Vite que inspeciona componentes em execução.

### 5. Leitura de manifesto — blocos 4 e 5

```json
{
  "name": "todo-list",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "run-s \"lint:*\""
  },
  "dependencies": {
    "vue": "^3.5.42"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.8",
    "eslint": "^10.10.0",
    "vite": "^8.2.2"
  }
}
```

I. O servidor de desenvolvimento é iniciado com `npm run dev`.
II. `npm run serve` inicia o projeto.
III. `^3.5.42` aceita 3.6.0, mas não 4.0.0.
IV. O Vite aparece em `devDependencies` porque é ferramenta de desenvolvimento e build do projeto.
V. A versão exata instalada do Vue está registrada neste arquivo.

**Gabarito: I, III e IV.** II: não existe script `serve` (era do Vue CLI; o erro real é
`npm error Missing script: "serve"`). V: o manifesto declara uma **faixa**; a versão resolvida
fica no `package-lock.json`. Sobre III: o `^` permite mudanças que não alterem o primeiro número
diferente de zero — em `^3.5.42`, até `<4.0.0`; em `^0.2.3`, apenas até `<0.3.0`.

---

## Exercícios práticos (versão corrigida)

### 1. Editor — bloco 2

Instale Vue - Official, ESLint e Prettier no VS Code e configure um atalho para *Format Document*.
**Não** crie `.eslintrc.js`: o projeto do bloco 5 já traz `eslint.config.js` (formato atual,
*flat config*). Entregue: captura do painel de extensões e o atalho escolhido.

### 2. Node.js e npm — preparação e bloco 3

Instale o Node 24 LTS, registre `node --version` e `npm --version` e execute
`etapas/03-node-tarefas/tarefas.js`. Não atualize o npm globalmente e não instale Vue CLI.

### 3. Projeto Vue — bloco 5

```bash
npm create vue@latest
```

Respostas: `todo-list`; TypeScript **No**; recursos **Linter** e **Prettier**; nenhum
experimental; *Skip example code* **Yes**. Depois: `cd todo-list`, `npm install`, `npm run dev`.
Altere `src/App.vue` para mostrar uma lista de tarefas estática. Entregue: captura da página e a
explicação de `index.html → src/main.js → src/App.vue`.

### 4. Dependências — bloco 4 (pasta de treino)

1. Em `etapas/04-dependencias-scripts` (ou numa cópia), inspecione `dependencies` e
   `devDependencies` e explique o papel de cada pacote.
2. Instale e remova um pacote descartável: `npm install dayjs`, confira o `package.json`,
   `npm uninstall dayjs`, confira de novo.
3. Crie um script `relatorio:nativo` que execute `node relatorio-nativo.js`.
4. Apague `node_modules`, rode `npm start` (deve falhar), restaure com `npm ci` e rode de novo.

No projeto Vue do bloco 5, o ESLint já está instalado e o script `lint` já existe: execute
`npm run lint`. Não desinstale o ESLint.

### 5. Yarn — opcional, depois do bloco 4

Em uma pasta separada, siga a instalação oficial (<https://yarnpkg.com/getting-started/install>,
via Corepack), crie um projeto e compare **comandos** e **arquivos gerados** com o npm. Não use
dois gerenciadores no mesmo projeto e não conclua sobre velocidade sem medição controlada.
