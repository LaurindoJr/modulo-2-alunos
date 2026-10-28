// CommonJS: require carrega outro módulo durante a execução.
// Execute a partir desta pasta:  node resumo.cjs

const { tarefas } = require('./dados.cjs')

const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length
console.log(`[CommonJS] ${concluidas} de ${tarefas.length} tarefas concluídas`)
