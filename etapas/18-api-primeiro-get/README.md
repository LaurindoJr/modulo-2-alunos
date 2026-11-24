# Etapa 18 — As tarefas vêm de uma API

**Unidade 6 · slides 157–164 · 40 min.** A lista para de nascer escrita no código e passa a vir de
um servidor. Entram o json-server (uma API REST a partir de um `db.json`), o Axios e o
`async`/`await`. E entra o conceito que muda tudo: entre pedir e receber existe um **intervalo**, e
a tela precisa existir durante ele.

| | |
|---|---|
| Pré-requisitos | Etapa 17 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | `npm run api`; `axios.get` no `onMounted`; a requisição no Network; a API fora do ar |
| Os alunos implementam | O `db.json`, o script `api` e a função `carregar` com `async`/`await` |
| Evidência de conclusão | A lista some ao editar o `db.json`; o Network mostra `GET /tarefas → 200` |

## O que mudou em relação à etapa 17

| Arquivo | Mudança |
|---|---|
| `db.json` | **Novo.** O banco de dados de mentira que o json-server serve |
| `package.json` | `axios` e `json-server`; script `api` |
| `src/composables/useTarefas.js` | A lista nasce `[]`; `carregar()` com `await axios.get` |
| `src/App.vue` | `onMounted(carregar)` — uma vez, para a aplicação inteira |
| `src/views/TarefaView.vue` | Comparação de id por texto (ver abaixo) |

## Como rodar — dois terminais

```bash
npm ci
npm run api    # terminal 1: a API em http://localhost:3000
npm run dev    # terminal 2: a aplicação
```

Sem o terminal 1, a aplicação abre e fica vazia. Isso é de propósito: é a investigação da etapa.

## Roteiro

### Conhecer

- **API REST:** um servidor que entrega e recebe dados (JSON), organizado por **recursos**.
  `/tarefas` é o recurso; `GET /tarefas` pede a lista.
- **CRUD ↔ HTTP:** criar = `POST`, ler = `GET`, atualizar = `PUT`/`PATCH`, apagar = `DELETE`. Nesta
  etapa só o `GET`.
- **Axios:** biblioteca para falar HTTP. `axios.get(url)` devolve uma **Promise**; os dados vêm em
  `resposta.data`.
- **`async`/`await`:** `await` espera a Promise terminar antes da próxima linha. Sem ele,
  `tarefas.value` receberia a Promise em vez da lista.

### Executar

1. Abrir o Network, filtrar por **Fetch/XHR** e recarregar: aparece `GET /tarefas → 200`.
2. Ver a resposta na aba **Response**: é o conteúdo do `db.json`.
3. Editar o `db.json`, salvar e recarregar a página: a lista muda.
4. Navegar para o Resumo e voltar: **nenhuma** requisição nova (verificado) — a busca está no
   `App.vue`, não na view.

### Entender

- **O id agora vem de fora.** O json-server devolve `"id": "1"` — **texto**, não número. Por isso a
  comparação da `TarefaView` mudou de `item.id === Number(route.params.id)` para
  `String(item.id) === String(route.params.id)`. É a lição da etapa 17 ganhando um segundo exemplo:
  tudo que vem de fora chega como texto.
- **A tela existe antes dos dados.** `tarefas` começa `[]`, o componente desenha, e só depois a
  resposta chega. Quem escreveu `tarefas.value[0].titulo` sem checar descobre isso com um erro.

### Investigação — a tela que mente

Desligue o terminal da API e recarregue. Resultado (verificado):

- Na tela: **“Nenhuma tarefa cadastrada.”**
- No Console: `Network Error` e `ERR_CONNECTION_REFUSED`.

A tela está dizendo que não há tarefas. Não é verdade: nós não conseguimos **perguntar**. Para o
usuário, a falha e a lista vazia são idênticas. Consertar isso é a etapa 19.

### Pesquisar

- [Axios — Introduction](https://axios-http.com/docs/intro)
- [MDN — Usando Promises](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Using_promises)
- [json-server](https://github.com/typicode/json-server)
