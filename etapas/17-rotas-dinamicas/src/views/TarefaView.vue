<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PainelCartao from '../components/PainelCartao.vue'
import { useTarefas } from '../composables/useTarefas'

// useRoute() devolve o endereço ATUAL (de onde estamos).
// useRouter() devolve o roteador (com quem se navega).
const route = useRoute()
const router = useRouter()

const { tarefas, alternar, remover } = useTarefas()

// params.id vem do endereço, então é SEMPRE texto: "3", não 3.
// Sem o Number(), a comparação com tarefa.id (número) daria falso sempre.
//
// Repare que isto é um COMPUTED, e não uma leitura feita uma vez no onMounted.
// É o que faz a tela acompanhar quando se vai de /tarefa/1 para /tarefa/2 sem sair
// desta mesma tela: o componente é reaproveitado, mas o computed relê o parâmetro.
const tarefa = computed(() => tarefas.value.find((item) => item.id === Number(route.params.id)))

const proxima = computed(() => {
  const posicao = tarefas.value.findIndex((item) => item.id === Number(route.params.id))
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
