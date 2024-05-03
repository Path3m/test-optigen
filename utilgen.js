export class Permutation{

    /**
     * Build a permutation from an array
     * @param {Array<any>} array 
     */
    constructor(array){
        this.p = array;
    }

    /**
     * 
     * @param {*} size 
     * @returns return an array of size with integer from 0 to size
     */
    static index(size){
        return (array => {for(let i=0; i<size; array.push(i++)); return array; })([]);
    }

    /**
    * Generate a random permutation of a given size
    * @param {*} size 
    * @returns 
    */
    static randPermutation(size){
        let index = Permutation.index(size);
        return new Permutation(Permutation.inplaceShuffle(index));
    }

    /**
    * Create a copy of an array and shuffles it
    * @param {*} array 
    * @returns the copy of the given array shuffled
    */
    static copyShuffle(array){
        let newarray = array.slice();
        return Array.from(newarray.sort((a,b) => 0.5 - Math.random()));
    }

    /**
    * Shuffles an array in place
    * @param {*} array 
    * @returns a reference to the given array now shuffled
    */
    static inplaceShuffle(array){
        return Array.from(array.sort((a,b) => 0.5 - Math.random()));
    }

    /**
     * Exchange the values between the two given indexes
     * @param {number} i 
     * @param {number} j
     * @return a reference to the current permutation
     */
    swap(i,j){
        let tmp   = this.p[i];
        this.p[i] = this.p[j];
        this.p[j] = tmp;
        return this;
    }

    /**
     * Randomly create two integer i and j so that i,j<n and i != j
     * @returns a random pair of integer in [0;n[ where n is the permutation size
     */
    static indexPair(n){
        let i = Math.floor(Math.random() * n);
        let j = ((i+1) + Math.floor(Math.random() * (n-2)))% n;

        return [i,j];
    }

    /**
     * Randomly choose two indicies in an array and swap the values
     * @return a reference to the current permutation
     */
    randomSimpleSwap(){
        let pair = Permutation.indexPair(this.p.length);
        return this.swap(pair[0], pair[1]);
    }

    /**
     * @return the string containing the information on the permutation
     */
    toString(){
        return this.p.toString();
    }
}

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
export class Individual{

    constructor(permutation, func){
        this.genome = permutation;
        this.score  = func(permutation);
    }

}

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
/**
 * Generate a population i.e an array of randomly generated permutation
 * @param {*} sizePop 
 * @param {*} sizeInd 
 * @returns 
 */
export function randPop(sizePop, sizeInd){
    let pop = new Array(sizePop)
    for(let i=0; i<pop.length; pop[i++] = Permutation.randPermutation(sizeInd));
    return pop;
}

/**
 * Log a matrix in the console
 * @param {*} array 
 */
export function matlog(array){
    array.forEach(current => console.log(current.p, " | ",score(current.p)));
}

//--------------------------------------------------------------------------
//SCORE COMPUTING
export function score(array) {
    let sum = 0;
    for(let i=0; i<array.length; sum += i*array[i++]);
    return sum;
};

//--------------------------------------------------------------------------
//MUTATION

/**
 * Execute a mutation over an individual that is a permutation
 * @param {*} permutation 
 */
export function mutation(permutation){
    let factor = Math.random();

    if (factor < 0.9) permutation.randomSimpleSwap();
    else permutation.randomSimpleSwap();
}

/**
 * 
 * @param {*} population 
 * @param {*} percentMut 
 */
export function mutatePop(population, percentMut){
    let numberToMutate = Math.floor(population.length * percentMut);

    let alreadyMutated = {};
    let index = Math.floor(Math.random() * population.length);

    for(let i=0; i<numberToMutate; i++){
        while(index in alreadyMutated) index = Math.floor(Math.random() * population.length);

        console.log("l'enfant ",index," est muté.");

        mutation(population[index]);
        alreadyMutated[index] = i;
    }
    console.log(alreadyMutated);
}