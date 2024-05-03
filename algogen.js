import * as util from "./utilgen.js";
import * as pmx from "./Crossover/celaus_user_modified/pmx_modified.js";

export function optigen(score){
    let nbGen   = 200;
    let nbInd   = 50;
    let sizeInd = 10;

    let pr     = 0.6;
    let pm     = 0.5;
    let pselec = 0.3;

    let index = (array => { 
        for(let i=0; i<sizeInd; array.push(i++)); return array; 
    })([]);
    let population = util.randPop(nbInd, sizeInd);

    console.log("Initialisation :");
    util.matlog(population);

    population.sort((i1,i2) => -(score(i1.p) - score(i2.p)));

    for(let i=0; i<nbGen; i++){

        console.log("Generation ",i," population triée :");
        util.matlog(population);

        let nbMeilleurs = Math.ceil(nbInd * pselec);
        console.log("n meilleurs : ",nbMeilleurs);

        let meilleurs = new Array(nbMeilleurs);
        for(let j=0; j<meilleurs.length; meilleurs[j] = population[j++]);

        let nbChildren = nbInd - nbMeilleurs;
        console.log("m enfants : ",nbChildren);

        let newGen = pmx.newGeneration(population, pr, nbChildren);

        console.log("Generation ",i," enfants :");
        util.matlog(newGen);

        util.mutatePop(newGen, pm);
        console.log("Generation ",i," enfants mutés :");
        util.matlog(newGen);

        newGen.push(...meilleurs);
        population = newGen.sort((i1,i2) => -(score(i1.p) - score(i2.p)));

        if(score(population[0].p) === score(index)){
            console.log("\nMAXIMUM REACH AT GENERATION ",i,"\n");
            i = nbGen + 1;
        }
    }

    console.log("\nDifférence finale : score max : ",score(index),"| score max pop : ",score(population[0].p),
        " | différence : ",score(index) - score(population[0].p)
    );

    return population;
}