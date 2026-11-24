// Buscar dados de fora tem QUATRO finais possíveis, e a tela precisa dar conta
// dos quatro: carregando, deu certo com dados, deu certo e veio vazio, e falhou.
// Na etapa 18 só o primeiro caso aparecia na tela — e a falha se disfarçava de
// "nenhuma tarefa cadastrada".
//
// Esta etapa continua só LENDO (GET). A escrita é a etapa 20.

import { computed, ref } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

const tarefas = ref([])
const busca = ref('')
const situacao = ref('todas')

// Dois estados novos, e os dois são da REQUISIÇÃO, não das tarefas.
const carregando = ref(false)
const erro = ref('')

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

// O try/catch só funciona com await. Envolver um `return axios.get(...)` num
// try/catch NÃO pega a falha: a função já devolveu a Promise antes de ela falhar.
async function carregar() {
  carregando.value = true
  erro.value = ''
  try {
    const resposta = await axios.get(`${API_URL}/tarefas`)
    tarefas.value = resposta.data
  } catch (falha) {
    erro.value = mensagemDeErro(falha)
    tarefas.value = []
  } finally {
    // finally roda nos dois caminhos: deu certo ou deu errado.
    // Sem ele, uma falha deixaria "Carregando…" para sempre na tela.
    carregando.value = false
  }
}

// O axios separa os casos: se houve resposta, o servidor falou (e o status diz o quê);
// se houve pedido mas nenhuma resposta, ninguém atendeu.
function mensagemDeErro(falha) {
  if (falha.response) {
    return `A API respondeu ${falha.response.status}. Confira o endereço do pedido.`
  }
  if (falha.request) {
    return 'Não foi possível falar com a API. Ela está no ar? Rode `npm run api`.'
  }
  return 'Não foi possível carregar as tarefas.'
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
    carregando,
    erro,
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
