import * as util from "./optigen/utilgen.js";
import { Permutation } from "./optigen/Permutation.js";
import { Individual } from "./optigen/Individuals.js";
import { Population } from "./optigen/Population.js";
import { optigen, dimensions, influences } from "./optigen/algogen.js";

function maxOfMat(matrix){
    return matrix.reduce((acc, current) => { return Math.max(acc, Math.max(...current)); }, 0);
}

function minOfMat(matrix){
    return matrix.reduce((acc, current) => { return Math.min(acc, Math.min(...current)); }, 0);
}

var geneticResult = optigen(util.score, dimensions, influences);
var finalpop = geneticResult.bestPopulation;

var yData = geneticResult.statistic;
console.log(yData);
var yRange = {min:minOfMat(yData), max:maxOfMat(yData)};

var xData = Permutation.index(yData.length);
var colors = [
    "rgb(0,0,0)",
    "rgb(255,0,0)",
    "rgb(0,255,0)",
    "rgb(0,0,255)",
];

var data = [];

for ( var i = 0; i < xData.length; i ++ ) {
    var result = {
        type: 'box',
        y: yData[i],
        name: "Gen "+xData[i],
        boxmean: true,
        boxpoints: false,
        line:{color:colors[i%colors.length]}
    };
    data.push(result);
};

var layout = {
    title: 'Genetic Optimisation',
    yaxis: {
        range: yRange,
        showgrid: true,
        zeroline: true,
        dtick: Math.ceil((yRange.max-yRange.min)/20),
        gridcolor: 'rgb(255, 255, 255)',
        gridwidth: 1,
        zerolinecolor: 'rgb(255, 255, 255)',
        zerolinewidth: 2
    },
    margin: {
        l: 40,
        r: 30,
        b: 80,
        t: 100
    },
    paper_bgcolor: 'rgb(243, 243, 243)',
    plot_bgcolor: 'rgb(243, 243, 243)',
    showlegend: false
};

Plotly.newPlot('myDiv', data, layout);
