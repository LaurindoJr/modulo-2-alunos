<script setup>
import { computed, ref, watch } from 'vue'

import AlternarTema from './components/AlternarTema.vue'
import PainelCartao from './components/PainelCartao.vue'
import TarefaFiltros from './components/TarefaFiltros.vue'
import TarefaForm from './components/TarefaForm.vue'
import TarefaItem from './components/TarefaItem.vue'
import { aplicarTema, lerTemaSalvo, salvarTema, temaDoSistema } from './utils/tema'

const tarefas = ref([
  { id: 1, titulo: 'Passar dados por props e ouvir eventos', concluida: true },
  { id: 2, titulo: 'Criar o AlternarTema com defineModel', concluida: false },
  { id: 3, titulo: 'Usar dois v-model nos filtros', concluida: false },
  { id: 4, titulo: 'Montar a página com slots no PainelCartao', concluida: false },
])
let proximoId = 5

// Continuam no App (dono do estado); os filhos os alteram pelo v-model.
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

// Tema: o estado e o watch continuam aqui; o botão agora é o componente AlternarTema (v-model).
const temaSalvo = lerTemaSalvo()
if (temaSalvo) aplicarTema(temaSalvo)
const temaEscuro = ref((temaSalvo ?? temaDoSistema()) === 'escuro')

watch(temaEscuro, (escuro) => {
  const tema = escuro ? 'escuro' : 'claro'
  aplicarTema(tema)
  salvarTema(tema)
})
</script>

<template>
  <div class="pagina">
    <header class="topo">
      <span class="marca"><span class="marca-icone" aria-hidden="true">✓</span> Todo List</span>
      <!-- v-model em componente = :model-value + @update:model-value -->
      <AlternarTema v-model="temaEscuro" />
    </header>

    <main class="cartao">
      <!-- Slots: o PainelCartao define a ESTRUTURA; o App envia o CONTEÚDO de cada parte -->
      <PainelCartao>
        <template #titulo>Minhas tarefas</template>
        <template #subtitulo>
          <p class="subtitulo">
            {{ concluidas }} de {{ tarefas.length }} concluídas · {{ visiveis.length }} exibidas
          </p>
        </template>

        <TarefaForm :titulos-existentes="titulos" @criar="adicionar" />
        <TarefaFiltros v-model:busca="busca" v-model:situacao="situacao" />

        <ul v-if="visiveis.length > 0" class="lista">
          <TarefaItem
            v-for="tarefa in visiveis"
            :key="tarefa.id"
            :tarefa="tarefa"
            @alternar="alternar"
            @remover="remover"
          />
        </ul>
        <p v-else class="vazio">
          {{
            tarefas.length === 0
              ? 'Nenhuma tarefa cadastrada.'
              : 'Nenhuma tarefa corresponde aos filtros.'
          }}
        </p>
      </PainelCartao>
    </main>
  </div>
</template>

<style scoped>
.pagina {
  max-width: 40rem;
  margin: 0 auto;
  padding: var(--espaco-4);
}

.topo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-3);
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--espaco-4);
}

.marca {
  display: flex;
  gap: var(--espaco-2);
  align-items: center;
  font-family: var(--fonte-titulo);
  font-size: 1.3rem;
  font-weight: 700;
}

.marca-icone {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: var(--cor-primaria);
  color: var(--cor-sobre-primaria);
  font-family: var(--fonte-texto);
}

.cartao {
  padding: var(--espaco-4) var(--espaco-5);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
  background: var(--cor-superficie);
}

.lista {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.vazio {
  margin: 0;
  color: var(--cor-texto-suave);
}
</style>
