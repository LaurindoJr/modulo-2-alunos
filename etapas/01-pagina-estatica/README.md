# Etapa 01 — Página estática da Todo List

**Bloco 1 · slides 1 a 12.** Primeiro contato: onde se edita, onde se executa e onde se observa.

| | |
|---|---|
| Pré-requisitos | Editor de código (VS Code recomendado) e um navegador atual. Nada para instalar. |
| Tempo da prática | 20 min (abrir, identificar e alterar) + 20 min (investigação) |
| Demonstração do professor | Slides 2, 5 e 8: alterar uma tarefa, provocar alteração não exibida, comparar edição local e publicação |
| Implementação dos alunos | Alterar título e uma tarefa; explicar por que a mudança apareceu (ou não) |

## Arquivos

| Arquivo | Papel |
|---|---|
| `index.html` | Estrutura e conteúdo: título, resumo e lista de tarefas |
| `estilos.css` | Aparência: cores, espaços, fonte |
| `app.js` | Comportamento: risca tarefas concluídas e atualiza o resumo |
| `versao-antiga/index.html` | Cópia antiga, usada de propósito na investigação "editei e não mudou" |

## Passos

1. No editor, use **Arquivo › Abrir pasta** e escolha `01-pagina-estatica` (a pasta, não um arquivo isolado).
2. Abra `index.html` no navegador (duplo clique no arquivo ou arraste-o para uma aba).
3. **Antes de editar, registre sua previsão:** o que acontece na aba se você alterar o título e não salvar?
4. No editor, troque `Minhas tarefas` por um título seu e altere o texto de uma tarefa.
5. Salve (Ctrl+S / Cmd+S) e recarregue a aba (F5 / Cmd+R).

## Resultado esperado (evidência)

- O novo título e a tarefa alterada aparecem depois de **salvar e recarregar**.
- O resumo mostra `4 tarefas · 1 concluídas`; marcar uma caixa atualiza o número sem recarregar.
- Você consegue explicar: a alteração existe no arquivo do seu computador e na aba que o leu;
  ninguém mais a vê, porque nada foi publicado.

## Investigação (slides 6 e 7)

Se a alteração não apareceu, teste **uma hipótese por vez**:

| Hipótese | Evidência que a confirma | Como testar |
|---|---|---|
| Arquivo não salvo | Ponto ou círculo na aba do editor | Salve e recarregue |
| Arquivo errado | O caminho na barra de endereço é diferente do arquivo editado | Compare o endereço da aba com o caminho do arquivo no editor (ex.: `versao-antiga/index.html`) |
| Aba não recarregada | O texto antigo continua até recarregar | Recarregue a aba |

## Variação individual (slide 12)

Acrescente uma quinta tarefa no HTML. Antes de recarregar, preveja o novo resumo. Depois,
explique por que o número mudou sem você alterar `app.js`.
