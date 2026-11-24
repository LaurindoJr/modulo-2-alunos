<script setup>
// Quatro estados, nesta ordem: carregando → falhou → vazio → lista.
// A ordem importa: enquanto carrega, não se sabe se está vazio nem se falhou.
import PainelCartao from '../components/PainelCartao.vue'
import TarefaFiltros from '../components/TarefaFiltros.vue'
import TarefaForm from '../components/TarefaForm.vue'
import TarefaItem from '../components/TarefaItem.vue'
import { useTarefas } from '../composables/useTarefas'

const {
  tarefas,
  carregando,
  erro,
  busca,
  situacao,
  concluidas,
  titulos,
  visiveis,
  carregar,
  adicionar,
  alternar,
  remover,
} = useTarefas()
</script>

<template>
  <PainelCartao>
    <template #titulo>Minhas tarefas</template>
    <template #subtitulo>
      <p class="subtitulo">
        <template v-if="carregando">Buscando na API…</template>
        <template v-else-if="erro">—</template>
        <template v-else>
          {{ concluidas }} de {{ tarefas.length }} concluídas · {{ visiveis.length }} exibidas
        </template>
      </p>
    </template>

    <!-- 1. CARREGANDO. role="status" faz o leitor de tela anunciar sem interromper. -->
    <p v-if="carregando" class="estado-api" role="status" aria-live="polite">
      <span class="girando" aria-hidden="true">◴</span> Carregando tarefas…
    </p>

    <!-- 2. FALHOU. role="alert" interrompe: é um problema que exige atenção. -->
    <div v-else-if="erro" class="estado-api estado-erro" role="alert">
      <p class="erro-texto">{{ erro }}</p>
      <button type="button" class="botao" @click="carregar">Tentar de novo</button>
    </div>

    <!-- 3 e 4. Só depois de saber que deu certo é que faz sentido mostrar a lista
         (ou dizer que ela está vazia). -->
    <template v-else>
      <TarefaForm :titulos-existentes="titulos" @criar="adicionar" />
      <TarefaFiltros v-model:busca="busca" v-model:situacao="situacao" />

      <ul v-if="visiveis.length > 0" class="lista">
        <TarefaItem
          v-for="tarefa in visiveis"
          :key="tarefa.id"
          :tarefa="tarefa"
          @alternar="alternar"
          @remover="remover"
        />
      </ul>
      <p v-else class="vazio">
        {{
          tarefas.length === 0
            ? 'Nenhuma tarefa cadastrada.'
            : 'Nenhuma tarefa corresponde aos filtros.'
        }}
      </p>
    </template>
  </PainelCartao>
</template>

<style scoped>
.subtitulo {
  margin: 0;
  color: var(--cor-texto-suave);
}

.estado-api {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-3);
  align-items: center;
  padding: var(--espaco-3);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
  color: var(--cor-texto-suave);
}

.estado-erro {
  border-color: var(--cor-erro);
}

.erro-texto {
  flex: 1;
  margin: 0;
  color: var(--cor-erro);
}

.girando {
  display: inline-block;
  animation: girar 1.2s linear infinite;
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

/* Quem pediu menos movimento no sistema não recebe a animação. */
@media (prefers-reduced-motion: reduce) {
  .girando {
    animation: none;
  }
}

.lista {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.vazio {
  margin: 0;
  color: var(--cor-texto-suave);
}
</style>
