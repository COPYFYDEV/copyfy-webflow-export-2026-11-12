from pathlib import Path
import csv,json,shutil,collections,hashlib,re
R=Path(__file__).resolve().parents[1];C=R/'02-cms'
ids={'67dd3c04f88f95cc9ef2f390':'fr','68014b7f36ec4a9e0f06d59b':'en','68014b7f36ec4a9e0f06d59c':'es','6932a718bcb050f83738706e':'nl','69f100aeb7142f11ffc29da1':'de','6aae6b84337c1be41b776da4':'pt'}
files=sorted(Path('/Users/agent-local/Downloads').glob('Copyfy - *.csv'),key=lambda p:p.stat().st_mtime)
for f in files:
 rows=list(csv.DictReader(f.open()))
 if not rows:continue
 locale=ids.get(rows[0]['Locale ID'])
 if not locale:continue
 label=f.name.split(' - ')[1];dest=C/locale/(label+'.csv');dest.parent.mkdir(exist_ok=True,parents=True);shutil.copy2(f,dest)
# Remove only redundant copies generated inside this task's export folder.
for locale in ids.values():
 for f in (C/locale).glob('Copyfy - *.csv'):
  label=f.name.split(' - ')[1]
  if (C/locale/(label+'.csv')).exists():f.unlink()
manifest=[];schemas={};normalized=R/'02-cms/json';normalized.mkdir(exist_ok=True)
for locale in ids.values():
 for f in sorted((C/locale).glob('*.csv')):
  with f.open()as h:reader=csv.DictReader(h);rows=list(reader);fields=reader.fieldnames
  out=normalized/locale/(f.stem+'.json');out.parent.mkdir(exist_ok=True,parents=True);out.write_text(json.dumps(rows,ensure_ascii=False,indent=2))
  entry={'locale':locale,'collection':f.stem,'collection_id':rows[0]['Collection ID']if rows else None,'locale_id':rows[0]['Locale ID']if rows else None,'rows':len(rows),'drafts':sum(x.get('Draft','').lower()=='true'for x in rows),'archived':sum(x.get('Archived','').lower()=='true'for x in rows),'fields':fields,'csv':str(f.relative_to(R)),'json':str(out.relative_to(R)),'sha256':hashlib.sha256(f.read_bytes()).hexdigest()}
  manifest.append(entry)
for f in (C/'schemas').glob('*.txt'):
 text=f.read_text();fields=[];capture=False;last=None
 for line in text.splitlines():
  if '- region "Basic info"'in line or '- region "Custom fields"'in line:capture=True;continue
  if capture and not line.startswith('  '):capture=False
  if capture and line.startswith('  - generic: '):
   val=line[len('  - generic: '):]
   if val.startswith('(')and val.endswith(')')and last:fields.append({'name':last,'webflow_type':val[1:-1]});last=None
   elif val=='Required Field'and fields:fields[-1]['required']=True
   else:last=val
 schemas[f.stem]={'fields':fields,'collection_id':next((text.splitlines()[i+1].replace('- generic: ','')for i,l in enumerate(text.splitlines())if l=='- generic: Collection ID'),None),'raw_ui_schema':str(f.relative_to(R))}
(C/'cms-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2));(C/'schema-field-types.json').write_text(json.dumps(schemas,ensure_ascii=False,indent=2));(C/'locale-map.json').write_text(json.dumps({v:k for k,v in ids.items()},indent=2))
# Keep the browser download originals together, outside the top-level Downloads clutter.
raw=R/'07-evidence/browser-csv-downloads';raw.mkdir(exist_ok=True)
for f in files:
 if f.exists():shutil.move(str(f),str(raw/f.name))
print('CSV exports',len(manifest),'total localized rows',sum(x['rows']for x in manifest));print('Per locale',dict(collections.Counter({l:sum(x['rows']for x in manifest if x['locale']==l)for l in ids.values()})))
