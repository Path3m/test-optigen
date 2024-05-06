import { Individual } from "./Individuals.js";
import { Permutation } from "./Permutation.js";

export class Population{
    constructor(members, func){
        this.members = members;
        this.length  = members.length;
        this.func    = func;
    }

    /**
     * Generate a population i.e an array of randomly generated individuals
     * @param {*} sizePop 
     * @param {*} sizeInd 
     * @returns 
     */
    static randPop(sizePop, sizeInd, func){
        let pop = new Array(sizePop)
        for(let i=0; i<pop.length; pop[i++] = new Individual(Permutation.rand(sizeInd), func));
        return new Population(pop, func);
    }

    /**
     * Log a population in the console
     */
    poplog(){
        this.members.forEach(current => console.log(current.genome, " | ",current.score));
    }

    /**
     * 
     * @param {*} population 
     * @param {*} percentMut 
     */
    mutatePop(percentMut){
        let numberToMutate = Math.floor(this.length * percentMut);

        let alreadyMutated = {};
        let index = Math.floor(Math.random() * this.length);

        for(let i=0; i<numberToMutate; i++){
            while(index in alreadyMutated) index = Math.floor(Math.random() * this.length);

            console.log("l'enfant ",index," est muté.");

            this.members[index].mutation();
            alreadyMutated[index] = i;
        }
        console.log(alreadyMutated);
    }

    //----------------------------------------------------------------------
    /**
     * Perfom PMXCrossover on a population of several individuals
     * @param {*} pop 
     */
    newGeneration(crossPercent, sizeNewGen) { //TODO : chose a better name
    
        let nbParents = Math.floor(this.length * crossPercent);
        let newMembers = new Array(sizeNewGen);
    
        for (let i = 0; i < newMembers.length; i++) {
          let pair = Permutation.indexPair(nbParents);
        
          let parent1  = this.members[pair[0]];
          let parent2  = this.members[pair[1]];
          let children = parent1.crossover(parent2);
          newMembers[i]   = children[0];
          if(i < newMembers.length-1) newMembers[++i] = children[1]; //TODO : find a better solution
        }
    
        return new Population(newMembers, this.func);
    }

    /**
     * Take a population and add it's member to the current one only if
     * the scoring function are the same.
     * @param {Population} population
     * @return a reference to the current poopulation
     */
    concat(population){
        if(this.func.toString() != population.func.toString()) throw new Error("Can't add two different population.");
        this.members.push(...population.members);
        this.length += population.length;
        return this;
    }

    /**
     * Sort the population according to the given method
     * @param {*} method 
     * @returns a reference to this population
     */
    sort(method){
        this.members.sort((ind1, ind2) => method(ind1, ind2));
        return this;
    }

    /**
     * Sort a population according to the scor eof the individuals
     * (highest first)
     * @returns a reference to this population
     */
    sortByScore(){
        this.members.sort((i1,i2) => -(i1.score - i2.score));
        return this;
    }

}