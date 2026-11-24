// O composable agora é só ESTADO e REGRA. Nenhuma linha de HTTP aqui dentro:
// quem fala com o servidor é src/services/tarefasApi.js.
//
// Repare no padrão de cada ação: pede ao servidor, espera a resposta, e só
// então atualiza a lista com o que o servidor devolveu. Se a requisição falhar,
// a tela não mente: a lista continua como estava e a mensagem aparece.

import { computed, ref } from 'vue'

import {
  alterarTarefa,
  apagarTarefa,
  criarTarefa,
  listarTarefas,
  mensagemDeErro,
} from '../services/tarefasApi'

const tarefas = ref([])
const carregando = ref(false)
const erro = ref('')
const salvando = ref(false)

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

async function carregar() {
  carregando.value = true
  erro.value = ''
  try {
    tarefas.value = await listarTarefas()
  } catch (falha) {
    erro.value = mensagemDeErro(falha, 'carregar as tarefas')
    tarefas.value = []
  } finally {
    carregando.value = false
  }
}

async function adicionar(titulo) {
  salvando.value = true
  erro.value = ''
  try {
    // A tarefa criada volta do servidor COM o id que ele gerou.
    const criada = await criarTarefa(titulo)
    tarefas.value = [...tarefas.value, criada]
  } catch (falha) {
    erro.value = mensagemDeErro(falha, 'criar a tarefa')
  } finally {
    salvando.value = false
  }
}

async function alternar(id) {
  const atual = tarefas.value.find((tarefa) => String(tarefa.id) === String(id))
  if (!atual) return

  salvando.value = true
  erro.value = ''
  try {
    const alterada = await alterarTarefa(id, { concluida: !atual.concluida })
    tarefas.value = tarefas.value.map((tarefa) =>
      String(tarefa.id) === String(id) ? alterada : tarefa,
    )
  } catch (falha) {
    erro.value = mensagemDeErro(falha, 'alterar a tarefa')
  } finally {
    salvando.value = false
  }
}

async function remover(id) {
  salvando.value = true
  erro.value = ''
  try {
    await apagarTarefa(id)
    tarefas.value = tarefas.value.filter((tarefa) => String(tarefa.id) !== String(id))
  } catch (falha) {
    erro.value = mensagemDeErro(falha, 'remover a tarefa')
  } finally {
    salvando.value = false
  }
}

export function useTarefas() {
  return {
    tarefas,
    carregando,
    salvando,
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
