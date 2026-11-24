// Navegação e recursos dos slides dos Módulos 2 e 3. Sem dependências; funciona aberto do disco.
// Módulo 2: blocos 1–5 (slides 1–60). Módulo 3: etapas 06–14 (slides 61–132).
// Unidade 5: etapas 15–17 (133–156). Unidade 6: 18–20 (157–180). Unidade 7: 21–23 (181–204).
// Um arquivo por bloco ou etapa.
// Teclas: ←/→ (ou PageUp/PageDown/Espaço) navegam · N notas · L modo leitura · T tema · ? ajuda

;(function () {
  'use strict'

  const MODULOS = {
    2: { rotulo: 'Bloco', ultimoSlide: 60 },
    3: { rotulo: 'Etapa', ultimoSlide: 132 },
    5: { rotulo: 'Etapa', ultimoSlide: 156 },
    6: { rotulo: 'Etapa', ultimoSlide: 180 },
    7: { rotulo: 'Etapa', ultimoSlide: 204 },
  }
  const LARGURA_PALCO = 1600
  const ALTURA_PALCO = 900
  const LARGURA_MINIMA_APRESENTACAO = 760
  const BLOCOS = [
    { n: 1, modulo: 2, nome: 'Ambientes', arquivo: 'bloco-1.html' },
    { n: 2, modulo: 2, nome: 'Editor e DevTools', arquivo: 'bloco-2.html' },
    { n: 3, modulo: 2, nome: 'Navegador e Node', arquivo: 'bloco-3.html' },
    { n: 4, modulo: 2, nome: 'Dependências', arquivo: 'bloco-4.html' },
    { n: 5, modulo: 2, nome: 'Vue e build', arquivo: 'bloco-5.html' },
    { n: 6, modulo: 3, nome: 'Três camadas e DOM', arquivo: 'etapa-06.html' },
    { n: 7, modulo: 3, nome: 'Vue na página', arquivo: 'etapa-07.html' },
    { n: 8, modulo: 3, nome: 'Projeto e SFC', arquivo: 'etapa-08.html' },
    { n: 9, modulo: 3, nome: 'Template e reatividade', arquivo: 'etapa-09.html' },
    { n: 10, modulo: 3, nome: 'Listas e eventos', arquivo: 'etapa-10.html' },
    { n: 11, modulo: 3, nome: 'Formulários e computed', arquivo: 'etapa-11.html' },
    { n: 12, modulo: 3, nome: 'Watchers e ciclo de vida', arquivo: 'etapa-12.html' },
    { n: 13, modulo: 3, nome: 'Props e eventos', arquivo: 'etapa-13.html' },
    { n: 14, modulo: 3, nome: 'v-model e slots', arquivo: 'etapa-14.html' },
    { n: 15, modulo: 5, nome: 'Telas sem roteador', arquivo: 'etapa-15.html' },
    { n: 16, modulo: 5, nome: 'Vue Router', arquivo: 'etapa-16.html' },
    { n: 17, modulo: 5, nome: 'Rotas dinâmicas', arquivo: 'etapa-17.html' },
    { n: 18, modulo: 6, nome: 'Dados de uma API', arquivo: 'etapa-18.html' },
    { n: 19, modulo: 6, nome: 'Carregando e erro', arquivo: 'etapa-19.html' },
    { n: 20, modulo: 6, nome: 'CRUD e serviços', arquivo: 'etapa-20.html' },
    { n: 21, modulo: 7, nome: 'A primeira store', arquivo: 'etapa-21.html' },
    { n: 22, modulo: 7, nome: 'State, getters, actions', arquivo: 'etapa-22.html' },
    { n: 23, modulo: 7, nome: 'Várias stores', arquivo: 'etapa-23.html' },
  ]
  const ROTULOS = {
    abertura: 'Abertura',
    previsao: 'Previsão',
    demonstracao: 'Demonstração',
    explicacao: 'Explicação',
    pratica: 'Prática',
    investigacao: 'Investigação',
    ia: 'Consulta à IA',
    verificacao: 'Verificação sem IA',
    integracao: 'Integração',
  }
  // Módulo 3: cada slide indica a parte do caminho do dev frontend que ele trabalha.
  const PARTES = {
    conhecer: 'Conhecer',
    executar: 'Executar',
    entender: 'Entender',
    pesquisar: 'Pesquisar',
  }

  const corpo = document.body
  const bloco = Number(corpo.dataset.bloco)
  const blocoAtual = BLOCOS.find((b) => b.n === bloco) ?? BLOCOS[0]
  const modulo = MODULOS[blocoAtual.modulo]
  const blocosDoModulo = BLOCOS.filter((b) => b.modulo === blocoAtual.modulo)
  const rotuloBloco = (n) =>
    blocoAtual.modulo === 2 ? `${modulo.rotulo} ${n}` : `${modulo.rotulo} ${String(n).padStart(2, '0')}`
  const slides = Array.from(document.querySelectorAll('.slide'))
  const palco = document.querySelector('.palco')
  let atual = 0

  function lerPreferencia(chave) {
    try {
      return localStorage.getItem(chave)
    } catch {
      return null
    }
  }

  function gravarPreferencia(chave, valor) {
    try {
      localStorage.setItem(chave, valor)
    } catch {
      /* armazenamento indisponível (janela privada, arquivo local bloqueado): segue sem lembrar */
    }
  }

  // ---------- Montagem da interface comum ----------

  function criarSelos() {
    slides.forEach((slide) => {
      const tipo = slide.dataset.tipo
      const topo = slide.querySelector('.slide-topo')
      if (!tipo || !topo || topo.querySelector('.selo')) return
      const selo = document.createElement('span')
      selo.className = `selo selo-${tipo}`
      selo.textContent = ROTULOS[tipo] ?? tipo
      const parte = slide.dataset.parte
      if (PARTES[parte]) {
        const grupo = document.createElement('div')
        grupo.className = 'selos'
        const seloParte = document.createElement('span')
        seloParte.className = `selo-parte selo-parte-${parte}`
        seloParte.textContent = PARTES[parte]
        grupo.append(selo, seloParte)
        topo.prepend(grupo)
      } else {
        topo.prepend(selo)
      }
      slide.setAttribute('aria-roledescription', 'slide')
      const descricao = [ROTULOS[tipo], PARTES[parte]].filter(Boolean).join(' · ')
      slide.setAttribute('aria-label', `${slide.dataset.n} de ${modulo.ultimoSlide}: ${descricao}`)
    })
  }

  function temNotas() {
    return document.querySelector('.notas') !== null
  }

  function criarFerramentas() {
    const barra = document.createElement('nav')
    barra.className = 'ferramentas'
    barra.setAttribute('aria-label', 'Ferramentas da apresentação')
    const botaoNotas = temNotas()
      ? '<button type="button" data-acao="notas" aria-pressed="false" title="Notas (N)">Notas</button>'
      : ''
    barra.innerHTML = `
      <a href="index.html">Índice</a>
      ${botaoNotas}
      <button type="button" data-acao="leitura" aria-pressed="false" title="Modo leitura (L)">Leitura</button>
      <button type="button" data-acao="tema" aria-pressed="false" title="Tema escuro (T)">Tema</button>
      <button type="button" data-acao="ajuda" title="Atalhos (?)">?</button>`
    barra.addEventListener('click', (evento) => {
      const acao = evento.target.closest('[data-acao]')?.dataset.acao
      if (acao) executar(acao)
    })
    corpo.prepend(barra)
  }

  function criarRodape() {
    const rodape = document.createElement('footer')
    rodape.className = 'rodape'
    const trilha = blocosDoModulo.map((b) => {
      const estado = b.n < bloco ? 'feito' : b.n === bloco ? 'agora' : ''
      const marca = b.n < bloco ? '✓' : ''
      return `<li class="${estado}"><span class="caixinha" aria-hidden="true">${marca}</span>${b.n === bloco ? b.nome : ''}</li>`
    }).join('')
    rodape.innerHTML = `
      <ol class="trilha" aria-label="Progresso da Todo List na ${blocoAtual.modulo >= 5 ? `Unidade ${blocoAtual.modulo}` : `Módulo ${blocoAtual.modulo}`}: ${rotuloBloco(bloco)}, ${blocosDoModulo.indexOf(blocoAtual) + 1} de ${blocosDoModulo.length}">${trilha}</ol>
      <div class="rodape-info"><span data-info="tipo"></span><span data-info="tempo"></span><span data-info="numero"></span></div>`
    palco.append(rodape)
  }

  function criarAjuda() {
    const dialogo = document.createElement('dialog')
    dialogo.className = 'ajuda'
    const linhaNotas = temNotas()
      ? '<tr><td><kbd>N</kbd></td><td>Mostrar ou esconder notas</td></tr>'
      : ''
    const descricaoLeitura = temNotas() ? 'todos os slides com notas' : 'todos os slides em sequência'
    dialogo.innerHTML = `
      <h2>Atalhos</h2>
      <table>
        <tr><td><kbd>→</kbd> <kbd>PageDown</kbd> <kbd>Espaço</kbd></td><td>Próximo slide</td></tr>
        <tr><td><kbd>←</kbd> <kbd>PageUp</kbd></td><td>Slide anterior</td></tr>
        <tr><td><kbd>Home</kbd> <kbd>End</kbd></td><td>Primeiro / último slide do bloco ou etapa</td></tr>
        ${linhaNotas}
        <tr><td><kbd>L</kbd></td><td>Modo leitura (${descricaoLeitura}; bom para revisão e impressão)</td></tr>
        <tr><td><kbd>T</kbd></td><td>Alternar tema claro/escuro</td></tr>
        <tr><td><kbd>?</kbd></td><td>Esta ajuda</td></tr>
      </table>
      <p>Dicas e soluções abrem com clique ou Enter. Botões “Copiar” copiam comandos e prompts.</p>
      <form method="dialog"><button type="submit">Fechar</button></form>`
    corpo.append(dialogo)
    return dialogo
  }

  const avisoLeitor = document.createElement('p')
  avisoLeitor.className = 'visualmente-oculto'
  avisoLeitor.setAttribute('aria-live', 'polite')
  corpo.append(avisoLeitor)

  // ---------- Navegação ----------

  function indicePorHash() {
    const hash = decodeURIComponent(location.hash.slice(1))
    if (hash === 'fim') return slides.length - 1
    if (hash === 'inicio' || hash === '') return 0
    const numero = Number(hash.replace(/^s/, ''))
    const indice = slides.findIndex((s) => Number(s.dataset.n) === numero)
    return indice >= 0 ? indice : 0
  }

  function mostrar(indice) {
    atual = Math.max(0, Math.min(indice, slides.length - 1))
    slides.forEach((slide, i) => slide.classList.toggle('atual', i === atual))
    const slide = slides[atual]
    const numero = slide.dataset.n
    history.replaceState(null, '', `#s${numero}`)
    const info = (nome) => palco.querySelector(`[data-info="${nome}"]`)
    info('tipo').textContent = ROTULOS[slide.dataset.tipo] ?? ''
    info('tempo').textContent = slide.dataset.tempo ? `⏱ ${slide.dataset.tempo}` : ''
    info('numero').textContent = `${rotuloBloco(bloco)} · slide ${numero} de ${modulo.ultimoSlide}`
    const titulo = slide.querySelector('h2')?.textContent ?? ''
    avisoLeitor.textContent = `Slide ${numero} de ${modulo.ultimoSlide}. ${titulo}`
    verificarTransbordo(slide)
  }

  function verificarTransbordo(slide) {
    if (corpo.classList.contains('modo-leitura')) return
    const area = slide.querySelector('.slide-corpo')
    if (area && area.scrollHeight > area.clientHeight + 2) {
      console.warn(`Slide ${slide.dataset.n}: conteúdo maior que a área visível (role dentro do slide).`)
    }
  }

  function avancar() {
    if (atual < slides.length - 1) return mostrar(atual + 1)
    const proximo = BLOCOS.find((b) => b.n === bloco + 1)
    if (proximo) location.href = `${proximo.arquivo}#inicio`
  }

  function voltar() {
    if (atual > 0) return mostrar(atual - 1)
    const anterior = BLOCOS.find((b) => b.n === bloco - 1)
    if (anterior) location.href = `${anterior.arquivo}#fim`
  }

  // ---------- Modos ----------

  function ajustarEscala() {
    const estreita = window.innerWidth < LARGURA_MINIMA_APRESENTACAO
    corpo.classList.toggle('modo-leitura', estreita || corpo.dataset.leitura === 'sim')
    const escala = Math.min(
      (window.innerWidth - 16) / LARGURA_PALCO,
      (window.innerHeight - 16) / ALTURA_PALCO,
    )
    palco.style.setProperty('--escala', String(Math.max(escala, 0.1)))
  }

  function atualizarBotoes() {
    const marcar = (acao, ligado) =>
      document.querySelector(`[data-acao="${acao}"]`)?.setAttribute('aria-pressed', String(ligado))
    marcar('notas', corpo.classList.contains('mostrar-notas'))
    marcar('leitura', corpo.dataset.leitura === 'sim')
    marcar('tema', document.documentElement.dataset.tema === 'escuro')
  }

  function executar(acao) {
    if (acao === 'notas') {
      const ligado = corpo.classList.toggle('mostrar-notas')
      gravarPreferencia('m2-notas', ligado ? 'sim' : 'nao')
    } else if (acao === 'leitura') {
      corpo.dataset.leitura = corpo.dataset.leitura === 'sim' ? 'nao' : 'sim'
      ajustarEscala()
      if (corpo.dataset.leitura === 'sim') slides[atual].scrollIntoView()
      else mostrar(atual)
    } else if (acao === 'tema') {
      const escuro = document.documentElement.dataset.tema !== 'escuro'
      document.documentElement.dataset.tema = escuro ? 'escuro' : 'claro'
      gravarPreferencia('m2-tema', escuro ? 'escuro' : 'claro')
    } else if (acao === 'ajuda') {
      ajuda.showModal()
    }
    atualizarBotoes()
  }

  function deveIgnorarTecla(evento) {
    const alvo = evento.target
    if (evento.altKey || evento.ctrlKey || evento.metaKey) return true
    if (alvo.closest('input, textarea, select, [contenteditable="true"], [role="tab"], dialog')) return true
    return evento.key === ' ' && alvo.closest('button, summary, a')
  }

  document.addEventListener('keydown', (evento) => {
    if (deveIgnorarTecla(evento)) return
    const leitura = corpo.classList.contains('modo-leitura')
    const acoes = {
      ArrowRight: avancar,
      PageDown: avancar,
      ' ': avancar,
      ArrowLeft: voltar,
      PageUp: voltar,
      Home: () => mostrar(0),
      End: () => mostrar(slides.length - 1),
      n: () => executar('notas'),
      N: () => executar('notas'),
      l: () => executar('leitura'),
      L: () => executar('leitura'),
      t: () => executar('tema'),
      T: () => executar('tema'),
      '?': () => executar('ajuda'),
    }
    const acao = acoes[evento.key]
    if (!acao) return
    const navegacao = ['ArrowRight', 'PageDown', ' ', 'ArrowLeft', 'PageUp', 'Home', 'End']
    if (leitura && navegacao.includes(evento.key)) return
    evento.preventDefault()
    acao()
  })

  // ---------- Copiar comandos e prompts ----------

  async function copiarTexto(texto) {
    try {
      await navigator.clipboard.writeText(texto)
      return true
    } catch {
      const area = document.createElement('textarea')
      area.value = texto
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      corpo.append(area)
      area.select()
      const ok = document.execCommand('copy')
      area.remove()
      return ok
    }
  }

  document.addEventListener('click', async (evento) => {
    const botao = evento.target.closest('.copiar')
    if (!botao) return
    const recipiente = botao.closest('.bloco-codigo, .prompt-ia')
    const origem = recipiente?.querySelector('.prompt-texto, pre code, pre')
    if (!origem) return
    const ok = await copiarTexto(origem.innerText.trim())
    const original = botao.dataset.rotulo ?? botao.textContent
    botao.dataset.rotulo = original
    botao.textContent = ok ? 'Copiado!' : 'Selecione e copie'
    botao.toggleAttribute('data-copiado', ok)
    setTimeout(() => {
      botao.textContent = original
      botao.removeAttribute('data-copiado')
    }, 1600)
  })

  // ---------- Sequências de capturas (abas) ----------

  function selecionarAba(aba) {
    const lista = aba.closest('[role="tablist"]')
    lista.querySelectorAll('[role="tab"]').forEach((outra) => {
      const ativa = outra === aba
      outra.setAttribute('aria-selected', String(ativa))
      outra.tabIndex = ativa ? 0 : -1
      const painel = document.getElementById(outra.getAttribute('aria-controls'))
      if (painel) painel.hidden = !ativa
    })
  }

  document.querySelectorAll('.sequencia [role="tablist"]').forEach((lista) => {
    const abas = Array.from(lista.querySelectorAll('[role="tab"]'))
    abas.forEach((aba, i) => {
      aba.tabIndex = aba.getAttribute('aria-selected') === 'true' ? 0 : -1
      aba.addEventListener('click', () => selecionarAba(aba))
      aba.addEventListener('keydown', (evento) => {
        const destino = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: abas.length - 1 }[evento.key]
        if (destino === undefined) return
        evento.preventDefault()
        evento.stopPropagation()
        const proxima = abas[(destino + abas.length) % abas.length]
        selecionarAba(proxima)
        proxima.focus()
      })
    })
  })

  // ---------- Telas mostradas ao vivo em aula ----------

  document.querySelectorAll('img[data-pendente]').forEach((img) => {
    const trocar = () => {
      const caixa = document.createElement('div')
      caixa.className = 'captura-pendente'
      caixa.setAttribute('role', 'note')
      caixa.innerHTML = `<strong>Tela mostrada ao vivo em aula</strong><span></span>`
      caixa.querySelector('span').textContent = img.dataset.pendente
      img.replaceWith(caixa)
    }
    if (img.complete && img.naturalWidth === 0) trocar()
    else img.addEventListener('error', trocar, { once: true })
  })

  // ---------- Início ----------

  if (lerPreferencia('m2-tema') === 'escuro') document.documentElement.dataset.tema = 'escuro'
  if (lerPreferencia('m2-notas') === 'sim') corpo.classList.add('mostrar-notas')
  criarSelos()
  criarFerramentas()
  criarRodape()
  const ajuda = criarAjuda()
  ajustarEscala()
  mostrar(indicePorHash())
  atualizarBotoes()
  window.addEventListener('resize', ajustarEscala)
  window.addEventListener('hashchange', () => mostrar(indicePorHash()))
})()
