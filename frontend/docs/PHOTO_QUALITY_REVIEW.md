# Auditoria fotográfica — BMV Makeup

5 novembro 2026. Revisão local, aguardando aprovação visual. Nenhum commit, push ou deploy.

## Resultado e ação executada

Apenas `public/assets/images/portfolio/wedding-02.webp` foi alterada. CAS-12 foi regenerada do original IMG_3548.PNG (conteúdo real JPEG). Recorte: x=80, y=160, largura=1152, altura=1440 sobre 1320×1650. Mantém 4:5, aproximadamente 76,2% da área e 87,3% da resolução linear; remove 5/12 e bordas/indicadores de interface. Mantém cabelo, rosto, maquiagem, mãos e buquê; apenas cortina/vestido periféricos foram retirados. Sem aumento de resolução, filtros ou IA. Peso: 168,4 → 152.7 KiB. O original Display P3 foi convertido para sRGB após o recorte, preservando a aparência das cores no WebP. No maior cartão medido (400×500 CSS px), entrega 2,88 pixels por CSS px.

## Origem versus otimização

21 WebP auditados: q86, método 6, com redução proporcional e sem ampliação de arquivo. Foram reconstruídas as mesmas referências raster usadas na conversão, e as 21 reencodificações produziram bytes idênticos aos WebP atuais. PSNR agregado YUV entre 43,74 e 48,77 dB, relativo ao raster preparado, não à fotografia original antes do redimensionamento. As comparações visuais de detalhes em 1:1 não mostraram compressão excessiva que justificasse aumentar a qualidade/peso. Esses números não provam qualidade artística nem avaliam detalhes já ausentes na origem.

Os quatro JPEG da About também foram incluídos na medição: três versões q88 e BRU-02 copiada sem recompressão. Não foram reencodificados.

## Recomendações

- **Prioridade para fonte maior ou futura substituição: CAS-09 e ART-07**, exclusivamente pela insuficiência de pixels nos cartões grandes de desktop. Não substituídas automaticamente. Mantêm utilidade em tamanhos menores/mobile.
- **Limitações de origem sem necessidade imediata de troca:** CAS-08, CAS-06, CAS-13 e BRU-02; margem Retina limitada. SOC-09 tem detalhe suavizado na origem; ART-04 tem granulação na origem. Aumento de q não recupera isso.
- **Captura confirmada:** CAS-12. Demais fotografias com dimensões comuns de celular/redes não podem ser identificadas como prints só pela extensão, nome Facetune ou dimensões. ART-03/ART-04 são compatíveis com esse fluxo, sem comprovação de interface. Não removi assinatura/autoria da ART-03.
- **Boas para seus espaços:** CAS-05, CAS-10, CAS-12 recortada, CAS-20, ART-11, ART-09, ART-05, BRU-17, BRU-18/About, BRU-20, CAS-03. BRU-08, LBS-40, SOC-11 e os heros BRU-18/ART-08 permanecem bons em densidade comum, com ressalvas de exportação para desktop Retina grande descritas na tabela.

## Medição

Chrome headless, páginas Home, About, Services, Weddings e Portfolio; larguras 320, 390, 768, 1440 e 1920, altura 900 CSS px. Todos os 25 arquivos decodificaram e responderam HTTP 200, sem overflow horizontal. Safari continua sendo a etapa de aprovação visual da Lorena. A tabela usa o pior caso de desktop (1440/1920) e mobile (320/390); demais dados permanecem na medição local.

DPR útil = min(largura natural/largura CSS, altura natural/altura CSS), considerando o cover e seu recorte. ≥1 atende densidade comum; ≥2 atende Retina 2x; <1 significa ampliação visual já exigida pelo componente. Isso não altera os arquivos. Tamanhos são KiB (1024 bytes). Dimensões originais são as codificadas do catálogo; SOC-11 usa EXIF para orientação, ficando vertical na versão final.

| ID / destino | Original px | Final px | KiB origem → final | Codificação | Desktop CSS / DPR útil | Mobile CSS / DPR útil |
|---|---|---|---|---|---|---|
| BRU-18 `/assets/images/home/hero/bruno-working.webp` | 6813×4542 | 2400×1600 | 3818.7 → 193.2 | WebP q86/m6 | 1920×1280 / 1.25x | 320×900 / 1.78x |
| CAS-13 `/assets/images/home/hero/bridal.webp` | 2048×1365 | 2048×1365 | 190.8 → 111.3 | WebP q86/m6 | 1920×1280 / 1.07x | 320×900 / 1.52x |
| ART-08 `/assets/images/home/hero/artistic.webp` | 3024×1701 | 2400×1350 | 923.6 → 139.9 | WebP q86/m6 | 1920×1080 / 1.25x | 320×900 / 1.5x |
| SOC-11 `/assets/images/home/selected-work/beauty-portrait.webp` | 6000×4000 | 1600×2400 | 4579.0 → 168.7 | WebP q86/m6 | 1010×1263 / 1.58x | 350×438 / 4.57x |
| ART-04 `/assets/images/home/selected-work/artistic.webp` | 1320×2346 | 1320×2346 | 824.3 → 383.5 | WebP q86/m6 | 859×1074 / 1.54x | 350×438 / 3.77x |
| BRU-20 `/assets/images/home/weddings/bruno-working.webp` | 5152×7728 | 1600×2400 | 7757.5 → 143.8 | WebP q86/m6 | 351×444 / 4.56x | 136×175 / 11.76x |
| CAS-03 `/assets/images/home/weddings/bride-portrait.webp` | 1206×1809 | 1206×1809 | 392.4 → 172.0 | WebP q86/m6 | 639×852 / 1.89x | 287×383 / 4.2x |
| BRU-08 `/assets/images/about/bruno-portrait.jpeg` | 4000×6000 | 1600×2400 | 19699.3 → 1129.9 | JPEG q88 | 853×1280 / 1.88x | 390×488 / 4.1x |
| BRU-02 `/assets/images/about/bruno-client.jpeg` | 1067×1600 | 1067×1600 | 234.6 → 234.6 | JPEG original, sem recompressão | 901×1126 / 1.18x | 298×372 / 3.58x |
| BRU-17 `/assets/images/about/bruno-backstage-1.jpeg` | 7008×4672 | 2400×1600 | 6116.3 → 946.4 | JPEG q88 | 546×729 / 2.19x | 190×253 / 6.32x |
| BRU-18 `/assets/images/about/bruno-backstage-2.jpeg` | 6813×4542 | 2400×1600 | 3818.7 → 852.4 | JPEG q88 | 393×525 / 3.05x | 136×182 / 8.79x |
| CAS-05 `/assets/images/services/weddings.webp` | 1284×1930 | 1284×1930 | 369.8 → 167.1 | WebP q86/m6 | 383×511 / 3.35x | 308×411 / 4.17x |
| ART-03 `/assets/images/services/artistic.webp` | 1320×2346 | 1320×2346 | 523.2 → 158.6 | WebP q86/m6 | 383×479 / 3.45x | 252×315 / 5.24x |
| CAS-08 `/assets/images/weddings/weddings-hero.webp` | 1206×804 | 1206×804 | 152.7 → 66.7 | WebP q86/m6 | 756×810 / 0.99x | 320×585 / 1.37x |
| CAS-10 `/assets/images/weddings/weddings-intro.webp` | 3024×4032 | 1800×2400 | 3527.3 → 267.5 | WebP q86/m6 | 495×619 / 3.64x | 287×359 / 6.27x |
| CAS-09 `/assets/images/portfolio/wedding-01.webp` | 1284×854 | 1284×854 | 121.2 → 45.4 | WebP q86/m6 | 1007×1259 / 0.68x | 350×438 / 1.95x |
| CAS-12 `/assets/images/portfolio/wedding-02.webp` | 1320×1650 | 1152×1440 | 360.8 → 152.7 | WebP q86/m6 | 400×500 / 2.88x | 203×254 / 5.67x |
| CAS-20 `/assets/images/portfolio/wedding-03.webp` | 3289×4934 | 1600×2400 | 9616.5 → 167.1 | WebP q86/m6 | 703×879 / 2.28x | 273×341 / 5.86x |
| CAS-06 `/assets/images/portfolio/wedding-04.webp` | 1206×804 | 1206×804 | 141.7 → 61.6 | WebP q86/m6 | 1159×724 / 1.04x | 322×201 / 3.75x |
| ART-11 `/assets/images/portfolio/artistic-01.webp` | 1317×1646 | 1317×1646 | 1756.6 → 106.8 | WebP q86/m6 | 551×735 / 2.24x | 252×336 / 4.9x |
| ART-09 `/assets/images/portfolio/artistic-02.webp` | 3023×1701 | 2400×1350 | 849.3 → 160.8 | WebP q86/m6 | 1159×724 / 1.86x | 322×201 / 6.72x |
| ART-05 `/assets/images/portfolio/artistic-03.webp` | 3024×4032 | 1800×2400 | 4365.3 → 610.0 | WebP q86/m6 | 400×499 / 4.5x | 203×254 / 8.87x |
| ART-07 `/assets/images/portfolio/artistic-04.webp` | 1366×768 | 1366×768 | 131.3 → 38.5 | WebP q86/m6 | 1007×1259 / 0.61x | 350×438 / 1.75x |
| LBS-40 `/assets/images/portfolio/beauty-02.webp` | 4000×6000 | 1600×2400 | 5093.5 → 125.5 | WebP q86/m6 | 1007×1259 / 1.59x | 350×438 / 4.57x |
| SOC-09 `/assets/images/portfolio/beauty-03.webp` | 1320×2132 | 1320×2132 | 628.8 → 196.6 | WebP q86/m6 | 551×735 / 2.4x | 252×336 / 5.24x |

## Observações por arquivo

- **BRU-18** `/assets/images/home/hero/bruno-working.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. Em desktop grande, a exportação reduzida não atende 2x; fonte permite variante maior se necessária, sem trocar a foto. PSNR do WebP: 45.12 dB.
- **CAS-13** `/assets/images/home/hero/bridal.webp`: Origem reduzida para hero full-width em desktop grande (2048×1365). Boa no mobile, mas não atende 2x em todos os tamanhos. PSNR do WebP: 48.43 dB.
- **ART-08** `/assets/images/home/hero/artistic.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. Em desktop grande, a exportação reduzida não atende 2x; fonte permite variante maior se necessária, sem trocar a foto. PSNR do WebP: 46.93 dB.
- **SOC-11** `/assets/images/home/selected-work/beauty-portrait.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. Em desktop grande, a exportação reduzida não atende 2x; fonte permite variante maior se necessária, sem trocar a foto. PSNR do WebP: 46.45 dB.
- **ART-04** `/assets/images/home/selected-work/artistic.webp`: Granulação/ruído visíveis já na origem. Dimensões compatíveis com captura, mas sem interface que comprove print. PSNR do WebP: 43.98 dB.
- **BRU-20** `/assets/images/home/weddings/bruno-working.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. PSNR do WebP: 45.50 dB.
- **CAS-03** `/assets/images/home/weddings/bride-portrait.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. Em desktop grande, a exportação reduzida não atende 2x; fonte permite variante maior se necessária, sem trocar a foto. PSNR do WebP: 46.22 dB.
- **BRU-08** `/assets/images/about/bruno-portrait.jpeg`: Boa para o espaço atual, sem degradação excessiva de conversão observada. Em desktop grande, a exportação reduzida não atende 2x; fonte permite variante maior se necessária, sem trocar a foto.
- **BRU-02** `/assets/images/about/bruno-client.jpeg`: Origem 1067×1600 limita o retrato About em Retina desktop; preservada aprovação anterior.
- **BRU-17** `/assets/images/about/bruno-backstage-1.jpeg`: Boa para o espaço atual, sem degradação excessiva de conversão observada.
- **BRU-18** `/assets/images/about/bruno-backstage-2.jpeg`: Boa para o espaço atual, sem degradação excessiva de conversão observada.
- **CAS-05** `/assets/images/services/weddings.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. PSNR do WebP: 46.80 dB.
- **ART-03** `/assets/images/services/artistic.webp`: Detalhe e sombras limitados na origem; resolução suficiente para o cartão Services. Dimensões tipo celular não comprovam print. PSNR do WebP: 47.03 dB.
- **CAS-08** `/assets/images/weddings/weddings-hero.webp`: Origem limitada para hero/Retina: 1206×804. Não há recuperação de detalhe ao elevar qualidade WebP. PSNR do WebP: 46.91 dB.
- **CAS-10** `/assets/images/weddings/weddings-intro.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. PSNR do WebP: 45.30 dB.
- **CAS-09** `/assets/images/portfolio/wedding-01.webp`: Obter original maior/substituir para cartão grande: recorte vertical de horizontal deixa menos de 1 pixel por CSS px no desktop. PSNR do WebP: 48.33 dB.
- **CAS-12** `/assets/images/portfolio/wedding-02.webp`: Print confirmado por 5/12, margens e indicadores; corrigido com crop 4:5, sem reconstrução nem ampliação. Boa para cartão atual. PSNR do WebP: 45.17 dB.
- **CAS-20** `/assets/images/portfolio/wedding-03.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. PSNR do WebP: 44.63 dB.
- **CAS-06** `/assets/images/portfolio/wedding-04.webp`: Origem limitada para galeria wide em desktop: 1206×804; boa no mobile. PSNR do WebP: 46.86 dB.
- **ART-11** `/assets/images/portfolio/artistic-01.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. PSNR do WebP: 48.77 dB.
- **ART-09** `/assets/images/portfolio/artistic-02.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. Em desktop grande, a exportação reduzida não atende 2x; fonte permite variante maior se necessária, sem trocar a foto. PSNR do WebP: 46.62 dB.
- **ART-05** `/assets/images/portfolio/artistic-03.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. PSNR do WebP: 43.74 dB.
- **ART-07** `/assets/images/portfolio/artistic-04.webp`: Obter original maior/substituir para cartão grande: 1366×768 horizontal sofre recorte vertical e ampliação pelo layout. PSNR do WebP: 48.55 dB.
- **LBS-40** `/assets/images/portfolio/beauty-02.webp`: Boa para o espaço atual, sem degradação excessiva de conversão observada. Em desktop grande, a exportação reduzida não atende 2x; fonte permite variante maior se necessária, sem trocar a foto. PSNR do WebP: 47.47 dB.
- **SOC-09** `/assets/images/portfolio/beauty-03.webp`: Suavização e definição limitada nos detalhes já estão na origem. Compatível com conteúdo de rede social; sem UI que confirme print. PSNR do WebP: 45.97 dB.

## Limites e preservação

Não foram alterados componentes, CSS, proporções de caixas, pontos focais aprovados, traduções, animações, Instagram, curadoria ou arquivos originais. Não foram preenchidas imagens pendentes. Fotos individuais de desktop grande podem ter suavidade de origem mesmo com muitos pixels; o parecer considera comparação visual e adequação ao tamanho, não apenas a resolução numérica.
