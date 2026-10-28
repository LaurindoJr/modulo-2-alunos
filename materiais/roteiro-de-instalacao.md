# Roteiro de instalação — sessão de preparação

Objetivo: chegar ao primeiro encontro com editor, navegador e Node.js funcionando. Reserve uma
sessão assistida quando a turma não tiver o ambiente pronto; instalações demoradas não devem
consumir os 100 minutos dos blocos.

Versões verificadas pelo professor em 21/10/2026 (macOS): **Node.js 24.19.0 (linha 24 LTS)**,
**npm 11.17.0**, Chrome 155, VS Code atual. Repita a verificação antes de cada turma: patches
mudam com frequência. Consulte o ciclo oficial em <https://nodejs.org/en/about/previous-releases>.

## 1. Navegador

Chrome, Edge ou Firefox atualizado. As instruções dos slides usam os nomes do Chrome DevTools
(Elements, Console, Sources, Network); no Firefox os painéis equivalentes têm nomes parecidos.

## 2. Editor

1. Instale o VS Code: <https://code.visualstudio.com/>.
2. Extensões mínimas (painel Extensions): **Vue - Official** (nome atual da antiga “Volar”),
   **ESLint**, **Prettier**. Temas e ícones são opcionais.
3. Não crie arquivos de configuração de ESLint agora: o projeto do bloco 5 já vem configurado.

## 3. Node.js 24 LTS

Escolha **um** caminho e registre qual foi usado.

| Sistema | Caminho recomendado | Observação |
|---|---|---|
| Windows | Instalador LTS em <https://nodejs.org/> | Mantenha marcada a opção que adiciona o Node ao PATH. Feche e reabra o terminal depois |
| macOS | Instalador LTS em <https://nodejs.org/> ou um gerenciador de versões (nvm, fnm) | Com gerenciador, use `nvm install 24` e `nvm use 24` |
| Linux | Gerenciador de versões (nvm, fnm) ou pacotes oficiais do NodeSource | Evite versões antigas do repositório padrão da distribuição |

Não é preciso atualizar o npm globalmente para `latest`: use o npm que acompanha o Node instalado.

## 4. Verificação (registre a saída)

Abra um terminal **novo** e execute:

```bash
node --version
npm --version
```

Saída registrada pelo professor:

```text
v24.19.0
11.17.0
```

Números de patch diferentes (por exemplo, `v24.20.1`) são aceitáveis. Uma linha principal
diferente (`v18`, `v20`) indica versão fora de suporte ou outro Node no PATH.

## 5. Problemas comuns

| Mensagem | Causa provável | O que fazer |
|---|---|---|
| `command not found: node` (zsh/bash) ou `'node' não é reconhecido como um comando interno…` (Windows) | Terminal aberto antes da instalação, ou PATH sem a pasta do Node | Feche e reabra o terminal; reinstale marcando a opção de PATH |
| `node --version` mostra `v18…` ou `v20…` | Outro Node no PATH (instalação antiga, gerenciador de versões) | `where node` (Windows) ou `command -v node` (macOS/Linux) para ver qual está sendo usado |
| `npm error code EACCES` ao instalar algo com `-g` | Instalação global sem permissão | Nos blocos não usamos instalação global. Instale no projeto (`npm install …`) |
| Erros de rede ou proxy no `npm install` | Rede da instituição | Teste em outra rede; peça a configuração de proxy ao suporte (`npm config set proxy …`) |

## 6. O que não instalar

- **Vue CLI** (`@vue/cli`): em manutenção. O fluxo atual é `npm create vue@latest`, que baixa o
  gerador sob demanda.
- **Vite, create-vite, nodemon ou json-server globais**: ficam como dependências de cada projeto.
- **lodash 4.17.20**: versão abrangida por aviso de segurança; não faz parte do percurso.
- **Yarn**: um gerenciador por projeto. A comparação com npm é opcional e posterior ao bloco 4.
