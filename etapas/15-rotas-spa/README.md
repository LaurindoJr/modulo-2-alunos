# Etapa 15 — Telas sem roteador: o limite da troca à mão

**Unidade 5 · slides 133–140 · 40 min.** A Todo List ganha uma segunda tela (Resumo) trocada por um
`ref` e um `v-if`. Funciona — e é justamente por funcionar que o limite fica claro: o endereço do
navegador não muda, o F5 volta para a primeira tela, não dá para enviar um link e o botão Voltar
sai da aplicação. É o mesmo movimento da etapa 06 (fazer à mão antes de conhecer a ferramenta).

| | |
|---|---|
| Pré-requisitos | Etapa 14 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | A troca de tela por `ref` + `v-if`; o endereço que não muda; o F5 que perde a tela; o Voltar que sai do app |
| Os alunos implementam | A tela `SobreView` (números e barra de progresso) e os dois botões de navegação |
| Evidência de conclusão | As duas telas funcionam, e o aluno sabe listar três coisas que quebram sem roteador |

## O que mudou em relação à etapa 14

| Arquivo | Mudança |
|---|---|
| `src/views/ListaView.vue` | **Novo.** O painel de tarefas da etapa 14, agora como uma tela |
| `src/views/SobreView.vue` | **Novo.** Total, concluídas, pendentes e percentual |
| `src/App.vue` | `tela` (`ref`) decide qual view aparece; dois botões trocam o valor |

A pasta `views/` entra aqui: `components/` são peças reaproveitáveis; `views/` são telas inteiras.

## Roteiro

### Conhecer

- **Roteamento no servidor:** cada endereço é um pedido. `/` e `/resumo` são dois documentos, duas
  respostas, duas recargas. É assim que um portal funciona.
- **Aplicação de página só (SPA):** o navegador carrega **um** documento e o JavaScript troca o que
  aparece. Mais rápido entre telas, mas o endereço deixa de acompanhar — a menos que alguém cuide
  disso.
- **View × component:** a view é a tela que responde por um endereço; o component é a peça que as
  telas usam. Mesma tecnologia, papéis diferentes.

### Executar

```bash
npm ci
npm run dev
```

1. Alternar entre Lista e Resumo. Reparar: o endereço continua `http://localhost:5173/`.
2. Com o Resumo aberto, apertar F5 — volta para a Lista.
3. Com o Resumo aberto, apertar o botão Voltar do navegador — sai da aplicação.
4. Tentar enviar a tela de Resumo para alguém: não há endereço para copiar.

### Entender

O estado continua no `App.vue` e desce por props, como na etapa 13. Trocar de tela com `v-if`
**destrói** a tela anterior — mas os dados sobrevivem, porque quem os guarda é o `App`, não a view.
Já a escolha da tela (`tela`) vive só na memória da página: por isso o F5 a perde.

### Pesquisar

- [Vue Router — Introduction](https://router.vuejs.org/introduction.html)
- [MDN — History API](https://developer.mozilla.org/pt-BR/docs/Web/API/History_API)
- [MDN — Single-page application](https://developer.mozilla.org/en-US/docs/Glossary/SPA)
