// Etapa 02 — versão corrigida (gabarito do professor).
// Mudanças: o laço percorre todas as tarefas e o seletor usa o id que existe no HTML.

const tarefas = [
  { titulo: 'Instalar o Node.js', concluida: true },
  { titulo: 'Abrir a pasta do projeto no editor', concluida: true },
  { titulo: 'Inspecionar a página no DevTools', concluida: false },
  { titulo: 'Encontrar a tarefa que sumiu', concluida: false },
]

function criarItem(tarefa) {
  const item = document.createElement('li')
  const rotulo = document.createElement('label')
  const caixa = document.createElement('input')
  caixa.type = 'checkbox'
  caixa.checked = tarefa.concluida
  caixa.addEventListener('change', () => rotulo.classList.toggle('concluida', caixa.checked))
  rotulo.append(caixa, ` ${tarefa.titulo}`)
  rotulo.classList.toggle('concluida', tarefa.concluida)
  item.append(rotulo)
  return item
}

function desenharLista(lista) {
  const elementoLista = document.querySelector('#lista')
  for (let i = 0; i < lista.length; i++) {
    elementoLista.append(criarItem(lista[i]))
  }
}

function atualizarResumo(lista) {
  const concluidas = lista.filter((tarefa) => tarefa.concluida).length
  const resumo = document.querySelector('#contador')
  resumo.textContent = `${lista.length} tarefas · ${concluidas} concluídas`
}

desenharLista(tarefas)
atualizarResumo(tarefas)
