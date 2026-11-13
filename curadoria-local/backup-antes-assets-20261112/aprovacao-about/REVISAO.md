# About — primeira rodada, 5 novembro 2026

Implementação local, aguardando aprovação visual. IDs resolvidos pelo inventario.json; nenhuma substituição por aproximação. BRU-20 não implementada. Hero existente da About preservado.

| ID | Original | Destino em frontend/public/assets/images/about | Versão web | Peso |
|---|---|---|---|---|
| BRU-08 | IMG_1338.JPG | bruno-portrait.jpeg | 1600 × 2400 | 1.10 MiB |
| BRU-02 | 2fa30cee-c3cb-4511-b33f-a76ad1609d65.jpg | bruno-client.jpeg | 1067 × 1600 | 235 KiB |
| BRU-17 | IMG_7048.JPG | bruno-backstage-1.jpeg | 2400 × 1600 | 946 KiB |
| BRU-18 | IMG_7050.JPG | bruno-backstage-2.jpeg | 2400 × 1600 | 852 KiB |

As três maiores foram redimensionadas proporcionalmente com sips (lado maior 2400, JPEG qualidade 88), sem corte no arquivo, preservando o perfil sRGB. BRU-02 já era pequena e foi copiada sem nova compressão nem ampliação. O conjunto passou de aproximadamente 29,2 MiB para 3,0 MiB (redução de cerca de 89,4%). Não houve correção de cores ou rotação arbitrária. Os originais permanecem íntegros, conferidos por SHA-256.

## Enquadramentos para aprovação

- BRU-08: desktop mostra proporção original 2:3; mobile caixa 4:5, com recorte vertical central. Rosto do Bruno, rosto da cliente, mão e pincel permanecem visíveis.
- BRU-02: caixa 4:5 em ambos. Recorte central superior/inferior mantém rosto da cliente e pincel. O Bruno aparece apenas parcialmente no original; nenhuma tentativa de reconstrução ou alteração da foto.
- **BRU-17: aprovar recorte para a direita.** Original horizontal 3:2 em caixa 3:4 retém cerca de 50% da área. O centro cortava o rosto da cliente; aplicado `object-position: right center` somente à primeira imagem de AboutClosing. Mantém rosto e pincel; exclui o Bruno desfocado à esquerda e a paleta. Confirmar se essa perda de contexto é desejada.
- **BRU-18: aprovar recorte central.** Original horizontal 3:2 em caixa 3:4 também retém cerca de 50% da área. Mantém os dois rostos e a ação de maquiagem, com corte lateral do corpo/cenário. Mobile exibe essa foto pequena, conforme o layout editorial existente.

Os arquivos completos continuam disponíveis nas versões web; os recortes são apenas de exibição por `object-fit: cover`, sem esticar ou distorcer. Nenhuma alteração de layout, animação, texto, tradução ou outra página. Apenas quatro novos JPEG e uma regra de ponto focal na About.

## Verificação

- `npm run build`: passou.
- `npm run lint`: passou.
- Chrome headless: quatro imagens decodificadas em desktop 1440 × 1000 e mobile 390 × 844; dimensões naturais corretas, `object-fit: cover`, sem overflow horizontal.
- Capturas individuais de cada imagem nos dois tamanhos nesta pasta (`about-desktop-…png` e `about-mobile-…png`).
- Hashes de frontend/src comparados antes/depois: apenas AboutClosing.module.css mudou nesta rodada; alterações preexistentes foram preservadas.

Para revisar no site: iniciar `npm run dev -- --host 127.0.0.1 --port 4273` dentro de frontend e abrir http://127.0.0.1:4273/about. Nada foi commitado, enviado ou publicado.
