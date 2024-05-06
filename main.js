import * as util from "./utilgen.js";
import { optigen } from "./algogen.js";

import { Permutation } from "./Permutation.js";
import { Individual } from "./Individuals.js";
import { Population } from "./Population.js";

console.clear();
console.log("on commence ici *************************************************\n");

let dimensions = {limit: 200, generation: 20, individual: 10};
let influences = {reproduction: 0.6, mutation: 0.4, selection: 0.4};

let popfin = optigen(util.score, dimensions, influences);
console.log("\nPopulation Finale :");
popfin.poplog();

console.log("on termine là ***************************************************");