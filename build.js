const fs = require('fs');
const os = require('os');
const path = require('path');
const lunr = require('lunr');
const columns = require('../columns');

const OVERRIDE = new Map([
  ['tocpha', 'vitamin-e'],
  ['tocphd', 'vitamin-e'],
  ['toctra', 'vitamin-e'],
  ['toctrd', 'vitamin-e'],
  ['crypxb', 'carotenoid'],
  ['cartg', 'carotenoid'],
  ['carta', 'carotenoid'],
  ['cartb', 'carotenoid'],
]);




function readFile(pth) {
  var d = fs.readFileSync(pth, 'utf8');
  return d.replace(/\r?\n/g, '\n');
}

function writeFile(pth, d) {
  d = d.replace(/\r?\n/g, os.EOL);
  fs.writeFileSync(pth, d);
}


function matchIndex(idx, txt) {
  var a = [], txt = txt.replace(/\W/g, ' ');
  var ms = idx.search(txt), max = 0;
  for(var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for(var m of ms) {
    var keys = Object.keys(m.matchData.metadata).length;
    if(keys<max) continue;
    if(!m.ref.includes('+') && max<m.ref.split('-').length) continue;
    a.push(m);
  }
  return a;
}

function readAssets() {
  var a = new Map();
  for(var f of fs.readdirSync('assets')) {
    var pth = path.join('assets', f);
    var code = f.replace('.txt', '');
    var tags = code.replace(/\W+/g, ' ');
    var desc = readFile(pth).replace(/[\n\s]+$/, '');
    a.set(code, {code, tags, desc});
  }
  return a;
}

function indexAssets(map) {
  return lunr(function() {
    this.ref('code');
    this.field('tags');
    this.pipeline.remove(lunr.stopWordFilter);
    for(var r of map.values())
      this.add(r);
  });
}

function createTable(idx) {
  var z = new Map();
  for(var c of columns.load().values()) {
    var cname = c.name.replace(/\W+/g, ' ').toLowerCase();
    var tags = `${c.code} ${c.code} ${c.code} ${cname} ${cname} ${c.tags}`;
    var ms = matchIndex(idx, tags);
    // if (c.code==='cartb') console.log(tags, ms);
    if(ms.length===0) console.log('Skipped:', c.name, tags, ms);
    if(ms.length===0) continue;
    var code = OVERRIDE.get(c.code)||ms[0].ref, r = z.get(code);
    // console.log(`${c.code} -> ${code}`);
    z.set(c.code, code);
  }
  return z;
}

function writeCorpus(ast, tab) {
  var a = '';
  for (var [k, v] of ast)
    a += `const ${k.replace(/\W+/g, '_')} = ${JSON.stringify(v.desc)};\n`;
  a += `const CORPUS = new Map([\n`;
  for (var [k, v] of tab)
    a += `  ["${k}", ${v.replace(/\W+/g, '_')}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  writeFile('corpus.js', a);
}

var ast = readAssets();
var idx = indexAssets(ast);
var tab = createTable(idx);
writeCorpus(ast, tab);
