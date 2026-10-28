// Navegação e recursos dos slides do Módulo 2. Sem dependências; funciona aberto do disco.
// Teclas: ←/→ (ou PageUp/PageDown/Espaço) navegam · N notas · L modo leitura · T tema · ? ajuda

;(function () {
  'use strict'

  const TOTAL_SLIDES = 60
  const LARGURA_PALCO = 1600
  const ALTURA_PALCO = 900
  const LARGURA_MINIMA_APRESENTACAO = 760
  const BLOCOS = [
    { n: 1, nome: 'Ambientes', arquivo: 'bloco-1.html' },
    { n: 2, nome: 'Editor e DevTools', arquivo: 'bloco-2.html' },
    { n: 3, nome: 'Navegador e Node', arquivo: 'bloco-3.html' },
    { n: 4, nome: 'Dependências', arquivo: 'bloco-4.html' },
    { n: 5, nome: 'Vue e build', arquivo: 'bloco-5.html' },
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

  const corpo = document.body
  const bloco = Number(corpo.dataset.bloco)
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
      topo.prepend(selo)
      slide.setAttribute('aria-roledescription', 'slide')
      slide.setAttribute('aria-label', `${slide.dataset.n} de ${TOTAL_SLIDES}: ${ROTULOS[tipo] ?? ''}`)
    })
  }

  function criarFerramentas() {
    const barra = document.createElement('nav')
    barra.className = 'ferramentas'
    barra.setAttribute('aria-label', 'Ferramentas da apresentação')
    barra.innerHTML = `
      <a href="index.html">Índice</a>
      <button type="button" data-acao="notas" aria-pressed="false" title="Notas do professor (N)">Notas</button>
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
    const trilha = BLOCOS.map((b) => {
      const estado = b.n < bloco ? 'feito' : b.n === bloco ? 'agora' : ''
      const marca = b.n < bloco ? '✓' : ''
      return `<li class="${estado}"><span class="caixinha" aria-hidden="true">${marca}</span>${b.n === bloco ? b.nome : ''}</li>`
    }).join('')
    rodape.innerHTML = `
      <ol class="trilha" aria-label="Progresso da Todo List: bloco ${bloco} de 5">${trilha}</ol>
      <div class="rodape-info"><span data-info="tipo"></span><span data-info="tempo"></span><span data-info="numero"></span></div>`
    palco.append(rodape)
  }

  function criarAjuda() {
    const dialogo = document.createElement('dialog')
    dialogo.className = 'ajuda'
    dialogo.innerHTML = `
      <h2>Atalhos</h2>
      <table>
        <tr><td><kbd>→</kbd> <kbd>PageDown</kbd> <kbd>Espaço</kbd></td><td>Próximo slide</td></tr>
        <tr><td><kbd>←</kbd> <kbd>PageUp</kbd></td><td>Slide anterior</td></tr>
        <tr><td><kbd>Home</kbd> <kbd>End</kbd></td><td>Primeiro / último slide do bloco</td></tr>
        <tr><td><kbd>N</kbd></td><td>Mostrar ou esconder notas do professor</td></tr>
        <tr><td><kbd>L</kbd></td><td>Modo leitura (todos os slides com notas; bom para revisão e impressão)</td></tr>
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
    info('numero').textContent = `Bloco ${bloco} · slide ${numero} de ${TOTAL_SLIDES}`
    const titulo = slide.querySelector('h2')?.textContent ?? ''
    avisoLeitor.textContent = `Slide ${numero} de ${TOTAL_SLIDES}. ${titulo}`
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

  // ---------- Capturas ainda não produzidas ----------

  document.querySelectorAll('img[data-pendente]').forEach((img) => {
    const trocar = () => {
      const caixa = document.createElement('div')
      caixa.className = 'captura-pendente'
      caixa.setAttribute('role', 'note')
      const caminho = img.getAttribute('src')
      caixa.innerHTML = `<strong>Captura a produzir pelo professor</strong><span></span><span>Salve a imagem como <code></code>: ela aparecerá aqui automaticamente.</span>`
      caixa.querySelector('span').textContent = img.dataset.pendente
      caixa.querySelector('code').textContent = `slides/${caminho}`
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
