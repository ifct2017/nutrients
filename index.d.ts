/**
 * Loads corpus to enable queries.
 * [📦](https://www.npmjs.com/package/@ifct2017/nutrients)
 * @returns corpus {code ⇒ desc}
 */
export function load(): Map<string, string>;


/**
 * Finds nutrient description of a column:code/name/tags query.
 * [📦](https://www.npmjs.com/package/@ifct2017/nutrients)
 * @param txt column:code/name/tags query
 * @returns desc if found, otherwise null
 * @example
 * ```javascript
 * nutrients('his');
 * nutrients('Histidine');
 * // Amino acid profile of each food is determined by three different analyses. Tryptophan is determined by alkaline hydrolysis, methionine and cystine by performic oxidation and the rest of the amino acids by acid hydrolysis. The amino acid profile of each food is expressed as g/100 g protein.
 *
 * nutrients('what is soluble oxalate?');
 * nutrients('are organic acids useful?');
 * // Organic acids is naturally present in a wide variety of foods especially fruits, berries and vegetables. Organic acids cis-aconitic acid, citric acid, fumaric acid, mallic acid, quinic acid, succinic acid and tartaric acid were determined in single liquid chromatographic run. Soluble, insoluble and total oxalates were determined separately by HPLC method. The organic acids are energy contributing components, although it varies between the different organic acids. According to the Codex Alimentarius Commission’s Guidelines for Nutrition Labeling, the energy conversion factor for organic acids is 13 kJ/g. However, organic acids have not been included in the total energy of foods given in the IFCT.
 * ```
 */
function nutrients(txt: string): string | null;
export = nutrients;
