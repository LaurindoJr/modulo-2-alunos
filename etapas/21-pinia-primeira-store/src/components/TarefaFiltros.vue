<script setup>
// Dois v-model no mesmo componente, com nomes: o pai usa v-model:busca e v-model:situacao.
const busca = defineModel('busca', { type: String, default: '' })
const situacao = defineModel('situacao', { type: String, default: 'todas' })

const SITUACOES = [
  { valor: 'todas', rotulo: 'Todas' },
  { valor: 'pendentes', rotulo: 'Pendentes' },
  { valor: 'concluidas', rotulo: 'Concluídas' },
]
</script>

<template>
  <div class="filtros">
    <label for="busca">Buscar</label>
    <input id="busca" v-model="busca" type="search" placeholder="Parte do título" />
    <fieldset class="situacoes">
      <legend>Mostrar</legend>
      <label v-for="opcao in SITUACOES" :key="opcao.valor">
        <input v-model="situacao" type="radio" :value="opcao.valor" />
        {{ opcao.rotulo }}
      </label>
    </fieldset>
  </div>
</template>

<style scoped>
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
</style>
