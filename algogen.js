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
        (array => {for(let i=0; i<sizeInd; array.push(i++)); return array; })
        ([]),
        util.score
    );
    let population = util.Population.randPop(nbInd, sizeInd, util.score);

    console.log("Initialisation :");
    population.poplog();

    population.sortByScore();

    for(let i=0; i<nbGen; i++){

        console.log("Generation ",i," population triée :");
        population.poplog();

        let nbMeilleurs = Math.ceil(nbInd * pselec);
        console.log("n meilleurs : ",nbMeilleurs);

        let meilleursInd = new Array(nbMeilleurs);
        for(let j=0; j<meilleursInd.length; meilleursInd[j] = population.members[j++]);
        let meilleurs = new util.Population(meilleursInd, population.func);

        let nbChildren = nbInd - nbMeilleurs;
        console.log("m enfants : ",nbChildren);

        let newGen = population.newGeneration(pr, nbChildren);

        console.log("Generation ",i," enfants :");
        newGen.poplog();

        newGen.mutatePop(pm);
        console.log("Generation ",i," enfants mutés :");
        newGen.poplog();

        newGen.concat(meilleurs);
        population = newGen.sortByScore();

        if(population.members[0].score === index.score){
            console.log("\nMAXIMUM REACH AT GENERATION ",i,"\n");
            i = nbGen + 1;
        }
    }

    console.log("\nDifférence finale : score max : ",index.score,"| score max pop : ",population.members[0].score,
        " | différence : ",index.score - population.members[0].score
    );

    return population;
}