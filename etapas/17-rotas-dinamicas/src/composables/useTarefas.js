// Estado compartilhado entre as telas.
//
// Por que ele saiu do App.vue? Porque quem desenha a tela agora é o <RouterView />,
// e não dá para passar props por ele como passávamos para <ListaView>. Então o estado
// sai da árvore de componentes e passa a morar num módulo.
//
// Os refs ficam FORA da função de propósito: o módulo é carregado uma vez, então todas
// as telas que chamarem useTarefas() recebem exatamente os mesmos refs. É a primeira
// forma de "estado global" do curso — a Unidade 7 troca isto por uma store do Pinia.

import { computed, ref } from 'vue'

const tarefas = ref([
  { id: 1, titulo: 'Abrir uma tarefa pelo endereço /tarefa/1', concluida: true },
  { id: 2, titulo: 'Ler o parâmetro com useRoute', concluida: false },
  { id: 3, titulo: 'Tratar um id que não existe', concluida: false },
  { id: 4, titulo: 'Responder a endereços desconhecidos com um 404', concluida: false },
])
let proximoId = 5

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

function adicionar(titulo) {
  tarefas.value = [...tarefas.value, { id: proximoId, titulo, concluida: false }]
  proximoId += 1
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
    adicionar,
    alternar,
    remover,
  }
}
