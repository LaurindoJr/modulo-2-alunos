// Ponto de entrada do JavaScript: o index.html carrega este arquivo.
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue' // componente raiz: um arquivo .vue que o Vite transforma em JavaScript
import router from './router' // tabela endereço → tela
import './assets/main.css' // estilo GLOBAL: vale para a página inteira

// .use(router) instala o roteador na aplicação: a partir daqui existem
// <RouterLink>, <RouterView>, useRoute() e useRouter() em qualquer componente.
// createPinia() cria o "porta-stores" da aplicação. Sem ele, chamar
// useTarefasStore() dá erro: a store não tem onde morar.
createApp(App).use(createPinia()).use(router).mount('#app')
