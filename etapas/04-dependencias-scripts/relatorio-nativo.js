// Mesmo relatório sem dependência externa: util.styleText é um recurso nativo do Node.
// Serve para discutir o slide 41: o problema exigia mesmo uma biblioteca?

const { styleText } = require('node:util')
const tarefas = require('./tarefas.json')

const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length

console.log(styleText('bold', 'Relatório da Todo List (sem dependências)'))
for (const tarefa of tarefas) {
  const marca = tarefa.concluida ? styleText('green', '[x]') : styleText('yellow', '[ ]')
  console.log(`${marca} ${tarefa.titulo}`)
}
console.log(styleText('dim', `${concluidas} de ${tarefas.length} concluídas`))
