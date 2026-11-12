// Comportamento da Todo List em JavaScript puro (sem framework).
// Ideia central: o ESTADO (o array tarefas) é a fonte da verdade.
// Toda ação muda o estado e chama render(), que redesenha a tela a partir dele.

const TITULO_MAXIMO = 80

let tarefas = [
  { id: 1, titulo: 'Revisar HTML, CSS e JavaScript', concluida: true },
  { id: 2, titulo: 'Desenhar a lista a partir de um array', concluida: false },
  { id: 3, titulo: 'Entender por que frameworks existem', concluida: false },
]
let proximoId = 4

// Selecionar elementos: o DOM é a árvore de objetos que o navegador montou a partir do HTML.
const lista = document.querySelector('#lista')
const resumo = document.querySelector('#resumo')
const formulario = document.querySelector('#formulario')
const campo = document.querySelector('#nova-tarefa')
const erro = document.querySelector('#erro-tarefa')

// Cria o <li> de uma tarefa. textContent trata o título como TEXTO; innerHTML o trataria como HTML
// e permitiria que um título como <img src=x onerror=...> executasse código.
function criarItem(tarefa) {
  const item = document.createElement('li')
  item.className = 'tarefa'
  item.classList.toggle('concluida', tarefa.concluida)

  const rotulo = document.createElement('label')
  rotulo.className = 'tarefa-rotulo'

  const caixa = document.createElement('input')
  caixa.type = 'checkbox'
  caixa.checked = tarefa.concluida
  caixa.addEventListener('change', () => alternar(tarefa.id))

  const texto = document.createElement('span')
  texto.textContent = tarefa.titulo
  rotulo.append(caixa, texto)

  const botaoRemover = document.createElement('button')
  botaoRemover.type = 'button'
  botaoRemover.className = 'botao'
  botaoRemover.textContent = 'Remover'
  botaoRemover.setAttribute('aria-label', `Remover tarefa: ${tarefa.titulo}`)
  botaoRemover.addEventListener('click', () => remover(tarefa.id))

  item.append(rotulo, botaoRemover)
  return item
}

// Redesenha TUDO o que depende do estado. Quem esquece de chamar render() deixa a tela desatualizada.
function render() {
  lista.replaceChildren(...tarefas.map(criarItem))
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length
  resumo.textContent = `${tarefas.length} tarefas · ${concluidas} concluídas`
}

function validarTitulo(titulo) {
  if (titulo === '') return 'Escreva um título para a tarefa.'
  if (titulo.length > TITULO_MAXIMO) return `Use no máximo ${TITULO_MAXIMO} caracteres.`
  return ''
}

function mostrarErro(mensagem) {
  erro.textContent = mensagem
  campo.setAttribute('aria-invalid', mensagem ? 'true' : 'false')
}

// Cada ação cria um NOVO array em vez de modificar o atual, e depois chama render().
function adicionar(titulo) {
  tarefas = [...tarefas, { id: proximoId, titulo, concluida: false }]
  proximoId += 1
  render()
}

function alternar(id) {
  tarefas = tarefas.map((tarefa) =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
  )
  render()
}

function remover(id) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id)
  render()
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault() // sem isso o navegador enviaria o formulário e recarregaria a página
  const titulo = campo.value.trim()
  const mensagem = validarTitulo(titulo)
  mostrarErro(mensagem)
  if (mensagem) return

  adicionar(titulo)
  campo.value = ''
  campo.focus()
})

render()
