// VERSÃO COM DEFEITO CONTROLADO — usada na investigação da etapa 06.
// Aqui não existe render(): cada ação atualiza, à mão, só os pedaços da tela de que se lembra.
// Uma das ações esquece um pedaço. Encontre qual, com evidências (Console e Elements).

let tarefas = [
  { id: 1, titulo: 'Revisar HTML, CSS e JavaScript', concluida: true },
  { id: 2, titulo: 'Desenhar a lista a partir de um array', concluida: false },
  { id: 3, titulo: 'Entender por que frameworks existem', concluida: false },
]
let proximoId = 4

const lista = document.querySelector('#lista')
const resumo = document.querySelector('#resumo')
const formulario = document.querySelector('#formulario')
const campo = document.querySelector('#nova-tarefa')

function atualizarResumo() {
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length
  resumo.textContent = `${tarefas.length} tarefas · ${concluidas} concluídas`
}

function criarItem(tarefa) {
  const item = document.createElement('li')
  item.className = 'tarefa'
  item.classList.toggle('concluida', tarefa.concluida)

  const rotulo = document.createElement('label')
  rotulo.className = 'tarefa-rotulo'
  const caixa = document.createElement('input')
  caixa.type = 'checkbox'
  caixa.checked = tarefa.concluida
  caixa.addEventListener('change', () => alternar(tarefa.id, item))
  const texto = document.createElement('span')
  texto.textContent = tarefa.titulo
  rotulo.append(caixa, texto)

  const botaoRemover = document.createElement('button')
  botaoRemover.type = 'button'
  botaoRemover.className = 'botao'
  botaoRemover.textContent = 'Remover'
  botaoRemover.setAttribute('aria-label', `Remover tarefa: ${tarefa.titulo}`)
  botaoRemover.addEventListener('click', () => remover(tarefa.id, item))

  item.append(rotulo, botaoRemover)
  return item
}

function adicionar(titulo) {
  const nova = { id: proximoId, titulo, concluida: false }
  proximoId += 1
  tarefas = [...tarefas, nova]
  lista.append(criarItem(nova)) // atualiza a lista…
  atualizarResumo() // …e o resumo
}

function alternar(id, item) {
  tarefas = tarefas.map((tarefa) =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
  )
  item.classList.toggle('concluida') // atualiza o item…
  atualizarResumo() // …e o resumo
}

function remover(id, item) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id)
  item.remove() // atualiza a lista… e o resumo?
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault()
  const titulo = campo.value.trim()
  if (titulo === '') return
  adicionar(titulo)
  campo.value = ''
})

lista.replaceChildren(...tarefas.map(criarItem))
atualizarResumo()
