import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const product = fs.readFileSync(new URL('../service/web/compat-storage.js', import.meta.url), 'utf8');
const site = fs.readFileSync(new URL('../html/compat-storage.js', import.meta.url), 'utf8');
function storage(values) {
  const data = new Map(Object.entries(values));
  return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};
}

test('browser preferences migrate without overriding current values or retaining language state', () => {
  const localStorage = storage({'ifda-theme':'dusk','defile-theme':'light','ifda-sensitive-keywords':'["vendor-value"]','ifda-lang':'zh'});
  vm.runInNewContext(product,{localStorage});
  assert.equal(localStorage.getItem('defile-theme'),'light');
  assert.equal(localStorage.getItem('defile-sensitive-keywords'),'["vendor-value"]');
  assert.equal(localStorage.getItem('ifda-lang'),null);
});

test('logout cannot resurrect a previous token when migration runs again', () => {
  const localStorage = storage({'ifda-token':'previous-session'});
  vm.runInNewContext(product,{localStorage});
  assert.equal(localStorage.getItem('defile-token'),'previous-session');
  localStorage.removeItem('defile-token');
  vm.runInNewContext(product,{localStorage});
  assert.equal(localStorage.getItem('defile-token'),null);
});

test('blocked browser storage does not stop startup; both delivery surfaces use the same migration', () => {
  assert.equal(site,product);
  assert.doesNotThrow(()=>vm.runInNewContext(product,{localStorage:{getItem(){throw new Error('storage blocked')}}}));
});
