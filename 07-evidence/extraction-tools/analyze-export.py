from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,urljoin
import re,json,hashlib,collections,csv
R=Path(__file__).resolve().parents[1];O=R/'04-design-and-settings';O.mkdir(exist_ok=True)
class P(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=False);self.scripts=[];self.styles=[];self.capture=None;self.links=[];self.forms=[];self.heading=[];self.text=[];self.body={}
 def handle_starttag(self,t,a):
  d=dict(a)
  if t in ['script','style']:
   self.capture={'attributes':d,'code':''};(self.scripts if t=='script' else self.styles).append(self.capture)
  if t=='link':self.links.append(d)
  if t=='form':self.forms.append(d)
  if t=='body':self.body=d
 def handle_endtag(self,t):
  if t in ['script','style']:self.capture=None
 def handle_data(self,t):
  if self.capture is not None:self.capture['code']+=t
hashes={};manifest=[];forms=[];all_urls=set()
paths=list((R/'01-native-export/supplied-source').rglob('*.html'))+list((R/'03-published-site/pages').rglob('index.html'))
for f in paths:
 p=P();raw=f.read_text(errors='replace');p.feed(raw)
 for kind,entries in [('scripts',p.scripts),('styles',p.styles)]:
  for i,x in enumerate(entries):
   code=x['code'];h=hashlib.sha256(code.encode()).hexdigest()
   key=(kind,h)
   if code.strip() and key not in hashes:
    ext='js' if kind=='scripts' else 'css'
    if x['attributes'].get('type') in ['application/ld+json','application/json']:ext='json'
    out=O/'custom-code'/kind/(h[:16]+'.'+ext);out.parent.mkdir(parents=True,exist_ok=True);out.write_text(code);hashes[key]=str(out.relative_to(R))
   manifest.append({'source':str(f.relative_to(R)),'kind':kind,'index':i,'attributes':x['attributes'],'code_file':hashes.get(key),'sha256':h if code.strip()else None})
 for form in p.forms:forms.append({'source':str(f.relative_to(R)),**form})
 for m in re.findall(r'https?://[^\s<>"\'`]+',raw):all_urls.add(m.rstrip(');,'))
(O/'custom-code-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
(O/'forms-inventory.json').write_text(json.dumps(forms,ensure_ascii=False,indent=2))
css='\n'.join(f.read_text() for f in (R/'01-native-export/supplied-source/css').glob('*.css'))
tokens=collections.defaultdict(set)
for k,v in re.findall(r'(--[\w-]+)\s*:\s*([^;}]+)',css):tokens[k].add(v.strip())
(O/'css-variables.json').write_text(json.dumps({k:sorted(v)for k,v in tokens.items()},indent=2))
(O/'responsive-media-queries.json').write_text(json.dumps(sorted(set(re.findall(r'@media\s*([^{}]+)',css))),indent=2))
(O/'font-faces.txt').write_text('\n\n'.join(re.findall(r'@font-face\s*\{[^}]+}',css)))
external=collections.Counter()
for u in all_urls:
 try:external[urlsplit(u).netloc]+=1
 except ValueError:pass
(O/'referenced-domains.json').write_text(json.dumps(external.most_common(),indent=2))
(O/'all-code-urls.json').write_text(json.dumps(sorted(all_urls),ensure_ascii=False,indent=2))
for locale in ['fr','en','es','nl','de','pt']:
 f=R/'03-published-site/pages'/(''if locale=='fr' else locale)/'index.html'
 if not f.exists():continue
 p=P();p.feed(f.read_text());folder=O/'homepage-code'/locale;folder.mkdir(parents=True,exist_ok=True)
 (folder/'scripts.json').write_text(json.dumps(p.scripts,ensure_ascii=False,indent=2));(folder/'styles.json').write_text(json.dumps(p.styles,ensure_ascii=False,indent=2));(folder/'head-links.json').write_text(json.dumps(p.links,ensure_ascii=False,indent=2))
print('Unique inline code files',len(hashes),'references',len(manifest),'forms',len(forms),'CSS variables',len(tokens));print('Domains',external.most_common(35))
