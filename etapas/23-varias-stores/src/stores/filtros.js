// Terceira store — e a que mostra duas coisas novas.
//
// 1. UMA STORE USANDO OUTRA: aqui dentro chamamos useTarefasStore(). Não é
//    import circular nem truque: é só chamar a função, como um componente faria.
// 2. PERSISTÊNCIA com $subscribe: toda vez que este estado muda, gravamos.
//    O $subscribe é o `watch` da store, e vale para qualquer campo dela.

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { useTarefasStore } from './tarefas'

const CHAVE = 'todo-list:filtros'

function lerSalvo() {
  try {
    const bruto = localStorage.getItem(CHAVE)
    if (!bruto) return null
    const dados = JSON.parse(bruto)
    // Nunca confie no que estava gravado: outra versão do app pode ter escrito ali.
    const situacoes = ['todas', 'pendentes', 'concluidas']
    return {
      busca: typeof dados.busca === 'string' ? dados.busca : '',
      situacao: situacoes.includes(dados.situacao) ? dados.situacao : 'todas',
    }
  } catch {
    return null
  }
}

export const useFiltrosStore = defineStore('filtros', () => {
  const salvo = lerSalvo()
  const busca = ref(salvo?.busca ?? '')
  const situacao = ref(salvo?.situacao ?? 'todas')

  const ativo = computed(() => busca.value !== '' || situacao.value !== 'todas')

  // Esta store LÊ a store de tarefas para derivar a lista exibida.
  const visiveis = computed(() => {
    const tarefasStore = useTarefasStore()
    const termo = busca.value.trim().toLowerCase()
    return tarefasStore.tarefas.filter(
      (tarefa) => combina(tarefa) && tarefa.titulo.toLowerCase().includes(termo),
    )
  })

  function combina(tarefa) {
    if (situacao.value === 'pendentes') return !tarefa.concluida
    if (situacao.value === 'concluidas') return tarefa.concluida
    return true
  }

  function limpar() {
    busca.value = ''
    situacao.value = 'todas'
  }

  return { busca, situacao, ativo, visiveis, limpar }
})

// $subscribe fica FORA da store, em quem a usa — ele precisa de uma instância.
// Esta função é chamada uma vez, no main.js.
export function guardarFiltros() {
  const filtros = useFiltrosStore()
  filtros.$subscribe((_mutacao, estado) => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify({ busca: estado.busca, situacao: estado.situacao }))
    } catch {
      // Sem localStorage os filtros continuam valendo nesta aba; só não sobrevivem ao F5.
    }
  })
}
