// Exemplo incoerente, de propósito: sintaxe de ES Modules em um arquivo marcado como CommonJS.
// Execute e leia a mensagem antes de corrigir:  node resumo.cjs
// Há duas correções válidas: usar require (mantendo .cjs) ou renomear para .mjs (mantendo import).

import { tarefas } from '../esm/dados.mjs'

console.log(`${tarefas.length} tarefas`)
