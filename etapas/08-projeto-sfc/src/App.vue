<!-- Um SFC (Single-File Component) reúne as três camadas da etapa 06 num só arquivo. -->

<!-- 1. Comportamento. Ainda vazio: a reatividade chega na etapa 09. -->
<script setup></script>

<!-- 2. Estrutura. O Vite compila este template numa função JavaScript que desenha o DOM. -->
<template>
  <main class="cartao">
    <h1>Minhas tarefas</h1>
    <p class="resumo">Lista ainda escrita no template: 4 tarefas · 2 concluídas</p>
    <ul class="lista">
      <li class="concluida">Criar o projeto com npm create vue@latest</li>
      <li class="concluida">Seguir o caminho index.html → main.js → App.vue</li>
      <li>Reconhecer os três blocos de um arquivo .vue</li>
      <li>Achar o atributo data-v-… do estilo scoped no Elements</li>
    </ul>
  </main>
</template>

<!-- 3. Apresentação. scoped: estas regras valem só para os elementos deste componente. -->
<style scoped>
.cartao {
  max-width: 36rem;
  margin: var(--espaco-5) auto;
  padding: var(--espaco-4) var(--espaco-5);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
  background: var(--cor-superficie);
}

h1 {
  margin: 0;
}

.resumo {
  color: var(--cor-texto-suave);
}

.lista {
  display: grid;
  gap: var(--espaco-2);
  padding: 0;
  list-style: none;
}

.lista li {
  padding: var(--espaco-2) var(--espaco-3);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
}

.concluida {
  color: var(--cor-texto-suave);
  text-decoration: line-through;
}
</style>
