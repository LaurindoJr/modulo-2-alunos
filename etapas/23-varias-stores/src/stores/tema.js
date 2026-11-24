// Segunda store. Pequena de propósito: store não precisa ser grande para valer.
//
// Por que o tema virou store, se ele vivia bem no App.vue? Porque agora mais de
// um lugar precisa dele — o botão do topo e, na prática 3, a preferência de
// densidade da lista. No dia em que só UM componente usa, pode voltar a ser
// estado local: store não é melhor, é diferente.

import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { aplicarTema, lerTemaSalvo, salvarTema, temaDoSistema } from '../utils/tema'

export const useTemaStore = defineStore('tema', () => {
  // O valor inicial vem do que foi salvo; se não houver, segue o sistema.
  const salvo = lerTemaSalvo()
  const escuro = ref((salvo ?? temaDoSistema()) === 'escuro')

  // Aplica já na criação da store, para a página não piscar no tema errado.
  aplicarTema(escuro.value ? 'escuro' : 'claro')

  // O watch da etapa 12, agora dentro da store: o efeito mora junto do estado.
  watch(escuro, (estaEscuro) => {
    const tema = estaEscuro ? 'escuro' : 'claro'
    aplicarTema(tema)
    salvarTema(tema)
  })

  function alternarTema() {
    escuro.value = !escuro.value
  }

  return { escuro, alternarTema }
})
