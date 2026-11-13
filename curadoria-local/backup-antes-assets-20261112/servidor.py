"""Servidor somente leitura; apenas catálogo e os originais inventariados."""
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit
import json
D=Path(__file__).resolve().parent
def inventario():
 return {p['id']:p for p in json.loads((D/'inventario.json').read_text())}
allowed={'/':'index.html','/inventario.json':'inventario.json','/espacos.json':'espacos.json','/MAPEAMENTO.md':'MAPEAMENTO.md','/escolhas.csv':'escolhas.csv','/inventario.csv':'inventario.csv'}
class Handler(BaseHTTPRequestHandler):
 def do_GET(self):
  route=urlsplit(self.path).path
  photos=inventario()
  if route.startswith('/foto/') and route[6:] in photos:
   p=photos[route[6:]]; file=Path(p['path']);mime={'jpeg':'image/jpeg','png':'image/png','heic':'image/heic'}[p['format']]
  elif route in allowed:
   file=D/allowed[route];mime={'html':'text/html; charset=utf-8','json':'application/json; charset=utf-8','md':'text/plain; charset=utf-8','csv':'text/csv; charset=utf-8'}[file.suffix[1:]]
  else:self.send_error(404);return
  self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Content-Length',str(file.stat().st_size));self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.end_headers()
  with file.open('rb') as f:
   while chunk:=f.read(1024*1024):self.wfile.write(chunk)
print('Catálogo: http://127.0.0.1:8765 — encerrar com Ctrl+C',flush=True)
ThreadingHTTPServer(('127.0.0.1',8765),Handler).serve_forever()
