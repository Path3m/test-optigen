import * as pmx from "./Crossover/celaus_user_modified/pmx_modified.js";
import * as util from "./utilgen.js";
import { optigen } from "./algogen.js";

console.log("on commence ici *************************************************\n");

let popfin = optigen(util.score);
console.log("\nPopulation Finale :");
util.poplog(popfin);

console.log("on termine là ***************************************************");