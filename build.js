const columns = require('@ifct2017/columns');
const path = require('path');
const fs = require('fs');
const os = require('os');

function readAssets() {
  var z = new Map();
  for(var f of fs.readdirSync('assets')) {
    var tags = '', nam = f.replace('.txt', ''), txt = nam.replace(/\-/g, ' ');
    var desc = fs.readFileSync(path.join('assets', f), 'utf8').replace(/\r\n?/g, '\n');
    for(var qry of txt.includes('+')? txt.split('+'):[txt]) {
      for(var c of columns(qry))
        tags += `${c.code} ${c.name.replace(/\W+/g, ' ')} ${c.tags} `;
    }
    z.set(nam, {code: nam, tags: tags.replace(/\W+/, ' ').trim().toLowerCase(), desc});
  }
  return z;
};

function writeCorpus(map) {
  var z = `const CORPUS = new Map([${os.EOL}`;
  for(var [k, v] of map)
    z += `  ["${k}", ${JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:')}],${os.EOL}`;
  z += `]);${os.EOL}`;
  z += `module.exports = CORPUS;${os.EOL}`;
  fs.writeFileSync('corpus.js', z);
};

var map = readAssets();
writeCorpus(map);
