// CommonJS: o módulo expõe valores atribuindo a module.exports.
// A extensão .cjs diz ao Node para interpretar o arquivo como CommonJS.

const tarefas = [
  { titulo: 'Ler sobre módulos', concluida: true },
  { titulo: 'Comparar require e import', concluida: false },
]

module.exports = { tarefas }
