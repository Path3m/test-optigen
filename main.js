import * as pmx from "./Crossover/celaus_user_modified/pmx_modified.js";
import * as util from "./utilgen.js";
import { optigen } from "./algogen.js";

console.log("on commence ici *************************************************\n");

const index = [0,1,2,3];
const father = util.shuffle(index), mother = util.shuffle(index);
console.log(
    " Index  = ",index,"\n",
    "Father = ",father,"\n",
    "Mother = ",mother,"\n",
);

var children = pmx.crossover(father, mother);
/* console.log(
    "\n Index        = ",index,"\n",
    "First Child  = ",children[0],"\n",
    "Second Child = ",children[1],"\n",
); */

let popfin = optigen(util.score);
console.log("\nPopulation Finale :");
util.matlog(popfin);

console.log("on termine là ***************************************************");