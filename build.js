const columns = require('@ifct2017/columns');
const lunr = require('lunr');
const path = require('path');
const fs = require('fs');
const os = require('os');

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

function matchIndex(idx, txt) {
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = idx.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats) {
    var keys = Object.keys(mat.matchData.metadata).length;
    if(keys<max) continue;
    if(!mat.ref.includes('+') && max<mat.ref.split('-').length) continue;
    z.push(mat);
  }
  return z;
};

function readAssets() {
  var z = new Map();
  for(var f of fs.readdirSync('assets')) {
    var code = f.replace('.txt', ''), tags = code.replace(/\W+/g, ' ');
    var desc = fs.readFileSync(path.join('assets', f), 'utf8').replace(/\r\n?/g, '\n');
    z.set(code, {code, tags, desc});
  }
  return z;
};

function indexAssets(map) {
  return lunr(function() {
    this.ref('code');
    this.field('tags');
    this.pipeline.remove(lunr.stopWordFilter);
    for(var r of map.values())
      this.add(r);
  });
};

function createTable(idx) {
  var z = new Map();
  for(var c of columns.corpus.values()) {
    var tags = `${c.code} ${c.name.replace(/\W+/g, ' ').toLowerCase()} ${c.tags}`;
    var mats = matchIndex(idx, tags);
    // if(mats.length===0) console.log(c.name, tags, mats);
    if(mats.length===0) continue;
    var code = OVERRIDE.get(c.code)||mats[0].ref, r = z.get(code);
    // console.log(`${c.code} -> ${code}`);
    z.set(c.code, code);
  }
  return z;
};

function writeCorpus(ast, tab) {
  var z = '';
  for(var [k, v] of ast)
    z += `const ${k.replace(/\W+/g, '_')} = ${JSON.stringify(v.desc)};${os.EOL}`;
  z += `const CORPUS = new Map([${os.EOL}`;
  for(var [k, v] of tab)
    z += `  ["${k}", ${v.replace(/\W+/g, '_')}],${os.EOL}`;
  z += `]);${os.EOL}`;
  z += `module.exports = CORPUS;${os.EOL}`;
  fs.writeFileSync('corpus.js', z);
};

columns.load();
var ast = readAssets();
var idx = indexAssets(ast);
var tab = createTable(idx);
writeCorpus(ast, tab);
