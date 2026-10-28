// Contagem das tarefas da Todo List.
// Este arquivo usa só a linguagem JavaScript e console.log: funciona igual no Console do
// navegador e no Node.js. Execute com:  node tarefas.js

const tarefas = [
  { titulo: 'Instalar o Node.js', concluida: true },
  { titulo: 'Abrir a pasta do projeto no editor', concluida: true },
  { titulo: 'Inspecionar a página no DevTools', concluida: true },
  { titulo: 'Executar JavaScript no terminal', concluida: false },
  { titulo: 'Comparar navegador e Node', concluida: false },
]

const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length
const pendentes = tarefas.length - concluidas
const percentual = Math.round((concluidas / tarefas.length) * 100)

console.log(`Total: ${tarefas.length}`)
console.log(`Concluídas: ${concluidas}`)
console.log(`Pendentes: ${pendentes}`)
console.log(`Progresso: ${percentual}%`)
