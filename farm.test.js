
const { getYieldForPlant, 
        getYieldForCrop, 
        getTotalYield, 
        getCostsForCrop,
        getRevenueForCrop,
        getProfitForCrop,
        getTotalProfit,
    } = require("./farm");


describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30, // total number of kilograms of yield from 10 corn plants
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
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
});

describe("getTotalYield", () => {
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

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    }); 
});

// Calculate costs for crop corn
describe("getCostsForCrop", () => {
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
});

// Calculate profit for crop corn
describe("getProfitForCrop", () => {
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
});

// Calculate total profit of corn, pumpkin and kale
describe("getTotalProfit", () => {
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
});


//////////      Calculations with environment factor    ///////////

// corn
// including environment factors
// with several environment factors
// only relevant environment factors
describe("getYieldForPlant", () => {
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

    test("Get yield for plant corn with low sun, low wind and clay soil environment", () => {
        expect(getYieldForPlant(corn, environmentFactors)).toBe(1.5);
    });
});

// pumpkin
// including environment factors
// with several environment factors
// only relevant environment factors
describe("getYieldForPlant", () => {
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

    test("Get yield for plant pumpkin with high sun, low wind and clay soil environment", () => {
        expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(6);
    });
});

// kale
// including environment factors
// with several environment factors
// only relevant environment factors
describe("getYieldForPlant", () => {
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
        soil: "clay",
      };

    test("Get yield for plant kale with high sun, low wind and clay soil environment", () => {
        expect(getYieldForPlant(kale, environmentFactors)).toBe(3);
    });
});

// Calculate yield for crop > "corn" "pumpkin" and "kale" with environment factors

// corn
describe("getYieldForCrop", () => {
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
});

// pumpkin
describe("getYieldForCrop", () => {
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
});

// kale
describe("getYieldForCrop", () => {
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

// Calculate getTotalYield > "corn" "pumpkin" and "kale" with environment factors
describe("getTotalYield", () => {
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
});

// Calculate getRevenueForCrop, with environment factors.
// corn
describe("getRevenueForCrop", () => {
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
});

// pumpkin
describe("getRevenueForCrop", () => {
    test("Calculate revenue for crop pumpkin, with environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
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
            sun: "high",
            soil: "clay",
        };

        const input = {
            crop: pumpkin,
            numCrops: 20,
        };

        expect(getRevenueForCrop(input, environmentFactors)).toBe(600); 
    });
});

// Calculate getProfitForCrop, with environment factors.

// corn
describe("getProfitForCrop", () => {
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
});

// pumpkin
describe("getProfitForCrop", () => {
    test("Calculate profit for crop pumpkin, with environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
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
            sun: "high",
            soil: "clay",
        };

        const input = {
            crop: pumpkin,
            numCrops: 20,
        };

        expect(getProfitForCrop(input, environmentFactors)).toBe(580); // Total profit of 25 pumpkins, with environment factors.
    });
});

// Calculate getTotalProfit of corn, pumpkin and kale with environment factors.
describe("getTotalProfit", () => {
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