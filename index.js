const columns = require('@ifct2017/columns');
const path = require('path');

var corpus = new Map();
var ready = false;


function loadCorpus() {
  for(var [k, v] of require('./corpus'))
    corpus.set(k, v);
};

function load() {
  if(ready) return true;
  columns.load(); loadCorpus();
  return ready = true;
};

function nutrients(txt) {
  if(!ready) return null;
  var mats = columns(txt);
  if(mats.length===0) return null;
  return corpus.get(mats[0].code)||null;
};
nutrients.load = load;
nutrients.corpus = corpus;
module.exports = nutrients;
