import { Permutation } from "./Permutation.js";
import { Individual } from "./Individuals.js";
import { Population } from "./Population.js";

export function optigen(score, dimensions, influenceFactors){
    let limit   = dimensions.limit;
    let sizeGen = dimensions.generation;
    let sizeInd = dimensions.individual;

    let reproduction = influenceFactors.reproduction;
    let mutation     = influenceFactors.mutation;
    let selection    = influenceFactors.selection;

    let index = new Individual(Permutation.index(sizeInd), score);
    let population = Population.randPop(sizeGen, sizeInd, score);

    console.log("Initialisation :");
    population.poplog();

    population.sortByScore();

    for(let i=0; i<limit; i++){

        console.log("Generation ",i," population triée :");
        population.poplog();

        //Selecting the best individuals
        let nbMeilleurs = Math.ceil(sizeGen * selection);
        console.log("n meilleurs : ",nbMeilleurs);
        let meilleurs = population.selectMeilleurs(nbMeilleurs);
        meilleurs.poplog();

        //Creating children by crossover
        let nbChildren = sizeGen - nbMeilleurs;
        console.log("m enfants : ",nbChildren);

        let newGen = population.newGeneration(reproduction, nbChildren);

        console.log("Generation ",i," enfants :");
        newGen.poplog();

        //Mutating children
        newGen.mutatePop(mutation);
        console.log("Generation ",i," enfants mutés :");
        newGen.poplog();

        //Finalize new generation
        population = (newGen.push(meilleurs)).sortByScore();

        if(population.members[0].score === index.score){
            console.log("\nMAXIMUM REACH AT GENERATION ",i,"\n");
            i = limit + 1;
        }
    }

    console.log("\nDifférence finale : score max : ",index.score,"| score max pop : ",population.members[0].score,
        " | différence : ",index.score - population.members[0].score
    );

    return population;
}