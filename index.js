const columns = require('@ifct2017/columns');
const path = require('path');
const corpus = require('./corpus');

function nutrients(txt) {
  var mats = columns(txt);
  if(mats.length===0) return null;
  return corpus.get(mats[0].code)||null;
};
nutrients.corpus = corpus;
module.exports = nutrients;
