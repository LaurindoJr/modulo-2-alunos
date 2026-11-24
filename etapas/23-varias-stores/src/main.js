// Ponto de entrada do JavaScript: o index.html carrega este arquivo.
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue' // componente raiz
import router from './router' // tabela endereço → tela
import { guardarFiltros } from './stores/filtros' // $subscribe que persiste os filtros
import './assets/main.css' // estilo GLOBAL: vale para a página inteira

// Dois plugins: o Pinia guarda as stores, o Router escolhe a tela.
const app = createApp(App)
app.use(createPinia()).use(router)

// O $subscribe precisa de uma store já criada — por isso vem depois do Pinia,
// e antes do mount, para não perder nenhuma mudança.
guardarFiltros()

app.mount('#app')
