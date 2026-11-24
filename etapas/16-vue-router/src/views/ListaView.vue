<script setup>
// A tela não recebe mais props: quem a desenha é o <RouterView />, que não passa dados.
// Ela busca o estado no composable — o mesmo que a SobreView usa.
import PainelCartao from '../components/PainelCartao.vue'
import TarefaFiltros from '../components/TarefaFiltros.vue'
import TarefaForm from '../components/TarefaForm.vue'
import TarefaItem from '../components/TarefaItem.vue'
import { useTarefas } from '../composables/useTarefas'

const { tarefas, busca, situacao, concluidas, titulos, visiveis, adicionar, alternar, remover } =
  useTarefas()
</script>

<template>
  <PainelCartao>
    <template #titulo>Minhas tarefas</template>
    <template #subtitulo>
      <p class="subtitulo">
        {{ concluidas }} de {{ tarefas.length }} concluídas · {{ visiveis.length }} exibidas
      </p>
    </template>

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
  </PainelCartao>
</template>

<style scoped>
.subtitulo {
  margin: 0;
  color: var(--cor-texto-suave);
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
