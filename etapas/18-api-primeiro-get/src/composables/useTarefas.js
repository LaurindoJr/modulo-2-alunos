// As tarefas agora vêm de FORA. A lista nasce vazia e só é preenchida quando
// a resposta da API chega — o que não acontece no mesmo instante.
//
// Esta etapa faz só a LEITURA (GET). Concluir e remover continuam alterando a
// lista em memória: o servidor ainda não sabe dessas mudanças. A etapa 20 conserta.

import { computed, ref } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

const tarefas = ref([])
const busca = ref('')
const situacao = ref('todas')

const concluidas = computed(() => tarefas.value.filter((tarefa) => tarefa.concluida).length)
const titulos = computed(() => tarefas.value.map((tarefa) => tarefa.titulo))

const visiveis = computed(() => {
  const termo = busca.value.trim().toLowerCase()
  return tarefas.value.filter(
    (tarefa) => combinaSituacao(tarefa) && tarefa.titulo.toLowerCase().includes(termo),
  )
})

function combinaSituacao(tarefa) {
  if (situacao.value === 'pendentes') return !tarefa.concluida
  if (situacao.value === 'concluidas') return tarefa.concluida
  return true
}

// async/await: a função devolve uma Promise e "espera" a resposta na linha do await.
// Sem o await, tarefas.value receberia a Promise em vez da lista.
async function carregar() {
  const resposta = await axios.get(`${API_URL}/tarefas`)
  tarefas.value = resposta.data
}

function adicionar(titulo) {
  // Id como TEXTO, para ficar igual ao que a API devolve. Na etapa 20 quem
  // gera o id passa a ser o servidor, e esta conta desaparece.
  const proximoId = String(Math.max(0, ...tarefas.value.map((t) => Number(t.id))) + 1)
  tarefas.value = [...tarefas.value, { id: proximoId, titulo, concluida: false }]
}

function alternar(id) {
  tarefas.value = tarefas.value.map((tarefa) =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
  )
}

function remover(id) {
  tarefas.value = tarefas.value.filter((tarefa) => tarefa.id !== id)
}

export function useTarefas() {
  return {
    tarefas,
    busca,
    situacao,
    concluidas,
    titulos,
    visiveis,
    carregar,
    adicionar,
    alternar,
    remover,
  }
}
