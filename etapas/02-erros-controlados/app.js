// Etapa 02 — este arquivo e o index.html contêm defeitos colocados de propósito para a aula.
// Use o DevTools para localizá-los antes de alterar qualquer linha.

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
  for (let i = 0; i < lista.length - 1; i++) {
    elementoLista.append(criarItem(lista[i]))
  }
}

function atualizarResumo(lista) {
  const concluidas = lista.filter((tarefa) => tarefa.concluida).length
  const resumo = document.querySelector('#resumo')
  resumo.textContent = `${lista.length} tarefas · ${concluidas} concluídas`
}

desenharLista(tarefas)
atualizarResumo(tarefas)
