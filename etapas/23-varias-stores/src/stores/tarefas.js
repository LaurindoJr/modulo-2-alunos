// Store das TAREFAS. Depois da etapa 23 ela cuida só dos dados do servidor:
// busca e situação foram para stores/filtros.js, porque são outra coisa —
// preferência de quem está olhando, não dado da aplicação.
//
// A MESMA coisa do composable da etapa 20, com três diferenças:
//
//   1. os refs entram DENTRO da função (o Pinia garante que ela roda uma vez);
//   2. a função é embrulhada em defineStore, com um nome — 'tarefas';
//   3. o que a função devolve passa a ser inspecionável no Vue DevTools.
//
// O resto é idêntico. Isso não é coincidência: o composable já era uma store.
// Esta forma chama-se *setup store*, e é a que combina com <script setup>.

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import {
  alterarTarefa,
  apagarTarefa,
  criarTarefa,
  listarTarefas,
  mensagemDeErro,
} from '../services/tarefasApi'

export const useTarefasStore = defineStore('tarefas', () => {
  // ---- state: os dados ----
  const tarefas = ref([])
  const carregando = ref(false)
  const salvando = ref(false)
  const erro = ref('')

  // ---- getters: valores derivados (são computed) ----
  const concluidas = computed(() => tarefas.value.filter((tarefa) => tarefa.concluida).length)
  const pendentes = computed(() => tarefas.value.length - concluidas.value)
  const titulos = computed(() => tarefas.value.map((tarefa) => tarefa.titulo))

  // ATENÇÃO: isto NÃO é um getter, é uma função. Getter que recebe argumento
  // não existe — o que existe é um getter que devolve uma função, e o
  // resultado dela não é guardado. Chamou, calculou. Ver a investigação.
  function contarPor(situacaoPedida) {
    if (situacaoPedida === 'pendentes') return pendentes.value
    if (situacaoPedida === 'concluidas') return concluidas.value
    return tarefas.value.length
  }

  // ---- actions: o que muda o estado (são funções) ----
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

  // Setup stores NÃO têm $reset pronto — as options stores têm. Quando ele faz
  // falta, escrevemos o nosso; e aí fica explícito o que "estado inicial" quer dizer.
  function reiniciar() {
    tarefas.value = []
    erro.value = ''
    carregando.value = false
  }

  // O que não é devolvido fica privado: combinaSituacao não aparece na store.
  return {
    tarefas,
    carregando,
    salvando,
    erro,
    concluidas,
    pendentes,
    titulos,
    contarPor,
    reiniciar,
    carregar,
    adicionar,
    alternar,
    remover,
  }
})
