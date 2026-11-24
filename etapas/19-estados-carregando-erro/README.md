# Etapa 19 — Carregando, deu certo, vazio, falhou

**Unidade 6 · slides 165–172 · 40 min.** Buscar dados de fora tem **quatro** finais possíveis, e a
tela da etapa 18 só dava conta de um. Aqui entram o estado de carregamento, o tratamento de erro com
`try`/`catch`/`finally` e a separação entre “a lista está vazia” e “não consegui perguntar”.

| | |
|---|---|
| Pré-requisitos | Etapa 18 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | Os quatro estados; o `finally`; o `role="status"` × `role="alert"`; a lentidão simulada no DevTools |
| Os alunos implementam | Os refs `carregando` e `erro`, o `try`/`catch`/`finally` e o botão “Tentar de novo” |
| Evidência de conclusão | Com a API desligada, a tela mostra a mensagem certa e o botão funciona quando a API volta |

## O que mudou em relação à etapa 18

| Arquivo | Mudança |
|---|---|
| `src/composables/useTarefas.js` | `carregando` e `erro`; `carregar()` com `try`/`catch`/`finally`; `mensagemDeErro()` |
| `src/views/ListaView.vue` | Os quatro estados, nesta ordem: carregando → falhou → vazio → lista |

## Roteiro

### Conhecer

Os quatro estados de qualquer busca de dados:

| Estado | O que a tela mostra | Papel ARIA |
|---|---|---|
| Carregando | “Carregando tarefas…” | `role="status"` (anuncia sem interromper) |
| Deu certo, com dados | A lista | — |
| Deu certo, vazio | “Nenhuma tarefa cadastrada.” | — |
| Falhou | A mensagem e o botão de tentar de novo | `role="alert"` (interrompe) |

- **A ordem importa.** Enquanto carrega, não se sabe se está vazio nem se falhou. Por isso o
  `v-if="carregando"` vem primeiro.
- **`finally` roda nos dois caminhos.** Sem ele, uma falha deixaria “Carregando…” para sempre.
- **O `catch` só funciona com `await`.** Envolver um `return axios.get(...)` num `try`/`catch` não
  pega nada — ver a investigação.
- **As falhas do Axios têm formas diferentes:** `falha.response` significa que o servidor respondeu
  (e o status diz o quê); `falha.request` significa que ninguém atendeu.

```js
async function carregar() {
  carregando.value = true
  erro.value = ''
  try {
    const resposta = await axios.get(`${API_URL}/tarefas`)
    tarefas.value = resposta.data
  } catch (falha) {
    erro.value = mensagemDeErro(falha)
    tarefas.value = []
  } finally {
    carregando.value = false
  }
}
```

### Executar

1. **Ver o estado de carregamento.** Ele é rápido demais num `localhost`. Use o DevTools:
   **Network › Throttling › Slow 3G**. Recarregue: “Carregando tarefas…” fica visível.
2. **Desligar a API** (Ctrl+C no terminal 1) e recarregar: a mensagem certa aparece, com o botão.
3. **Religar a API** e clicar em **Tentar de novo**: a lista carrega sem F5 (verificado — o botão
   dispara uma requisição nova).
4. **Esvaziar o `db.json`** (`{"tarefas": []}`) e recarregar: aparece “Nenhuma tarefa cadastrada.”
   Agora essa frase é **verdade**.

### Entender — por que `status` e `alert`

Os dois são regiões vivas, e a diferença é a urgência. `role="status"` é anunciado quando o leitor
de tela terminar o que está fazendo; `role="alert"` interrompe. Carregar é informação; falhar exige
atenção. Usar `alert` para tudo é como gritar o tempo todo.

A animação do indicador respeita `prefers-reduced-motion`: quem pediu menos movimento no sistema
não recebe o giro.

### Investigação — o `catch` que nunca pega

Esta é a forma que aparece em muito material (inclusive no original da unidade):

```js
// ❌ o catch é código morto
function carregar() {
  try {
    return axios.get(url).then((r) => (tarefas.value = r.data))
  } catch (falha) {
    erro.value = 'nunca chega aqui'
  }
}
```

**Verificado em Node:** com a Promise rejeitando, a função devolve **uma Promise rejeitada** e o
`catch` não roda. O `try`/`catch` é síncrono: quando a Promise falha, a função já retornou. A
mesma lógica com `await` pega a falha normalmente.

Duas saídas: `await` dentro do `try` (o que fazemos), ou `.catch()` encadeado na Promise.

### Pesquisar

- [MDN — try...catch](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/try...catch)
- [Axios — Handling Errors](https://axios-http.com/docs/handling_errors)
- [MDN — ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
