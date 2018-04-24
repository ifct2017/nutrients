# @ifct2017/nutrients

[![IFCT2017](http://ninindia.org/images/ifct_2017.png)](http://ninindia.org/ifct_2017.htm)

Information of nutrients in [Indian Food Composition Tables 2017].<br>
Check available [nutrient descriptions].

```javascript
const nutrients = require('@ifct2017/nutrients');
// nutrients(<query>)
// -> "description" if found, null otherwise
// nutrients.corpus: Map {code => {code, tags, desc}}
// nutrients.csv(): path to csv file

nutrients('his');
nutrients('Histidine');
// Amino acid profile of each food is determined by three different analyses.
// Tryptophan is determined by alkaline hydrolysis, methionine and cystine by
// performic oxidation and the rest of the amino acids by acid hydrolysis. The
// amino acid profile of each food is expressed as g/100 g protein.

nutrients('what is soluble oxalate?');
nutrients('are organic acids useful?');
// Organic acids is naturally present in a wide variety of foods especially fruits,
// berries and vegetables. Organic acids cis-aconitic acid, citric acid, fumaric
// acid, mallic acid, quinic acid, succinic acid and tartaric acid were determined
// in single liquid chromatographic run. Soluble, insoluble and total oxalates were
// determined separately by HPLC method. The organic acids are energy contributing
// components, although it varies between the different organic acids. According to
// the Codex Alimentarius Commission’s Guidelines for Nutrition Labeling, the energy
// conversion factor for organic acids is 13 kJ/g. However, organic acids have not
// been included in the total energy of foods given in the IFCT.
```


[Indian Food Composition Tables 2017]: http://ifct2017.com/
[nutrient descriptions]: https://github.com/ifct2017/nutrients/tree/master/assets
