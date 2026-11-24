<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import AlternarTema from './components/AlternarTema.vue'
import { useTarefasStore } from './stores/tarefas'
import { aplicarTema, lerTemaSalvo, salvarTema, temaDoSistema } from './utils/tema'

// A busca acontece UMA vez, quando a aplicação nasce — e não dentro de cada tela.
// Se ficasse na ListaView, ir e voltar entre as telas refaria a requisição.
// Repare que ainda não há tratamento de erro: é o assunto da etapa 19.
// Desestruturar uma ACTION é seguro: funções não são reativas.
// Desestruturar um ESTADO não é — ver a investigação da etapa.
const { carregar } = useTarefasStore()
onMounted(carregar)

// O App encolheu: as tarefas saíram daqui para o composable, e a escolha da tela
// saiu daqui para o roteador. Sobrou o que é da PÁGINA INTEIRA — o topo e o tema.
const temaSalvo = lerTemaSalvo()
if (temaSalvo) aplicarTema(temaSalvo)
const temaEscuro = ref((temaSalvo ?? temaDoSistema()) === 'escuro')

watch(temaEscuro, (escuro) => {
  const tema = escuro ? 'escuro' : 'claro'
  aplicarTema(tema)
  salvarTema(tema)
})
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

      <AlternarTema v-model="temaEscuro" />
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
