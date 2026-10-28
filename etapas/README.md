# Construção guiada da Todo List — etapas numeradas

Esta pasta reúne as atividades práticas que a turma constrói ao longo do Módulo 2.

Cada etapa é um estado executável e independente. Quem perder uma aula pode continuar a partir da
pasta seguinte. Cada `README.md` separa **o que o professor demonstra** do **que os alunos
implementam** e indica a evidência observável de conclusão.

| Etapa | Bloco / momento | O que a turma monta | Evidência de conclusão |
|---|---|---|---|
| `01-pagina-estatica` | Bloco 1 (slides 1–12) | Alterar título e tarefas de uma página HTML/CSS/JS | Texto alterado após salvar e recarregar; explicação de onde a mudança existe |
| `02-erros-controlados` | Bloco 2 (slides 13–24) | Localizar três defeitos com Network, Console e breakpoint | Registro hipótese → evidência → correção para cada defeito |
| `03-node-tarefas` | Bloco 3 (slides 25–36) | Executar o mesmo cálculo no navegador e no Node; módulos | Mesma contagem nos dois ambientes; erro de `document` explicado |
| `04-dependencias-scripts` | Bloco 4 (slides 37–48) | Manifesto, dependência, ferramenta local, scripts, `npm ci` | Pasta restaurada sem `node_modules` com `npm ci` e `npm start` funcionando |
| `05-vue-inicial` | Bloco 5 (slides 49–60) | Projeto create-vue, `App.vue` estático, build | Lista visível no navegador; `dist/` gerado e explicado |

## Como usar uma etapa

Etapas 01 a 03 não têm dependências. Nas etapas 04 e 05, `node_modules/` não acompanha a pasta:

```bash
cd 05-vue-inicial
npm ci
npm run dev
```

`npm ci` instala exatamente as versões de `package-lock.json` (verificadas com Node 24 LTS e npm 11).

## Ferramentas

`ferramentas/servidor-local.mjs` — servidor HTTP mínimo (só módulos nativos do Node) para observar
requisições no painel Network nas etapas 01 e 02. Executar de dentro da pasta da etapa:

```bash
node ../ferramentas/servidor-local.mjs
```

Porta padrão 8088. Se estiver ocupada, a mensagem explica como escolher outra.
