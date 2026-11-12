<script setup>
import { ref } from 'vue'

// ref cria um valor REATIVO. No <script> ele é lido e alterado por .value;
// no template o Vue “desembrulha” sozinho: escreve-se só {{ concluidas }}.
const titulo = ref('Minhas tarefas')
const concluidas = ref(2)

// Constante comum: nunca muda, então não precisa ser reativa.
const TOTAL = 4

function concluirProxima() {
  if (concluidas.value < TOTAL) concluidas.value += 1
}

function reiniciar() {
  concluidas.value = 0
}
</script>

<template>
  <main class="cartao">
    <!-- Interpolação: {{ }} aceita uma EXPRESSÃO (um valor), não um comando como if ou for -->
    <h1>{{ titulo }}</h1>
    <p class="resumo" :class="{ completo: concluidas === TOTAL }">
      {{ concluidas }} de {{ TOTAL }} concluídas ·
      {{ concluidas === TOTAL ? 'tudo pronto!' : `faltam ${TOTAL - concluidas}` }}
    </p>

    <!-- v-bind (forma curta “:”) liga um ATRIBUTO a uma expressão -->
    <progress :value="concluidas" :max="TOTAL" aria-label="Progresso das tarefas"></progress>

    <div class="acoes">
      <!-- v-on (forma curta “@”) liga um EVENTO a uma função -->
      <button
        type="button"
        class="botao botao-principal"
        :disabled="concluidas === TOTAL"
        @click="concluirProxima"
      >
        Concluir próxima
      </button>
      <button type="button" class="botao" @click="reiniciar">Reiniciar</button>
    </div>

    <!-- Ainda sem v-for: cada item repete a mesma regra. A etapa 10 acaba com a repetição. -->
    <ul class="lista">
      <li :class="{ concluida: concluidas >= 1 }">Criar o projeto com npm create vue@latest</li>
      <li :class="{ concluida: concluidas >= 2 }">
        Seguir o caminho index.html → main.js → App.vue
      </li>
      <li :class="{ concluida: concluidas >= 3 }">Trocar texto fixo por interpolação</li>
      <li :class="{ concluida: concluidas >= 4 }">Ligar atributos e eventos ao estado</li>
    </ul>
  </main>
</template>

<style scoped>
.cartao {
  display: grid;
  gap: var(--espaco-3);
  max-width: 36rem;
  margin: var(--espaco-5) auto;
  padding: var(--espaco-4) var(--espaco-5);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
  background: var(--cor-superficie);
}

h1,
.resumo {
  margin: 0;
}

.resumo {
  color: var(--cor-texto-suave);
}

.resumo.completo {
  color: var(--cor-primaria-forte);
  font-weight: 600;
}

progress {
  width: 100%;
  accent-color: var(--cor-primaria);
}

.acoes {
  display: flex;
  gap: var(--espaco-2);
}

.lista {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
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
