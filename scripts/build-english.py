# -*- coding: utf-8 -*-
"""Regenerate the English static page and interactions from the Ukrainian source."""
import json,re
from pathlib import Path
from html import escape,unescape
root=Path(__file__).resolve().parent.parent
translations=json.loads((root/'scripts/en-translations.json').read_text())
missing=set()
def translate(s):
 key=unescape(s.strip())
 if not re.search('[А-Яа-яІіЇїЄє]',key):return s
 if key not in translations:
  missing.add(key);return s
 return s[:len(s)-len(s.lstrip())]+escape(translations[key],quote=False)+s[len(s.rstrip()):]
s=(root/'dist/index.html').read_text()
s=re.sub(r'>([^<>]+)<',lambda m:'>'+translate(m[1])+'<',s)
def attr(m):
 value=unescape(m[2]);result=translations.get(value,value)
 if re.search('[А-Яа-яІіЇїЄє]',result):missing.add(value)
 return m[1]+'="'+escape(result,quote=True)+'"'
s=re.sub(r'(content|aria-label|aria-roledescription|alt|placeholder|data-service)="([^"]*)"',attr,s)
s=s.replace('<html lang="uk">','<html lang="en">').replace('src="app.js"','src="en-app.js"').replace('class="brand" href="./"','class="brand" href="en.html"')
s=s.replace('href="index.html" lang="uk" hreflang="uk" aria-current="page"','href="index.html" lang="uk" hreflang="uk"').replace('href="en.html" lang="en" hreflang="en"','href="en.html" lang="en" hreflang="en" aria-current="page"')
(root/'dist/en.html').write_text(s)
j=(root/'dist/app.js').read_text()
def js_string(m):
 val=m[1]
 if val in translations:return json.dumps(translations[val],ensure_ascii=False)
 return m[0]
j=re.sub(r"'([^'\\]*(?:\\.[^'\\]*)*)'",js_string,j)
j=j.replace('Вітаю, Cutline! Хочу розрахувати вартість обклеювання.\\nАвто:', 'Hi Cutline! I would like a quote for a vinyl wrap.\\nCar:').replace('\\nОбсяг:', '\\nScope:').replace('\\nКолір / фактура:', '\\nColour / finish:').replace('% до,','% before,').replace('% після','% after')
(root/'dist/en-app.js').write_text(j)
if missing:raise SystemExit('Missing translations: '+repr(sorted(missing)))
if re.search('[А-Яа-яІіЇїЄє]',j):raise SystemExit('Untranslated JavaScript remains')
print('English page and interactions generated; translation coverage complete.')
