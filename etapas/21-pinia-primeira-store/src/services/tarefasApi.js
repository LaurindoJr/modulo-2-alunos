// Camada de serviço: TUDO que fala HTTP mora aqui.
//
// Por que separar? Porque o resto da aplicação não precisa saber que existe
// um servidor. O composable pede "crie esta tarefa"; como isso vira um POST,
// e para qual endereço, é problema deste arquivo. No dia em que a API mudar
// de endereço, de formato ou de biblioteca, muda só aqui.

import axios from 'axios'

// Uma instância com o endereço base, em vez de repetir a URL em cada chamada.
// O endereço vem do ambiente: em produção ele não será localhost.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  timeout: 8000,
})

const RECURSO = '/tarefas'

export async function listarTarefas() {
  const { data } = await api.get(RECURSO)
  return data
}

export async function criarTarefa(titulo) {
  // Não mandamos id: quem gera o id é o servidor, e ele devolve o item criado.
  const { data } = await api.post(RECURSO, { titulo, concluida: false })
  return data
}

// PATCH manda só o que mudou. PUT substituiria o registro inteiro — e apagaria
// qualquer campo que não fosse enviado.
export async function alterarTarefa(id, mudancas) {
  const { data } = await api.patch(`${RECURSO}/${id}`, mudancas)
  return data
}

export async function apagarTarefa(id) {
  await api.delete(`${RECURSO}/${id}`)
}

// Traduz a falha do axios para uma frase que o usuário entende.
// Fica aqui porque é conhecimento sobre HTTP, não sobre tarefas.
export function mensagemDeErro(falha, acao = 'completar a ação') {
  if (falha.code === 'ECONNABORTED') {
    return `A API demorou demais para responder ao tentar ${acao}.`
  }
  if (falha.response) {
    return `A API respondeu ${falha.response.status} ao tentar ${acao}.`
  }
  if (falha.request) {
    return `Não foi possível falar com a API. Ela está no ar? Rode \`npm run api\`.`
  }
  return `Não foi possível ${acao}.`
}
