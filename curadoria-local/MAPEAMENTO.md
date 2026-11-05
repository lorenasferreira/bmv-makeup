# Mapeamento BMV — 4 novembro 2026

Escolhas pendentes: preencher escolhas.csv (colunas escolha_desktop, escolha_mobile, ponto_focal, aprovacao, notas). Usar IDs do inventário. Registrar autorização explícita antes de implementar. Nenhuma sugestão equivale a aprovação.

## Inventário

- `Artística`: 12 arquivos; {'vertical': 8, 'horizontal': 4}
- `Bruno trabalhando `: 21 arquivos; {'horizontal': 12, 'vertical': 9}
- `Casamentos `: 21 arquivos; {'horizontal': 10, 'vertical': 11}
- `Social and Beauty `: 11 arquivos; {'horizontal': 10, 'vertical': 1}

65 arquivos: 29 verticais, 36 horizontais, nenhum quadrado. 20 HEIC, 43 JPEG, 2 PNG. Nenhuma duplicata binária SHA-256. CAS-12 tem extensão .PNG mas conteúdo JPEG; o servidor de curadoria usa o MIME real. Inventário registra dimensões do arquivo e orientação EXIF separadamente; confirmar enquadramento pela renderização.

Duplicatas visuais / variantes: não são excluídas por hashes diferentes; comparar manualmente sequências BRU-09–11, BRU-15–16, BRU-17–18 e CAS-13–17. São grupos candidatos por nomes/numeração, não duplicatas confirmadas.

## Suficiência e lacunas

O lote cobre Artística (12), Bruno trabalhando (21), Casamentos (21) e Social and Beauty (11). Quantidade suficiente para uma seleção nessas quatro categorias, com reutilização entre páginas se aprovada. Não basta para preencher rigorosamente todas as categorias atuais: campanhas, photoshoots e audiovisual não foram fornecidas como categorias. Editorial também não está identificado. Não reclassificar por enquadramento. Ensino e retrato formal do Bruno precisam de confirmação visual/temática; bastidor não prova aula. Os oito avatares de depoimentos devem preservar a identidade das clientes. Instagram (até seis imagens dinâmicas) fica fora desta curadoria.

86 posições mapeadas: {'Home': 36, 'About': 5, 'Services': 8, 'Weddings': 8, 'Education': 5, 'Portfolio': 24}. Incluem seis posições dinâmicas Instagram e oito avatares, além de 24 posições atuais no Portfolio. São posições, não exigência de arquivos exclusivos; versões desktop/mobile podem demandar escolhas adicionais.

## Critérios técnicos

Sugestões automáticas abaixo usam somente categoria e proximidade da proporção, não qualidade artística nem reconhecimento da composição. Percentual é área geométrica retida num recorte cover central; não mede preservação do rosto. Validar tema, espaço para texto e foco antes da escolha. Hero Home: priorizar horizontais desktop e verticais mobile; outras páginas têm heros divididos ou pequenos, descritos individualmente. Sem escolha alternativa mobile atualmente. Não aplicar panorâmico a todos os heros.

Para nitidez, comparar pixels úteis após recorte com tamanho renderizado × DPR (ex.: 1920×1080 em DPR2 pede 3840×2160). Muitas imagens de 1206/1320/1366px exigem cuidado em hero desktop. HEIC precisa de tratamento posterior para distribuição ampla, sem conversão nesta etapa. Safari 17 adicionou suporte nativo: https://webkit.org/blog/14445/webkit-features-in-safari-17-0/ . Abra o catálogo no Safari do Mac para visualizar HEIC sem criar derivados.

## Espaços por página

Todos os img mapeados usam cover e object-position padrão 50% 50%, exceto Instagram (height:auto). Placeholders não têm object-fit/position definidos. Não há backgrounds fotográficos ativos nessas páginas: o Hero Home usa painéis de cor. Arquivos em public/home/hero existem mas não são usados pelo Hero. Aprovação artística não é inferida da presença no código.

### HOM-01 — Home / Hero / working
- Quantidade: 1; recomendação: 16:9; categoria: BRU.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). 100svh; desktop panorâmico variável com viewport; mobile sugerido 9:16, sem fonte separada hoje.
- Sugestões técnicas: BRU-01 (retém ≈85% da área); BRU-03 (retém ≈85% da área); BRU-05 (retém ≈84% da área); BRU-09 (retém ≈84% da área).
- Evidência: `frontend/src/components/sections/home/Hero/Hero.jsx` e `frontend/src/components/sections/home/Hero/Hero.module.css`.

### HOM-02 — Home / Hero / portrait
- Quantidade: 1; recomendação: 16:9; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). 100svh; desktop panorâmico variável com viewport; mobile sugerido 9:16, sem fonte separada hoje.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/Hero/Hero.jsx` e `frontend/src/components/sections/home/Hero/Hero.module.css`.

### HOM-03 — Home / Hero / bridal
- Quantidade: 1; recomendação: 16:9; categoria: CAS.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). 100svh; desktop panorâmico variável com viewport; mobile sugerido 9:16, sem fonte separada hoje.
- Sugestões técnicas: CAS-11 (retém ≈100% da área); CAS-09 (retém ≈85% da área); CAS-04 (retém ≈84% da área); CAS-13 (retém ≈84% da área).
- Evidência: `frontend/src/components/sections/home/Hero/Hero.jsx` e `frontend/src/components/sections/home/Hero/Hero.module.css`.

### HOM-04 — Home / Hero / editorial
- Quantidade: 1; recomendação: 16:9; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). 100svh; desktop panorâmico variável com viewport; mobile sugerido 9:16, sem fonte separada hoje.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/Hero/Hero.jsx` e `frontend/src/components/sections/home/Hero/Hero.module.css`.

### HOM-05 — Home / Hero / artistic
- Quantidade: 1; recomendação: 16:9; categoria: ART.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). 100svh; desktop panorâmico variável com viewport; mobile sugerido 9:16, sem fonte separada hoje.
- Sugestões técnicas: ART-08 (retém ≈100% da área); ART-09 (retém ≈100% da área); ART-06 (retém ≈100% da área); ART-07 (retém ≈100% da área).
- Evidência: `frontend/src/components/sections/home/Hero/Hero.jsx` e `frontend/src/components/sections/home/Hero/Hero.module.css`.

### HOM-06 — Home / Hero / audiovisual
- Quantidade: 1; recomendação: 16:9; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). 100svh; desktop panorâmico variável com viewport; mobile sugerido 9:16, sem fonte separada hoje.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/Hero/Hero.jsx` e `frontend/src/components/sections/home/Hero/Hero.module.css`.

### HOM-07 — Home / MeetBruno / retrato
- Quantidade: 1; recomendação: 4:5; categoria: BRU.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). mesma proporção; grade/largura responsivas.
- Sugestões técnicas: BRU-13 (retém ≈94% da área); BRU-07 (retém ≈87% da área); BRU-02 (retém ≈83% da área); BRU-21 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/home/MeetBruno/MeetBruno.jsx` e `frontend/src/components/sections/home/MeetBruno/MeetBruno.module.css`.

### HOM-08 — Home / ExploreTheWork / weddings
- Quantidade: 1; recomendação: 4:5; categoria: CAS.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/home/explore-work/weddings.jpg`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: CAS-12 (retém ≈100% da área); CAS-10 (retém ≈94% da área); CAS-02 (retém ≈83% da área); CAS-03 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.jsx` e `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.module.css`.

### HOM-09 — Home / ExploreTheWork / campaigns
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/home/explore-work/campaigns.jpg`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.jsx` e `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.module.css`.

### HOM-10 — Home / ExploreTheWork / social
- Quantidade: 1; recomendação: 4:5; categoria: SOC.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/home/explore-work/social.jpg`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: SOC-09 (retém ≈77% da área); SOC-11 (retém ≈53% da área); SOC-02 (retém ≈45% da área); SOC-01 (retém ≈45% da área).
- Evidência: `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.jsx` e `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.module.css`.

### HOM-11 — Home / ExploreTheWork / photoshoots
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/home/explore-work/photoshoots.jpg`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.jsx` e `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.module.css`.

### HOM-12 — Home / ExploreTheWork / artistic
- Quantidade: 1; recomendação: 4:5; categoria: ART.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/home/explore-work/artistic.jpg`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: ART-11 (retém ≈100% da área); ART-05 (retém ≈94% da área); ART-02 (retém ≈83% da área); ART-12 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.jsx` e `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.module.css`.

### HOM-13 — Home / ExploreTheWork / audiovisual
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/home/explore-work/audiovisual.jpg`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.jsx` e `frontend/src/components/sections/home/ExploreTheWork/ExploreTheWork.module.css`.

### HOM-14 — Home / SelectedWork / portrait
- Quantidade: 1; recomendação: 4:5; categoria: SOC.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). mesma proporção; grade/largura responsivas.
- Sugestões técnicas: SOC-09 (retém ≈77% da área); SOC-11 (retém ≈53% da área); SOC-02 (retém ≈45% da área); SOC-01 (retém ≈45% da área).
- Evidência: `frontend/src/components/sections/home/SelectedWork/SelectedWork.jsx` e `frontend/src/components/sections/home/SelectedWork/SelectedWork.module.css`.

### HOM-15 — Home / SelectedWork / editorial
- Quantidade: 1; recomendação: 3:4; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). mesma proporção; grade/largura responsivas.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/SelectedWork/SelectedWork.jsx` e `frontend/src/components/sections/home/SelectedWork/SelectedWork.module.css`.

### HOM-16 — Home / SelectedWork / detail
- Quantidade: 1; recomendação: 1:1; categoria: SOC.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). mesma proporção; grade/largura responsivas.
- Sugestões técnicas: SOC-11 (retém ≈67% da área); SOC-09 (retém ≈62% da área); SOC-02 (retém ≈56% da área); SOC-01 (retém ≈56% da área).
- Evidência: `frontend/src/components/sections/home/SelectedWork/SelectedWork.jsx` e `frontend/src/components/sections/home/SelectedWork/SelectedWork.module.css`.

### HOM-17 — Home / SelectedWork / campaign
- Quantidade: 1; recomendação: 4:3; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). mesma proporção; grade/largura responsivas.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/SelectedWork/SelectedWork.jsx` e `frontend/src/components/sections/home/SelectedWork/SelectedWork.module.css`.

### HOM-18 — Home / SelectedWork / artistic
- Quantidade: 1; recomendação: 4:5; categoria: ART.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). mesma proporção; grade/largura responsivas.
- Sugestões técnicas: ART-11 (retém ≈100% da área); ART-05 (retém ≈94% da área); ART-02 (retém ≈83% da área); ART-12 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/home/SelectedWork/SelectedWork.jsx` e `frontend/src/components/sections/home/SelectedWork/SelectedWork.module.css`.

### HOM-19 — Home / WeddingsPreview / main
- Quantidade: 1; recomendação: 3:4; categoria: CAS.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). mesma proporção; grade/largura responsivas.
- Sugestões técnicas: CAS-10 (retém ≈100% da área); CAS-12 (retém ≈94% da área); CAS-02 (retém ≈89% da área); CAS-03 (retém ≈89% da área).
- Evidência: `frontend/src/components/sections/home/WeddingsPreview/WeddingsPreview.jsx` e `frontend/src/components/sections/home/WeddingsPreview/WeddingsPreview.module.css`.

### HOM-20 — Home / WeddingsPreview / secondary
- Quantidade: 1; recomendação: 4:5; categoria: CAS.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). mesma proporção; grade/largura responsivas.
- Sugestões técnicas: CAS-12 (retém ≈100% da área); CAS-10 (retém ≈94% da área); CAS-02 (retém ≈83% da área); CAS-03 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/home/WeddingsPreview/WeddingsPreview.jsx` e `frontend/src/components/sections/home/WeddingsPreview/WeddingsPreview.module.css`.

### HOM-21 — Home / BehindTheBrush / large
- Quantidade: 1; recomendação: 4:5; categoria: BRU.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). desktop: dimensões dependem da grade 12×12, min-height 720/600px; mobile <=640: 4:5.
- Sugestões técnicas: BRU-13 (retém ≈94% da área); BRU-07 (retém ≈87% da área); BRU-02 (retém ≈83% da área); BRU-21 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/home/BehindTheBrush/BehindTheBrush.jsx` e `frontend/src/components/sections/home/BehindTheBrush/BehindTheBrush.module.css`.

### HOM-22 — Home / BehindTheBrush / smallTop
- Quantidade: 1; recomendação: 1:1; categoria: BRU.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). desktop: dimensões dependem da grade 12×12, min-height 720/600px; mobile <=640: 1:1.
- Sugestões técnicas: BRU-14 (retém ≈75% da área); BRU-13 (retém ≈75% da área); BRU-07 (retém ≈70% da área); BRU-02 (retém ≈67% da área).
- Evidência: `frontend/src/components/sections/home/BehindTheBrush/BehindTheBrush.jsx` e `frontend/src/components/sections/home/BehindTheBrush/BehindTheBrush.module.css`.

### HOM-23 — Home / BehindTheBrush / smallBottom
- Quantidade: 1; recomendação: 4:5; categoria: BRU.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). desktop: dimensões dependem da grade 12×12, min-height 720/600px; mobile <=640: 4:5.
- Sugestões técnicas: BRU-13 (retém ≈94% da área); BRU-07 (retém ≈87% da área); BRU-02 (retém ≈83% da área); BRU-21 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/home/BehindTheBrush/BehindTheBrush.jsx` e `frontend/src/components/sections/home/BehindTheBrush/BehindTheBrush.module.css`.

### HOM-24 — Home / EducationPreview / aula
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: placeholder explícito; `sem fonte estática`.
- Fit/posição: não definido (placeholder). mesma proporção; grade/largura responsivas.
- Sugestões técnicas: lacuna temática: confirmar fotos de ensino; BRU apenas se mostrar aula, nunca presumir.
- Evidência: `frontend/src/components/sections/home/EducationPreview/EducationPreview.jsx` e `frontend/src/components/sections/home/EducationPreview/EducationPreview.module.css`.

### HOM-25 — Home / KindWords / natalia
- Quantidade: 1; recomendação: 1:1; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/reviews/natalia.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. círculo 54px desktop / 48px mobile; identidade da cliente obrigatória.
- Sugestões técnicas: preservar fotografia da pessoa identificada; não substituir por foto genérica.
- Evidência: `frontend/src/components/sections/home/KindWords/KindWords.jsx` e `frontend/src/components/sections/home/KindWords/KindWords.module.css`.

### HOM-26 — Home / KindWords / lorena
- Quantidade: 1; recomendação: 1:1; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/reviews/lorena.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. círculo 54px desktop / 48px mobile; identidade da cliente obrigatória.
- Sugestões técnicas: preservar fotografia da pessoa identificada; não substituir por foto genérica.
- Evidência: `frontend/src/components/sections/home/KindWords/KindWords.jsx` e `frontend/src/components/sections/home/KindWords/KindWords.module.css`.

### HOM-27 — Home / KindWords / gabriela
- Quantidade: 1; recomendação: 1:1; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/reviews/gabriela.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. círculo 54px desktop / 48px mobile; identidade da cliente obrigatória.
- Sugestões técnicas: preservar fotografia da pessoa identificada; não substituir por foto genérica.
- Evidência: `frontend/src/components/sections/home/KindWords/KindWords.jsx` e `frontend/src/components/sections/home/KindWords/KindWords.module.css`.

### HOM-28 — Home / KindWords / maria
- Quantidade: 1; recomendação: 1:1; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/reviews/maria.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. círculo 54px desktop / 48px mobile; identidade da cliente obrigatória.
- Sugestões técnicas: preservar fotografia da pessoa identificada; não substituir por foto genérica.
- Evidência: `frontend/src/components/sections/home/KindWords/KindWords.jsx` e `frontend/src/components/sections/home/KindWords/KindWords.module.css`.

### HOM-29 — Home / KindWords / aline
- Quantidade: 1; recomendação: 1:1; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/reviews/aline.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. círculo 54px desktop / 48px mobile; identidade da cliente obrigatória.
- Sugestões técnicas: preservar fotografia da pessoa identificada; não substituir por foto genérica.
- Evidência: `frontend/src/components/sections/home/KindWords/KindWords.jsx` e `frontend/src/components/sections/home/KindWords/KindWords.module.css`.

### HOM-30 — Home / KindWords / lolys
- Quantidade: 1; recomendação: 1:1; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/reviews/lolys.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. círculo 54px desktop / 48px mobile; identidade da cliente obrigatória.
- Sugestões técnicas: preservar fotografia da pessoa identificada; não substituir por foto genérica.
- Evidência: `frontend/src/components/sections/home/KindWords/KindWords.jsx` e `frontend/src/components/sections/home/KindWords/KindWords.module.css`.

### HOM-31 — Home / InstagramPreview / post 1
- Quantidade: 1; recomendação: original; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: dinâmico Instagram — preservar; `sem fonte estática`.
- Fit/posição: height:auto; proporção original. até 6 posts via API; height:auto; não faz parte da seleção de arquivos.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.jsx` e `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.module.css`.

### HOM-32 — Home / InstagramPreview / post 2
- Quantidade: 1; recomendação: original; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: dinâmico Instagram — preservar; `sem fonte estática`.
- Fit/posição: height:auto; proporção original. até 6 posts via API; height:auto; não faz parte da seleção de arquivos.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.jsx` e `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.module.css`.

### HOM-33 — Home / InstagramPreview / post 3
- Quantidade: 1; recomendação: original; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: dinâmico Instagram — preservar; `sem fonte estática`.
- Fit/posição: height:auto; proporção original. até 6 posts via API; height:auto; não faz parte da seleção de arquivos.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.jsx` e `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.module.css`.

### HOM-34 — Home / InstagramPreview / post 4
- Quantidade: 1; recomendação: original; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: dinâmico Instagram — preservar; `sem fonte estática`.
- Fit/posição: height:auto; proporção original. até 6 posts via API; height:auto; não faz parte da seleção de arquivos.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.jsx` e `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.module.css`.

### HOM-35 — Home / InstagramPreview / post 5
- Quantidade: 1; recomendação: original; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: dinâmico Instagram — preservar; `sem fonte estática`.
- Fit/posição: height:auto; proporção original. até 6 posts via API; height:auto; não faz parte da seleção de arquivos.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.jsx` e `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.module.css`.

### HOM-36 — Home / InstagramPreview / post 6
- Quantidade: 1; recomendação: original; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: dinâmico Instagram — preservar; `sem fonte estática`.
- Fit/posição: height:auto; proporção original. até 6 posts via API; height:auto; não faz parte da seleção de arquivos.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.jsx` e `frontend/src/components/sections/home/InstagramPreview/InstagramPreview.module.css`.

### ABO-01 — About / AboutHero / Bruno
- Quantidade: 1; recomendação: 3:4; categoria: BRU.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/about/bruno-about.jpeg`.
- Fit/posição: cover; object-position padrão 50% 50%. desktop altura mínima 650px / 560px <=900; mobile <=640: 3:4, largura 82%.
- Sugestões técnicas: BRU-13 (retém ≈100% da área); BRU-07 (retém ≈93% da área); BRU-02 (retém ≈89% da área); BRU-21 (retém ≈89% da área).
- Evidência: `frontend/src/components/sections/About/AboutHero/AboutHero.jsx` e `frontend/src/components/sections/About/AboutHero/AboutHero.module.css`.

### ABO-02 — About / AboutStory / journey
- Quantidade: 1; recomendação: 4:5; categoria: BRU.
- Atual: referência ausente / placeholder técnico; `/assets/images/about/bruno-portrait.jpeg`.
- Fit/posição: cover; object-position padrão 50% 50%. desktop seção min-height 900/720px, razão variável; mobile <=640: 4:5.
- Sugestões técnicas: BRU-13 (retém ≈94% da área); BRU-07 (retém ≈87% da área); BRU-02 (retém ≈83% da área); BRU-21 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/About/AboutStory/AboutStory.jsx` e `frontend/src/components/sections/About/AboutStory/AboutStory.module.css`.

### ABO-03 — About / AboutStory / approach
- Quantidade: 1; recomendação: 4:5; categoria: BRU.
- Atual: referência ausente / placeholder técnico; `/assets/images/about/bruno-client.jpeg`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: BRU-13 (retém ≈94% da área); BRU-07 (retém ≈87% da área); BRU-02 (retém ≈83% da área); BRU-21 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/About/AboutStory/AboutStory.jsx` e `frontend/src/components/sections/About/AboutStory/AboutStory.module.css`.

### ABO-04 — About / AboutClosing / bastidor 1
- Quantidade: 1; recomendação: 3:4; categoria: BRU.
- Atual: referência ausente / placeholder técnico; `/assets/images/about/bruno-backstage-1.jpeg`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: BRU-13 (retém ≈100% da área); BRU-07 (retém ≈93% da área); BRU-02 (retém ≈89% da área); BRU-21 (retém ≈89% da área).
- Evidência: `frontend/src/components/sections/About/AboutClosing/AboutClosing.jsx` e `frontend/src/components/sections/About/AboutClosing/AboutClosing.module.css`.

### ABO-05 — About / AboutClosing / bastidor 2
- Quantidade: 1; recomendação: 3:4; categoria: BRU.
- Atual: referência ausente / placeholder técnico; `/assets/images/about/bruno-backstage-2.jpeg`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: BRU-13 (retém ≈100% da área); BRU-07 (retém ≈93% da área); BRU-02 (retém ≈89% da área); BRU-21 (retém ≈89% da área).
- Evidência: `frontend/src/components/sections/About/AboutClosing/AboutClosing.jsx` e `frontend/src/components/sections/About/AboutClosing/AboutClosing.module.css`.

### SER-01 — Services / ServicesHero / hero
- Quantidade: 1; recomendação: 3:4; categoria: SOC.
- Atual: referência ausente / placeholder técnico; `/assets/images/services/services-hero.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. desktop min-height 620/540px, razão variável; mobile <=640: 3:4.
- Sugestões técnicas: SOC-09 (retém ≈83% da área); SOC-11 (retém ≈50% da área); SOC-02 (retém ≈42% da área); SOC-01 (retém ≈42% da área).
- Evidência: `frontend/src/components/sections/Services/ServicesHero/ServicesHero.jsx` e `frontend/src/components/sections/Services/ServicesHero/ServicesHero.module.css`.

### SER-02 — Services / ServicesOverview / weddings
- Quantidade: 1; recomendação: 3:4; categoria: CAS.
- Atual: referência ausente / placeholder técnico; `/assets/images/services/weddings.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. desktop/mobile: casamento 3:4 (regra mais específica); demais 4:5; mobile <=700 muda largura.
- Sugestões técnicas: CAS-10 (retém ≈100% da área); CAS-12 (retém ≈94% da área); CAS-02 (retém ≈89% da área); CAS-03 (retém ≈89% da área).
- Evidência: `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.jsx` e `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.module.css`.

### SER-03 — Services / ServicesOverview / beauty-social
- Quantidade: 1; recomendação: 4:5; categoria: SOC.
- Atual: referência ausente / placeholder técnico; `/assets/images/services/beauty-social.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. desktop/mobile: casamento 3:4 (regra mais específica); demais 4:5; mobile <=700 muda largura.
- Sugestões técnicas: SOC-09 (retém ≈77% da área); SOC-11 (retém ≈53% da área); SOC-02 (retém ≈45% da área); SOC-01 (retém ≈45% da área).
- Evidência: `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.jsx` e `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.module.css`.

### SER-04 — Services / ServicesOverview / campaigns
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/services/campaigns.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. desktop/mobile: casamento 3:4 (regra mais específica); demais 4:5; mobile <=700 muda largura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.jsx` e `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.module.css`.

### SER-05 — Services / ServicesOverview / photoshoots
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/services/photoshoots.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. desktop/mobile: casamento 3:4 (regra mais específica); demais 4:5; mobile <=700 muda largura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.jsx` e `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.module.css`.

### SER-06 — Services / ServicesOverview / artistic
- Quantidade: 1; recomendação: 4:5; categoria: ART.
- Atual: referência ausente / placeholder técnico; `/assets/images/services/artistic.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. desktop/mobile: casamento 3:4 (regra mais específica); demais 4:5; mobile <=700 muda largura.
- Sugestões técnicas: ART-11 (retém ≈100% da área); ART-05 (retém ≈94% da área); ART-02 (retém ≈83% da área); ART-12 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.jsx` e `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.module.css`.

### SER-07 — Services / ServicesOverview / audiovisual
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/services/audiovisual.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. desktop/mobile: casamento 3:4 (regra mais específica); demais 4:5; mobile <=700 muda largura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.jsx` e `frontend/src/components/sections/Services/ServicesOverview/ServicesOverview.module.css`.

### SER-08 — Services / ServicesExperience / bastidor
- Quantidade: 1; recomendação: 3:4; categoria: BRU.
- Atual: referência ausente / placeholder técnico; `/assets/images/services/services-experience.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. desktop min-height 720/580px, razão variável; mobile <=640: 3:4 largura 85%.
- Sugestões técnicas: BRU-13 (retém ≈100% da área); BRU-07 (retém ≈93% da área); BRU-02 (retém ≈89% da área); BRU-21 (retém ≈89% da área).
- Evidência: `frontend/src/components/sections/Services/ServicesExperience/ServicesExperience.jsx` e `frontend/src/components/sections/Services/ServicesExperience/ServicesExperience.module.css`.

### WED-01 — Weddings / WeddingsHero / hero
- Quantidade: 1; recomendação: 3:4; categoria: CAS.
- Atual: referência ausente / placeholder técnico; `/assets/images/weddings/weddings-hero.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. hero dividido: desktop altura viewport−90px; <=850 empilha e visual 70vh; <=640 65vh; não é panorâmico full-width.
- Sugestões técnicas: CAS-10 (retém ≈100% da área); CAS-12 (retém ≈94% da área); CAS-02 (retém ≈89% da área); CAS-03 (retém ≈89% da área).
- Evidência: `frontend/src/components/sections/Weddings/WeddingsHero/WeddingsHero.jsx` e `frontend/src/components/sections/Weddings/WeddingsHero/WeddingsHero.module.css`.

### WED-02 — Weddings / WeddingsIntro / intro
- Quantidade: 1; recomendação: 4:5; categoria: CAS.
- Atual: referência ausente / placeholder técnico; `/assets/images/weddings/weddings-intro.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: CAS-12 (retém ≈100% da área); CAS-10 (retém ≈94% da área); CAS-02 (retém ≈83% da área); CAS-03 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/Weddings/WeddingsIntro/WeddingsIntro.jsx` e `frontend/src/components/sections/Weddings/WeddingsIntro/WeddingsIntro.module.css`.

### WED-03 — Weddings / WeddingsProcess / vision
- Quantidade: 1; recomendação: 4:5; categoria: CAS.
- Atual: referência ausente / placeholder técnico; `/assets/images/weddings/vision.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: CAS-12 (retém ≈100% da área); CAS-10 (retém ≈94% da área); CAS-02 (retém ≈83% da área); CAS-03 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/Weddings/WeddingsProcess/WeddingsProcess.jsx` e `frontend/src/components/sections/Weddings/WeddingsProcess/WeddingsProcess.module.css`.

### WED-04 — Weddings / WeddingsProcess / trial
- Quantidade: 1; recomendação: 16:11; categoria: CAS.
- Atual: referência ausente / placeholder técnico; `/assets/images/weddings/trial.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: CAS-01 (retém ≈97% da área); CAS-06 (retém ≈97% da área); CAS-08 (retém ≈97% da área); CAS-13 (retém ≈97% da área).
- Evidência: `frontend/src/components/sections/Weddings/WeddingsProcess/WeddingsProcess.jsx` e `frontend/src/components/sections/Weddings/WeddingsProcess/WeddingsProcess.module.css`.

### WED-05 — Weddings / WeddingsProcess / wedding-day
- Quantidade: 1; recomendação: 16:10; categoria: CAS.
- Atual: referência ausente / placeholder técnico; `/assets/images/weddings/wedding-day.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: CAS-09 (retém ≈94% da área); CAS-04 (retém ≈94% da área); CAS-13 (retém ≈94% da área); CAS-14 (retém ≈94% da área).
- Evidência: `frontend/src/components/sections/Weddings/WeddingsProcess/WeddingsProcess.jsx` e `frontend/src/components/sections/Weddings/WeddingsProcess/WeddingsProcess.module.css`.

### WED-06 — Weddings / WeddingsProcess / celebration
- Quantidade: 1; recomendação: 3:4; categoria: CAS.
- Atual: referência ausente / placeholder técnico; `/assets/images/weddings/celebration.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: CAS-10 (retém ≈100% da área); CAS-12 (retém ≈94% da área); CAS-02 (retém ≈89% da área); CAS-03 (retém ≈89% da área).
- Evidência: `frontend/src/components/sections/Weddings/WeddingsProcess/WeddingsProcess.jsx` e `frontend/src/components/sections/Weddings/WeddingsProcess/WeddingsProcess.module.css`.

### WED-07 — Weddings / WeddingsReviews / clare
- Quantidade: 1; recomendação: 1:1; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/reviews/clare.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. 58px círculo; identidade da cliente obrigatória.
- Sugestões técnicas: preservar fotografia da pessoa identificada; não substituir por foto genérica.
- Evidência: `frontend/src/components/sections/Weddings/WeddingsReviews/WeddingsReviews.jsx` e `frontend/src/components/sections/Weddings/WeddingsReviews/WeddingsReviews.module.css`.

### WED-08 — Weddings / WeddingsReviews / marina
- Quantidade: 1; recomendação: 1:1; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: fotografia existente; aprovação a confirmar; `/assets/images/reviews/marina.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. 58px círculo; identidade da cliente obrigatória.
- Sugestões técnicas: preservar fotografia da pessoa identificada; não substituir por foto genérica.
- Evidência: `frontend/src/components/sections/Weddings/WeddingsReviews/WeddingsReviews.jsx` e `frontend/src/components/sections/Weddings/WeddingsReviews/WeddingsReviews.module.css`.

### EDU-01 — Education / EducationHero / hero
- Quantidade: 1; recomendação: 16:10; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/education/education-hero.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção mobile; max-width 520px, não é hero full-width.
- Sugestões técnicas: lacuna temática: confirmar fotos de ensino; BRU apenas se mostrar aula, nunca presumir.
- Evidência: `frontend/src/components/sections/Education/EducationHero/EducationHero.jsx` e `frontend/src/components/sections/Education/EducationHero/EducationHero.module.css`.

### EDU-02 — Education / EducationCourses / vip
- Quantidade: 1; recomendação: 3:4; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/education/vip.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: lacuna temática: confirmar fotos de ensino; BRU apenas se mostrar aula, nunca presumir.
- Evidência: `frontend/src/components/sections/Education/EducationCourses/EducationCourses.jsx` e `frontend/src/components/sections/Education/EducationCourses/EducationCourses.module.css`.

### EDU-03 — Education / EducationCourses / night
- Quantidade: 1; recomendação: 3:4; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/education/night.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: lacuna temática: confirmar fotos de ensino; BRU apenas se mostrar aula, nunca presumir.
- Evidência: `frontend/src/components/sections/Education/EducationCourses/EducationCourses.jsx` e `frontend/src/components/sections/Education/EducationCourses/EducationCourses.module.css`.

### EDU-04 — Education / EducationProfessional / main
- Quantidade: 1; recomendação: 16:10; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/education/bridal-main.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mobile <=640 muda para 4:5; requer duas escolhas/recorte aprovado.
- Sugestões técnicas: lacuna temática: confirmar fotos de ensino; BRU apenas se mostrar aula, nunca presumir.
- Evidência: `frontend/src/components/sections/Education/EducationProfessional/EducationProfessional.jsx` e `frontend/src/components/sections/Education/EducationProfessional/EducationProfessional.module.css`.

### EDU-05 — Education / EducationProfessional / detail
- Quantidade: 1; recomendação: 3:4; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/education/bridal-detail.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; grade/largura responsivas.
- Sugestões técnicas: lacuna temática: confirmar fotos de ensino; BRU apenas se mostrar aula, nunca presumir.
- Evidência: `frontend/src/components/sections/Education/EducationProfessional/EducationProfessional.jsx` e `frontend/src/components/sections/Education/EducationProfessional/EducationProfessional.module.css`.

### POR-01 — Portfolio / PortfolioGallery / 1 / weddings / large
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/wedding-01.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-02 — Portfolio / PortfolioGallery / 2 / artistic / portrait
- Quantidade: 1; recomendação: 3:4; categoria: ART.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/artistic-01.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: ART-05 (retém ≈100% da área); ART-11 (retém ≈94% da área); ART-02 (retém ≈89% da área); ART-12 (retém ≈89% da área).
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-03 — Portfolio / PortfolioGallery / 3 / beauty / small
- Quantidade: 1; recomendação: 4:5; categoria: SOC.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/beauty-01.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: SOC-09 (retém ≈77% da área); SOC-11 (retém ≈53% da área); SOC-02 (retém ≈45% da área); SOC-01 (retém ≈45% da área).
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-04 — Portfolio / PortfolioGallery / 4 / campaigns / wide
- Quantidade: 1; recomendação: 16:10; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/campaign-01.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-05 — Portfolio / PortfolioGallery / 5 / photoshoots / portrait
- Quantidade: 1; recomendação: 3:4; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/photoshoot-01.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-06 — Portfolio / PortfolioGallery / 6 / audiovisual / medium
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/audiovisual-01.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-07 — Portfolio / PortfolioGallery / 7 / weddings / small
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/wedding-02.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-08 — Portfolio / PortfolioGallery / 8 / beauty / large
- Quantidade: 1; recomendação: 4:5; categoria: SOC.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/beauty-02.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: SOC-09 (retém ≈77% da área); SOC-11 (retém ≈53% da área); SOC-02 (retém ≈45% da área); SOC-01 (retém ≈45% da área).
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-09 — Portfolio / PortfolioGallery / 9 / artistic / wide
- Quantidade: 1; recomendação: 16:10; categoria: ART.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/artistic-02.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: ART-09 (retém ≈90% da área); ART-08 (retém ≈90% da área); ART-06 (retém ≈90% da área); ART-07 (retém ≈90% da área).
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-10 — Portfolio / PortfolioGallery / 10 / campaigns / portrait
- Quantidade: 1; recomendação: 3:4; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/campaign-02.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-11 — Portfolio / PortfolioGallery / 11 / weddings / medium
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/wedding-03.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-12 — Portfolio / PortfolioGallery / 12 / photoshoots / small
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/photoshoot-02.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-13 — Portfolio / PortfolioGallery / 13 / audiovisual / large
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/audiovisual-02.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-14 — Portfolio / PortfolioGallery / 14 / beauty / portrait
- Quantidade: 1; recomendação: 3:4; categoria: SOC.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/beauty-03.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: SOC-09 (retém ≈83% da área); SOC-11 (retém ≈50% da área); SOC-02 (retém ≈42% da área); SOC-01 (retém ≈42% da área).
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-15 — Portfolio / PortfolioGallery / 15 / artistic / small
- Quantidade: 1; recomendação: 4:5; categoria: ART.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/artistic-03.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: ART-11 (retém ≈100% da área); ART-05 (retém ≈94% da área); ART-02 (retém ≈83% da área); ART-12 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-16 — Portfolio / PortfolioGallery / 16 / weddings / wide
- Quantidade: 1; recomendação: 16:10; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/wedding-04.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-17 — Portfolio / PortfolioGallery / 17 / campaigns / medium
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/campaign-03.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-18 — Portfolio / PortfolioGallery / 18 / photoshoots / large
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/photoshoot-03.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-19 — Portfolio / PortfolioGallery / 19 / beauty / small
- Quantidade: 1; recomendação: 4:5; categoria: SOC.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/beauty-04.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: SOC-09 (retém ≈77% da área); SOC-11 (retém ≈53% da área); SOC-02 (retém ≈45% da área); SOC-01 (retém ≈45% da área).
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-20 — Portfolio / PortfolioGallery / 20 / audiovisual / portrait
- Quantidade: 1; recomendação: 3:4; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/audiovisual-03.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-21 — Portfolio / PortfolioGallery / 21 / artistic / large
- Quantidade: 1; recomendação: 4:5; categoria: ART.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/artistic-04.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: ART-11 (retém ≈100% da área); ART-05 (retém ≈94% da área); ART-02 (retém ≈83% da área); ART-12 (retém ≈83% da área).
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-22 — Portfolio / PortfolioGallery / 22 / campaigns / small
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/campaign-04.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-23 — Portfolio / PortfolioGallery / 23 / photoshoots / wide
- Quantidade: 1; recomendação: 16:10; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/photoshoot-04.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

### POR-24 — Portfolio / PortfolioGallery / 24 / audiovisual / medium
- Quantidade: 1; recomendação: 4:5; categoria: SEM CORRESPONDÊNCIA CONFIRMADA.
- Atual: referência ausente / placeholder técnico; `/assets/images/portfolio/audiovisual-04.webp`.
- Fit/posição: cover; object-position padrão 50% 50%. mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura.
- Sugestões técnicas: lacuna — não preencher com outra categoria.
- Evidência: `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx` e `frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.module.css`.

## Seções sem posição fotográfica

AboutRange e manifesto; ServicesCTA; WeddingsPartners e WeddingsCTA; EducationIntro e EducationCTA; PortfolioHero e PortfolioCTA; Home FinalCTA. São texto, cor e elementos gráficos, sem necessidade atual de foto. Não criar novos espaços nesta etapa.

## Próxima implementação após aprovação

Registrar ID por espaço e dispositivo, enquadramento/ponto focal, autorização e texto alternativo contextual; confirmar categorias, repetição entre páginas e proporções originais do Portfolio. Decidir depois exportações web dos HEIC e nomes/extensões corretos. Preservar fotografias atuais até aprovação.
## Hero Home — alternativas por dispositivo

Recomendação geométrica, dentro da categoria original. Conferir composição com o simulador de recortes do catálogo. Retrato, editorial e audiovisual permanecem sem categoria correspondente confirmada.

| Slide / categoria | Desktop horizontal (16:9) | Mobile vertical (9:16) |
|---|---|---|
| BRU | BRU-01, BRU-03, BRU-05, BRU-19 | BRU-04, BRU-20, BRU-08, BRU-06 |
| CAS | CAS-11, CAS-09, CAS-04, CAS-13 | CAS-05, CAS-07, CAS-15, CAS-20 |
| ART | ART-08, ART-09, ART-06, ART-07 | ART-10, ART-01, ART-03, ART-04 |

As horizontais de Artística acima são HEIC. Conversão futura depende de aprovação; nesta etapa permanecem originais. Social and Beauty tem uma única vertical (SOC-09, HEIC), possível limitação para cartões verticais sem recorte significativo.

## Verificação realizada

Hashes SHA-256 dos 65 originais conferidos após preparação: íntegros. Dimensões lidas com sips; campo EXIF orientation indisponível nessa leitura, sem inferir rotação. Tamanho total aproximado: 174,4 MiB. Comparação de possíveis duplicatas visuais permanece artística/manual; não foi feita conversão para análise perceptual.

## Portfolio — preservação das categorias e proporções

A galeria atual tem 24 referências distribuídas em beauty, campaigns, photoshoots, artistic e audiovisual, sem Casamentos nem Bruno trabalhando. Para publicar a seleção dessas duas categorias será necessário decidir a estrutura futura com Lorena; nenhum filtro foi alterado. A curadoria preserva exatamente as quatro pastas do Bruno. Não transferir Casamentos ou Bruno trabalhando para outra categoria do Portfolio. Social and Beauty não deve ser subdividida automaticamente.

As razões da tabela documentam os componentes atuais, que usam cover e recortam. Para preservar a variedade original no Portfolio, registrar a proporção original escolhida nas notas e aprovar posteriormente o ajuste do componente; não forçar todos os originais a essas caixas. Essa é uma diferença entre a estrutura atual e o requisito da implementação futura.
