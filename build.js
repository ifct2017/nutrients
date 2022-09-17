const path  = require('path');
const fs    = require('extra-fs');
const build = require('extra-build');
const lunr  = require('lunr');
const columns = require('@ifct2017/columns');

const owner = 'ifct2017';
const repo  = build.readMetadata('.').name.replace(/@.+\//g, '');
const OVERRIDE = new Map([
  ['tocpha', 'vitamin-e'],
  ['tocphd', 'vitamin-e'],
  ['toctra', 'vitamin-e'],
  ['toctrd', 'vitamin-e'],
  ['crypxb', 'carotenoid'],
  ['cartg',  'carotenoid'],
  ['carta',  'carotenoid'],
  ['cartb',  'carotenoid'],
]);




function matchIndex(index, txt) {
  var a  = [], txt = txt.replace(/\W/g, ' ');
  var ms = index.search(txt), max = 0;
  for (var m of ms)
    max = Math.max(max, Object.keys(m.matchData.metadata).length);
  for (var m of ms) {
    var keys = Object.keys(m.matchData.metadata).length;
    if (keys<max) continue;
    if (!m.ref.includes('+') && max<m.ref.split('-').length) continue;
    a.push(m);
  }
  return a;
}

function readAssets() {
  var a = new Map();
  for (var f of fs.readdirSync('assets')) {
    var pth  = path.join('assets', f);
    var code = f.replace('.txt', '');
    var tags = code.replace(/\W+/g, ' ');
    var desc = fs.readFileTextSync(pth).replace(/[\n\s]+$/, '');
    a.set(code, {code, tags, desc});
  }
  return a;
}

function indexAssets(map) {
  return lunr(function() {
    this.ref('code');
    this.field('tags');
    this.pipeline.remove(lunr.stopWordFilter);
    for (var r of map.values())
      this.add(r);
  });
}

function createTable(index) {
  var a = new Map();
  for (var c of columns.load().values()) {
    var cname = c.name.replace(/\W+/g, ' ').toLowerCase();
    var tags  = `${c.code} ${c.code} ${c.code} ${cname} ${cname} ${c.tags}`;
    var ms    = matchIndex(index, tags);
    // if (c.code==='cartb') console.log(tags, ms);
    if (ms.length===0) console.log('Skipped:', c.name, tags, ms);
    if (ms.length===0) continue;
    var code = OVERRIDE.get(c.code)||ms[0].ref, r = a.get(code);
    // console.log(`${c.code} -> ${code}`);
    a.set(c.code, code);
  }
  return a;
}

function writeCorpus(assets, table) {
  var a = '';
  for (var [k, v] of assets)
    a += `const ${k.replace(/\W+/g, '_')} = ${JSON.stringify(v.desc)};\n`;
  a += `const CORPUS = new Map([\n`;
  for (var [k, v] of table)
    a += `  ["${k}", ${v.replace(/\W+/g, '_')}],\n`;
  a += `]);\n`;
  a += `module.exports = CORPUS;\n`;
  fs.writeFileTextSync('corpus.js', a);
}

function generateCorpus() {
  var assets = readAssets();
  var index  = indexAssets(assets);
  var table  = createTable(index);
  writeCorpus(assets, table);
}




// Publish a root package to NPM, GitHub.
function publishRootPackage(ver) {
  var _package = build.readDocument('package.json');
  var m = build.readMetadata('.');
  m.version = ver;
  build.writeMetadata('.', m);
  build.publish('.');
  try { build.publishGithub('.', owner); }
  catch {}
  build.writeDocument(_package);
}


// Publish root, sub packages to NPM, GitHub.
function publishPackages() {
  var m   = build.readMetadata('.');
  var ver = build.nextUnpublishedVersion(m.name, m.version);
  generateCorpus();
  publishRootPackage(ver);
}


// Publish docs.
function publishDocs() {
  var m = build.readMetadata('.');
  build.updateGithubRepoDetails({owner, repo, topics: m.keywords});
}


// Finally.
function main(a) {
  if (a[2]==='publish-docs') publishDocs();
  else if (a[2]==='publish-packages') publishPackages();
  else generateCorpus();
}
main(process.argv);
