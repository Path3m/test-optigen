import * as util from "./utilgen.js";
import { optigen, dimensions, influences } from "./algogen.js";

import { Permutation } from "./Permutation.js";
import { Individual } from "./Individuals.js";
import { Population } from "./Population.js";

console.clear();
console.log("on commence ici *************************************************\n");

let popfin = optigen(util.score, dimensions, influences).bestPopulation;
console.log("\nPopulation Finale :");
popfin.poplog();

console.log("on termine là ***************************************************");