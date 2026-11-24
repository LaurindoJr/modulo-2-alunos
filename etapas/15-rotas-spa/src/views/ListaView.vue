<script setup>
// Uma "tela" é um componente como qualquer outro. O que muda é o papel:
// views/ são as telas inteiras; components/ são as peças reaproveitáveis.
import PainelCartao from '../components/PainelCartao.vue'
import TarefaFiltros from '../components/TarefaFiltros.vue'
import TarefaForm from '../components/TarefaForm.vue'
import TarefaItem from '../components/TarefaItem.vue'

defineProps({
  tarefas: { type: Array, required: true },
  visiveis: { type: Array, required: true },
  concluidas: { type: Number, required: true },
  titulos: { type: Array, required: true },
})

// O estado continua no App (etapa 13): a tela só avisa o que aconteceu.
const busca = defineModel('busca', { type: String, required: true })
const situacao = defineModel('situacao', { type: String, required: true })

defineEmits(['criar', 'alternar', 'remover'])
</script>

<template>
  <PainelCartao>
    <template #titulo>Minhas tarefas</template>
    <template #subtitulo>
      <p class="subtitulo">
        {{ concluidas }} de {{ tarefas.length }} concluídas · {{ visiveis.length }} exibidas
      </p>
    </template>

    <TarefaForm :titulos-existentes="titulos" @criar="$emit('criar', $event)" />
    <TarefaFiltros v-model:busca="busca" v-model:situacao="situacao" />

    <ul v-if="visiveis.length > 0" class="lista">
      <TarefaItem
        v-for="tarefa in visiveis"
        :key="tarefa.id"
        :tarefa="tarefa"
        @alternar="$emit('alternar', $event)"
        @remover="$emit('remover', $event)"
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
</template>

<style scoped>
.subtitulo {
  margin: 0;
  color: var(--cor-texto-suave);
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
