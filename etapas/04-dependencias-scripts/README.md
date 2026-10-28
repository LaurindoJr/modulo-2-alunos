# Etapa 04 — Dependências e scripts reproduzíveis (pasta de treino)

**Bloco 4 · slides 37 a 48.** Ler o manifesto, explicar o que muda numa instalação e restaurar o
ambiente em outra máquina. Esta é uma **pasta de treino**: instalações e remoções de teste
acontecem aqui, nunca no projeto principal.

| | |
|---|---|
| Pré-requisitos | Etapa 03 concluída; acesso à internet para baixar pacotes do registro npm |
| Tempo da prática | 20 min (manifesto e instalação) + 25 min (scripts) + 20 min (restauração) |
| Demonstração do professor | Slides 38–40 (`npm init`, instalação), 42–45 (devDependencies, scripts, erros), 46–47 (`npm ci`) |
| Implementação dos alunos | Reproduzir a pasta a partir do zero, criar os scripts e restaurar uma cópia sem `node_modules` |

## Estado final desta pasta

| Arquivo | Papel |
|---|---|
| `package.json` | Manifesto: nome, scripts e **requisitos** de dependências (faixas como `^1.1.1`) |
| `package-lock.json` | **Resolução** registrada: versão exata, endereço e integridade de cada pacote, inclusive transitivos |
| `relatorio.js` | Usa a dependência `picocolors` para colorir a saída |
| `relatorio-nativo.js` | Mesmo resultado com `util.styleText`, recurso nativo do Node (sem dependência) |
| `tarefas.json` | Dados fictícios |

`node_modules/` **não** acompanha a pasta: ele é reconstruído a partir do manifesto e do lockfile.

## Reproduzir do zero (o que os alunos fazem)

```bash
npm init -y
npm install picocolors
npm install --save-dev nodemon
```

Crie `tarefas.json` e `relatorio.js` (copie desta pasta). Depois acrescente os scripts — editando o
`package.json` no editor ou com `npm pkg set`:

```json
"scripts": {
  "start": "node relatorio.js",
  "dev": "nodemon relatorio.js",
  "dev:nativo": "node --watch relatorio.js"
}
```

## Restaurar esta pasta (verificação)

```bash
npm ci
npm start
```

Saída esperada: o relatório com `2 de 5 concluídas`. `npm ci` exige `package-lock.json`
coerente com o `package.json` e apaga `node_modules` antes de instalar.

## Observações registradas em 21/10/2026 (npm 11.17.0)

- `npm init -y` já grava `"type": "commonjs"`: por isso `relatorio.js` usa `require`.
- Instalar `nodemon` adicionou **28 pacotes** para **1** dependência direta: `npm explain chokidar`
  mostra a cadeia `chokidar ← nodemon ← projeto` (dependência transitiva).
- `npm audit` aponta 3 avisos "high" em `braces`, herdado de `chokidar@3` pelo `nodemon`. O aviso
  não tem versão corrigida de `braces`, e `npm audit fix --force` instalaria `nodemon@1.14.10`
  (versão muito antiga). Leia o aviso, avalie o contexto (ferramenta local de desenvolvimento,
  padrões definidos por nós) e considere a alternativa nativa `node --watch`, que não traz
  dependências. Não use `--force` sem entender a mudança.
- `npm warn allow-scripts … fsevents` (npm 11): `fsevents` é dependência opcional usada no macOS.
  O aviso informa que o script de instalação não foi autorizado; o observador continua
  funcionando com o mecanismo padrão do Node.

## Erros para diagnosticar (slide 45)

| Comando | Mensagem real | Causa |
|---|---|---|
| `node relatorio.js` antes de instalar | `Error: Cannot find module 'picocolors'` | Dependência ausente em `node_modules` |
| `npm run inicio` | `npm error Missing script: "inicio"` | O nome não existe em `scripts` (veja com `npm run`) |
| `npm ci` com manifesto alterado à mão | ``npm ci` can only install packages when your package.json and package-lock.json … are in sync`` | Requisito e resolução divergem; atualize com `npm install` conscientemente |

## Variação individual (slide 48)

Crie um script `relatorio:nativo` que execute `relatorio-nativo.js`. Antes de executar, escreva
o comando que vai digitar e a saída esperada. Explique por que `npm run relatorio:nativo`
funciona e `npm relatorio:nativo` não.
