// Ponto de entrada do JavaScript: o index.html carrega este arquivo.
import { createApp } from 'vue'

import App from './App.vue' // componente raiz: um arquivo .vue que o Vite transforma em JavaScript
import './assets/main.css' // estilo GLOBAL: vale para a página inteira

// Cria a aplicação a partir do componente raiz e a monta no <div id="app"> do index.html.
createApp(App).mount('#app')
