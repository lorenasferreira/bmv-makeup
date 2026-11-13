"""Importação incremental: preserva registros, decisões e originais; elimina SHA-256 repetidos."""
import collections,csv,hashlib,json,math,subprocess
from pathlib import Path
D=Path(__file__).resolve().parent
source=Path('/Users/lorenaferreira/Downloads/lorena-beauty')
photos=json.loads((D/'inventario.json').read_text())
known={p['sha256']:p['id'] for p in photos}
next_id=max([int(p['id'].split('-')[-1]) for p in photos if p['id'].startswith('LBS-')]+[0])+1
added=[];duplicates=[];files=[]
for file in sorted(source.rglob('*')):
 if not file.is_file() or file.name.startswith('.'):continue
 digest=hashlib.sha256(file.read_bytes()).hexdigest()
 files.append({'path':str(file),'sha256':digest})
 if digest in known:
  duplicates.append({'arquivo':str(file),'id_existente':known[digest]});continue
 raw=subprocess.run(['sips','-g','pixelWidth','-g','pixelHeight','-g','format',str(file)],check=True,capture_output=True,text=True).stdout
 props=dict(line.strip().split(': ',1) for line in raw.splitlines()[1:] if ': ' in line)
 w=int(props['pixelWidth']);h=int(props['pixelHeight']);fmt=props['format']
 if fmt not in ['jpeg','png','heic']:raise ValueError(f'Formato sem suporte no servidor: {file}: {fmt}')
 id=f'LBS-{next_id:02}';next_id+=1
 classifications={x['id']:x['category'] for x in json.loads((D/'classificacao-beauty-social.json').read_text())['fotografias']}
 if id not in classifications:raise ValueError(f'{id}: classifique visualmente como Beauty and Social antes de adicionar; inventário não alterado.')
 p=dict(id=id,name=file.name,category=classifications[id],path=str(file),relative=str(file.relative_to(source)),width=w,height=h,orientation='vertical' if h>w else 'horizontal' if w>h else 'quadrada',ratio=f'{w//math.gcd(w,h)}:{h//math.gcd(w,h)}',aspect=round(w/h,4),format=fmt,bytes=file.stat().st_size,sha256=digest,exifOrientation=None,mime={'jpeg':'image/jpeg','png':'image/png','heic':'image/heic'}[fmt],compatibilidade='HEIC: visualizar no Safari compatível; sem conversão nesta etapa.' if fmt=='heic' else 'Formato web convencional.',alerta_extensao='',duplicata_binaria='nenhuma no catálogo (SHA-256)')
 photos.append(p);added.append(p);known[digest]=id
if added:
 (D/'inventario.json').write_text(json.dumps(photos,ensure_ascii=False,indent=2))
 fields=list(dict.fromkeys(key for p in photos for key in p))
 with (D/'inventario.csv').open('w',newline='',encoding='utf-8-sig') as f:
  writer=csv.DictWriter(f,fieldnames=fields);writer.writeheader();writer.writerows(photos)
report=dict(categorias=['Beauty and Social'],adicionadas=[p['id'] for p in added],duplicatas=duplicates,arquivos_verificados=files)
# Reexecução sem novos arquivos não sobrescreve relatório da inclusão inicial.
if added or not (D/'importacao-lorena.json').exists():(D/'importacao-lorena.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'adicionadas':len(added),'total':len(photos),'ids':[p['id'] for p in added],'orientacao':dict(collections.Counter(p['orientation'] for p in added)),'formatos':dict(collections.Counter(p['format'] for p in added)),'duplicatas':duplicates},ensure_ascii=False,indent=2))
