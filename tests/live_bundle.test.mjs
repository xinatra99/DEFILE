import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist/live');
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
test('static bundle has shared UI, recorded data, disclosures, licenses and no runtime artifacts',()=>{
  for(const name of ['index.html','workbench.js','interface.js','demo/live.js','demo/data-adapter.js','demo/data/data.json','demo/data/manifest.json','LICENSE','NOTICE','samples/fixtures/probe.c'])assert.ok(fs.existsSync(path.join(root,name)),name);
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.match(html,/DEFILE Live/);assert.match(html,/demo\/live.js/);assert.match(html,/Illustrative pseudocode/);
  assert.equal(fs.readFileSync(path.join(root,'workbench.js'),'utf8'),fs.readFileSync(new URL('../service/web/workbench.js',import.meta.url),'utf8'));
  for(const file of files(root)){
    assert.doesNotMatch(file,/[\\/](?:\.tools|\.validation|\.venv|\.git)[\\/]|users\.json$|ai\.key$|reports\.db$|\.elf$|\.exe$/);
    if(/\.(json|js|html|md|txt)$/.test(file)){const text=fs.readFileSync(file,'utf8');assert.doesNotMatch(text,/C:[\\/]Users[\\/]|\/mnt\/c\/Users\/|\/home\/[^/]+\/|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|Defile-[A-Za-z0-9_-]{16}/);}
  }
});
test('downloaded sample formats agree on real findings and carry sample provenance',()=>{
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'demo/data/manifest.json')));
  for(const sample of manifest.samples){const report=JSON.parse(fs.readFileSync(path.join(root,'demo/data/'+sample.id+'.json')));assert.equal(report.findings.length,sample.findings);assert.equal(report.demo_provenance.educational_fixture,true);const sbom=JSON.parse(fs.readFileSync(path.join(root,'demo/data/'+sample.id+'.sbom.json')));assert.equal(sbom.bomFormat,'CycloneDX');assert.ok(sbom.metadata.properties.some(p=>p.name==='defile:demonstration'));}
});
