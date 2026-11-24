<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import { storeToRefs } from 'pinia'

import AlternarTema from './components/AlternarTema.vue'
import { useTarefasStore } from './stores/tarefas'
import { useTemaStore } from './stores/tema'

// O App.vue ficou com quase nada, e isso é o resultado de três unidades:
// o roteador escolhe a tela, as stores guardam o estado. Sobrou ligar as pontas.

// A busca das tarefas acontece UMA vez, quando a aplicação nasce.
// Desestruturar uma ACTION é seguro: funções não são reativas.
const { carregar } = useTarefasStore()
onMounted(carregar)

// Já o ESTADO precisa de storeToRefs para continuar reativo (etapa 21).
const { escuro } = storeToRefs(useTemaStore())
</script>

<template>
  <div class="pagina">
    <header class="topo">
      <span class="marca"><span class="marca-icone" aria-hidden="true">✓</span> Todo List</span>

      <!-- RouterLink vira um <a href> de verdade: dá para copiar o endereço, abrir em -->
      <!-- outra aba e usar o botão Voltar. O clique é interceptado para não recarregar. -->
      <nav class="navegacao" aria-label="Telas da aplicação">
        <RouterLink to="/" class="aba">Lista</RouterLink>
        <RouterLink to="/resumo" class="aba">Resumo</RouterLink>
      </nav>

      <AlternarTema v-model="escuro" />
    </header>

    <main class="cartao">
      <!-- O buraco onde o roteador desenha a tela do endereço atual. -->
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.pagina {
  max-width: 40rem;
  margin: 0 auto;
  padding: var(--espaco-4);
}

.topo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-3);
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--espaco-4);
}

.marca {
  display: inline-flex;
  gap: var(--espaco-2);
  align-items: center;
  font-weight: 700;
}

.marca-icone {
  display: inline-grid;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--cor-primaria);
  color: #fff;
  font-size: 0.9rem;
  place-items: center;
}

.navegacao {
  display: flex;
  gap: var(--espaco-1);
}

.aba {
  padding: var(--espaco-1) var(--espaco-3);
  border: 1px solid transparent;
  border-radius: var(--raio);
  color: var(--cor-texto-suave);
  text-decoration: none;
}

.aba:hover {
  border-color: var(--cor-borda);
}

/* O Vue Router marca o link da tela atual sozinho. Usamos EXACT-active de propósito:
   `router-link-active` casa também com os ancestrais, e o link "/" é ancestral de tudo —
   com ele, os dois links ficariam acesos em /resumo. */
.aba.router-link-exact-active {
  border-color: var(--cor-borda);
  background: var(--cor-superficie);
  color: var(--cor-texto);
  font-weight: 600;
}
</style>
