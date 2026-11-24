<script setup>
// O item recebe a tarefa por props e avisa o pai por eventos.
// Props são SOMENTE LEITURA: o item não altera a tarefa; quem guarda a lista é o App.vue.
defineProps({
  tarefa: { type: Object, required: true },
})

const emit = defineEmits(['alternar', 'remover'])
</script>

<template>
  <li class="tarefa" :class="{ concluida: tarefa.concluida }">
    <label class="tarefa-rotulo">
      <input type="checkbox" :checked="tarefa.concluida" @change="emit('alternar', tarefa.id)" />
      <span>{{ tarefa.titulo }}</span>
    </label>
    <button
      type="button"
      class="botao"
      :aria-label="`Remover tarefa: ${tarefa.titulo}`"
      @click="emit('remover', tarefa.id)"
    >
      Remover
    </button>
  </li>
</template>

<style scoped>
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
