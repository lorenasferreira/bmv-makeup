# Rodada de ajustes — 30/10/2026

## Alterações

- Nome oficial Bruno Mënezess nas quatro traduções e no título de About, incluindo textos alternativos. O tamanho fluido do título mobile de About foi ajustado para acomodar o sobrenome mais longo sem cortar o início do título. O título estático do documento é BMV Make Up e não contém o nome antigo; não há metadados SEO com esse nome no código atual. Marca, domínio, caminhos e referências apenas a Bruno foram preservados.
- A frase identificada aparece no footer compartilhado, também visível no fim da Home: maquiagem profissional em Barcelona, com equivalentes EN/ES/CA. As categorias Artistic foram preservadas.
- Modelo adicional do curso profissional para noivas: 100 € no componente compartilhado e nas quatro condições traduzidas. Demais preços preservados.
- ScrollReveal observa apenas sections diretamente sob main para evitar ocultação dupla em sections aninhadas. O threshold passou de 8% para zero: a entrada na área observada dispara a animação mesmo em galerias maiores que a janela. A classe visible permanece após filtros e retorno ao topo. CSS e duração da animação global foram preservados, incluindo reduced motion.
- Header fixo na Home e sticky nas páginas internas, mantendo o espaço original destas páginas. Oculta ao descer, reaparece ao subir, permanece visível no topo, com menu aberto ou foco dentro dele. Acumula 12 px na mesma direção para evitar oscilações. A transição respeita reduced motion. Não há temporizador de inatividade.
- A validação no WebKit revelou overflow nos cartões de Weddings em tablet (PT/ES). `min-width: 0` permite que os cartões respeitem as colunas do grid, preservando o layout e as fotografias.
- Integração do Instagram, pagamentos e reservas não foram alterados.

## Fotografias e arquivos ausentes

Nenhuma fotografia foi modificada, substituída, recomprimida ou removida.

A pasta `public/assets/images/portfolio` não contém os 24 arquivos WebP referenciados por PortfolioGallery. Assim, corrigir a opacidade permite ver filtros, legendas e espaços de imagens, mas não recupera fotografias inexistentes. Education também referencia arquivos em uma pasta education ausente.

Não foi possível identificar com segurança a foto relatada. Possíveis arquivos a confirmar na Home, seção Explore the Work:

| Arquivo | Dimensões do arquivo | Formato real | Tamanho aproximado |
| --- | --- | --- | --- |
| social.jpg | 4000 × 6000 | HEIC | 7,1 MB |
| artistic.jpg | 3024 × 4032 | HEIC | 3,1 MB |
| campaigns.jpg | 3024 × 4032 | HEIC | 3,6 MB |
| photoshoots.jpg | 6000 × 4000 | JPEG | 7,7 MB |
| audiovisual.jpg | 2730 × 4095 | JPEG | 2,9 MB |
| weddings.jpg | 3556 × 5334 | JPEG | 9,0 MB |

Os cartões usam proporção 4:5, largura/altura de 100%, object-fit: cover e zoom de 1,03 no hover. Isso recorta a fotografia para preencher o cartão. Não há srcset nem recompressão em runtime. Dimensões elevadas e tamanho do arquivo não comprovam qualidade da captura ou compressão original. A taxa/qualidade original de compressão não está disponível com segurança nos metadados examinados. O formato HEIC com extensão JPG pode causar incompatibilidade de decodificação, um problema distinto de baixa resolução. A inspeção de photoshoots.jpg mostra um close de maquiagem com detalhes de pele preservados; isso não identifica a foto específica mencionada pelo cliente.

Perguntar ao cliente: em qual página/seção está a fotografia, qual cartão/categoria, e em qual aparelho/navegador percebe a perda? Solicitar uma captura indicando a foto e o original para comparação. Confirmar também os arquivos finais que deverão preencher o Portfolio e Education.

## Validação executada

- 8/8 testes de i18n aprovados.
- Chrome: 44 testes existentes aprovados na execução completa; um teste novo de header precisou aguardar as fontes e a transição antes de inverter a rolagem. Os quatro testes novos passaram na reexecução.
- WebKit: suíte completa de 48 casos executada; 46 passaram inicialmente e dois apontaram o overflow de Weddings em tablet. Após a correção, os 12 casos de rotas em 320/390/768 px passaram, incluindo os dois afetados e a nova verificação de encaixe do título de About.
- Navegação das sete páginas em PT/EN/ES/CA e desktop/mobile, filtros, foco/menu mobile, reduced motion, voltar ao topo, animações e cenários simulados da integração Instagram verificados. WebKit valida o motor do Safari, não um dispositivo iOS real.
- Capturas locais de Home, Portfolio, Education e About em 1440/390 px revisadas; a captura final de About mobile está em `/private/tmp/bmv-review-about-390-final.png`.
- ESLint, build de produção e `git diff --check` aprovados após os ajustes finais.
- Sem commit, push, merge ou deploy.
