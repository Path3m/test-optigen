import { OptigenBoxPlot } from "./BoxPlot.js";
import * as util from "./optigen/utilgen.js";

import { Permutation } from "./optigen/Permutation.js";
import { Optigen } from "./optigen/Optigen.js";

let obp = new OptigenBoxPlot('myDiv', Optigen.optigen(util.score)).draw();