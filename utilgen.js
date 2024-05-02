/**
 * Create a copy of an array and shuffles it
 * @param {*} array 
 * @returns 
 */
export function shuffle(array){
    let newarray = array.slice();
    return Array.from(newarray.sort((a,b) => 0.5 - Math.random()));
}

/**
 * Randomly create to integer i and j so that i,j<n and i != j
 * @param {*} n 
 * @returns a random pair of integer in [0;n[
 */
export function randomPair(n){
    let i = Math.floor(Math.random() * n);
    let j = ((i+1) + Math.floor(Math.random() * (n-2)))% n;

    return [i,j];
}

/**
 * Generate a random permutation of a given size
 * @param {*} size 
 * @returns 
 */
export function randPermutation(size){
    let index = [];
    for(let i=0; i<size; index.push(i++));
    return shuffle(index);
}

/**
 * Generate a population i.e an array of randomly generated permutation
 * @param {*} sizePop 
 * @param {*} sizeInd 
 * @returns 
 */
export function randPop(sizePop, sizeInd){
    let pop = new Array(sizePop)
    for(let i=0; i<pop.length; pop[i++] = randPermutation(sizeInd));
    return pop;
}

/**
 * Log a matrix in the console
 * @param {*} array 
 */
export function matlog(array){
    array.forEach(current => console.log(current, " | ",score(current)));
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
 * Randomly choose two indicies in an array and swap the values
 * @param {*} permutation 
 */
export function randomSimpleSwap(permutation){
    let indexPair = randomPair(permutation.length)

    let tmp = permutation[indexPair[0]];
    permutation[indexPair[0]] = permutation[indexPair[1]];
    permutation[indexPair[1]] = tmp;
}

/**
 * Execute a mutation over an individual that is a permutation
 * @param {*} permutation 
 */
export function mutation(permutation){
    let factor = Math.random();

    if (factor < 0.9) randomSimpleSwap(permutation);
    else randomSimpleSwap(permutation);
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