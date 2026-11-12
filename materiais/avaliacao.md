# Critérios de aprendizagem e rubrica

Ao final do módulo o aluno deve conseguir: abrir a pasta correta, executar JavaScript no Node,
distinguir terminal e Console, ler um erro, explicar os arquivos de dependências, iniciar o
projeto Vue e gerar o build. A comprovação combina **execução** e **explicação curta**.

## Rubrica (0 a 2 por critério, total 10)

| Critério | 0 | 1 | 2 |
|---|---|---|---|
| Ambiente funcional | Não executa | Executa com ajuda | Executa sozinho na pasta certa e explica o que cada comando fez |
| Interpretação das ferramentas | Confunde as ferramentas | Escolhe a ferramenta, explica em parte | Escolhe e justifica (Console × terminal, Elements × arquivo, Network × Console) |
| Gestão de dependências | Não distingue manifesto e lockfile | Distingue, mas não restaura | Restaura com `npm ci` e explica requisito × resolução |
| Diagnóstico com evidências | Repete comandos sem hipótese | Formula hipótese sem evidência | Hipótese → evidência → mudança → evidência, uma por vez |
| Autonomia e verificação da IA | Copia a resposta | Verifica parte das sugestões | Aceita ou rejeita com evidência e resolve uma variação sem IA |

0 = não demonstrou; 1 = executou com ajuda e explica parcialmente; 2 = executa e explica,
inclusive uma variação. A pontuação está sujeita à política de avaliação da disciplina.

## Momentos sem IA

- Slides 12, 24, 36, 48 e 60.
- Permitido consultar o próprio registro de comandos quando o objetivo for raciocínio, não memorização.

---

# Módulo 3 — critérios e rubrica

Ao final do Módulo 3 o aluno deve conseguir: explicar de onde vêm e o que fazem HTML, CSS e JS;
mostrar por que manter estado e tela em sincronia à mão é frágil; ler e alterar um projeto Vue
(SFC); usar reatividade, diretivas, formulários, `computed` e `watch`; dividir a interface em
componentes com props, eventos, `v-model` e slots. A comprovação combina **execução** na etapa
correspondente e **explicação curta**. O checklist por etapa está em `mapa-dev-frontend-modulo-3.md`.

## Rubrica (0 a 2 por critério, total 10)

| Critério | 0 | 1 | 2 |
|---|---|---|---|
| Camadas e DOM | Confunde as camadas | Separa as camadas, não explica o defeito de sincronia | Explica request/response e o defeito de sincronia com evidência do Console |
| Reatividade | Não usa `ref` corretamente | Usa `ref`, explica em parte | Usa `ref`/`.value` e explica por que a tela acompanha (leitura × escrita) |
| Template e diretivas | Lista sem chave ou com `v-if` + `v-for` | Lista correta com ajuda | Lista com `:key` estável, condicionais e eventos, explicando cada escolha |
| Derivados e efeitos | Guarda valores derivados à mão | Usa `computed` ou `watch` sem justificar | Escolhe entre `computed` e `watch` e justifica com um exemplo |
| Componentes | Filho altera dados do pai | Props e eventos com ajuda | Props, eventos, `v-model` e slots com um dono para o estado; desenha a árvore |

0 = não demonstrou; 1 = executou com ajuda e explica parcialmente; 2 = executa e explica,
inclusive uma variação. A pontuação está sujeita à política de avaliação da disciplina.

## Momentos sem IA

- Último slide de cada etapa: 68, 76, 84, 92, 100, 108, 116, 124 e 132 (verificação final do módulo).
- As investigações (slides 66, 74, 82, 90, 98, 106, 114, 122 e 130) devem começar pela evidência
  própria — Console, lint, Elements, Vue DevTools — antes de qualquer consulta.
