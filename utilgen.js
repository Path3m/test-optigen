export class Permutation{
    /**
     * 
     * @param {*} size 
     * @returns return an array of size with integer from 0 to size
     */
    static index(size){
        return (array => {for(let i=0; i<size; array.push(i++)); return array; })
        (new Array());
    }

    /**
    * Create a copy of an array and shuffles it
    * @param {*} array 
    * @returns the copy of the given array shuffled
    */
    static copyShuffle(array){
        let newarray = array.slice();
        return newarray.sort((a,b) => 0.5 - Math.random());
    }

    /**
    * Shuffles an array in place
    * @param {*} array 
    * @returns a reference to the given array now shuffled
    */
    static inplaceShuffle(array){
        return array.sort((a,b) => 0.5 - Math.random());
    }

    /**
    * Generate a random permutation of a given size
    * @param {*} size 
    * @returns 
    */
    static rand(size){
        return Permutation.inplaceShuffle(Permutation.index(size));
    }

    /**
     * Exchange the values between the two given indexes
     * @param {Array} array 
     * @param {number} i 
     * @param {number} j
     * @return a reference to the current permutation
     */
    static swap(array, i,j){
        let tmp   = array[i];
        array[i] = array[j];
        array[j] = tmp;
        return this;
    }

    /**
     * Randomly choose two indicies in an array and swap the values
     * @return a reference to the current permutation
     */
    static randSwap(array){
        let pair = Permutation.indexPair(array.length);
        return this.swap(array, pair[0], pair[1]);
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
}

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
export class Individual{
    /**
     * Build an individual with a permutation and its score computed with a function over a permutation
     * @param {*} permutation 
     * @param {*} func 
     */
    constructor(array, func){
        this.genome = array;
        this.func   = func;
        this.score  = func(array);
    }

    /**
     * Takes two individuals to perform PMXCrossover
     * @see {@link https://gist.github.com/celaus/d5a55e723ce233f2b83af36a4cf456b4 | github-user-celaus} for further information
     * @param {*} parent the other parent
     * @returns two children produced from the parents
     */
    crossover(parent) {
        let s     = this.genome, t    = parent.genome;
        let _map1 = {},         _map2 = {};
    
        const x1 = Math.ceil(Math.random() * s.length * 2 / 3);
        const x2 = (x1+1) + Math.floor(Math.random() * (s.length - x1));
    
        //console.log("Swath range : [",x1," ; ",x2,"["); //x2 is not included
    
        let children = [Array.from(s), Array.from(t)]; //on produit 2 enfants en même temps
    
        //remplissage de la selection d'allèle dans les enfants
        for (let i = x1; i < x2; i++) {
          children[0][i] = t[i]; //enfants selectionné du parent 1
          _map1[t[i]]    = s[i];
        
          children[1][i] = s[i]; //enfants selectionné du parent 2
          _map2[s[i]]    = t[i];
        }
    
        //console.log("Largeur parent 1 = ",viz_swathS,'\nLargeur parent 2 = ',viz_swathT); //TEST : affichage des largeurs
    
        //filling children part before the swath
        for (let i = 0; i < x1; i++) {
          while (children[0][i] in _map1) children[0][i] = _map1[children[0][i]];
          while (children[1][i] in _map2) children[1][i] = _map2[children[1][i]];
        }
    
        //filling children part after the swath
        for (let i = x2; i < s.length; i++) {
          while (children[0][i] in _map1) children[0][i] = _map1[children[0][i]];
          while (children[1][i] in _map2) children[1][i] = _map2[children[1][i]];
        }
    
        //return 2 children
        return [
            new Individual(children[0], this.func), 
            new Individual(children[1], this.func)
        ];
    }

    /**
     * Execute a mutation over an individual that is a permutation 
     */
    mutation(){
        let factor = Math.random();

        if (factor < 0.9) Permutation.randSwap(this.genome);
        else Permutation.randSwap(this.genome);
    }

}

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
export class Population{
    constructor(members, func){
        this.members = members;
        this.length  = members.length;
        this.func    = func;
    }

    /**
     * Generate a population i.e an array of randomly generated permutation
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
        if( this.func != population.func) throw new Error("Can't add two different population.");
        this.members.push(...population.members);
        this.length += population.length;
        return this;
    }


    sort(method){
        this.members.sort((ind1, ind2) => method(ind1, ind2));
        return this;
    }

    sortByScore(){
        this.members.sort((i1,i2) => -(i1.score - i2.score));
        return this;
    }

}


//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------
//SCORE COMPUTING
export function score(array) {
    let sum = 0;
    for(let i=0; i<array.length; sum += i*array[i++]);
    return sum;
};