# Registro de investigação com IA

Use uma ficha por atividade. A atividade termina quando você **demonstra** o resultado e explica
a relação entre a sugestão recebida e a evidência observada — não quando a resposta parece
plausível.

Não envie credenciais, arquivos `.env` ou dados pessoais. Use somente dados fictícios de tarefas.

---

**Bloco / slide:** ______ **Data:** ______

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
