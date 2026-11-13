# BMV Makeup — navegação, SEO e performance

Data: 12 de novembro de 2026. Sem commit, push ou deploy.

## Implementação

- Weddings / From Vision to Celebration: removidas as quatro imagens ausentes e o CSS exclusivo das fotografias. Preservados integralmente os títulos, descrições e números dos quatro passos, em lista ordenada e grid editorial de duas colunas / uma coluna no mobile.
- Header desktop e drawer mobile: NavLink com sublinhado persistente e aria-current="page". Home exige correspondência exata; Services permanece ativo em /services/weddings. O código de Smart Sticky Header, foco e modal foi preservado.
- Lazy loading para fotografias abaixo da dobra; dimensões intrínsecas, decoding async e srcset/sizes. Cards e avatares recebem arquivos proporcionais à exibição, sem alterar foto ou recorte.
- Home: conversão das duas fotografias antigas de Explore the Work; Social continha HEIC apesar da extensão .jpg. Originais preservados.
- Hero mantém as cinco escolhas por dispositivo, mesma ordem e recorte. Só o primeiro slide tem prioridade alta. Um preload antecipado, condicionado à Home e ao viewport, evita baixar a imagem do outro dispositivo ou antecipar imagens da Home em outras páginas. As outras quatro imagens do dispositivo são pré-carregadas com prioridade baixa para preservar as transições sem vazios.
- Fontes Bodoni Moda, DM Sans e Lora locais em WOFF2, com as mesmas famílias, eixos e pesos e font-display swap. Licenças OFL incluídas. Não há dependência de rede do Google Fonts em produção.
- Acessibilidade: área dos botões de idioma de pelo menos 24×24 px; espaço real no nome da marca para corresponder ao aria-label; pequeno ajuste de contraste limitado ao rodapé.

## Open Graph e internacionalização

A imagem usada foi localizada em AboutHero: /assets/images/about/bruno-about.jpeg. A página agora usa uma exportação WebP da mesma fotografia. O JPEG social em /assets/images/social/bmv-makeup-bruno.jpg tem 1200×630 px e 76.852 bytes, com o rosto e a cabeça preservados e margens neutras laterais.

index.html contém title, description, canonical, todos os oito campos OG pedidos e os quatro campos Twitter pedidos, além de locale, tipo e alt da imagem. Não depende de execução de JavaScript para o compartilhamento da marca. URLs usam https://www.bmvmakeup.com/.

Conforme escolha de Lorena nesta rodada: manter as rotas atuais. O HTML estático entregue inicialmente usa o inglês padrão e metadados gerais da marca, inclusive quando o fallback da SPA atende uma rota interna. No navegador, SeoMetadata atualiza título, descrição, canonical, og:url, og:locale e lang por rota/idioma. Isso não é apresentado como metadado estático específico de cada rota ou idioma.

hreflang permanece pendente: hoje os quatro idiomas compartilham as mesmas URLs e a preferência fica no navegador. Não foram inventados alternates para páginas que não existem. Uma etapa futura pode criar URLs por idioma e gerar HTML correspondente, sem prejudicar as rotas atuais. Não houve migração arquitetural ou mudança de Vercel.

## Pesos por página

Medição com viewport de 390×900 e 1440×900, DPR 1, contexto novo por página, incluindo rolagem por todas as imagens. A tabela de imagens soma os arquivos únicos selecionados pelo navegador no percurso; o total de recursos é a soma de transferSize do Resource Timing, incluindo JS, CSS, fontes e API simulada. Headers, cache, terceiros e tempo de rolagem podem gerar pequenas diferenças de medição. Retinas podem escolher variantes maiores; não foi forçada imagem pequena nesses dispositivos.

| Página | Largura | Imagens antes (KiB) | Imagens depois (KiB) | Redução | Recursos antes/depois (KiB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| / | 390 | 19454.6 | 1322.9 | 93.2% | 12775.0 / 1965.9 |
| /about | 390 | 823.7 | 98.0 | 88.1% | 1331.4 / 736.6 |
| /services | 390 | 854.6 | 162.5 | 81.0% | 1362.2 / 801.0 |
| /services/weddings | 390 | 448.7 | 53.8 | 88.0% | 959.1 / 692.1 |
| /portfolio | 390 | 2122.5 | 284.4 | 86.6% | 2632.2 / 925.1 |
| /education | 390 | 261.4 | 50.9 | 80.5% | 768.1 / 688.6 |
| /contact | 390 | 0.0 | 0.0 | — | 506.2 / 637.1 |
| / | 1440 | 19027.8 | 1409.5 | 92.6% | 12348.2 / 2052.5 |
| /about | 1440 | 823.7 | 202.5 | 75.4% | 1331.4 / 841.1 |
| /services | 1440 | 854.6 | 272.5 | 68.1% | 1362.2 / 911.1 |
| /services/weddings | 1440 | 448.7 | 126.6 | 71.8% | 959.1 / 764.9 |
| /portfolio | 1440 | 2122.5 | 789.8 | 62.8% | 2632.2 / 1430.4 |
| /education | 1440 | 261.4 | 134.4 | 48.6% | 768.1 / 772.1 |
| /contact | 1440 | 0.0 | 0.0 | — | 506.2 / 637.1 |

O inventário individual (image-inventory.csv) contém dimensões e bytes de todos os 54 masters utilizados e das variantes. image-display-audit.csv registra dimensões reais versus exibidas, loading, prioridade e arquivo efetivamente selecionado por página/dispositivo. Os JSONs preservam requests e medições detalhadas. As capturas de Weddings sem fotografias e das páginas alteradas foram conferidas em desktop e mobile; capturas dos testes ficam em frontend/test-results/ (ignorado).

O master Weddings de Explore the Work passou de 9.476.126 para 55.604 bytes (−99,41%); o master Social, de 7.429.762 para 56.552 bytes (−99,24%). As versões de 480/960 px reduzem mais o download dos cards. WebP qualidade 84, sem mudança de recorte. Os avatares de cerca de 54/58 px têm versão de 128 px. Não houve alteração dos 43 masters aprovados em curated, dos arquivos originais ou de sua ordem.

A pasta public contém também originais e fotografias antigas não referenciadas; eles foram preservados por orientação de Lorena. O tamanho dessa pasta não equivale ao download de uma página.

## Lighthouse — Home, build de produção local

Lighthouse 13.6.0, Chrome headless instalado, build estático servido localmente; mesmos presets mobile/desktop, cache frio e execução sequencial. API do Instagram simulada com posts vazios apenas no servidor temporário de auditoria. A integração de produção não foi modificada. Não há CDN, gzip ou tráfego real nesta medição. Uma execução final por condição, sujeita a variação de laboratório; estes resultados não são dados CrUX ou garantia de produção.

| Perfil | Performance antes/depois | Acessibilidade antes/depois | SEO antes/depois | LCP antes/depois | CLS antes/depois | FCP antes/depois | TBT antes/depois | Speed Index antes/depois |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| mobile | 97 / 100 | 95 / 100 | 91 / 100 | 2.0 s / 1.2 s | 0 / 0 | 2.0 s / 1.2 s | 20 ms / 30 ms | 2.6 s / 1.2 s |
| desktop | 100 / 100 | 90 / 100 | 91 / 100 | 0.5 s / 0.3 s | 0.002 / 0 | 0.5 s / 0.3 s | 0 ms / 0 ms | 0.9 s / 0.4 s |

Best Practices: 100 antes e depois nos dois perfis. INP de campo não foi medido; TBT não deve ser apresentado como INP.

O ensaio intermediário desktop marcou 58 em performance, com espera de 4,5 s pelo CSS externo do Google Fonts. Esse resultado não foi omitido: está em lighthouse-summary.json como intermediate-desktop e motivou a hospedagem local das fontes. Após a correção, o ensaio final marcou 100 e LCP de 0,3 s.

## Verificações e limites

- Lint, build, oito testes de tradução e 68/68 testes de navegador aprovados (3,1 minutos). Incluem 56 combinações de rota/idioma/dispositivo para navegação ativa e 112 combinações de página/idioma/largura sem overflow.
- Os 14 percursos da auditoria final (sete rotas, dois viewports) tiveram zero imagens quebradas. Nenhuma referência estática a imagem inexistente permaneceu.
- HTML inicial e OG verificados com JavaScript desabilitado e diretamente em dist/index.html: todos os 12 campos OG/Twitter pedidos estão presentes, únicos e preenchidos. Imagem social presente no build, com 1200×630 px.
- Vercel, variáveis de ambiente, package.json/package-lock e frontend/api/instagram.js não foram alterados. Lighthouse foi instalado apenas em /private/tmp.

## Pendências externas

- Depois de um deploy autorizado, confirmar HTTP 200 e Content-Type image/jpeg na URL absoluta da imagem social e testar o cache dos crawlers (Meta/LinkedIn/X/WhatsApp). O arquivo está presente e acessível no preview, mas não foi publicado nesta rodada.
- Medir o domínio público/CDN e métricas de campo após publicação.
- URLs próprias por idioma e hreflang ficam para uma etapa separada, conforme escolha de Lorena.
- O token do Instagram segue como pendência anterior, sem mudança nesta rodada.

## Arquivos modificados nesta rodada

- frontend/index.html; frontend/src/App.jsx; frontend/src/styles/globals.css; novo frontend/src/styles/fonts.css.
- Header.jsx, Header.module.css, MobileMenu.jsx e MobileMenu.module.css em components/layout/Header; Footer.jsx/Footer.module.css e LanguageSwitcher.module.css.
- WeddingsProcess.jsx e WeddingsProcess.module.css.
- Novo common/OptimizedImage/OptimizedImage.jsx, common/SeoMetadata/SeoMetadata.jsx e data/image-metadata.json.
- JSX de AboutHero, AboutStory, AboutClosing, ServicesHero, ServicesOverview, ServicesExperience, WeddingsHero, WeddingsIntro, WeddingsReviews, EducationProfessional, PortfolioGallery, MeetBruno, ExploreTheWork, SelectedWork, BehindTheBrush, WeddingsPreview, KindWords e Hero: uso de imagens responsivas/lazy ou dimensões intrínsecas.
- src/i18n/locales/{pt,en,es,ca}.json: metadados traduzidos.
- public/assets/images/optimized/: derivados da mesma seleção; public/assets/images/social/bmv-makeup-bruno.jpg; public/fonts/: WOFF2 e licenças.
- Novo tests/navigation-seo.spec.js e atualização de tests/README.md.
- docs/PHOTO_CURATION.md e .json: pendência das quatro fotos de Weddings marcada como resolvida.
- docs/performance/: inventários, medições e resumo Lighthouse; BMV_NAVIGATION_SEO_PERFORMANCE.md na raiz.

## Referências técnicas

- [Google Search Central — versões localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions).
- [Vite — deploy estático](https://vite.dev/guide/static-deploy).
- [Lighthouse — LCP](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint).
