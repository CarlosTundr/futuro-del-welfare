import json,re,sys
SRC=sys.argv[1]; OUT=sys.argv[2]
lines=open(SRC,encoding='utf-8').read().split('\n')
hdr=[(i,l.strip()) for i,l in enumerate(lines) if re.match(r'^[A-Za-z].*\.tokens\.json$', l.strip())]
hdr.append((len(lines),'END'))
S={}
for k in range(len(hdr)-1):
    name=hdr[k][1]; body='\n'.join(lines[hdr[k][0]+1:hdr[k+1][0]])
    try: S[name]=json.loads(body)
    except: pass
sections=['Base.CROSS.tokens.json','Semantic.EMPLOYEE.tokens.json','Responsive.MOBILE.tokens.json','Component‑specific.CROSS.tokens.json']
merged={}
for sec in sections: merged.update(S[sec])
flat={}
def walk(d,p=''):
    for k,v in d.items():
        np=(p+'.'+k) if p else k
        if isinstance(v,dict) and '$value' in v: flat[np]=(v['$value'],v.get('$type'))
        elif isinstance(v,dict): walk(v,np)
walk(merged)
def slug(path):
    path=re.sub(r'(?<=[a-z0-9])(?=[A-Z])','-',path)  # split camelCase: FontSize->Font-Size
    return re.sub(r'-+','-',re.sub(r'[^a-z0-9]+','-',path.lower())).strip('-')
ref=re.compile(r'^\{(.+)\}$')
groups={'PRIMITIVI (Base)':[],'SEMANTICI (Employee)':[],'RESPONSIVE (Mobile)':[],'COMPONENTI':[]}
def group_of(path):
    top=path.split('.')[0]
    if top in ('Color','Scale'): return 'PRIMITIVI (Base)'
    if top in ('FontSize','LineHeight','Spacing','Border Radius','Border Width'): return 'RESPONSIVE (Mobile)'
    if top in ('Button','Badge','Link'): return 'COMPONENTI'
    return 'SEMANTICI (Employee)'
unresolved=[]
for path,(val,typ) in flat.items():
    name='--'+slug(path)
    out=None
    if isinstance(val,str) and ref.match(val.strip()):
        key=ref.match(val.strip()).group(1)
        if key in flat: out=f"var(--{slug(key)})"
        else: unresolved.append(path); continue
    else:
        if typ=='color': out=str(val)
        elif typ=='number':
            out=('0' if val in (0,'0') else f"{val}px")
        else: out=str(val)
    groups[group_of(path)].append(f"  {name}: {out};")
css=["/* tokens.css — Tundr DS · mode EMPLOYEE · MOBILE",
     "   Generato da tundr_ds_tokens_260628.json. NON editare a mano: rigenerare con scripts/gen-tokens.py.",
     "   Layer: primitivi (valori) <- semantici <- componenti (via var()). */",":root {"]
for g in ['PRIMITIVI (Base)','SEMANTICI (Employee)','RESPONSIVE (Mobile)','COMPONENTI']:
    css.append(f"\n  /* --- {g} --- */"); css+=groups[g]
css.append("}")
open(OUT,'w',encoding='utf-8').write('\n'.join(css)+'\n')
print("token:",sum(len(v) for v in groups.values()),"| non risolti:",len(unresolved))
