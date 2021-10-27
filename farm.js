
// get yield for one plant
function getYieldForPlant(crop, environmentFactors) {
    return Object.entries(environmentFactors ?? []).reduce((previousValue, [factor, factorType]) => {
        return previousValue * ( 1 + (crop.factors[factor][factorType] / 100 ));
    }, crop.yield);
};

// get yield for entire crop (all plants of 1 type)
function getYieldForCrop(input, environmentFactors) {
    return getYieldForPlant(input.crop, environmentFactors) * input.numCrops;
};

// get total yield for multiple crops
function getTotalYield({crops}, environmentFactors) {
    return crops.reduce((previousValue, crop) => {
        return previousValue + getYieldForCrop(crop, environmentFactors)
    }, 0)
};

// calculate costs for crop
function getCostsForCrop(input) {
    return input.numCrops * input.crop.costs;
}

// calculate revenue for crop
function getRevenueForCrop(input, environmentFactors) {
    return getYieldForCrop(input, environmentFactors) * input.crop.sale_price;
}

// calculate profit for crop
function getProfitForCrop(input, environmentFactors) {
    return getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input);
}

// calculate total profit of crops
function getTotalProfit({crops}, environmentFactors) {
    return crops.reduce((previousValue, crop) => {
        return previousValue + getProfitForCrop(crop, environmentFactors)
    }, 0);
}

module.exports = { 
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
 }



/*

Ik kwam nadat mijn opdracht 'af' was erachter dat de omgeving factoren anders berekend moesten worden. Door nog even goed te lezen in de documentatie.
ipv zoals ik alle factoren-percentages verzamel, optel en toepas op de opbrengst (wat realistisch zou zijn), 
moesten alle facotren (verdeeld over periodes, denk ik) vermenigvuldigd met elkaar gedaan worden, vanuit de opbrengst.

Om te laten zien hoe ik dat eerst had gedaan, wilde ik dit toch laten zien. Maar dan als comment.
De aangepaste formule, berekening volgens het voorbeeld uit de opdracht, staat natuurlijk gewoon boven-aan deze opdracht. 

function getYieldForPlant(crop, environmentFactors) {
    const factorPercentages = Object.entries(environmentFactors ?? []).reduce((previousValue, [factor, factorType]) => {
        return previousValue + crop.factors[factor][factorType];
    }, 100);
    return crop.yield * (factorPercentages / 100);
};

*/
