// O roteador é uma tabela: endereço → componente de tela.
// Quem lê essa tabela e desenha a tela certa é o <RouterView /> do App.vue.

import { createRouter, createWebHistory } from 'vue-router'

import ListaView from '../views/ListaView.vue'
import NaoEncontradaView from '../views/NaoEncontradaView.vue'
import SobreView from '../views/SobreView.vue'
import TarefaView from '../views/TarefaView.vue'

const router = createRouter({
  // createWebHistory usa a History API do navegador: o endereço muda sem recarregar a página.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'lista', component: ListaView },
    { path: '/resumo', name: 'resumo', component: SobreView },

    // :id é um PARÂMETRO: casa com /tarefa/1, /tarefa/42, /tarefa/abc.
    // O que vier ali chega em route.params.id — sempre como texto.
    { path: '/tarefa/:id', name: 'tarefa', component: TarefaView },

    // Curinga: tem de ser a ÚLTIMA regra, porque a primeira que casa vence.
    { path: '/:caminho(.*)*', name: 'nao-encontrada', component: NaoEncontradaView },
  ],
})

export default router
