from pathlib import Path
from urllib.request import Request,urlopen
from urllib.parse import urlsplit,urljoin,urldefrag,unquote
from concurrent.futures import ThreadPoolExecutor,as_completed
from html.parser import HTMLParser
import json, re, time, hashlib, xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'03-published-site'; PAGES=OUT/'pages'; ASSETS=OUT/'assets'
PAGES.mkdir(exist_ok=True); ASSETS.mkdir(exist_ok=True)
class Parse(HTMLParser):
 def __init__(self): super().__init__();self.assets=set();self.links=[];self.meta=[];self.scripts=[];self.styles=[];self.title='';self.capture=None
 def handle_starttag(self,t,a):
  d=dict(a)
  if t in ['script','img','source','video','audio','iframe']:
   for key in ['src','poster']:
    if d.get(key):self.assets.add(d[key])
   if d.get('srcset'):
    for x in d['srcset'].split(','):self.assets.add(x.strip().split(' ')[0])
  if t=='link' and d.get('href'):
   if any(x in d.get('rel','') for x in ['stylesheet','icon','preload']):self.assets.add(d['href'])
   self.links.append(d)
  if t=='a' and d.get('href'):self.links.append({'href':d['href'],'kind':'anchor'})
  if t=='meta':self.meta.append(d)
  if t in ['script','style','title']: self.capture=t
 def handle_endtag(self,t):
  if self.capture==t:self.capture=None
 def handle_data(self,s):
  if self.capture=='script':self.scripts.append(s)
  if self.capture=='style':self.styles.append(s)
  if self.capture=='title':self.title+=s

def fetch(url,dest):
 for attempt in range(3):
  try:
   r=urlopen(Request(url,headers={'User-Agent':'agent-local'}),timeout=45)
   data=r.read();dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
   return {'url':url,'path':str(dest.relative_to(ROOT)),'status':r.status,'bytes':len(data),'content_type':r.headers.get('Content-Type',''),'final_url':r.url}
  except Exception as e:
   err=f'{type(e).__name__}: {e}'
   if attempt<2:time.sleep(1+attempt)
 return {'url':url,'error':err}
urls=list(dict.fromkeys(n.text.replace('https://www.copyfy.io','https://copyfy.io') for n in ET.parse(OUT/'sitemap.xml').findall('.//{*}loc')))
for loc in ['','en','es','nl','de','pt']:
 u='https://copyfy.io/'+loc
 if u not in urls:urls.append(u)
(OUT/'url-inventory.json').write_text(json.dumps(urls,indent=2))
results=[]; asset_urls=set(); external=set()
def page_job(url):
 path=urlsplit(url).path.strip('/')
 return fetch(url,PAGES/path/'index.html')
with ThreadPoolExecutor(max_workers=8) as ex:
 for i,f in enumerate(as_completed(ex.submit(page_job,u) for u in urls),1):
  r=f.result();results.append(r)
  if 'error' not in r:
   raw=(ROOT/r['path']).read_text(errors='replace');p=Parse();p.feed(raw)
   for a in p.assets:
    u=urldefrag(urljoin(r['url'],a))[0]
    if urlsplit(u).scheme not in ['http','https']:continue
    host=urlsplit(u).netloc
    if host in ['cdn.prod.website-files.com','assets-global.website-files.com','assets.website-files.com','uploads-ssl.webflow.com','d3e54v103j8qbb.cloudfront.net','fonts.googleapis.com','fonts.gstatic.com','cdnjs.cloudflare.com','cdn.jsdelivr.net','code.jquery.com','cdn.copyfy.io','copyfy.io','www.copyfy.io']:
     asset_urls.add(u)
    else:external.add(u)
   r['title']=p.title;r['meta']=p.meta;r['link_tags']=[x for x in p.links if x.get('kind')!='anchor'];r['inline_scripts']=len(p.scripts)
  if i%100==0:print('Pages',i,'/',len(urls),flush=True)
(OUT/'page-manifest.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
(OUT/'external-resource-urls.json').write_text(json.dumps(sorted(external),indent=2))
(OUT/'asset-urls.json').write_text(json.dumps(sorted(asset_urls),indent=2))
asset_results=[];seen=set()
def asset_job(url):
 s=urlsplit(url);name=unquote(Path(s.path).name) or 'resource'
 name=re.sub('[^A-Za-z0-9._-]','_',name)[-180:]
 dest=ASSETS/s.netloc/(hashlib.sha256(url.encode()).hexdigest()[:12]+'-'+name)
 return fetch(url,dest)
for roundno in range(4):
 pending=asset_urls-seen
 if not pending:break
 seen|=pending
 with ThreadPoolExecutor(max_workers=8) as ex:
  for i,f in enumerate(as_completed(ex.submit(asset_job,u) for u in pending),1):
   r=f.result();asset_results.append(r)
   if 'error' not in r and ('text/css' in r['content_type'] or urlsplit(r['url']).path.endswith('.css')):
    css=(ROOT/r['path']).read_text(errors='replace')
    for m in re.findall(r'url\([\s\'"]*([^\)\'"\s]+)',css):
     u=urljoin(r['url'],m)
     if urlsplit(u).scheme in ['https','http']:asset_urls.add(u)
   if i%100==0:print('Assets round',roundno+1,i,'/',len(pending),flush=True)
(OUT/'asset-manifest.json').write_text(json.dumps(asset_results,ensure_ascii=False,indent=2))
print('DONE',len(results),'pages;',sum('error' in x for x in results),'page failures;',len(asset_results),'assets;',sum('error' in x for x in asset_results),'asset failures',flush=True)
