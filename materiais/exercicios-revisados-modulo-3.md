# Exercícios do Módulo 3 — revisados e redistribuídos

Revisão dos arquivos `Exercicios Teóricos - Unidade 3.docx` e `Exercicios Práticos - Unidade 3.docx`
(pasta `Módulo 3/`, usada só para consulta). Os originais não foram alterados. Os gabaritos são discutidos em aula, depois da tentativa.

## Distribuição pelas etapas

| Material | Etapa | Ajuste |
|---|---|---|
| Teórico 1 (Vue) | 07 | Afirmação 5 tratada como opinião, não como fato |
| Teórico 2 (HTML, CSS, JS) | 06 | Sem ajuste; ligado ao Network e aos três arquivos da Todo List |
| Teórico 3 (create-vue) | 08 | Telas atuais (“Use TypeScript?” + “Select features”); Pinia como recomendação no lugar de Vuex |
| Teórico 4 (reatividade) | 09 | `ref` usa getter/setter; `reactive` usa `Proxy`; DOM atualizado em lote |
| Teórico 5 (componentes) | 13 e 14 | Fluxo em um sentido e slots acrescentados |
| Prático 1 (contador) | 09 | Aplicado ao progresso da Todo List |
| Prático 2 (lista com filtro) | 10 e 11 | `:key` estável; lista constante sem `ref` |
| Prático 3 (tema claro/escuro) | 12 | Preferência do sistema, `aria-pressed`, escolha lembrada com tratamento de erro |
| Prático 4 (validação de e-mail) | 11 | `classList` em vez de `className = ''`; validação nativa; `aria-invalid` |
| Prático 5 (toggle com evento) | 14 | `defineModel` no lugar de `initialValue` + `update:modelValue`; `aria-pressed` |

---

## Exercícios teóricos (versão revisada)

### 1. Vue.js — etapa 07

Sobre o Vue.js, analise as afirmações:

1. É um framework progressivo para construção de interfaces de usuário.
2. É baseado apenas em HTML e não utiliza JavaScript.
3. Não suporta componentes reutilizáveis.
4. Possui um sistema de reatividade que mantém a interface e o estado sincronizados.

a) 1 e 4 · b) 2 e 3 · c) 3 e 4 · d) 1, 2 e 4 · e) 2 e 3 e 4

### 2. As três camadas — etapa 06

No desenvolvimento frontend, as três tecnologias fundamentais e suas funções são:

a) HTML (comportamento), CSS (estrutura), JavaScript (apresentação)
b) HTML (estrutura), CSS (apresentação), JavaScript (comportamento)
c) JavaScript (estrutura), HTML (apresentação), CSS (comportamento)
d) CSS (estrutura), JavaScript (apresentação), HTML (comportamento)
e) HTML (apresentação), CSS (comportamento), JavaScript (estrutura)

### 3. create-vue — etapa 08

Ao criar um projeto com `npm create vue@latest`, quais recursos podem ser escolhidos durante a
criação?

a) Apenas TypeScript e ESLint
b) Apenas Vue Router e Vuex
c) TypeScript, Vue Router, Pinia e Vitest (entre outros)
d) Apenas CSS e HTML
e) Angular e React

### 4. Reatividade — etapa 09 (discursiva)

Explique o conceito de reatividade no Vue e sua importância.

**Critério:** cite um exemplo da Todo List (ex.: `concluidas.value += 1` atualiza resumo, barra e
botão sem código de redesenho).

### 5. Componentes — etapas 13 e 14 (discursiva)

Descreva a arquitetura baseada em componentes do Vue: o que são, como se comunicam e quais
vantagens traz.

**Critério:** desenhe a árvore da etapa 14 com props (↓), eventos (↑), `v-model` e slots.

---

## Exercícios práticos (versão revisada)

### 1. Contador — etapa 09

A solução original (contador com `ref` e `@click`) está correta. Na Todo List ele vira o progresso
de tarefas: `concluidas = ref(2)`, botão “Concluir próxima” com `:disabled` e barra `<progress>`.
Desafio da etapa: botão “Desfazer” e título com “ ✓” sem criar outro `ref`.

### 2. Lista com filtro — etapas 10 e 11

Correções: chave estável (a posição muda quando a lista é filtrada) e lista constante sem `ref`.

```vue
<script setup>
import { computed, ref } from 'vue'

const LINGUAGENS = ['JavaScript', 'Python', 'Java', 'C#', 'PHP', 'TypeScript', 'Ruby']
const busca = ref('')

const filtradas = computed(() => {
  const termo = busca.value.trim().toLowerCase()
  return LINGUAGENS.filter((linguagem) => linguagem.toLowerCase().includes(termo))
})
</script>

<template>
  <label for="busca">Filtrar linguagens</label>
  <input id="busca" v-model="busca" type="search" />
  <ul>
    <li v-for="linguagem in filtradas" :key="linguagem">{{ linguagem }}</li>
  </ul>
</template>
```

### 3. Tema claro/escuro — etapa 12

Problemas do original: ignora a preferência do sistema, não informa o estado do botão a leitores
de tela e não lembra a escolha. Versão corrigida em JavaScript puro:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <style>
      :root { color-scheme: light dark; }
      :root[data-tema='claro'] { color-scheme: light; }
      :root[data-tema='escuro'] { color-scheme: dark; }
      body { background: light-dark(#ffffff, #1b1f1c); color: light-dark(#17221c, #e6eee8); }
    </style>
  </head>
  <body>
    <button type="button" id="tema" aria-pressed="false">Tema escuro</button>
    <script>
      const botao = document.getElementById('tema')
      const preferido = matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
      let salvo = null
      try { salvo = localStorage.getItem('tema') } catch { salvo = null }
      let tema = salvo === 'claro' || salvo === 'escuro' ? salvo : preferido

      function aplicar() {
        document.documentElement.dataset.tema = tema
        botao.setAttribute('aria-pressed', String(tema === 'escuro'))
      }

      botao.addEventListener('click', () => {
        tema = tema === 'escuro' ? 'claro' : 'escuro'
        aplicar()
        try { localStorage.setItem('tema', tema) } catch { /* vale só nesta aba */ }
      })
      aplicar()
    </script>
  </body>
</html>
```

Versão com Vue (`ref` + `watch`): `etapas/12-watchers-ciclo-de-vida`.

### 4. Validação de e-mail — etapa 11

Problemas do original: `emailInput.className = ''` apaga todas as classes do campo, não só a de
estado; a regex própria recusa endereços válidos; a mensagem não é ligada ao campo para leitores de
tela. Versão corrigida:

```html
<label for="email">E-mail</label>
<input type="email" id="email" aria-describedby="email-msg" />
<p id="email-msg" role="status"></p>
<script>
  const campo = document.getElementById('email')
  const mensagem = document.getElementById('email-msg')

  campo.addEventListener('input', () => {
    const vazio = campo.value === ''
    const valido = !vazio && campo.validity.valid // validação nativa de type="email"
    campo.classList.toggle('valido', valido)
    campo.classList.toggle('invalido', !vazio && !valido)
    campo.setAttribute('aria-invalid', String(!vazio && !valido))
    mensagem.textContent = vazio ? '' : valido ? 'E-mail válido.' : 'Formato de e-mail inválido.'
  })
</script>
```

Na Todo List (etapa 11), a mesma ideia valida o título: vazio, longo demais, repetido.

### 5. Botão alternável com evento — etapa 14

Problema do original: declara a prop `initialValue`, copia para um `ref` local e emite
`update:modelValue`. Com `<Toggle v-model="ligado" />` o pai envia `modelValue`, que o filho não
declarou — o valor inicial não chega e a cópia local não acompanha mudanças feitas pelo pai.

```vue
<script setup>
const ligado = defineModel({ type: Boolean, default: false })
</script>

<template>
  <button type="button" :aria-pressed="ligado" @click="ligado = !ligado">
    {{ ligado ? 'Ligado' : 'Desligado' }}
  </button>
</template>
```

Na Todo List: `src/components/AlternarTema.vue` da etapa 14.

---

## Sobre os ambientes sugeridos (Vue SFC Playground e MDN Playground)

Os playgrounds on-line servem para experimentar sem instalar nada, mas exigem internet e não
guardam o histórico na pasta do aluno. As etapas 06–14 permitem fazer os mesmos exercícios
offline e com a Todo List como contexto. Use o playground como alternativa, não como requisito.
