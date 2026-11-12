<script setup>
import { ref } from 'vue'

const TAREFAS_INICIAIS = [
  { id: 1, titulo: 'Criar o projeto com npm create vue@latest', concluida: true },
  { id: 2, titulo: 'Trocar texto fixo por interpolação', concluida: true },
  { id: 3, titulo: 'Desenhar a lista com v-for', concluida: false },
  { id: 4, titulo: 'Concluir e remover com eventos', concluida: false },
]

// A lista agora é DADO: um array de objetos dentro de um ref.
const tarefas = ref(TAREFAS_INICIAIS)
const mostrarDica = ref(true)

// As ações criam um NOVO array (map/filter) em vez de alterar o atual.
function alternar(id) {
  tarefas.value = tarefas.value.map((tarefa) =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
  )
}

function remover(id) {
  tarefas.value = tarefas.value.filter((tarefa) => tarefa.id !== id)
}

function restaurar() {
  tarefas.value = TAREFAS_INICIAIS
}
</script>

<template>
  <main class="cartao">
    <h1>Minhas tarefas</h1>
    <p class="resumo">
      {{ tarefas.length }} tarefas · {{ tarefas.filter((tarefa) => tarefa.concluida).length }}
      concluídas
    </p>

    <!-- v-show: o elemento continua no DOM; só recebe display: none -->
    <p v-show="mostrarDica" class="dica">
      Marque a caixa para concluir uma tarefa.
      <button type="button" class="botao" @click="mostrarDica = false">Entendi</button>
    </p>

    <!-- v-if / v-else: só UM dos dois blocos existe no DOM -->
    <ul v-if="tarefas.length > 0" class="lista">
      <!-- v-for repete o <li> para cada tarefa; :key identifica cada item (o id, nunca a posição) -->
      <li
        v-for="tarefa in tarefas"
        :key="tarefa.id"
        class="tarefa"
        :class="{ concluida: tarefa.concluida }"
      >
        <label class="tarefa-rotulo">
          <input type="checkbox" :checked="tarefa.concluida" @change="alternar(tarefa.id)" />
          <span>{{ tarefa.titulo }}</span>
        </label>
        <button
          type="button"
          class="botao"
          :aria-label="`Remover tarefa: ${tarefa.titulo}`"
          @click="remover(tarefa.id)"
        >
          Remover
        </button>
      </li>
    </ul>
    <p v-else class="vazio">
      Nenhuma tarefa na lista.
      <button type="button" class="botao" @click="restaurar">Restaurar exemplo</button>
    </p>
  </main>
</template>

<style scoped>
.cartao {
  display: grid;
  gap: var(--espaco-3);
  max-width: 36rem;
  margin: var(--espaco-5) auto;
  padding: var(--espaco-4) var(--espaco-5);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
  background: var(--cor-superficie);
}

h1,
.resumo,
.dica,
.vazio {
  margin: 0;
}

.resumo,
.vazio {
  color: var(--cor-texto-suave);
}

.dica {
  display: flex;
  gap: var(--espaco-3);
  align-items: center;
  justify-content: space-between;
  padding: var(--espaco-2) var(--espaco-3);
  border-radius: var(--raio);
  background: var(--cor-primaria-suave);
}

.lista {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.tarefa {
  display: flex;
  gap: var(--espaco-3);
  align-items: center;
  justify-content: space-between;
  padding: var(--espaco-2) var(--espaco-3);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
}

.tarefa-rotulo {
  display: flex;
  flex: 1;
  gap: var(--espaco-3);
  align-items: center;
  cursor: pointer;
}

.tarefa-rotulo input {
  width: 1.2rem;
  height: 1.2rem;
  accent-color: var(--cor-primaria);
}

.concluida span {
  color: var(--cor-texto-suave);
  text-decoration: line-through;
}
</style>
