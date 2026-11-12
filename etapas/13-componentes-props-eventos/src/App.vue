<script setup>
import { computed, ref, watch } from 'vue'

import TarefaForm from './components/TarefaForm.vue'
import TarefaItem from './components/TarefaItem.vue'
import { aplicarTema, lerTemaSalvo, salvarTema, temaDoSistema } from './utils/tema'

// O App é o DONO da lista: só ele a altera. Os filhos recebem dados (props) e pedem mudanças (eventos).
const tarefas = ref([
  { id: 1, titulo: 'Criar o projeto com npm create vue@latest', concluida: true },
  { id: 2, titulo: 'Validar o formulário e filtrar com computed', concluida: true },
  { id: 3, titulo: 'Extrair TarefaForm e TarefaItem', concluida: false },
  { id: 4, titulo: 'Passar dados por props e ouvir eventos', concluida: false },
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

// Chamadas pelos eventos dos filhos (@criar, @alternar, @remover).
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

// Tema (etapa 12): estado + watch. Na etapa 14 o botão vira o componente AlternarTema.
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
  <main class="cartao">
    <header class="cabecalho">
      <h1>Minhas tarefas</h1>
      <button
        type="button"
        class="botao alternar-tema"
        :aria-pressed="temaEscuro"
        @click="temaEscuro = !temaEscuro"
      >
        <span aria-hidden="true">{{ temaEscuro ? '☾' : '☀' }}</span>
        Tema escuro
      </button>
    </header>
    <p class="resumo">
      {{ concluidas }} de {{ tarefas.length }} concluídas · {{ visiveis.length }} exibidas
    </p>

    <!-- Prop desce (:titulos-existentes), evento sobe (@criar) -->
    <TarefaForm :titulos-existentes="titulos" @criar="adicionar" />

    <div class="filtros">
      <label for="busca">Buscar</label>
      <input id="busca" v-model="busca" type="search" placeholder="Parte do título" />
      <fieldset class="situacoes">
        <legend>Mostrar</legend>
        <label><input v-model="situacao" type="radio" value="todas" /> Todas</label>
        <label><input v-model="situacao" type="radio" value="pendentes" /> Pendentes</label>
        <label><input v-model="situacao" type="radio" value="concluidas" /> Concluídas</label>
      </fieldset>
    </div>

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
  </main>
</template>

<style scoped>
.cartao {
  display: grid;
  gap: var(--espaco-3);
  max-width: 38rem;
  margin: var(--espaco-5) auto;
  padding: var(--espaco-4) var(--espaco-5);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
  background: var(--cor-superficie);
}

h1,
.resumo,
.vazio {
  margin: 0;
}

.resumo,
.vazio {
  color: var(--cor-texto-suave);
}

.cabecalho {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-3);
  align-items: center;
  justify-content: space-between;
}

.alternar-tema {
  gap: var(--espaco-2);
  border-radius: 999px;
}

.alternar-tema[aria-pressed='true'] {
  border-color: var(--cor-primaria);
  background: var(--cor-primaria-suave);
}

.filtros {
  display: grid;
  gap: var(--espaco-1);
}

.situacoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-4);
  margin: var(--espaco-2) 0 0;
  padding: 0;
  border: 0;
}

.lista {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
