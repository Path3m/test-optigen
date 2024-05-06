//SCORE COMPUTING
export function score(array) {
    let sum = 0;
    for(let i=0; i<array.length; sum += i*array[i++]);
    return sum;
};