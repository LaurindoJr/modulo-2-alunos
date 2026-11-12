# vendor/vue.global.js

Cópia local do **build global de desenvolvimento** do Vue, para a etapa funcionar offline e
abrindo o arquivo direto do disco (sem servidor, sem npm).

| | |
|---|---|
| Pacote | `vue` 3.5.44 (registro npm) |
| Origem | `node_modules/vue/dist/vue.global.js` |
| SHA-256 | `32e8d2cf5034e241ccd220b42bb07042b0604839bd04607106728c338c92738b` |
| Licença | MIT — o cabeçalho de licença foi mantido no arquivo |

## Por que este arquivo e não outro

| Arquivo em `vue/dist/` | Uso |
|---|---|
| `vue.global.js` | **Este.** Inclui o compilador de templates e mostra avisos úteis no Console |
| `vue.global.prod.js` | Mesmo conteúdo minificado e **sem avisos**: para publicar, não para aprender |
| `vue.runtime.global.js` | Sem compilador: não lê o template escrito no HTML (só funciona com build) |
| `vue.esm-browser.js` | Versão em módulo ES (`<script type="module">`): exige servidor HTTP, não abre via `file://` |

## Alternativa com CDN (exige internet)

```html
<script src="https://unpkg.com/vue@3.5.44/dist/vue.global.js"></script>
```

Fixe a versão no endereço: `vue@3` sem versão exata pode mudar entre uma aula e outra.
Referência: [Vue — Quick Start, “Using Vue from CDN”](https://vuejs.org/guide/quick-start.html#using-vue-from-cdn).
