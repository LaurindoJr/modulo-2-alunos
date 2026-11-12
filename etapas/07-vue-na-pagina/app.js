// A mesma Todo List da etapa 06, agora com Vue — sem build, sem npm.
// vendor/vue.global.js cria a variável global Vue; daqui tiramos o que vamos usar.
const { createApp, ref } = Vue

const TITULO_MAXIMO = 80

function validarTitulo(titulo) {
  if (titulo === '') return 'Escreva um título para a tarefa.'
  if (titulo.length > TITULO_MAXIMO) return `Use no máximo ${TITULO_MAXIMO} caracteres.`
  return ''
}

createApp({
  setup() {
    // Estado REATIVO: ao trocar o valor de um ref, o Vue atualiza o que depende dele no template.
    const tarefas = ref([
      { id: 1, titulo: 'Revisar HTML, CSS e JavaScript', concluida: true },
      { id: 2, titulo: 'Desenhar a lista a partir de um array', concluida: false },
      { id: 3, titulo: 'Deixar o Vue desenhar a lista', concluida: false },
    ])
    const titulo = ref('') // ligado ao campo pelo v-model
    const mensagem = ref('')
    let proximoId = 4

    function contarConcluidas() {
      return tarefas.value.filter((tarefa) => tarefa.concluida).length
    }

    // As ações só mudam o estado. Não existe render(): quem atualiza a tela é o Vue.
    function adicionar() {
      mensagem.value = validarTitulo(titulo.value)
      if (mensagem.value) return

      tarefas.value = [...tarefas.value, { id: proximoId, titulo: titulo.value, concluida: false }]
      proximoId += 1
      titulo.value = ''
    }

    function alternar(id) {
      tarefas.value = tarefas.value.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      )
    }

    function remover(id) {
      tarefas.value = tarefas.value.filter((tarefa) => tarefa.id !== id)
    }

    // Tudo o que o template usa precisa ser devolvido aqui.
    return { tarefas, titulo, mensagem, contarConcluidas, adicionar, alternar, remover }
  },
}).mount('#app') // o Vue controla apenas o elemento #app; o resto da página continua HTML comum
