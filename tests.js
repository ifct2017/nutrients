const assert = require('assert');
const nutrients = require('./');




function testAll() {
  var a = nutrients('his');
  var b = nutrients('Histidine');
  var c = 'Amino acid profile of each food is determined by three different analyses. Tryptophan is determined by alkaline hydrolysis, methionine and cystine by performic oxidation and the rest of the amino acids by acid hydrolysis. The amino acid profile of each food is expressed as g/100 g protein.';
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);

  var a = nutrients('what is soluble oxalate?');
  var b = nutrients('are organic acids useful?');
  var c = 'Organic acids is naturally present in a wide variety of foods especially fruits, berries and vegetables. Organic acids cis-aconitic acid, citric acid, fumaric acid, mallic acid, quinic acid, succinic acid and tartaric acid were determined in single liquid chromatographic run. Soluble, insoluble and total oxalates were determined separately by HPLC method. The organic acids are energy contributing components, although it varies between the different organic acids. According to the Codex Alimentarius Commission’s Guidelines for Nutrition Labeling, the energy conversion factor for organic acids is 13 kJ/g. However, organic acids have not been included in the total energy of foods given in the IFCT.';
  assert.deepStrictEqual(a, c);
  assert.deepStrictEqual(b, c);
}
testAll();
