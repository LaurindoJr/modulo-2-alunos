<script setup>
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'

import { aplicarTema, lerTemaSalvo, salvarTema, temaDoSistema } from './utils/tema'

const TITULO_MAXIMO = 80

const tarefas = ref([
  { id: 1, titulo: 'Criar o projeto com npm create vue@latest', concluida: true },
  { id: 2, titulo: 'Desenhar a lista com v-for', concluida: true },
  { id: 3, titulo: 'Criar tarefas com um formulário', concluida: false },
  { id: 4, titulo: 'Filtrar a lista com computed', concluida: false },
])
let proximoId = 5

// v-model mantém cada um destes refs igual ao campo correspondente.
const novoTitulo = ref('')
const mensagem = ref('')
const busca = ref('')
const situacao = ref('todas')

// computed: valor DERIVADO do estado. O Vue guarda o resultado e só recalcula
// quando algo que foi lido aqui dentro (tarefas, busca, situacao) muda.
const concluidas = computed(() => tarefas.value.filter((tarefa) => tarefa.concluida).length)

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

function validar(titulo) {
  if (titulo === '') return 'Escreva um título para a tarefa.'
  if (titulo.length > TITULO_MAXIMO) return `Use no máximo ${TITULO_MAXIMO} caracteres.`
  const repetida = tarefas.value.some(
    (tarefa) => tarefa.titulo.toLowerCase() === titulo.toLowerCase(),
  )
  if (repetida) return 'Já existe uma tarefa com esse título.'
  return ''
}

function adicionar() {
  mensagem.value = validar(novoTitulo.value)
  if (mensagem.value) return

  tarefas.value = [...tarefas.value, { id: proximoId, titulo: novoTitulo.value, concluida: false }]
  proximoId += 1
  novoTitulo.value = ''
}

function alternar(id) {
  tarefas.value = tarefas.value.map((tarefa) =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
  )
}

function remover(id) {
  tarefas.value = tarefas.value.filter((tarefa) => tarefa.id !== id)
}

// ---------- Tema: estado + watch ----------
// Sem escolha salva, a página segue o sistema e nada é gravado.
const temaSalvo = lerTemaSalvo()
if (temaSalvo) aplicarTema(temaSalvo)
const temaEscuro = ref((temaSalvo ?? temaDoSistema()) === 'escuro')

// watch: quando temaEscuro MUDA, produz um efeito FORA do template
// (atributo no <html> e localStorage). computed calcula valores; watch executa efeitos.
watch(temaEscuro, (escuro) => {
  const tema = escuro ? 'escuro' : 'claro'
  aplicarTema(tema)
  salvarTema(tema)
})

// ---------- Ciclo de vida ----------
// useTemplateRef dá acesso ao elemento com ref="campoTitulo". Ele só existe no DOM
// depois que o componente é MONTADO: durante o setup, campoTitulo.value ainda é null.
const campoTitulo = useTemplateRef('campoTitulo')

onMounted(() => {
  // O campo de nova tarefa é a ação principal da página; por isso recebe o foco.
  campoTitulo.value?.focus()
})
</script>

<template>
  <main class="cartao">
    <header class="cabecalho">
      <h1>Minhas tarefas</h1>
      <button
        type="button"
        class="botao alternar-tema"
        :aria-pressed="temaEscuro"
        @click="temaEscuro = !temaEscuro"
      >
        <span aria-hidden="true">{{ temaEscuro ? '☾' : '☀' }}</span>
        Tema escuro
      </button>
    </header>
    <p class="resumo">
      {{ concluidas }} de {{ tarefas.length }} concluídas · {{ visiveis.length }} exibidas
    </p>

    <!-- .prevent: impede o envio padrão (que recarregaria a página) -->
    <form class="formulario" novalidate @submit.prevent="adicionar">
      <label for="nova-tarefa">Nova tarefa</label>
      <div class="formulario-linha">
        <!-- .trim: o ref recebe o texto sem espaços nas pontas -->
        <input
          id="nova-tarefa"
          ref="campoTitulo"
          v-model.trim="novoTitulo"
          type="text"
          :maxlength="TITULO_MAXIMO"
          autocomplete="off"
          placeholder="Ex.: revisar v-model"
          :aria-invalid="mensagem ? 'true' : 'false'"
          aria-describedby="erro-tarefa"
        />
        <button type="submit" class="botao botao-principal">Adicionar</button>
      </div>
      <p id="erro-tarefa" class="erro" role="alert">{{ mensagem }}</p>
    </form>

    <div class="filtros">
      <label for="busca">Buscar</label>
      <input id="busca" v-model="busca" type="search" placeholder="Parte do título" />
      <fieldset class="situacoes">
        <legend>Mostrar</legend>
        <label><input v-model="situacao" type="radio" value="todas" /> Todas</label>
        <label><input v-model="situacao" type="radio" value="pendentes" /> Pendentes</label>
        <label><input v-model="situacao" type="radio" value="concluidas" /> Concluídas</label>
      </fieldset>
    </div>

    <ul v-if="visiveis.length > 0" class="lista">
      <li
        v-for="tarefa in visiveis"
        :key="tarefa.id"
        class="tarefa"
        :class="{ concluida: tarefa.concluida }"
      >
        <label class="tarefa-rotulo">
          <input type="checkbox" :checked="tarefa.concluida" @change="alternar(tarefa.id)" />
          <span>{{ tarefa.titulo }}</span>
        </label>
        <button
          type="button"
          class="botao"
          :aria-label="`Remover tarefa: ${tarefa.titulo}`"
          @click="remover(tarefa.id)"
        >
          Remover
        </button>
      </li>
    </ul>
    <p v-else class="vazio">
      {{
        tarefas.length === 0
          ? 'Nenhuma tarefa cadastrada.'
          : 'Nenhuma tarefa corresponde aos filtros.'
      }}
    </p>
  </main>
</template>

<style scoped>
.cartao {
  display: grid;
  gap: var(--espaco-3);
  max-width: 38rem;
  margin: var(--espaco-5) auto;
  padding: var(--espaco-4) var(--espaco-5);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
  background: var(--cor-superficie);
}

h1,
.resumo,
.vazio,
.erro {
  margin: 0;
}

.cabecalho {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-3);
  align-items: center;
  justify-content: space-between;
}

.alternar-tema {
  gap: var(--espaco-2);
  border-radius: 999px;
}

.alternar-tema[aria-pressed='true'] {
  border-color: var(--cor-primaria);
  background: var(--cor-primaria-suave);
}

.resumo,
.vazio {
  color: var(--cor-texto-suave);
}

.formulario,
.filtros {
  display: grid;
  gap: var(--espaco-1);
}

.formulario-linha {
  display: flex;
  gap: var(--espaco-2);
}

.formulario-linha input {
  flex: 1;
  min-width: 0;
}

.erro {
  min-height: 1.25rem;
  color: var(--cor-erro);
  font-size: 0.9rem;
}

.situacoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-4);
  margin: var(--espaco-2) 0 0;
  padding: 0;
  border: 0;
}

.lista {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.tarefa {
  display: flex;
  gap: var(--espaco-3);
  align-items: center;
  justify-content: space-between;
  padding: var(--espaco-2) var(--espaco-3);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
}

.tarefa-rotulo {
  display: flex;
  flex: 1;
  gap: var(--espaco-3);
  align-items: center;
  cursor: pointer;
}

.tarefa-rotulo input {
  width: 1.2rem;
  height: 1.2rem;
  accent-color: var(--cor-primaria);
}

.concluida span {
  color: var(--cor-texto-suave);
  text-decoration: line-through;
}
</style>
