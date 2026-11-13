"""Importação incremental local. Não altera originais, escolhas ou registros anteriores."""
from pathlib import Path
import json, hashlib, subprocess, math, csv, collections, concurrent.futures, struct, tempfile
D=Path(__file__).resolve().parent
SOURCE=Path('/Users/lorenaferreira/Desktop/FREELANCE — WEB DEVELOPMENT/01 — CLIENTES ATIVOS/Bruno Menezes — BMV Makeup/03 — Assets')
def digest(p):
 h=hashlib.sha256()
 with p.open('rb') as f:
  for b in iter(lambda:f.read(1048576),b''): h.update(b)
 return h.hexdigest()
def props(p):
 r=subprocess.run(['sips','-g','pixelWidth','-g','pixelHeight','-g','format','-g','orientation',str(p)],capture_output=True,text=True,check=True)
 return dict(s.strip().split(': ',1) for s in r.stdout.splitlines()[1:] if ': ' in s)
def run():
 photos=json.loads((D/'inventario.json').read_text()); old=list(photos); known={p['sha256']:p['id'] for p in photos}
 report={'source':str(SOURCE),'files':[],'ignored':[],'problems':[]}; added=[]
 for f in sorted(SOURCE.rglob('*')):
  if not f.is_file():continue
  if f.suffix.lower() not in {'.jpg','.jpeg','.png','.heic','.heif','.webp','.tif','.tiff','.avif','.bmp'}:
   report['ignored'].append(str(f.relative_to(SOURCE)));continue
  h=digest(f); row={'source_relative':str(f.relative_to(SOURCE)),'source_folder':str(f.parent.relative_to(SOURCE)),'name':f.name,'sha256':h}
  if h in known: row.update(id=known[h],status='already_catalogued' if known[h] in {p['id'] for p in old} else 'exact_duplicate_new')
  else:
   try:
    m=props(f); w=int(m['pixelWidth']); ht=int(m['pixelHeight']); fmt=m['format']; assert w>0 and ht>0
    id='NOV-'+h[:16].upper()
    if any(p['id']==id for p in photos):raise ValueError('ID collision')
    o=m.get('orientation'); o=int(o) if o and o.isdigit() else None
    dw,dh=(ht,w) if o in (5,6,7,8) else (w,ht)
    p=dict(id=id,name=f.name,category='Novas fotos — a classificar',path=str(f),relative=str(f.relative_to(SOURCE)),width=w,height=ht,orientation='vertical' if dh>dw else 'horizontal' if dw>dh else 'quadrada',ratio=f'{dw//math.gcd(dw,dh)}:{dh//math.gcd(dw,dh)}',aspect=round(dw/dh,4),format=fmt,bytes=f.stat().st_size,sha256=h,exifOrientation=o,mime={'jpeg':'image/jpeg','png':'image/png','heic':'image/heic','webp':'image/webp'}.get(fmt,'image/'+fmt),compatibilidade='Prévia JPEG local; original preservado.',alerta_extensao='',duplicata_binaria='Ver importacao-assets.json')
    photos.append(p);added.append(id);known[h]=id;row.update(id=id,status='added')
   except Exception as e:row.update(status='problem',error=str(e));report['problems'].append(row)
  report['files'].append(row)
 (D/'previews').mkdir(exist_ok=True)
 # Derivados separados, também para os IDs antigos; nenhum registro antigo é reescrito.
 sources={p['id']:Path(p['path']) for p in photos}
 for r in report['files']:
  if 'id' in r and not sources[r['id']].exists():sources[r['id']]=SOURCE/r['source_relative']
 def preview(p):
  target=D/'previews'/(p['id']+'.jpg')
  if True:
   r=subprocess.run(['sips','-s','format','jpeg','-s','formatOptions','75','-Z','1200',str(sources[p['id']]),'--out',str(target)],capture_output=True,text=True)
   if r.returncode or not target.exists():return (p['id'],None,'preview: '+r.stderr)
  # dHash: indício por conteúdo, jamais exclusão automática.
  with tempfile.TemporaryDirectory() as td:
   b=Path(td)/'tiny.bmp'
   r=subprocess.run(['sips','-s','format','bmp','-z','8','9',str(target),'--out',str(b)],capture_output=True)
   if r.returncode:return(p['id'],None,'hash visual indisponível')
   data=b.read_bytes();offset=struct.unpack_from('<I',data,10)[0];w,h=struct.unpack_from('<ii',data,18);bits=struct.unpack_from('<H',data,28)[0];stride=((w*bits+31)//32)*4
   if bits not in (24,32):return(p['id'],None,'BMP sem suporte')
   rows=[]
   for y in range(abs(h)):
    vals=[]
    for x in range(w):
     pos=offset+y*stride+x*(bits//8);bb,g,r=data[pos:pos+3];vals.append(299*r+587*g+114*bb)
    rows.append(vals)
   if h>0:rows.reverse()
   value=0
   for row in rows:
    for a,b in zip(row,row[1:]):value=(value<<1)|int(a>b)
   return(p['id'],value,None)
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: result=list(pool.map(preview,photos))
 hashes={id:h for id,h,e in result if h is not None}
 for id,h,e in result:
  if e:report['problems'].append({'id':id,'error':e})
 pairs=[]
 for i,p in enumerate(photos):
  for q in photos[i+1:]:
   if p['id'] not in hashes or q['id'] not in hashes:continue
   distance=bin(hashes[p['id']]^hashes[q['id']]).count('1')
   if distance<=6:pairs.append({'ids':[p['id'],q['id']],'distance':distance,'status':'possível versão ou imagem semelhante; confirmar visualmente'})
 report['possible_versions']=pairs
 report['summary']={'images_found':len(report['files']),'already_catalogued_files':sum(r['status']=='already_catalogued' for r in report['files']),'already_catalogued_unique':len({r['id'] for r in report['files'] if r['status']=='already_catalogued'}),'added':len(added),'exact_duplicate_extra_files':len(report['files'])-len({r.get('sha256') for r in report['files']}),'possible_version_pairs':len(pairs),'total_catalogue':len(photos),'source_orientations':dict(collections.Counter(next(p['orientation'] for p in photos if p['id']==r['id']) for r in report['files'] if 'id'in r)),'catalogue_orientations':dict(collections.Counter(p['orientation'] for p in photos)),'formats':dict(collections.Counter(p['format'] for p in photos))}
 if added:
  (D/'inventario.json').write_text(json.dumps(photos,ensure_ascii=False,indent=2))
  with (D/'inventario.csv').open('w',newline='',encoding='utf-8-sig') as f:
   writer=csv.DictWriter(f,fieldnames=list(dict.fromkeys(k for p in photos for k in p)));writer.writeheader();writer.writerows(photos)
 (D/'importacao-assets.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 print(json.dumps(report['summary'],ensure_ascii=False,indent=2),flush=True)
if __name__=='__main__':run()
