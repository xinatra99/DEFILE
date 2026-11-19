"""Record real engine results; sanitize and export public data. Run under Linux/WSL."""
from pathlib import Path
from collections import Counter
import dataclasses,datetime,hashlib,json,os,re,shutil,subprocess,sys,tarfile

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
os.environ['DEFILE_DISABLE_CVE_BIN_TOOL']='1'
from defile.pipeline import analyze
from defile.report.json_report import to_json_str
from defile.report.markdown_report import render_markdown
from defile.report.sbom import render_cyclonedx
from defile.report.piechart import render_dir_pie_chart

WORK=ROOT/'.tools/local-runtime/live-recording';WORK.mkdir(parents=True,exist_ok=True)
OUT=ROOT/'demo/data';OUT.mkdir(parents=True,exist_ok=True)
reports={};jobs=[];previews={};manifests=[]
def clean(value,source,public):
    if isinstance(value,str):
        value=value.replace(str(source),public).replace(str(WORK),'samples')
        value=re.sub(r'/usr/lib/gcc/[^\s"\']+','compiler-runtime',value)
        return value
    if isinstance(value,list):return [clean(x,source,public) for x in value]
    if isinstance(value,dict):return {k:clean(v,source,public) for k,v in value.items()}
    return value
def summary(report):
    fields=['target','tool_version','generated_at','kernel_version','arch_summary','endian_summary','file_count','firmware_size','cert_count','rsa_cert_count','dir_breakdown','dir_chart_renderer']
    s={k:report[k] for k in fields}
    s.update({k:len(report[k]) for k in ['binaries','scripts','findings','components']})
    s['by_severity']=dict(Counter(f['severity'] for f in report['findings']))
    s['by_vuln_class']=dict(Counter(f['vuln_class'] for f in report['findings']))
    s['cve_count']=len({c for f in report['findings'] for c in f['cve_ids']})
    s['service_count']=len(report['services'])
    s['open_port_count']=len({p for x in report['services'] for p in x.get('ports',[])})
    return s
def record(ident,label,revision,large=False):
    source=WORK/ident/'rootfs'
    for d in ['bin','etc/init.d','etc/config','usr/share']:(source/d).mkdir(parents=True,exist_ok=True)
    flags=['-DHARDENED','-fstack-protector-strong','-fPIE','-pie'] if revision==2 else ['-fno-stack-protector','-no-pie']
    binary=source/'bin/probe'
    subprocess.run(['gcc','-O0','-fno-builtin','-g0',*flags,str(ROOT/'demo/fixtures/probe.c'),'-o',str(binary)],check=True)
    (source/'etc/config/device.conf').write_text(f'# Educational fixture, no real device\ndevice_name=DEFILE Sample\ntelnet_enable={0 if revision==2 else 1}\n')
    (source/'etc/init.d/S10sample').write_text('#!/bin/sh\n# Sample only; recording does not execute this script.\necho "DEFILE sample startup"\n/bin/probe\n')
    (source/'etc/init.d/S10sample').chmod(0o755)
    (source/'usr/share/README.txt').write_text('Project-authored educational fixture. Version banners are synthetic test signals; no vendor firmware or third-party library is bundled.\n')
    if large:
        for i in range(100):shutil.copyfile(binary,source/f'bin/probe-{i:03}')
        for i in range(201):(source/f'usr/share/sample-{i:03}.txt').write_text(f'Public educational record {i:03}\n')
    progress=[]
    before={str(p.relative_to(source)):hashlib.sha256(p.read_bytes()).hexdigest() for p in source.rglob('*') if p.is_file()}
    report=analyze(str(source),progress=lambda event:progress.append(dict(event,time=datetime.datetime.now(datetime.timezone.utc).isoformat())))
    public='samples/'+ident
    raw=clean(json.loads(to_json_str(report)),source,public)
    raw['demo_provenance']={'recorded':True,'educational_fixture':True,'synthetic_version_banners':True,'notice':'Engine-generated heuristic results. No vendor firmware or OpenSSL library is bundled; version-banner CVE matches are demonstration signals, not vulnerability discoveries.'}
    # Public finding identifiers are re-keyed from sanitized content, not private paths.
    for f in raw['findings']:
        f['id']=hashlib.sha256(json.dumps([f['rule'],f['component'],f['title'],f['evidence']],sort_keys=True).encode()).hexdigest()[:16]
        f['triage']='new'
    after={str(p.relative_to(source)):hashlib.sha256(p.read_bytes()).hexdigest() for p in source.rglob('*') if p.is_file()}
    assert before==after
    report.target=public
    chart=OUT/f'{ident}.png'
    render_dir_pie_chart(report.dir_breakdown,str(chart))
    reports[ident]={'report':raw,'summary':summary(raw),'label':label,'origin':'Recorded DEFILE engine output from project-authored educational fixtures. Version banners are synthetic matching signals.'}
    for entry in raw['files']:
        rel=entry['path'].removeprefix(public+'/');p=source/rel
        if entry['kind'] not in ('binary','symlink'):
            previews[entry['path']]={'path':entry['path'],'content':p.read_text(errors='replace'),'truncated':False}
    now=raw['generated_at'];sev=raw['findings']
    log=[]
    for event in progress:log.append(clean(event,source,public))
    job=dict(id=ident,target=public,label={'sample-original':'Original appliance','sample-hardened':'Hardened appliance','sample-corpus':'Pagination corpus'}[ident],kind='analyze',status='completed',progress=100,stage='done',detail='Recorded sample analysis',findings=len(sev),binaries=len(raw['binaries']),high_crit=sum(f['severity'] in ('critical','high') for f in sev),created_at=now,finished_at=now,log=log,cache_hit=False)
    jobs.append(job)
    manifests.append(dict(id=ident,label=label,binaries=len(raw['binaries']),findings=len(sev),functions=sum(len(b['functions']) for b in raw['binaries']),files=raw['file_count'],input_hashes=before,report_sha256=hashlib.sha256(json.dumps(raw,sort_keys=True).encode()).hexdigest()))
    # Render genuine engine formats first, then sanitize paths in the text formats.
    (OUT/f'{ident}.json').write_text(json.dumps(raw,indent=2)+'\n')
    md=clean(render_markdown(report),source,public)
    # Renderer IDs are private-path-derived; use the public report identifiers consistently.
    original=json.loads(to_json_str(report))
    for old,new in zip(original['findings'],raw['findings']):md=md.replace(old['id'],new['id'])
    (OUT/f'{ident}.md').write_text('> Recorded educational sample. Heuristic findings are not proof of exploitability. Version banners are synthetic matching signals.\n\n'+md)
    sbom_text=clean(render_cyclonedx(report),source,public)
    for old,new in zip(original['findings'],raw['findings']):sbom_text=sbom_text.replace(old['id'],new['id'])
    sbom=json.loads(sbom_text)
    sbom.setdefault('metadata',{}).setdefault('properties',[]).append({'name':'defile:demonstration','value':raw['demo_provenance']['notice']})
    (OUT/f'{ident}.sbom.json').write_text(json.dumps(sbom,indent=2)+'\n')
    print(json.dumps({k:v for k,v in manifests[-1].items() if k not in ('input_hashes','report_sha256')}))
    return source,job

source,first=record('sample-original','Educational appliance · original',1)
record('sample-hardened','Educational appliance · hardened',2)
record('sample-corpus','Pagination corpus · 101 real ELF copies',1,True)
# An actual recorded timeline is a second presentation of a completed job, not a running simulation.
timeline=dict(first);timeline.update(id='sample-timeline',detail='Recorded timeline — no job is currently running',recorded_timeline=True)
timeline['label']='Recorded process log'
jobs.append(timeline)

archive=WORK/'educational-firmware.tar.gz'
with tarfile.open(archive,'w:gz') as t:t.add(source,arcname='rootfs')
from defile.ingest import identify_and_extract
regions=identify_and_extract(str(archive),str(WORK/'extraction'))
if dataclasses.is_dataclass(regions):regions=dataclasses.asdict(regions)
if not isinstance(regions,(dict,list)):regions=json.loads(json.dumps(regions,default=lambda x:dataclasses.asdict(x)))
# Normalize the engine extraction return shape without inventing regions.
entries=regions.get('regions',[]) if isinstance(regions,dict) else regions
entries=clean(entries,WORK,'samples')
for region in entries:region['demo_analysis_id']='sample-original'
jobs.append(dict(id='sample-extraction',target='samples/educational-firmware.tar.gz',kind='extract',status='completed',progress=100,regions=entries,created_at=first['created_at'],finished_at=first['finished_at'],log=[],findings=0,binaries=0,high_crit=0))

from defile.vuln.cve import load_db
from defile.vuln.cve_bin_tool import list_checkers
references=json.loads((ROOT/'demo/curated-cves.json').read_text())
data=dict(schema=1,engine_version=first.get('analyzer_version','2.8.0+defile.2'),jobs=jobs,reports=reports,previews=previews,vulndb={'curated':references['curated'],'source_references':references['sources'],'cve_bin_tool':{'available':True,'demo_preview':True,'checkers':list_checkers(),'checker_count':len(list_checkers()),'data_sources':['Bundled curated references'],'cve_counts':{},'cve_count_total':0}})
(OUT/'data.json').write_text(json.dumps(data,indent=2)+'\n')
(OUT/'manifest.json').write_text(json.dumps({'samples':manifests,'recorded_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'timeline':'Presentation of actual completed events, labelled Recorded in the static edition. No live work is simulated.','extraction_regions':len(entries),'redactions':['Private absolute path prefixes replaced with samples/...','Finding IDs re-keyed from sanitized content'],'distribution':'No compiled executables, private runtime, credentials or third-party libraries are included in Live.'},indent=2)+'\n')
