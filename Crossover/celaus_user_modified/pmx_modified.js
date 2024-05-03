import * as util from "../../utilgen.js";

/**
 * Takes two individuals to perform PMXCrossover
 * @param {*} s 
 * @param {*} t 
 * @returns two children produced from the parents
 */
export function crossover(s, t) {
  let _map1 = {};
  let _map2 = {};

  let viz_swathS = {}; let viz_swathT = {}; // TEST : afficher les largeurs

  const x1 = Math.ceil(Math.random() * s.length * 2 / 3);
  const x2 = (x1+1) + Math.floor(Math.random() * (s.length - x1));

  //console.log("Swath range : [",x1," ; ",x2,"["); //x2 is not included

  let offspring = [Array.from(s), Array.from(t)]; //on produit 2 enfants en même temps

  //remplissage de la selection d'allèle dans les enfants
  for (let i = x1; i < x2; i++) {

    viz_swathS[i] = s[i]; viz_swathT[i] = t[i]; //TEST : afficher les largeurs

    offspring[0][i] = t[i]; //enfants selectionné du parent 1
    _map1[t[i]] = s[i];

    offspring[1][i] = s[i]; //enfants selectionné du parent 2
    _map2[s[i]] = t[i];
  }

  //console.log("Largeur parent 1 = ",viz_swathS,'\nLargeur parent 2 = ',viz_swathT); //TEST : affichage des largeurs

  //filling children part before the swath
  for (let i = 0; i < x1; i++) {
    while (offspring[0][i] in _map1) {
      offspring[0][i] = _map1[offspring[0][i]];
    }
    while (offspring[1][i] in _map2) {
      offspring[1][i] = _map2[offspring[1][i]];
    }
  }

  //filling children part after the swath
  for (let i = x2; i < s.length; i++) {
    while (offspring[0][i] in _map1) {
      offspring[0][i] = _map1[offspring[0][i]];
    }
    while (offspring[1][i] in _map2) {
      offspring[1][i] = _map2[offspring[1][i]];
    }
  }

  //return 2 children
  return offspring;
}

//----------------------------------------------------------------------
/**
 * Perfom PMXCrossover on a population of several individuals
 * @param {*} pop 
 */
export function newGeneration(population, crossPercent, sizeNewGen) { //TODO : chose a better name
  
  let nbParents = Math.floor(population.length * crossPercent);
  let newGen = new Array(sizeNewGen);

  for (let i = 0; i < newGen.length; i++) {
    let pairOfIndex = util.Permutation.indexPair(nbParents);

    let parent1 = population[pairOfIndex[0]];
    let parent2 = population[pairOfIndex[1]];

    let children = crossover(parent1.genome.p, parent2.genome.p);
    newGen[i]   = new util.Individual(new util.Permutation(children[0]), util.score);
    if(i < newGen.length-1) newGen[++i] = new util.Individual(new util.Permutation(children[1]), util.score); //TODO : find a better solution
  }

  return newGen;
}