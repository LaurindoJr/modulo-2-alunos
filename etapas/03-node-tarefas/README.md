# Etapa 03 — JavaScript no navegador e no Node.js

**Bloco 3 · slides 25 a 36.** Distinguir linguagem, engine e ambiente de execução (runtime);
executar JavaScript no terminal; explicar por que `document` não existe no Node.

| | |
|---|---|
| Pré-requisitos | Node.js 24 LTS instalado (sessão de preparação); terminal aberto **nesta pasta** |
| Tempo da prática | 20 min (comparação) + 20 min (diagnóstico) + 25 min (aplicação) |
| Demonstração do professor | Slides 26–28 (Console, `node --version`), 29–30 (PATH e pasta errada), 31–35 (APIs do ambiente, módulos) |
| Implementação dos alunos | Executar `tarefas.js` nos dois ambientes; alterar os dados e prever o resultado; explicar um erro real |

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `tarefas.js` | Mesmo cálculo no Console do navegador e no Node (só linguagem + `console.log`) |
| `ambiente.js` | Lista quais objetos existem em cada ambiente (`document`, `window`, `process`…) |
| `titulo-da-pagina.js` | Acessa `document.title`: funciona no navegador, falha no Node |
| `modulos/commonjs/` | `require` e `module.exports` em arquivos `.cjs` |
| `modulos/esm/` | `import` e `export` em arquivos `.mjs` |
| `modulos/incoerente/` | `import` dentro de um `.cjs`, para ler e explicar o erro |

## Passos

1. **Navegador:** abra qualquer página, abra o Console (F12), cole o conteúdo de `tarefas.js` e
   pressione Enter. Registre a saída.
2. **Terminal:** confirme as ferramentas e a pasta atual:

   ```bash
   node --version
   npm --version
   ```

   Para ver a pasta atual: `pwd` (macOS/Linux, PowerShell) ou `cd` sem argumentos (Prompt de
   Comando do Windows).
3. Execute `node tarefas.js` e compare com a saída do Console.
4. Antes de executar `node titulo-da-pagina.js`, escreva sua previsão. Depois execute e explique
   a primeira linha do erro.
5. Execute `node ambiente.js` no terminal e cole o mesmo código no Console. Compare as duas listas.
6. Entre em `modulos/commonjs` e `modulos/esm` e execute `node resumo.cjs` e `node resumo.mjs`.

## Resultado esperado (saídas reais registradas em 21/10/2026, Node 24.19.0)

```text
$ node tarefas.js
Total: 5
Concluídas: 3
Pendentes: 2
Progresso: 60%
```

`node titulo-da-pagina.js` imprime a primeira linha e termina com
`ReferenceError: document is not defined`. A linguagem é a mesma; o Node não fornece o DOM de
uma página. (Existem bibliotecas que simulam um DOM no Node — os testes da etapa 10 usam uma —,
mas isso não transforma o Node em navegador.)

## Diagnóstico guiado (slide 29)

| Mensagem | O que significa | Verificação |
|---|---|---|
| `command not found: node` / `'node' não é reconhecido…` | O shell não encontrou o executável no PATH | Feche e reabra o terminal após instalar; confira `node --version` |
| `Error: Cannot find module '…/tarefas.js'` | O Node rodou, mas o arquivo não está na pasta atual | Confira a pasta atual e liste os arquivos (`ls` ou `dir`) |
| `SyntaxError: Cannot use import statement outside a module` | Sintaxe de ES Modules num arquivo tratado como CommonJS | Veja a extensão (`.cjs`/`.mjs`) e o campo `type` do `package.json` mais próximo |

Distinguir "o **programa** não foi encontrado" de "o **arquivo** não foi encontrado" é o ponto
central do diagnóstico.

## Variação individual (slide 36)

Acrescente duas tarefas em `tarefas.js`, uma concluída e uma pendente. Preveja os quatro
números antes de executar e explique a diferença, se houver.
