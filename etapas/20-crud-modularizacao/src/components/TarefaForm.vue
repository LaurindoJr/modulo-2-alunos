<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'

const TITULO_MAXIMO = 80

// props: dados que DESCEM do pai. O formulário só precisa dos títulos para checar repetição.
const props = defineProps({
  titulosExistentes: { type: Array, default: () => [] },
  // Enquanto a requisição não volta, o formulário fica bloqueado: evita o
  // clique duplo que criaria a mesma tarefa duas vezes.
  salvando: { type: Boolean, default: false },
})

// emits: avisos que SOBEM para o pai. O formulário não cria a tarefa; pede ao pai que crie.
const emit = defineEmits(['criar'])

// Estado LOCAL do componente: só o formulário precisa saber o que está sendo digitado.
const titulo = ref('')
const mensagem = ref('')
const campoTitulo = useTemplateRef('campoTitulo')

function validar(texto) {
  if (texto === '') return 'Escreva um título para a tarefa.'
  if (texto.length > TITULO_MAXIMO) return `Use no máximo ${TITULO_MAXIMO} caracteres.`
  const repetida = props.titulosExistentes.some(
    (existente) => existente.toLowerCase() === texto.toLowerCase(),
  )
  if (repetida) return 'Já existe uma tarefa com esse título.'
  return ''
}

function enviar() {
  mensagem.value = validar(titulo.value)
  if (mensagem.value) return

  emit('criar', titulo.value)
  titulo.value = ''
}

// Cada componente tem o próprio ciclo de vida: este onMounted roda quando o FORMULÁRIO é montado.
onMounted(() => {
  campoTitulo.value?.focus()
})
</script>

<template>
  <form class="formulario" novalidate @submit.prevent="enviar">
    <label for="nova-tarefa">Nova tarefa</label>
    <div class="formulario-linha">
      <input
        :disabled="salvando"
        id="nova-tarefa"
        ref="campoTitulo"
        v-model.trim="titulo"
        type="text"
        :maxlength="TITULO_MAXIMO"
        autocomplete="off"
        placeholder="Ex.: extrair um componente"
        :aria-invalid="mensagem ? 'true' : 'false'"
        aria-describedby="erro-tarefa"
      />
      <button type="submit" class="botao botao-principal" :disabled="salvando">
        {{ salvando ? 'Salvando…' : 'Adicionar' }}
      </button>
    </div>
    <p id="erro-tarefa" class="erro" role="alert">{{ mensagem }}</p>
  </form>
</template>

<style scoped>
.formulario {
  display: grid;
  gap: var(--espaco-1);
}

.formulario-linha {
  display: flex;
  gap: var(--espaco-2);
}

.formulario-linha input {
  flex: 1;
  min-width: 0;
}

.erro {
  min-height: 1.25rem;
  margin: 0;
  color: var(--cor-erro);
  font-size: 0.9rem;
}
</style>
