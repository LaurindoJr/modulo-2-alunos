// Servidor HTTP local mínimo, só com módulos nativos do Node.
// Serve os arquivos da pasta atual (ou da pasta indicada) para observar requisições no DevTools.
//
//   node ../ferramentas/servidor-local.mjs             serve a pasta onde o terminal está
//   node ../ferramentas/servidor-local.mjs corrigido   serve a subpasta "corrigido"
//   PORTA=8089 node ../ferramentas/servidor-local.mjs  usa outra porta
//                                                      (PowerShell: $env:PORTA=8089; cmd: set PORTA=8089)
//
// Não é um servidor de produção: não tem cache, compressão nem HTTPS.

import { createServer } from 'node:http'
import { readFile, realpath, stat } from 'node:fs/promises'
import { extname, join, resolve, sep } from 'node:path'

const PORTA_PADRAO = 8088
const PORTA = Number(process.env.PORTA ?? PORTA_PADRAO)
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

if (!Number.isInteger(PORTA) || PORTA < 1 || PORTA > 65535) {
  console.error(`PORTA inválida: "${process.env.PORTA}". Use um número entre 1 e 65535.`)
  process.exit(1)
}

let PASTA
try {
  PASTA = await realpath(resolve(process.argv[2] ?? process.cwd()))
} catch {
  console.error(`Pasta não encontrada: ${resolve(process.argv[2] ?? process.cwd())}`)
  process.exit(1)
}

function dentroDaPasta(caminho) {
  return caminho === PASTA || caminho.startsWith(PASTA + sep)
}

function caminhoSolicitado(url) {
  try {
    return decodeURIComponent(new URL(url, 'http://localhost').pathname)
  } catch {
    return null
  }
}

function responder(res, status, corpo, cabecalhos = { 'Content-Type': 'text/plain; charset=utf-8' }) {
  if (res.headersSent) return
  res.writeHead(status, cabecalhos)
  res.end(corpo)
}

async function atender(req, res) {
  const caminho = caminhoSolicitado(req.url ?? '/')
  const pedido = caminho === null ? null : join(PASTA, caminho)

  // Bloqueia /../ (sair da pasta) e arquivos ocultos como .env ou .git
  const oculto = caminho?.split('/').some((parte) => parte.startsWith('.'))
  if (pedido === null || oculto || !dentroDaPasta(pedido)) {
    responder(res, 403, 'Acesso negado')
    return 403
  }

  let real
  try {
    // realpath segue links simbólicos: um link dentro da pasta não pode apontar para fora dela
    real = await realpath(pedido)
  } catch {
    responder(res, 404, `Arquivo não encontrado: ${caminho}`)
    return 404
  }
  if (!dentroDaPasta(real)) {
    responder(res, 403, 'Acesso negado')
    return 403
  }

  const info = await stat(real)
  if (info.isDirectory()) {
    if (!caminho.endsWith('/')) {
      responder(res, 301, '', { Location: `${caminho}/` })
      return 301
    }
    real = join(real, 'index.html')
  }

  try {
    const conteudo = await readFile(real)
    responder(res, 200, conteudo, {
      'Content-Type': TIPOS[extname(real).toLowerCase()] ?? 'application/octet-stream',
    })
    return 200
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      responder(res, 404, `Arquivo não encontrado: ${caminho}`)
      return 404
    }
    throw erro
  }
}

const servidor = createServer(async (req, res) => {
  try {
    const status = await atender(req, res)
    console.log(`${status} ${req.method} ${caminhoSolicitado(req.url ?? '/') ?? req.url}`)
  } catch (erro) {
    console.error(`500 ${req.method} ${req.url} — ${erro.code ?? erro.message}`)
    responder(res, 500, 'Erro ao ler o arquivo no servidor local')
  }
})

servidor.on('error', (erro) => {
  if (erro.code === 'EADDRINUSE') {
    console.error(`A porta ${PORTA} já está em uso por outro processo.`)
    console.error('Encerre o outro servidor (Ctrl+C no terminal dele) ou escolha outra porta, por exemplo PORTA=8089')
    process.exit(1)
  }
  throw erro
})

servidor.listen(PORTA, 'localhost', () => {
  console.log(`Servindo ${PASTA}`)
  console.log(`Abra http://localhost:${PORTA}/ no navegador. Ctrl+C encerra o servidor.`)
})
