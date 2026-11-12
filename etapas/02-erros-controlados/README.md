# Etapa 02 — Mesma tela, com erros controlados

**Bloco 2 · slides 13 a 24.** Usar editor e DevTools para **localizar** um problema, em vez de
apenas conhecer o nome das ferramentas.

| | |
|---|---|
| Pré-requisitos | Etapa 01; navegador com DevTools (F12 ou Cmd+Option+I). Node.js instalado na sessão de preparação, somente para o servidor local |
| Tempo da prática | 15 min (editor) + 25 min (DevTools) + 20 min (correção com evidência) |
| Demonstração do professor | Slides 14–16 (abrir projeto e extensões), 18 (Elements), 19–23 (Console, breakpoint, Network) |
| Implementação dos alunos | Localizar os três defeitos, registrar a evidência de cada um e corrigir um de cada vez |

## Como abrir

**Opção A — direto do disco:** abra `index.html` no navegador. O painel Network mostra o arquivo
que falhou como `(failed) net::ERR_FILE_NOT_FOUND`.

**Opção B — com servidor local (recomendada para o slide 22):** no terminal, dentro desta pasta:

```bash
node ../ferramentas/servidor-local.mjs
```

Abra `http://localhost:8088/`. O Network mostra requisições HTTP com status (`200`, `404`) e o
terminal registra cada pedido. `Ctrl+C` encerra o servidor. O bloco 3 explica o que é o comando
`node`; aqui ele é só a ferramenta que entrega os arquivos ao navegador.

## Sintoma inicial (slide 13)

"Uma tarefa desapareceu e a página parece sem estilo." Registre uma hipótese **antes** de abrir
o DevTools.

## Depois da tentativa

A pasta `corrigido/` contém a versão sem defeitos, para comparação depois da tentativa.

## Elements: alteração temporária (slide 18)

No painel Elements, mude o texto de uma tarefa ou uma cor em Styles. Recarregue a página.
A mudança desaparece porque o DevTools alterou o **documento carregado na aba**, não o arquivo.
Para manter a mudança, edite o arquivo-fonte (há também recursos específicos, como *Workspaces*
do Chrome, que ligam o DevTools a arquivos locais — não são usados nesta aula).

## Registro de evidências (slide 23)

Para cada defeito, anote: hipótese → ferramenta → evidência antes → mudança feita → evidência depois.
Corrija **um defeito por vez** e recarregue entre as correções.
