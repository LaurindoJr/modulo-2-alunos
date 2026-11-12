// Comportamento da página: risca tarefas concluídas e atualiza o resumo.
// Este código roda no navegador, que fornece o objeto document (o DOM da página).

const caixas = document.querySelectorAll('.lista input[type="checkbox"]')
const resumo = document.querySelector('#resumo')

function atualizarResumo() {
  const total = caixas.length
  const concluidas = [...caixas].filter((caixa) => caixa.checked).length
  resumo.textContent = `${total} tarefas · ${concluidas} concluídas`
}

function marcarVisualmente(caixa) {
  caixa.closest('label').classList.toggle('concluida', caixa.checked)
}

caixas.forEach((caixa) => {
  marcarVisualmente(caixa)
  caixa.addEventListener('change', () => {
    marcarVisualmente(caixa)
    atualizarResumo()
    atualizarResumo()
  })
  atualizarResumo()
})

atualizarResumo()
