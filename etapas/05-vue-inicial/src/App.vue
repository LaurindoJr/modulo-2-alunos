<script setup></script>

<template>
  <main class="cartao">
    <h1>Minhas tarefas</h1>
    <p class="resumo">Lista estática: os dados ainda estão escritos no template.</p>
    <ul class="lista">
      <li class="concluida">Criar o projeto com npm create vue@latest</li>
      <li class="concluida">Iniciar o servidor de desenvolvimento</li>
      <li>Localizar index.html, main.js e App.vue</li>
      <li>Gerar o build e inspecionar a pasta dist</li>
    </ul>
  </main>
</template>

<style scoped>
.cartao {
  max-width: 34rem;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  border: 1px solid #cfd8cd;
  border-radius: 0.75rem;
  background: #ffffff;
  color: #17221c;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    Arial,
    sans-serif;
}

h1 {
  margin: 0;
  font-family: 'Iowan Old Style', Palatino, Georgia, serif;
}

.resumo {
  color: #4d5c53;
}

.lista {
  display: grid;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

.lista li {
  padding: 0.6rem 0.8rem;
  border: 1px solid #cfd8cd;
  border-radius: 0.5rem;
}

.concluida {
  color: #4d5c53;
  text-decoration: line-through;
}
</style>
