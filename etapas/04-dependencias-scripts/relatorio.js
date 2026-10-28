// Relatório das tarefas no terminal, com cores fornecidas pelo pacote picocolors.
// O package.json desta pasta tem "type": "commonjs", por isso usamos require.

const pc = require('picocolors')
const tarefas = require('./tarefas.json')

const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length

console.log(pc.bold('Relatório da Todo List'))
for (const tarefa of tarefas) {
  const marca = tarefa.concluida ? pc.green('[x]') : pc.yellow('[ ]')
  console.log(`${marca} ${tarefa.titulo}`)
}
console.log(pc.dim(`${concluidas} de ${tarefas.length} concluídas`))
