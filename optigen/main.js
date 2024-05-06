import * as util from "./utilgen.js";
import { Optigen } from "./Optigen.js";

import { Permutation } from "./Permutation.js";
import { Individual } from "./Individuals.js";
import { Population } from "./Population.js";

console.clear();
console.log("on commence ici *************************************************\n");

let popfin = Optigen.optigen(util.score).last;
console.log("\nPopulation Finale :");
popfin.poplog();

console.log("on termine là ***************************************************");