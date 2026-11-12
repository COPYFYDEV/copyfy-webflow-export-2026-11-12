from pathlib import Path
from urllib.request import Request,urlopen
from urllib.parse import urlsplit,urljoin,unquote,quote
from concurrent.futures import ThreadPoolExecutor,as_completed
import json,re,hashlib,html
R=Path(__file__).resolve().parents[1];O=R/'03-published-site';A=O/'assets';E=O/'embedded-apps';E.mkdir(exist_ok=True)
previous=json.loads((O/'asset-manifest.json').read_text());seen={x['url']for x in previous if 'error'not in x};queue=set()
allurls=json.loads((R/'04-design-and-settings/all-code-urls.json').read_text())
allowed={'cdn.prod.website-files.com','bucket.copyfy.io','uploads-ssl.webflow.com','assets.website-files.com','fonts.gstatic.com','fonts.googleapis.com','ajax.googleapis.com','cdn.jsdelivr.net','cdnjs.cloudflare.com'}
for u in allurls:
 try:
  if urlsplit(u).netloc in allowed and not any(x in u for x in ['\\','{','[','%3C']):queue.add(html.unescape(u))
 except ValueError:pass
external=json.loads((O/'external-resource-urls.json').read_text())
queue.update(u for u in external if urlsplit(u).netloc=='copyfy-free-tools.vercel.app')
queue.update(['https://app.copyfy.io/analytics/copyfy-marketing-v2.v1.js','https://app.copyfy.io/api/analytics/tracking-v2/marketing/config.js','https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'])
queue.add('https://fonts.googleapis.com/css?family=Vollkorn:400,400italic,700,700italic%7CInter:100,200,300,400,500,600,700,800,900%7CInter+Tight:100,200,300,400,500,600,700,800,900&display=swap')
# CSS quoted URLs can contain escaped parentheses; parse them without truncation.
for x in previous:
 if 'error'in x or not('text/css'in x.get('content_type','') or x['url'].endswith('.css')):continue
 css=(R/x['path']).read_text(errors='replace')
 for match in re.finditer(r'url\(\s*(?:"((?:\\.|[^"\\])*)"|\'((?:\\.|[^\'\\])*)\'|([^)]*))\s*\)',css):
  u=next(v for v in match.groups()if v is not None);u=re.sub(r'\\(.)',r'\1',u);u=urljoin(x['url'],u)
  if u.startswith('https://'):queue.add(u)

def fetch(u):
 s=urlsplit(u);name=re.sub('[^A-Za-z0-9._-]','_',unquote(Path(s.path).name)or'index.html')[-180:]
 dest=A/s.netloc/(hashlib.sha256(u.encode()).hexdigest()[:12]+'-'+name)
 if s.netloc=='copyfy-free-tools.vercel.app':dest=E/s.path.strip('/')/'index.html'
 try:
  r=urlopen(Request(u,headers={'User-Agent':'agent-local'}),timeout=45);d=r.read();dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(d)
  return {'url':u,'path':str(dest.relative_to(R)),'bytes':len(d),'status':r.status,'content_type':r.headers.get('content-type','')}
 except Exception as e:return{'url':u,'error':str(e)}
results=[]
for rnd in range(4):
 todo=queue-seen
 if not todo:break
 seen|=todo
 with ThreadPoolExecutor(max_workers=8)as ex:
  for f in as_completed(ex.submit(fetch,u)for u in todo):
   x=f.result();results.append(x)
   if 'error'in x:continue
   if 'text/html'in x['content_type']and urlsplit(x['url']).netloc=='copyfy-free-tools.vercel.app':
    raw=(R/x['path']).read_text(errors='replace')
    for v in re.findall(r'(?:src|href)=["\']([^"\']+)["\']',raw):
     u=urljoin(x['url'],v)
     if urlsplit(u).netloc=='copyfy-free-tools.vercel.app'and re.search(r'\.(js|css|woff2?|ttf|png|svg)(?:\?|$)',u):queue.add(u)
   if 'text/css'in x['content_type']:
    for u in re.findall(r'url\(["\']?([^\)"\']+)',(R/x['path']).read_text(errors='replace')):
     u=urljoin(x['url'],u)
     if u.startswith('https://'):queue.add(u)
 print('round',rnd+1,'downloaded',len(todo),flush=True)
(O/'extra-asset-manifest.json').write_text(json.dumps(results,ensure_ascii=False,indent=2));print('EXTRA DONE',len(results),'failures',sum('error'in x for x in results))
