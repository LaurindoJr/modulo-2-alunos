<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PainelCartao from '../components/PainelCartao.vue'
import { storeToRefs } from 'pinia'

import { useTarefasStore } from '../stores/tarefas'

// useRoute() devolve o endereço ATUAL (de onde estamos).
// useRouter() devolve o roteador (com quem se navega).
const route = useRoute()
const router = useRouter()

const store = useTarefasStore()
const { tarefas } = storeToRefs(store)
const { alternar, remover } = store

// MUDOU NESTA ETAPA. Na etapa 17 a comparação era com Number(), porque os ids
// estavam escritos no código como números. Agora os dados vêm da API, e o
// json-server devolve os ids como TEXTO ("1", não 1). Comparar os dois lados
// como texto funciona nos dois casos — e é o que se faz quando a origem do dado
// não está sob o seu controle.
//
// Continua sendo um COMPUTED, e não uma leitura no onMounted: o componente é
// reaproveitado quando só o parâmetro muda (etapa 17).
const mesmoId = (item) => String(item.id) === String(route.params.id)

const tarefa = computed(() => tarefas.value.find(mesmoId))

const proxima = computed(() => {
  const posicao = tarefas.value.findIndex(mesmoId)
  if (posicao === -1) return null
  return tarefas.value[posicao + 1] ?? tarefas.value[0]
})

function alternarEVoltar() {
  alternar(tarefa.value.id)
}

function removerEVoltar() {
  remover(tarefa.value.id)
  // Navegação programática: sem clique num link, a partir do código.
  router.push('/')
}
</script>

<template>
  <PainelCartao>
    <template #titulo>Tarefa {{ route.params.id }}</template>

    <template v-if="tarefa">
      <p class="titulo-tarefa">{{ tarefa.titulo }}</p>
      <p class="estado">
        Situação:
        <strong>{{ tarefa.concluida ? 'concluída' : 'pendente' }}</strong>
      </p>

      <div class="acoes">
        <button type="button" class="botao" @click="alternarEVoltar">
          {{ tarefa.concluida ? 'Reabrir' : 'Concluir' }}
        </button>
        <button type="button" class="botao" @click="removerEVoltar">Remover e voltar</button>
        <RouterLink to="/" class="botao">Voltar à lista</RouterLink>
        <!-- Daqui para outra tarefa: muda SÓ o parâmetro, a tela continua sendo esta. -->
        <RouterLink
          v-if="proxima"
          :to="{ name: 'tarefa', params: { id: proxima.id } }"
          class="botao"
        >
          Próxima tarefa →
        </RouterLink>
      </div>
    </template>

    <!-- O endereço existe, mas o dado não. São coisas diferentes: a rota casou, -->
    <!-- a busca na lista é que não encontrou nada. -->
    <template v-else>
      <p class="vazio">Não existe tarefa com o id {{ route.params.id }}.</p>
      <RouterLink to="/" class="botao">Voltar à lista</RouterLink>
    </template>
  </PainelCartao>
</template>

<style scoped>
.titulo-tarefa {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.estado,
.vazio {
  margin: 0;
  color: var(--cor-texto-suave);
}

.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}
</style>
