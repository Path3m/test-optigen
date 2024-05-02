import * as util from "./utilgen.js";
import * as pmx from "./Crossover/celaus_user_modified/pmx_modified.js";

export function optigen(score){
    let nbGen   = 200;
    let nbInd   = 20;
    let sizeInd = 10;

    let pr     = 0.5;
    let pm     = 0.3;
    let pselec = 0.3;

    let index = (array => { 
        for(let i=0; i<sizeInd; array.push(i++)); return array; 
    })([]);
    let population = util.randPop(nbInd, sizeInd);

    console.log("Initialisation :");
    util.matlog(population);

    population.sort((i1,i2) => -(score(i1) - score(i2)));

    for(let i=0; i<nbGen; i++){

        /* console.log("Generation ",i," population triée :");
        util.matlog(population); */

        let nbMeilleurs = Math.ceil(nbInd * pselec);
        console.log("n meilleurs : ",nbMeilleurs);

        let meilleurs = new Array(nbMeilleurs);
        for(let j=0; j<meilleurs.length; meilleurs[j] = population[j++]);

        let nbChildren = nbInd - nbMeilleurs;
        console.log("m enfants : ",nbChildren);

        let newGen = pmx.newGeneration(population, pr, nbChildren);

        /* console.log("Generation ",i," enfants :");
        util.matlog(newGen); */

        util.mutatePop(newGen, pm);
        /* console.log("Generation ",i," enfants mutés :");
        util.matlog(newGen); */

        newGen.push(...meilleurs);
        population = newGen.sort((i1,i2) => -(score(i1) - score(i2)));

        if(score(population[0]) === score(index)){
            console.log("\nMAXIMUM REACH AT GENERATION ",i,"\n");
            i = nbGen + 1;
        }
    }

    return population;
}