// Quais objetos o ambiente oferece? Execute no Console do navegador e com  node ambiente.js
// A linguagem é a mesma; as APIs disponíveis dependem do ambiente hospedeiro.

const recursos = {
  console: typeof console,
  Math: typeof Math,
  document: typeof document,
  window: typeof window,
  process: typeof process,
  fetch: typeof fetch,
}

for (const [nome, tipo] of Object.entries(recursos)) {
  console.log(`${nome.padEnd(9)} → ${tipo === 'undefined' ? 'não existe aqui' : tipo}`)
}
