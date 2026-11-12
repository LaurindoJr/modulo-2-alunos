# Registro de investigação com IA

Use uma ficha por atividade. A atividade termina quando você **demonstra** o resultado e explica
a relação entre a sugestão recebida e a evidência observada — não quando a resposta parece
plausível.

Não envie credenciais, arquivos `.env` ou dados pessoais. Use somente dados fictícios de tarefas.

---

**Bloco ou etapa / slide:** ______ **Data:** ______

1. **Objetivo** — o que eu queria que acontecesse:

2. **Previsão** (antes de executar):

3. **Tentativa própria** — o que fiz e o que observei (mensagem completa, pasta, comando):

4. **Pergunta feita à IA** (cole o prompt usado):

5. **Sugestão recebida** — ☐ aceita ☐ rejeitada · por quê:

6. **Teste realizado** — uma mudança por vez:

   | Evidência antes | Mudança | Evidência depois |
   |---|---|---|
   | | | |

7. **Explicação final, sem IA** — a causa, com minhas palavras:

8. **Variação** — um caso parecido que resolvi sozinho:

---

## Prompt-base

> Estou aprendendo ambientes de desenvolvimento com uma Todo List. Meu objetivo é [objetivo].
> Tentei [tentativa] e observei [resultado]. Minha hipótese é [hipótese]. Faça uma pergunta de
> diagnóstico por vez e dê uma pista antes de propor código. Não entregue a atividade inteira.
> Ao final, peça que eu explique a causa e sugira um teste para verificar minha compreensão.

## Prompt de explicação conceitual

> Explique [conceito] a partir deste resultado real: [evidência]. Diga para que serve, o mecanismo
> que explica o resultado e uma alternativa válida. Diferencie uma limitação técnica de uma
> convenção. Proponha um pequeno experimento que possa confirmar ou refutar sua explicação.
> Indique uma fonte oficial verificável; não invente referências.

## Cartão de pistas (sem acesso à IA)

1. Qual é a mensagem **completa**? Qual a primeira linha que não é ruído?
2. O programa foi encontrado? O arquivo foi encontrado? Em que pasta você está?
3. O que mudou desde a última vez que funcionou?
4. Qual evidência distinguiria sua hipótese da hipótese vizinha?
5. Qual é a menor mudança que testa uma hipótese só?

## Prompt-base para o Módulo 3 (Vue)

> Estou aprendendo Vue 3 com `<script setup>` numa Todo List (etapa [número]). Meu objetivo é
> [objetivo]. Este é o trecho relevante: [código]. Observei [mensagem do Console, do lint ou
> comportamento]. Minha hipótese é [hipótese]. Faça uma pergunta de diagnóstico por vez, indique a
> seção da documentação oficial (vuejs.org) que trata do assunto e não use Options API
> (`data()`, `this.`). Não reescreva o componente inteiro.

## Cartão de pistas do Módulo 3 (sem acesso à IA)

| Você viu… | Confira primeiro |
|---|---|
| Página em branco, sem erro de sintaxe | Console: o seletor do `mount` existe no `index.html`? (etapa 08) |
| `Property "x" was accessed during render but is not defined` | O nome está no `return` do `setup` (etapa 07) ou declarado no `<script setup>`? |
| `vue/no-ref-as-operand` · `Assignment to constant variable` | Faltou `.value` no `<script>` (etapa 09) |
| `vue/require-v-for-key` · itens que “trocam” de estado | `:key` estável, nunca a posição (etapa 10) |
| `vue/no-use-v-if-with-v-for` · `Cannot read properties of undefined` | Filtrar com `computed` em vez de `v-if` no mesmo elemento (etapa 10) |
| `computed value is readonly` | `computed` é leitura; para efeitos, `watch` (etapas 11 e 12) |
| `Cannot read properties of null (reading …)` no setup | O DOM só existe a partir de `onMounted` (etapa 12) |
| `vue/no-mutating-props` | O filho emite um evento; quem muda é o dono do estado (etapa 13) |
| Clique ou `v-model` sem efeito e sem mensagem | Nome do evento ou do `v-model:nome` igual nos dois lados? Vue DevTools › Timeline (etapas 13 e 14) |
