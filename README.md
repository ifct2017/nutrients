Detailed description of various [nutrients], and its components.

> This is part of package [ifct2017].<br>
> Online database: [ifct2017.github.io].

<br>

```javascript
const nutrients = require('@ifct2017/nutrients');
// nutrients(query)
// → nutrient description if found, null otherwise


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

```javascript
// Additional methods:
nutrients.load() // → corpus
```

<br>
<br>

[![](https://i.imgur.com/D5UYmbD.jpg)](http://ifct2017.com/)

> Data was obtained from the book [Indian Food Composition Tables 2017].<br>
> Food composition values were measured by [National Institute of Nutrition, Hyderabad].

[ifct2017]: https://www.npmjs.com/package/ifct2017
[Indian Food Composition Tables 2017]: http://ifct2017.com/
[nutrients]: https://github.com/ifct2017/nutrients/tree/master/assets
[ifct2017.github.io]: https://ifct2017.github.io
[National Institute of Nutrition, Hyderabad]: https://www.nin.res.in/
