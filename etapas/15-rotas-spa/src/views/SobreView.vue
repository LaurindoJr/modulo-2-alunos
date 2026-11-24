<script setup>
import { computed } from 'vue'

import PainelCartao from '../components/PainelCartao.vue'

const props = defineProps({
  tarefas: { type: Array, required: true },
  concluidas: { type: Number, required: true },
})

const pendentes = computed(() => props.tarefas.length - props.concluidas)

const percentual = computed(() => {
  if (props.tarefas.length === 0) return 0
  return Math.round((props.concluidas / props.tarefas.length) * 100)
})
</script>

<template>
  <PainelCartao>
    <template #titulo>Resumo</template>
    <template #subtitulo>
      <p class="subtitulo">Os mesmos dados da lista, vistos de outro jeito.</p>
    </template>

    <dl class="numeros">
      <div class="numero">
        <dt>Total</dt>
        <dd>{{ tarefas.length }}</dd>
      </div>
      <div class="numero">
        <dt>Concluídas</dt>
        <dd>{{ concluidas }}</dd>
      </div>
      <div class="numero">
        <dt>Pendentes</dt>
        <dd>{{ pendentes }}</dd>
      </div>
    </dl>

    <p class="barra-rotulo">{{ percentual }}% concluído</p>
    <div
      class="barra"
      role="progressbar"
      :aria-valuenow="percentual"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Percentual de tarefas concluídas"
    >
      <div class="barra-cheia" :style="{ width: `${percentual}%` }"></div>
    </div>
  </PainelCartao>
</template>

<style scoped>
.subtitulo {
  margin: 0;
  color: var(--cor-texto-suave);
}

.numeros {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-3);
  margin: 0;
}

.numero {
  flex: 1 1 6rem;
  padding: var(--espaco-3);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
}

.numero dt {
  color: var(--cor-texto-suave);
  font-size: 0.9rem;
}

.numero dd {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
}

.barra-rotulo {
  margin: 0;
  color: var(--cor-texto-suave);
  font-size: 0.9rem;
}

.barra {
  height: 0.75rem;
  overflow: hidden;
  border: 1px solid var(--cor-borda);
  border-radius: 999px;
}

.barra-cheia {
  height: 100%;
  background: var(--cor-primaria);
}
</style>
