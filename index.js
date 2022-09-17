const columns = require('@ifct2017/columns');

var corpus = null;




function load() {
  if (corpus) return corpus;
  corpus = require('./corpus');
  columns.load();
  return corpus;
}


function nutrients(txt) {
  if (!corpus) load();
  var ms = columns(txt);
  if (ms.length===0) return null;
  return corpus.get(ms[0].code)||null;
}
nutrients.load = load;
module.exports = nutrients;
