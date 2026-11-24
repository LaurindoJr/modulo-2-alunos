// O roteador é uma tabela: endereço → componente de tela.
// Quem lê essa tabela e desenha a tela certa é o <RouterView /> do App.vue.

import { createRouter, createWebHistory } from 'vue-router'

import ListaView from '../views/ListaView.vue'
import SobreView from '../views/SobreView.vue'

const router = createRouter({
  // createWebHistory usa a History API do navegador: o endereço muda sem recarregar a página.
  // O argumento é a pasta em que a aplicação está publicada (BASE_URL vem do Vite).
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'lista', component: ListaView },
    { path: '/resumo', name: 'resumo', component: SobreView },
  ],
})

export default router
