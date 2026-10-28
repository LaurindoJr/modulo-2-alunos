# Módulo 2 — pacote didático: slides e construção guiada

Material de acompanhamento para o Módulo 2 (ambientes de desenvolvimento,
ferramentas e dependências). A Todo List é o exemplo contínuo: uma página HTML no bloco 1, dados
no Node no bloco 3, uma pasta com dependências no bloco 4 e um projeto Vue no bloco 5.

## Comece por aqui

| Para… | Abra |
|---|---|
| Acompanhar os slides | `slides/index.html` no navegador (funciona offline, direto do disco) |
| Construção guiada | `etapas/README.md` |
| Preparar o ambiente | `materiais/roteiro-de-instalacao.md` |
| Revisão e avaliação | `materiais/exercicios-revisados.md` e `materiais/avaliacao.md` |

Atalhos nos slides: <kbd>→</kbd>/<kbd>←</kbd> navegam,
<kbd>L</kbd> abre o modo leitura (todos os slides com notas), <kbd>T</kbd> alterna o tema,
<kbd>?</kbd> mostra a ajuda.

## Estrutura

```text
modulo-2/
  slides/        60 slides em 5 blocos (bloco-1.html … bloco-5.html), índice, CSS/JS próprios
    capturas/    telas, saídas de terminal, registros do navegador e diffs
  etapas/        5 etapas numeradas acompanhando os blocos da disciplina
  materiais/     instalação, registro de investigação com IA, exercícios revisados, rubrica
```

## Os cinco blocos

| Bloco | Slides | Tema | Etapa |
|---|---|---|---|
| 1 | 1–12 | Ambientes e primeiro contato com a Todo List | `01-pagina-estatica` |
| 2 | 13–24 | Editor, navegador e investigação de erros | `02-erros-controlados` |
| 3 | 25–36 | JavaScript no navegador e no Node.js | `03-node-tarefas` |
| 4 | 37–48 | Dependências e scripts reproduzíveis | `04-dependencias-scripts` |
| 5 | 49–60 | Ambiente Vue e revisão por desafios | `05-vue-inicial` |

Cada bloco soma 100 minutos. Os slides alternam demonstração, previsão, explicação, prática,
consulta à IA e verificação sem IA; cada um traz tempo, notas, perguntas e condução.

## Versões verificadas (macOS, Linux e Windows)

Node.js 24 LTS · npm 11 · create-vue 3.24 · Vue 3.5 · Vite 8 · ESLint 10.
As versões exatas de cada etapa estão nos `package-lock.json`.
