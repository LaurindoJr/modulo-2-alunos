# Etapa 20 — Escrever na API e separar a camada de serviço

**Unidade 6 · slides 173–180 · 40 min.** Até aqui a aplicação só **lia**. Agora criar, concluir e
remover passam pelo servidor: `POST`, `PATCH` e `DELETE`. E, como o número de chamadas HTTP cresceu,
elas saem do composable para uma **camada de serviço** — o padrão que a Aula 4 da unidade defende.

| | |
|---|---|
| Pré-requisitos | Etapa 19 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | Os três verbos no Network; o id gerado pelo servidor; o F5 que prova a persistência |
| Os alunos implementam | `services/tarefasApi.js` e as três ações do composable |
| Evidência de conclusão | Criar, concluir e remover sobrevivem ao F5; o `db.json` muda no disco |

## O que mudou em relação à etapa 19

| Arquivo | Mudança |
|---|---|
| `src/services/tarefasApi.js` | **Novo.** Instância do axios com `baseURL`, as quatro operações e `mensagemDeErro` |
| `src/composables/useTarefas.js` | Nenhuma linha de HTTP; `adicionar`, `alternar` e `remover` viraram `async` |
| `src/components/TarefaForm.vue` | Prop `salvando`: bloqueia o formulário durante a requisição |
| `src/views/ListaView.vue` | Erro de **ação** aparece sem derrubar a lista que já está na tela |

## Roteiro

### Conhecer

| Operação | Verbo | Endereço | O que volta |
|---|---|---|---|
| Listar | `GET` | `/tarefas` | O array |
| Criar | `POST` | `/tarefas` | A tarefa criada, **com o id** |
| Alterar | `PATCH` | `/tarefas/:id` | A tarefa alterada |
| Remover | `DELETE` | `/tarefas/:id` | Nada |

- **`PATCH` × `PUT`:** `PATCH` manda só o que mudou; `PUT` substitui o registro inteiro — e apaga
  qualquer campo que você não tenha enviado.
- **O id é do servidor.** Não mandamos id no `POST`. O json-server gera um (verificado: algo como
  `LJCdP9Rh4Eo` — texto, não um número em sequência) e devolve o objeto criado. Guardar o que ele
  devolveu, e não o que você mandou, é a regra.
- **Camada de serviço:** um módulo que concentra o HTTP. O resto da aplicação pede “crie esta
  tarefa” e não sabe que existe um servidor.
- **Instância do axios:** `axios.create({ baseURL, timeout })` evita repetir o endereço e dá um
  lugar só para configurar tudo.

### Executar

1. Abrir o Network com filtro **Fetch/XHR** e fazer as três ações. Ver `POST`, `PATCH` e `DELETE`
   (verificado).
2. Apertar **F5**: tudo continua. Os dados estão no servidor, não na memória.
3. Abrir o `db.json` no editor: ele mudou no disco.
4. Criar uma tarefa e olhar o **id** no Network, na aba Response.

### Entender — por que esperar a resposta

Cada ação segue o mesmo desenho: pedir → esperar → só então atualizar a lista com o que o servidor
devolveu. Se a requisição falhar, a lista fica como estava e a mensagem aparece em cima — a tela
nunca mostra algo que o servidor não confirmou (verificado: com a API fora do ar, criar uma tarefa
deixa a lista intacta e mostra o erro).

A alternativa chama-se **atualização otimista**: alterar a tela antes da resposta e desfazer se der
errado. Parece mais rápida e custa caro em código, porque é preciso guardar o estado anterior para
reverter. Aplicativos de mensagem fazem isso (a mensagem aparece “enviando”). Vale conhecer o nome e
a escolha.

### Investigação — o clique duplo

Sem a prop `salvando`, dois cliques rápidos em **Adicionar** disparam dois `POST` e criam a tarefa
duas vezes — e a validação de título repetido não impede, porque no instante do segundo clique a
primeira ainda não voltou. O conserto é desabilitar o botão enquanto a requisição está em curso.

É a mesma família do defeito que gera dois pedidos numa loja quando a pessoa clica duas vezes em
“Finalizar compra”.

### Pesquisar

- [Axios — Instance e Request Config](https://axios-http.com/docs/instance)
- [MDN — Métodos HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods)
- [MDN — PATCH](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods/PATCH)
