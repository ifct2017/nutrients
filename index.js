const lunr = require('lunr');
const path = require('path');
const corpus = require('./corpus');

function csv() {
  return path.join(__dirname, 'texts');
};

var index = lunr(function() {
  this.ref('code');
  this.field('tags');
  this.pipeline.remove(lunr.stopWordFilter);
  for(var r of corpus.values())
    this.add(r);
});

function nutrients(txt) {
  var txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) return corpus.get(mat.ref).desc;
  return null;
};
module.exports = nutrients;
