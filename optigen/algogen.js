import { Permutation } from "./Permutation.js";
import { Individual } from "./Individuals.js";
import { Population } from "./Population.js";

export const dimensions = {limit: 20, generation: 100, individual: 10};
export const influences = {reproduction: 0.6, mutation: 0.4, selection: 0.4};

export function optigen(score, dimensions, influenceFactors){
    let limit   = dimensions.limit;
    let sizeGen = dimensions.generation;
    let sizeInd = dimensions.individual;

    let reproduction = influenceFactors.reproduction;
    let mutation     = influenceFactors.mutation;
    let selection    = influenceFactors.selection;

    let population = Population.randPop(sizeGen, sizeInd, score).sortByScore();
    let statGenerations = new Array();
    statGenerations.push(population.score());

    console.log("Initialisation :");
    population.poplog();
    
    for(let i=0; i<limit; i++){
        //Selecting the best individuals
        let nbMeilleurs = Math.ceil(sizeGen * selection);
        let meilleurs = population.selectMeilleurs(nbMeilleurs);

        //Creating children by crossover
        let nbChildren = sizeGen - nbMeilleurs;
        let newGen = population.newGeneration(reproduction, nbChildren);

        //Mutating children
        newGen.mutatePop(mutation);

        //Finalize new generation
        population = (newGen.push(meilleurs)).sortByScore();
        statGenerations.push(population.score());
    }

    return {bestPopulation: population, statistic: statGenerations};
}