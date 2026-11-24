<script setup>
import { useId } from 'vue'

// Estrutura comum às páginas; o CONTEÚDO vem do componente pai pelos slots.
// useId gera um id único para ligar a seção ao título (acessibilidade).
const idTitulo = useId()
</script>

<template>
  <section class="painel" :aria-labelledby="idTitulo">
    <header class="painel-cabecalho">
      <h1 :id="idTitulo">
        <!-- slot nomeado; o texto abaixo é o conteúdo de RESERVA (aparece se o pai não enviar nada) -->
        <slot name="titulo">Todo List</slot>
      </h1>
      <slot name="subtitulo" />
    </header>
    <!-- slot padrão: tudo o que o pai colocar entre <PainelCartao> e </PainelCartao> -->
    <slot />
  </section>
</template>
