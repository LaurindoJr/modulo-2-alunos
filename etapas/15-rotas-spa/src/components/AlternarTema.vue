<script setup>
// v-model no componente: defineModel cria a prop modelValue e o evento update:modelValue.
// Ler escuro.value lê a prop; atribuir a escuro.value emite o evento para o pai.
const escuro = defineModel({ type: Boolean, required: true })
</script>

<template>
  <button type="button" class="alternar-tema" :aria-pressed="escuro" @click="escuro = !escuro">
    <span class="alternar-tema-icone" aria-hidden="true">{{ escuro ? '☾' : '☀' }}</span>
    Tema escuro
  </button>
</template>

<style scoped>
.alternar-tema {
  display: inline-flex;
  gap: var(--espaco-2);
  align-items: center;
  min-height: 2.25rem;
  padding: var(--espaco-1) var(--espaco-3);
  border: 1px solid var(--cor-borda);
  border-radius: 999px;
  background: var(--cor-superficie);
  color: var(--cor-texto);
  cursor: pointer;
}

.alternar-tema:hover {
  background: var(--cor-superficie-2);
}

.alternar-tema[aria-pressed='true'] {
  border-color: var(--cor-primaria);
  background: var(--cor-primaria-suave);
}

.alternar-tema-icone {
  font-size: 1.1rem;
  line-height: 1;
}
</style>
