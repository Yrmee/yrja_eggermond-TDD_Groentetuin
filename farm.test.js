
const { getYieldForPlant, 
        getYieldForCrop, 
        getTotalYield, 
        getCostsForCrop,
        getRevenueForCrop,
        getProfitForCrop,
        getTotalProfit,
    } = require("./farm");


describe("getYieldForPlant", () => {

    // corn
    const corn = {
        name: "corn",
        yield: 30, // total number of kilograms of yield from 10 corn plants
        factors: {
            wind: {
                low: 0,
                medium: -30,
                high: -60,
            },
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            soil: {
                sand: -40,
                clay: 0,
                salty: -20,
            },
        },
    };

    const environmentFactorsCorn = {
        wind: "low",
        sun: "low",
        soil: "clay",
    };

    // pumpkin
    const pumpkin = {
        name: "pumpkin",
        yield: 40,
        factors: {
            wind: {
                low: 0,
                medium: -30,
                high: -60,
            },
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            soil: {
                sand: -40,
                clay: 0,
                salty: -20,
            },
        },
    };

    const environmentFactorsPumpkin = {
        wind: "low",
        sun: "high",
        soil: "clay",
      };

      // kale
      const kale = {
        name: "kale",
        yield: 20,
        factors: {
            wind: {
                low: 0,
                medium: -30,
                high: -60,
            },
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            soil: {
                sand: -40,
                clay: 0,
                salty: -20,
            },
        },
    };

    const environmentFactorsKale = {
        wind: "low",
        sun: "high",
        soil: "clay",
    };

    // corn - without environment factors
    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    // corn - with environment factors
    test("Get yield for plant corn with low sun, low wind and clay soil environment", () => {
        expect(getYieldForPlant(corn, environmentFactorsCorn)).toBe(15);
    });

    // pumpkin - with environment factors
    test("Get yield for plant pumpkin with high sun, low wind and clay soil environment", () => {
        expect(getYieldForPlant(pumpkin, environmentFactorsPumpkin)).toBe(60);
    });

    // kale - with environment factors
    test("Get yield for plant kale with high sun, low wind and clay soil environment", () => {
        expect(getYieldForPlant(kale, environmentFactorsKale)).toBe(30);
    });

});


// For the next cases:
// The given tests of the exercise example were written differently.
// It was not allowed to change the given tests, only the describe().
// That's why my next written tests are written in a different way. 

describe("getYieldForCrop", () => {

    // corn - without environment factors
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3, // kg yield each corn plant (= standard, without environment factors)
        };
        const input = {
            crop: corn,
            numCrops: 10, // number of plants
        };
        expect(getYieldForCrop(input)).toBe(30); // kilogram of total 10 plants with 3 kg of corn per plant
    });

    // corn - with environment factors
    test("Get yield for crop corn, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };
    
        const environmentFactors = {
            wind: "low",
            sun: "low",
            soil: "clay",
          };

        const input = {
            crop: corn,
            numCrops: 10, 
        };

        expect(getYieldForCrop(input, environmentFactors)).toBe(15); 
    });

    // pumpkin - with environment factors
    test("Get yield for crop pumpkin, with environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };
    
        const environmentFactors = {
            wind: "low",
            sun: "high",
            soil: "clay",
        };

        const input = {
            crop: pumpkin,
            numCrops: 20, 
        };

        expect(getYieldForCrop(input, environmentFactors)).toBe(120); 
    });

    // kale - with environment factors
    test("Get yield for crop kale, with environment factors", () => {
        const kale = {
            name: "kale",
            yield: 2,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };
    
        const environmentFactors = {
            wind: "low",
            sun: "high",
            soil: "sand",
          };

        const input = {
            crop: kale,
            numCrops: 10, 
        };

        expect(getYieldForCrop(input, environmentFactors)).toBe(18); 
    });
});


describe("getTotalYield", () => {

    // without environment factors
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23); // Total yield in kg from multiple plants
    });

    // with environment factors
    test("Calculate total yield with multiple crops with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };

        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };

        const kale = {
            name: "kale",
            yield: 2,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };

        const environmentFactors = {
            wind: "low",
            sun: "low",
            soil: "salty",
          };

        const crops = [
            { crop: corn, numCrops: 10 },
            { crop: pumpkin, numCrops: 20 },
            { crop: kale, numCrops: 10 },
        ];

        expect(getTotalYield({ crops }, environmentFactors)).toBe(52); // Total yield in kg from multiple plants
    });

    // 0 amount calculation
    test("Calculate total yield with 0 amount", () => {

        const corn = {
            name: "corn",
            yield: 3,
        };

        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    }); 

});

// Calculate costs for crop 
describe("getCostsForCrop", () => {

    // corn
    test("Calculate costs for crop corn", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getCostsForCrop(input)).toBe(10); // Total costs for sowing 10 corn plants for 1euro each
    });
});

// Calculate revenue for crop corn
describe("getRevenueForCrop", () => {

    // corn - without environment factors
    test("Calculate revenue for crop corn", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            sale_price: 5,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getRevenueForCrop(input)).toBe(150); // Total revenue of 10 corn plants
    });

    // corn - with environment factors
    test("Calculate revenue for crop corn, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            sale_price: 5,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };

        const environmentFactors = {
            wind: "low",
            sun: "low",
            soil: "clay",
          };

        const input = {
            crop: corn,
            numCrops: 10,
        };

        expect(getRevenueForCrop(input, environmentFactors)).toBe(75); 
    });

    // pumpkin - with environment factors
    test("Calculate revenue for crop pumpkin, with environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 2,
            sale_price: 6,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };

        const environmentFactors = {
            wind: "low",
            sun: "high",
            soil: "clay",
        };

        const input = {
            crop: pumpkin,
            numCrops: 20,
        };

        expect(getRevenueForCrop(input, environmentFactors)).toBe(720); 
    });

    // kale - with environment factors
    test("Calculate revenue for crop kale, with environment factors", () => {
        const kale = {
            name: "kale",
            yield: 2,
            costs: 1,
            sale_price: 3,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };
    
        const environmentFactors = {
            wind: "low",
            sun: "high",
            soil: "sand",
          };

        const input = {
            crop: kale,
            numCrops: 10, 
        };

        expect(getRevenueForCrop(input, environmentFactors)).toBe(54); 
    });

});

// Calculate profit for crop 
describe("getProfitForCrop", () => {

    // corn - without environment factors
    test("Calculate profit for crop corn", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            sale_price: 5,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getProfitForCrop(input)).toBe(140); // Total profit of 10 corn plants
    });

    // corn - with environment factors
    test("Calculate profit for crop corn, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            sale_price: 5,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };
        const environmentFactors = {
            wind: "low",
            sun: "low",
            soil: "clay",
          };

        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(65); // Total profit of 10 corn plants, with environment factors.
    });

    // pumpkin - with environment factors
    test("Calculate profit for crop pumpkin, with environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 2,
            sale_price: 6,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };

        const environmentFactors = {
            wind: "low",
            sun: "high",
            soil: "clay",
        };

        const input = {
            crop: pumpkin,
            numCrops: 20,
        };

        expect(getProfitForCrop(input, environmentFactors)).toBe(680); // Total profit of 25 pumpkins, with environment factors.
    });

    // kale - with environment factors
    test("Calculate profit for crop kale, with environment factors", () => {
        const kale = {
            name: "kale",
            yield: 2,
            costs: 1,
            sale_price: 3,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };
    
        const environmentFactors = {
            wind: "low",
            sun: "high",
            soil: "sand",
          };

        const input = {
            crop: kale,
            numCrops: 10, 
        };

        expect(getProfitForCrop(input, environmentFactors)).toBe(44); 
    });

});

// Calculate total profit of corn, pumpkin and kale
describe("getTotalProfit", () => {

    // Total - without environment factors
    test("Calculate total profit of corn, pumpkin and kale", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            sale_price: 5,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 2,
            sale_price: 6,
        };
        const kale = {
            name: "kale",
            yield: 2,
            costs: 1,
            sale_price: 3,
        };
        const crops = [
            { crop: corn, numCrops: 10 },
            { crop: pumpkin, numCrops: 20 },
            { crop: kale, numCrops: 10 },
        ];
        expect(getTotalProfit({crops})).toBe(630); // Total profit of corn, pumpkin and kale
    });

    // Total - with environment factors
    test("Calculate total profit of corn, pumpkin and kale with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            sale_price: 5,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };

        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 2,
            sale_price: 6,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };

        const kale = {
            name: "kale",
            yield: 2,
            costs: 1,
            sale_price: 3,
            factors: {
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                soil: {
                    sand: -40,
                    clay: 0,
                    salty: -20,
                },
            },
        };

        const environmentFactors = {
            wind: "low",
            sun: "high",
            soil: "sand",
          };

        const crops = [
            { crop: corn, numCrops: 10 },
            { crop: pumpkin, numCrops: 20 },
            { crop: kale, numCrops: 10 },
        ];

        expect(getTotalProfit({crops}, environmentFactors)).toBe(561); // Total profit of corn, pumpkin and kale
    });

});
