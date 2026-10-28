// ES Modules: import declara a dependência; o caminho relativo inclui a extensão.
// Execute a partir desta pasta:  node resumo.mjs

import { tarefas } from './dados.mjs'

const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length
console.log(`[ES Modules] ${concluidas} de ${tarefas.length} tarefas concluídas`)
