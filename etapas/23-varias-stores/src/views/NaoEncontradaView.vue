<script setup>
import { useRoute } from 'vue-router'

import PainelCartao from '../components/PainelCartao.vue'

const route = useRoute()
</script>

<template>
  <PainelCartao>
    <template #titulo>Endereço não encontrado</template>
    <p class="vazio">
      Nenhuma tela responde por <code>{{ route.fullPath }}</code
      >.
    </p>
    <RouterLink to="/" class="botao">Voltar à lista</RouterLink>
  </PainelCartao>
</template>

<style scoped>
.vazio {
  margin: 0;
  color: var(--cor-texto-suave);
}

code {
  padding: 0 0.25rem;
  border-radius: 4px;
  background: var(--cor-superficie-alt, rgb(0 0 0 / 8%));
}
</style>
