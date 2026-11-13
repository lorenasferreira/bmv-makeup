from pathlib import Path
import json,csv,re,collections,math
D=Path(__file__).resolve().parent; R=D.parent
photos=json.loads((D/'inventario.json').read_text()); slots=[]
def add(page,component,label,ratio,category='',mobile='',source='',placeholder=False):
 id=f'{page[:3].upper()}-{len([s for s in slots if s["pagina"]==page])+1:02}'
 paths=list((R/'frontend/src/components/sections').rglob(component+'.jsx')); p=paths[0]; css=p.with_suffix('.module.css')
 existing=R/'frontend/public'/source.lstrip('/') if source else None
 status='placeholder explícito' if placeholder else ('fotografia existente; aprovação a confirmar' if existing and existing.exists() else 'referência ausente / placeholder técnico')
 if not source and not placeholder:status='dinâmico Instagram — preservar'
 target=eval(ratio.replace(':','/')) if re.fullmatch(r'\d+:\d+',ratio) else None
 candidates=[x for x in photos if x['id'].startswith(category)] if category else []
 if target:candidates.sort(key=lambda x:abs(math.log(x['aspect']/target)))
 suggested=[]
 for x in candidates[:4]:
  keep=min(x['aspect']/target,target/x['aspect']) if target else None
  suggested.append(x['id']+(f' (retém ≈{keep:.0%} da área)' if keep else ''))
 slots.append(dict(espaco=id,pagina=page,secao=component+' / '+label,quantidade=1,proporcao_recomendada=ratio,categoria_permitida=category or 'SEM CORRESPONDÊNCIA CONFIRMADA',desktop_mobile=mobile or 'mesma proporção; grade/largura responsivas',fit_position='não definido (placeholder)' if placeholder else 'cover; object-position padrão 50% 50%' if source else 'height:auto; proporção original',estado=status,arquivo_atual=source,fonte=str(p.relative_to(R)),css=str(css.relative_to(R)),sugestoes='; '.join(suggested) or 'lacuna — não preencher com outra categoria',escolha_desktop='',escolha_mobile='',ponto_focal='',aprovacao='pendente',notas=''))
for label,cat in [('working','BRU'),('portrait',''),('bridal','CAS'),('editorial',''),('artistic','ART'),('audiovisual','')]:add('Home','Hero',label,'16:9',cat,'100svh; desktop panorâmico variável com viewport; mobile sugerido 9:16, sem fonte separada hoje',placeholder=True)
add('Home','MeetBruno','retrato','4:5','BRU',placeholder=True)
for label,cat in [('weddings','CAS'),('campaigns',''),('social','SOC'),('photoshoots',''),('artistic','ART'),('audiovisual','')]:add('Home','ExploreTheWork',label,'4:5',cat,source=f'/assets/images/home/explore-work/{label}.jpg')
for label,ratio,cat in [('portrait','4:5','SOC'),('editorial','3:4',''),('detail','1:1','SOC'),('campaign','4:3',''),('artistic','4:5','ART')]:add('Home','SelectedWork',label,ratio,cat,placeholder=True)
for label,ratio in [('main','3:4'),('secondary','4:5')]:add('Home','WeddingsPreview',label,ratio,'CAS',placeholder=True)
for label,ratio in [('large','4:5'),('smallTop','1:1'),('smallBottom','4:5')]:add('Home','BehindTheBrush',label,ratio,'BRU','desktop: dimensões dependem da grade 12×12, min-height 720/600px; mobile <=640: '+ratio,placeholder=True)
add('Home','EducationPreview','aula','4:5','',placeholder=True)
for name in ['natalia','lorena','gabriela','maria','aline','lolys']:add('Home','KindWords',name,'1:1','','círculo 54px desktop / 48px mobile; identidade da cliente obrigatória',f'/assets/images/reviews/{name}.webp')
for n in range(6):add('Home','InstagramPreview',f'post {n+1}','original','','até 6 posts via API; height:auto; não faz parte da seleção de arquivos')
add('About','AboutHero','Bruno','3:4','BRU','desktop altura mínima 650px / 560px <=900; mobile <=640: 3:4, largura 82%', '/assets/images/about/bruno-about.jpeg')
add('About','AboutStory','journey','4:5','BRU','desktop seção min-height 900/720px, razão variável; mobile <=640: 4:5','/assets/images/about/bruno-portrait.jpeg')
add('About','AboutStory','approach','4:5','BRU',source='/assets/images/about/bruno-client.jpeg')
for n in [1,2]:add('About','AboutClosing',f'bastidor {n}','3:4','BRU',source=f'/assets/images/about/bruno-backstage-{n}.jpeg')
add('Services','ServicesHero','hero','3:4','SOC','desktop min-height 620/540px, razão variável; mobile <=640: 3:4','/assets/images/services/services-hero.webp')
for label,cat in [('weddings','CAS'),('beauty-social','SOC'),('campaigns',''),('photoshoots',''),('artistic','ART'),('audiovisual','')]:add('Services','ServicesOverview',label,'3:4' if cat=='CAS' else '4:5',cat,'desktop/mobile: casamento 3:4 (regra mais específica); demais 4:5; mobile <=700 muda largura',f'/assets/images/services/{label}.webp')
add('Services','ServicesExperience','bastidor','3:4','BRU','desktop min-height 720/580px, razão variável; mobile <=640: 3:4 largura 85%','/assets/images/services/services-experience.webp')
add('Weddings','WeddingsHero','hero','3:4','CAS','hero dividido: desktop altura viewport−90px; <=850 empilha e visual 70vh; <=640 65vh; não é panorâmico full-width','/assets/images/weddings/weddings-hero.webp')
add('Weddings','WeddingsIntro','intro','4:5','CAS',source='/assets/images/weddings/weddings-intro.webp')
for label,ratio in [('vision','4:5'),('trial','16:11'),('wedding-day','16:10'),('celebration','3:4')]:add('Weddings','WeddingsProcess',label,ratio,'CAS',source=f'/assets/images/weddings/{label}.webp')
for name in ['clare','marina']:add('Weddings','WeddingsReviews',name,'1:1','','58px círculo; identidade da cliente obrigatória',f'/assets/images/reviews/{name}.webp')
add('Education','EducationHero','hero','16:10','','mesma proporção mobile; max-width 520px, não é hero full-width','/assets/images/education/education-hero.webp')
for name in ['vip','night']:add('Education','EducationCourses',name,'3:4','',source=f'/assets/images/education/{name}.webp')
add('Education','EducationProfessional','main','16:10','','mobile <=640 muda para 4:5; requer duas escolhas/recorte aprovado','/assets/images/education/bridal-main.webp')
add('Education','EducationProfessional','detail','3:4','',source='/assets/images/education/bridal-detail.webp')
p=R/'frontend/src/components/sections/Portfolio/PortfolioGallery/PortfolioGallery.jsx'
for block in re.findall(r'\{\s*id: \d+,.*?\}',p.read_text(),re.S):
 get=lambda k: re.search(k+r': "([^"]+)"',block)[1]
 label=get('category');size=get('size');ratio={'large':'4:5','small':'4:5','medium':'4:5','portrait':'3:4','wide':'16:10'}[size]
 add('Portfolio','PortfolioGallery',re.search(r'id: (\d+)',block)[1]+' / '+label+' / '+size,ratio,{'beauty':'SOC','artistic':'ART'}.get(label,''),'mesma proporção; desktop grade, mobile <=640 coluna com larguras 58–100%; preservar proporções originais é decisão futura',get('image'))
# Identidade de depoimentos não pode ser inferida pelo lote.
for s in slots:
 if s['secao'].startswith(('KindWords','WeddingsReviews')):s['sugestoes']='preservar fotografia da pessoa identificada; não substituir por foto genérica'
 if s['secao'].startswith(('Education','EducationPreview')):s['sugestoes']='lacuna temática: confirmar fotos de ensino; BRU apenas se mostrar aula, nunca presumir'
(D/'espacos.json').write_text(json.dumps(slots,ensure_ascii=False,indent=2))
for name,rows in [('inventario',photos),('escolhas',slots)]:
 with (D/(name+'.csv')).open('w',newline='',encoding='utf-8-sig') as f:
  w=csv.DictWriter(f,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
md=['# Mapeamento BMV — 4 novembro 2026','', 'Escolhas pendentes: preencher escolhas.csv (colunas escolha_desktop, escolha_mobile, ponto_focal, aprovacao, notas). Usar IDs do inventário. Registrar autorização explícita antes de implementar. Nenhuma sugestão equivale a aprovação.','', '## Inventário', '']
for cat in dict.fromkeys(p['category'] for p in photos):
 pp=[p for p in photos if p['category']==cat];md.append(f'- `{cat}`: {len(pp)} arquivos; '+str(dict(collections.Counter(p['orientation'] for p in pp))))
md+=['','65 arquivos: 29 verticais, 36 horizontais, nenhum quadrado. 20 HEIC, 43 JPEG, 2 PNG. Nenhuma duplicata binária SHA-256. CAS-12 tem extensão .PNG mas conteúdo JPEG; o servidor de curadoria usa o MIME real. Inventário registra dimensões do arquivo e orientação EXIF separadamente; confirmar enquadramento pela renderização.','', 'Duplicatas visuais / variantes: não são excluídas por hashes diferentes; comparar manualmente sequências BRU-09–11, BRU-15–16, BRU-17–18 e CAS-13–17. São grupos candidatos por nomes/numeração, não duplicatas confirmadas.','', '## Suficiência e lacunas','', 'O lote cobre Artística (12), Bruno trabalhando (21), Casamentos (21) e Social and Beauty (11). Quantidade suficiente para uma seleção nessas quatro categorias, com reutilização entre páginas se aprovada. Não basta para preencher rigorosamente todas as categorias atuais: campanhas, photoshoots e audiovisual não foram fornecidas como categorias. Editorial também não está identificado. Não reclassificar por enquadramento. Ensino e retrato formal do Bruno precisam de confirmação visual/temática; bastidor não prova aula. Os oito avatares de depoimentos devem preservar a identidade das clientes. Instagram (até seis imagens dinâmicas) fica fora desta curadoria.','',f'{len(slots)} posições mapeadas: '+str(dict(collections.Counter(s['pagina'] for s in slots)))+'. Incluem seis posições dinâmicas Instagram e oito avatares, além de 24 posições atuais no Portfolio. São posições, não exigência de arquivos exclusivos; versões desktop/mobile podem demandar escolhas adicionais.','', '## Critérios técnicos','', 'Sugestões automáticas abaixo usam somente categoria e proximidade da proporção, não qualidade artística nem reconhecimento da composição. Percentual é área geométrica retida num recorte cover central; não mede preservação do rosto. Validar tema, espaço para texto e foco antes da escolha. Hero Home: priorizar horizontais desktop e verticais mobile; outras páginas têm heros divididos ou pequenos, descritos individualmente. Sem escolha alternativa mobile atualmente. Não aplicar panorâmico a todos os heros.','', 'Para nitidez, comparar pixels úteis após recorte com tamanho renderizado × DPR (ex.: 1920×1080 em DPR2 pede 3840×2160). Muitas imagens de 1206/1320/1366px exigem cuidado em hero desktop. HEIC precisa de tratamento posterior para distribuição ampla, sem conversão nesta etapa. Safari 17 adicionou suporte nativo: https://webkit.org/blog/14445/webkit-features-in-safari-17-0/ . Abra o catálogo no Safari do Mac para visualizar HEIC sem criar derivados.','', '## Espaços por página','', 'Todos os img mapeados usam cover e object-position padrão 50% 50%, exceto Instagram (height:auto). Placeholders não têm object-fit/position definidos. Não há backgrounds fotográficos ativos nessas páginas: o Hero Home usa painéis de cor. Arquivos em public/home/hero existem mas não são usados pelo Hero. Aprovação artística não é inferida da presença no código.','']
for s in slots:
 md += [f'### {s["espaco"]} — {s["pagina"]} / {s["secao"]}',f'- Quantidade: 1; recomendação: {s["proporcao_recomendada"]}; categoria: {s["categoria_permitida"]}.',f'- Atual: {s["estado"]}; `{s["arquivo_atual"] or "sem fonte estática"}`.',f'- Fit/posição: {s["fit_position"]}. {s["desktop_mobile"]}.',f'- Sugestões técnicas: {s["sugestoes"]}.',f'- Evidência: `{s["fonte"]}` e `{s["css"]}`.','']
md+=['## Seções sem posição fotográfica','', 'AboutRange e manifesto; ServicesCTA; WeddingsPartners e WeddingsCTA; EducationIntro e EducationCTA; PortfolioHero e PortfolioCTA; Home FinalCTA. São texto, cor e elementos gráficos, sem necessidade atual de foto. Não criar novos espaços nesta etapa.','', '## Próxima implementação após aprovação','', 'Registrar ID por espaço e dispositivo, enquadramento/ponto focal, autorização e texto alternativo contextual; confirmar categorias, repetição entre páginas e proporções originais do Portfolio. Decidir depois exportações web dos HEIC e nomes/extensões corretos. Preservar fotografias atuais até aprovação.']
(D/'MAPEAMENTO.md').write_text('\n'.join(md))
print(len(slots),collections.Counter(x['estado'] for x in slots));print(collections.Counter(p['format'] for p in photos),collections.Counter(p['orientation'] for p in photos))
