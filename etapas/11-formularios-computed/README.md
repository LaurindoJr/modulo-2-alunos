# Etapa 11 — Formulários e propriedades computadas

**Módulo 3 · slides 101–108 · 40 min.** Conceitos “Formulários e Validação” e “propriedades
computadas” da Aula 3, com os práticos 2 (lista com filtro) e 4 (validação) adaptados à Todo List.

| | |
|---|---|
| Pré-requisitos | Etapa 10 |
| Tempo | 3 abertura · 6 conhecer · 7 demonstração · 10 prática · 5 modelo · 4 investigação · 3 pesquisa · 2 verificação |
| O professor demonstra | Formulário com `v-model.trim` e `@submit.prevent`; validação acessível; `computed` para resumo e filtro |
| Os alunos implementam | Contagem de pendentes com `computed` e uma regra de validação nova (mínimo de 3 caracteres) |
| Evidência de conclusão | Título vazio, repetido ou curto mostra mensagem e `aria-invalid="true"`; busca e situação filtram juntas |

## O que mudou em relação à etapa 10

Só `src/App.vue`: formulário de criação com validação, campo de busca, filtro por situação
(`v-model` em texto e rádio) e `computed` para `concluidas` e `visiveis`. A dica com `v-show` e o
botão “Restaurar exemplo” da etapa 10 saíram: com o formulário, a lista vazia se resolve criando
tarefas, e a mensagem de lista vazia passa a distinguir “nenhuma cadastrada” de “nenhuma no filtro”.

## Roteiro

### Conhecer

| Recurso | O que faz | Na Todo List |
|---|---|---|
| `v-model` (texto, busca) | Liga o campo a um `ref` nos dois sentidos | `novoTitulo`, `busca` |
| `v-model` (rádio, checkbox, select) | Mesmo princípio, outro tipo de campo | `situacao` |
| `.trim`, `.number`, `.lazy` | Modificadores do `v-model` | `v-model.trim="novoTitulo"` |
| `@submit.prevent` | Trata o envio sem recarregar a página | `adicionar()` |
| `computed(() => …)` | Valor derivado, com cache | `concluidas`, `visiveis` |

### Executar

1. Tente adicionar: vazio, só espaços, título repetido (maiúsculas não importam). Leia a mensagem
   e o atributo `aria-invalid` no Elements.
2. Combine busca + situação e veja `visiveis.length` no resumo.
3. **Prática:** crie `pendentes` com `computed` e mostre no resumo; acrescente a regra “mínimo de 3
   caracteres” em `validar`.

### Entender

- **`v-model` é açúcar sintático.** Para um campo de texto, equivale a:

  ```vue
  <input :value="novoTitulo" @input="novoTitulo = $event.target.value" />
  ```

  O valor desce do estado para o campo (`:value`) e sobe do campo para o estado (`@input`).
- **`computed` × método:** troque `{{ concluidas }}` por uma função `contarConcluidas()` com um
  `console.log` dentro. Digite na busca: o método roda a **cada** redesenho; o `computed` só
  recalcula quando `tarefas` muda. Use `computed` para valores derivados.
- **Uma fonte da verdade:** `concluidas` não é guardado num `ref` atualizado à mão — seria a
  mesma armadilha da etapa 06 (dois lugares para manter iguais).
- **Investigação 1 — efeito dentro do `computed`:** no início do `computed` de `visiveis`,
  escreva `busca.value = busca.value.trim()`. Não há erro de lint nem aviso no Console — só o
  sintoma: não dá mais para digitar espaço na busca (“criar tarefas” vira “criartarefas”), porque o
  `computed` altera o estado que ele mesmo lê. Defeito silencioso: só aparece testando.
- **Investigação 2 — escrever num `computed`:** acrescente `<input v-model="concluidas" />` e
  digite um número. O resumo não muda e o Console avisa
  `[Vue warn] Write operation failed: computed value is readonly`. `computed` é leitura; para
  executar efeitos quando algo muda, há `watch` (etapa 12).

### Pesquisar

- [Vue — Form Input Bindings](https://vuejs.org/guide/essentials/forms.html)
- [Vue — Computed Properties](https://vuejs.org/guide/essentials/computed.html) (“Computed Caching vs. Methods”, “Best Practices”)
- [MDN — aria-invalid](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid)

## Checklist do dev frontend

- [ ] **Conhecer:** `v-model` e modificadores; `@submit.prevent`; `computed`
- [ ] **Executar:** formulário que valida, mostra a mensagem e só cria quando válido
- [ ] **Entender:** `v-model` = `:value` + `@input`; cache do `computed`; por que não guardar valor derivado
- [ ] **Pesquisar:** regra de acessibilidade para mensagem de erro de campo (`aria-describedby`)

## Origem e correções

- Prático 4 original: `emailInput.className = ''` apaga **todas** as classes do campo, não só a de
  estado; a regex própria rejeita e-mails válidos. Na versão com Vue, o estado vem de dados e a
  classe/atributo é ligado com `:aria-invalid`; para e-mail, prefira `type="email"` e a validação
  nativa (`input.validity`).
- Prático 2 original: além do `:key="index"` (ver etapa 10), `languages` era um `ref` que nunca
  muda — uma constante comum bastaria.
