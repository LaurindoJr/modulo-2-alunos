// Preferência de tema claro/escuro: ler, salvar e aplicar na página.
// Funções comuns de JavaScript — nada aqui depende do Vue.

export const CHAVE_TEMA = 'todo-list:tema'

/** @returns {'claro' | 'escuro' | null} a escolha salva, ou null se não houver escolha válida */
export function lerTemaSalvo() {
  try {
    const valor = localStorage.getItem(CHAVE_TEMA)
    return valor === 'claro' || valor === 'escuro' ? valor : null
  } catch {
    // Modo privado ou política do navegador pode negar o acesso: a página segue o sistema.
    return null
  }
}

/** @returns {boolean} false se o navegador recusar a gravação (o tema continua valendo nesta aba) */
export function salvarTema(tema) {
  try {
    localStorage.setItem(CHAVE_TEMA, tema)
    return true
  } catch {
    return false
  }
}

/** @returns {'claro' | 'escuro'} o tema indicado pelo sistema operacional */
export function temaDoSistema() {
  return globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
}

/** O CSS lê data-tema no <html> para fixar o color-scheme (ver assets/main.css). */
export function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema
}
