# BMV Makeup — Roadmap

Estado atual, próximas entregas e ritmo de desenvolvimento do projeto.

---

## Status atual

**Fase 2 — Desenvolvimento + revisão progressiva**

### Home

* [x] Estrutura completa
* [x] Desktop
* [x] Tablet
* [x] Mobile
* [x] i18n configurado
* [x] Seletor de idiomas
* [ ] Integração final do Instagram
* [ ] Review Round 1 — Bruno
* [ ] Aplicar alterações aprovadas
* [ ] Finalizar traduções após aprovação da copy

**Status:** aguardando revisão do Bruno.

### About / O Artista

* [x] Rota `/about`
* [x] About V1
* [x] Componentização
* [x] Desktop
* [x] Tablet
* [x] Mobile
* [x] Copy inicial em português
* [ ] Fotografias iniciais
* [x] Movimento editorial na seção Versatilidade
* [ ] Review Round 1 — Bruno
* [ ] Aplicar alterações
* [ ] Traduções EN / ES / CA

**Status:** pronta para revisão, mas ainda não apresentar.

---

# Ritmo de desenvolvimento

Trabalhar em ciclos pequenos:

DESENVOLVER
    ↓
APRESENTAR AO BRUNO
    ↓
BRUNO REVISA
    ↓
AVANÇAR PRÓXIMA ENTREGA
    ↓
APLICAR FEEDBACK
    ↓
APROVAR
    ↓
TRADUZIR

**Regra principal:** Bruno revisa uma entrega enquanto a próxima entra em desenvolvimento.

Não acumular várias páginas para ele revisar de uma vez.

Não esperar uma revisão para continuar trabalhando quando houver outra etapa independente.

---

# Planejamento atual

## Quinta — 20/08

* [x] Configurar Router
* [x] Criar About V1
* [x] Componentizar About
* [x] Ajustar tipografia
* [x] Deixar copy da About em português
* [x] Criar movimento da seção Versatilidade
* [x] Adicionar fotografias iniciais
* [x] Commit
* [x] Encerrar BMV por hoje

## Fim de semana — 22–23/08

### Bruno

* [ ] Resolver/liberar acesso necessário do Instagram
* [ ] Revisar somente a Home
* [ ] Enviar alterações de texto e conteúdo

### Desenvolvimento

* [ ] Não apresentar About ainda
* [ ] Priorizar outros projetos enquanto a Home está em revisão

## Segunda / terça — 24–25/08

* [ ] Finalizar integração do Instagram
* [ ] Organizar feedback da Home
* [ ] Aplicar Review Round 1
* [ ] Subir alterações
* [ ] Obter aprovação da copy
* [ ] Finalizar traduções da Home

## Próximo ciclo

* [ ] Apresentar About ao Bruno
* [ ] Bruno revisa About
* [ ] Começar Services enquanto About está em revisão
* [ ] Aplicar feedback da About
* [ ] Aprovar copy
* [ ] Traduzir About

---

# Próximas páginas

## Services

Route: `/services`

Objetivo: apresentar claramente os serviços e ajudar o visitante a identificar o atendimento adequado.

Áreas atuais:

* Weddings
* Social / Events
* Campaigns
* Photoshoots
* Artistic Makeup
* Audiovisual / Camera Makeup

Agrupamento final depende da revisão do Bruno.

**Próxima página a desenvolver.**

## Portfolio

Route: `/portfolio`

Objetivo: mostrar amplitude e qualidade do trabalho com fotografia como protagonista.

Possíveis categorias:

* Bridal
* Beauty
* Editorial
* Campaigns
* Artistic
* Audiovisual

Filtros só serão implementados se ajudarem a navegação.

## Education

Route: `/education`

Objetivo: apresentar cursos e formação como uma área própria da BMV.

Possíveis ofertas:

* Automaquiagem
* Maquiagem profissional
* Workshops

Confirmar conteúdo, formato e preços com Bruno antes da implementação final.

## Contact / Book

Route: `/contact`

Objetivo: transformar interesse em contatos qualificados.

O formulário deve se adaptar às necessidades reais do Bruno.

Não criar sistema complexo de booking antes de confirmar seu fluxo de atendimento.

---

# Weddings

Weddings é uma área comercial importante, mas **não deve definir toda a identidade da BMV**.

Uma página própria poderá existir em:

`/services/weddings`

Criar somente depois de confirmar com Bruno:

* fluxo do atendimento
* prova
* preparação
* serviços incluídos
* bridal party
* informações necessárias para orçamento
* fotografias
* reviews

---

# Instagram

A Home terá integração com o Instagram real do Bruno.

Objetivos:

* mostrar trabalhos recentes
* reforçar variedade
* manter o site conectado à presença atual da BMV
* direcionar visitantes ao Instagram

**Status:** aguardando acesso necessário para finalizar a integração.

---

# Depois das páginas principais

* [ ] Rotas finais
* [ ] Navegação final
* [ ] WhatsApp
* [ ] Formulários
* [ ] Links externos
* [ ] Reviews finais
* [ ] Fotografias finais
* [ ] Remover placeholders
* [ ] Remover código e assets não utilizados
* [ ] Revisar componentização
* [ ] Revisar CSS
* [ ] Revisar i18n

---

# Pré-launch

* [ ] SEO
* [ ] Metadata
* [ ] Open Graph
* [ ] Acessibilidade
* [ ] Navegação por teclado
* [ ] Performance
* [ ] Otimização de imagens
* [ ] Lazy loading
* [ ] Responsive QA
* [ ] Cross-browser testing
* [ ] Production build
* [ ] Vercel
* [ ] Domínio final
* [ ] QA em produção

---

# Fora do escopo inicial

Só desenvolver se surgir uma necessidade real:

* Admin
* CMS / gestão de portfolio
* Booking system
* Calendar integration
* Pagamentos online
* Gestão de cursos
* Blog
* Landing pages de campanhas

---

# Princípio de arquitetura

**Home = narrativa**
**Navigation = mapa**
**Internal pages = profundidade + ação**

Uma seção da Home não precisa automaticamente de uma página.

Uma página não precisa automaticamente aparecer na Home.

Antes de criar algo, perguntar:

**O que o visitante poderá entender ou fazer aqui que ainda não consegue na Home?**
