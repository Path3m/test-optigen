import * as util from "./utilgen.js";
import * as pmx from "./Crossover/celaus_user_modified/pmx_modified.js";

export function optigen(score){
    let nbGen   = 200;
    let nbInd   = 50;
    let sizeInd = 10;

    let pr     = 0.6;
    let pm     = 0.5;
    let pselec = 0.3;

    let index = new util.Individual(
        new util.Permutation((array => {for(let i=0; i<sizeInd; array.push(i++)); return array; })
        ([])),
        util.score
    );
    let population = util.randPop(nbInd, sizeInd, util.score);

    console.log("Initialisation :");
    util.poplog(population);

    population.sort((i1,i2) => -(i1.score - i2.score));

    for(let i=0; i<nbGen; i++){

        console.log("Generation ",i," population triée :");
        util.poplog(population);

        let nbMeilleurs = Math.ceil(nbInd * pselec);
        console.log("n meilleurs : ",nbMeilleurs);

        let meilleurs = new Array(nbMeilleurs);
        for(let j=0; j<meilleurs.length; meilleurs[j] = population[j++]);

        let nbChildren = nbInd - nbMeilleurs;
        console.log("m enfants : ",nbChildren);

        let newGen = pmx.newGeneration(population, pr, nbChildren);

        console.log("Generation ",i," enfants :");
        util.poplog(newGen);

        util.mutatePop(newGen, pm);
        console.log("Generation ",i," enfants mutés :");
        util.poplog(newGen);

        newGen.push(...meilleurs);
        population = newGen.sort((i1,i2) => -(i1.score-i2.score));

        if(population[0].score === index.score){
            console.log("\nMAXIMUM REACH AT GENERATION ",i,"\n");
            i = nbGen + 1;
        }
    }

    console.log("\nDifférence finale : score max : ",index.score,"| score max pop : ",population[0].score,
        " | différence : ",index.score - population[0].score
    );

    return population;
}