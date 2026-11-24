<script setup>
import { computed, ref, watch } from 'vue'

import AlternarTema from './components/AlternarTema.vue'
import { aplicarTema, lerTemaSalvo, salvarTema, temaDoSistema } from './utils/tema'
import ListaView from './views/ListaView.vue'
import SobreView from './views/SobreView.vue'

const tarefas = ref([
  { id: 1, titulo: 'Separar a aplicação em telas (views)', concluida: true },
  { id: 2, titulo: 'Trocar de tela sem recarregar a página', concluida: false },
  { id: 3, titulo: 'Descobrir por que o endereço não muda', concluida: false },
  { id: 4, titulo: 'Comparar roteamento no servidor e no cliente', concluida: false },
])
let proximoId = 5

const busca = ref('')
const situacao = ref('todas')

// ATENÇÃO: a tela atual é um ref comum. Ele vive na memória da página —
// o endereço do navegador não sabe nada sobre ele. A etapa 16 conserta isso.
const tela = ref('lista')

const concluidas = computed(() => tarefas.value.filter((tarefa) => tarefa.concluida).length)
const titulos = computed(() => tarefas.value.map((tarefa) => tarefa.titulo))
const visiveis = computed(() => {
  const termo = busca.value.trim().toLowerCase()
  return tarefas.value.filter(
    (tarefa) => combinaSituacao(tarefa) && tarefa.titulo.toLowerCase().includes(termo),
  )
})

function combinaSituacao(tarefa) {
  if (situacao.value === 'pendentes') return !tarefa.concluida
  if (situacao.value === 'concluidas') return tarefa.concluida
  return true
}

function adicionar(titulo) {
  tarefas.value = [...tarefas.value, { id: proximoId, titulo, concluida: false }]
  proximoId += 1
}

function alternar(id) {
  tarefas.value = tarefas.value.map((tarefa) =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
  )
}

function remover(id) {
  tarefas.value = tarefas.value.filter((tarefa) => tarefa.id !== id)
}

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

      <!-- Navegação à mão: dois botões que trocam um ref. Repare no que NÃO acontece: -->
      <!-- o endereço continua o mesmo, e o botão Voltar do navegador sai da aplicação. -->
      <nav class="navegacao" aria-label="Telas da aplicação">
        <button
          type="button"
          class="aba"
          :class="{ ativa: tela === 'lista' }"
          :aria-current="tela === 'lista' ? 'page' : undefined"
          @click="tela = 'lista'"
        >
          Lista
        </button>
        <button
          type="button"
          class="aba"
          :class="{ ativa: tela === 'sobre' }"
          :aria-current="tela === 'sobre' ? 'page' : undefined"
          @click="tela = 'sobre'"
        >
          Resumo
        </button>
      </nav>

      <AlternarTema v-model="temaEscuro" />
    </header>

    <main class="cartao">
      <ListaView
        v-if="tela === 'lista'"
        v-model:busca="busca"
        v-model:situacao="situacao"
        :tarefas="tarefas"
        :visiveis="visiveis"
        :concluidas="concluidas"
        :titulos="titulos"
        @criar="adicionar"
        @alternar="alternar"
        @remover="remover"
      />
      <SobreView v-else :tarefas="tarefas" :concluidas="concluidas" />
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
  background: none;
  color: var(--cor-texto-suave);
  font: inherit;
  cursor: pointer;
}

.aba:hover {
  border-color: var(--cor-borda);
}

.aba.ativa {
  border-color: var(--cor-borda);
  background: var(--cor-superficie);
  color: var(--cor-texto);
  font-weight: 600;
}
</style>
