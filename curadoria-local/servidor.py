"""Servidor local somente leitura; rotas restritas ao catálogo e seus derivados."""
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit
import json,mimetypes
D=Path(__file__).resolve().parent
photos={p['id']:p for p in json.loads((D/'inventario.json').read_text())}
report=json.loads((D/'importacao-assets.json').read_text()) if (D/'importacao-assets.json').exists() else {}
sources={r['id']:Path(report['source'])/r['source_relative'] for r in report.get('files',[]) if 'id' in r}
allowed={'/':'index.html','/inventario.json':'inventario.json','/espacos.json':'espacos.json','/MAPEAMENTO.md':'MAPEAMENTO.md','/escolhas.csv':'escolhas.csv','/inventario.csv':'inventario.csv','/importacao-assets.json':'importacao-assets.json'}
class Handler(BaseHTTPRequestHandler):
 def do_GET(self):
  route=urlsplit(self.path).path
  if route.startswith(('/foto/','/preview/')):
   kind,id=route.strip('/').split('/',1)
   if id not in photos:self.send_error(404);return
   p=photos[id];file=D/'previews'/(id+'.jpg') if kind=='preview' else Path(p['path'])
   mime='image/jpeg' if kind=='preview' else p.get('mime','image/'+p['format'])
   if not file.exists() and kind=='preview':file=Path(p['path']);mime=p.get('mime','image/'+p['format'])
   if not file.exists():file=sources.get(id,file)
  elif route in allowed:
   file=D/allowed[route];mime=mimetypes.guess_type(str(file))[0] or 'text/plain'
   if file.suffix in ('.html','.json','.md','.csv'):mime+='; charset=utf-8'
  else:self.send_error(404);return
  if not file.is_file():self.send_error(404);return
  self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Content-Length',str(file.stat().st_size));self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.end_headers()
  try:
   with file.open('rb') as f:
    while chunk:=f.read(1024*1024):self.wfile.write(chunk)
  except (BrokenPipeError,ConnectionResetError):pass
if __name__=='__main__':
 print('Catálogo: http://127.0.0.1:8765 — encerrar com Ctrl+C',flush=True)
 ThreadingHTTPServer(('127.0.0.1',8765),Handler).serve_forever()
