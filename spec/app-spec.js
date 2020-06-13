let app = require('../processMessage')

let collection = [
  {
    "request": {
      "formatted_data": {
        "a": [1], "b": [2], "c": [3], "d": [4], "e": [5]
      }
    },
    "response": {
      "raw_data": "abcde"
    }
  },
  {
    "request": {
      "formatted_data": {
        "a": [1], "b": [6], "c": [7], "d": [8], "e": [9]
      }
    },
    "response": {
      "raw_data": "a"
    }
  },
  {
    "request": {
      "formatted_data": {
        "a": [1], "b": [2], "c": [6], "d": [4], "e": [8]
      }
    },
    "response": {
      "raw_data": "abd"
    }
  },
  {
    "request": {
      "formatted_data": {
        "a": [3], "b": [2], "c": [3], "d": [3], "e": [5]
      }
    },
    "response": {
      "raw_data": "bce"
    }
  },
  {
    "request": {
      "formatted_data": {
        "a": [2], "b": [2], "c": [3], "d": [6], "e": [7]
      }
    },
    "response": {
      "raw_data": "bc"
    }
  },
  {
    "request": {
      "formatted_data": {
        "a": [3], "b": [3], "c": [3], "d": [4], "e": [5]
      }
    },
    "response": {
      "raw_data": "cde"
    }
  },
  {
    "request": {
      "formatted_data": {
        "a": [1], "b": [3], "c": [4], "d": [5], "e": [5]
      }
    },
    "response": {
      "raw_data": "ae"
    }
  },
  {
    "request": {
      "formatted_data": {
        "a": [2], "b": [3], "c": [4], "d": [4], "e": [5]
      }
    },
    "response": {
      "raw_data": "de"
    }
  },
  {
    "request": {
      "formatted_data": {
        "a": [2], "b": [2], "c": [4], "d": [4], "e": [4]
      }
    },
    "response": {
      "raw_data": "bd"
    }
  },
  {
    "request": {
      "formatted_data": {
        "a": [3], "b": [2], "c": [3], "d": [4], "e": [5]
      }
    },
    "response": {
      "raw_data": "bcde"
    }
  }
]

describe("when new requets is input", () => {
  let newRequest = {
    a: [1],
    b: [2],
    c: [3],
    d: [4],
    e: [5]
  }

  let currentRank = [
    {"name": "a", "rank": 1, uniqueValues: [1]},
    {"name": "b", "rank": 2, uniqueValues: [2]},
    {"name": "c", "rank": 3, uniqueValues: [3]},
    {"name": "d", "rank": 4, uniqueValues: [4]},
    {"name": "e", "rank": 5, uniqueValues: [5]}
  ]

  it('should return the records with descending order of derived rank', () => {
    let res = app.evaluate(newRequest, currentRank, collection)

    expect(res.find( x => x.confidene === 100).response.raw_data).toEqual("abcde")
    expect(res.find( x => x.confidene === 100).propertiesMatched).toEqual(5)
    
    expect(res.find( x => x.confidene === 96).response.raw_data).toEqual("bcde")
    expect(res.find( x => x.confidene === 96).propertiesMatched).toEqual(4)

    expect(res.find( x => x.confidene === 90).response.raw_data).toEqual("cde")
    expect(res.find( x => x.confidene === 90).propertiesMatched).toEqual(3)

    expect(res.find( x => x.confidene === 77).response.raw_data).toEqual("de")
    expect(res.find( x => x.confidene === 77).propertiesMatched).toEqual(2)

    expect(res.find( x => x.confidene === 70).response.raw_data).toEqual("bce")
    expect(res.find( x => x.confidene === 70).propertiesMatched).toEqual(3)

    expect(res.find( x => x.confidene === 54).response.raw_data).toEqual("ae")
    expect(res.find( x => x.confidene === 54).propertiesMatched).toEqual(2)

    expect(res.find( x => x.confidene === 35).response.raw_data).toEqual("abd")
    expect(res.find( x => x.confidene === 35).propertiesMatched).toEqual(3)

    expect(res.find( x => x.confidene === 32).response.raw_data).toEqual("bd")
    expect(res.find( x => x.confidene === 32).propertiesMatched).toEqual(2)

    expect(res.find( x => x.confidene === 19).response.raw_data).toEqual("bc")
    expect(res.find( x => x.confidene === 19).propertiesMatched).toEqual(2)

    expect(res.find( x => x.confidene === 3).response.raw_data).toEqual("a")
    expect(res.find( x => x.confidene === 3).propertiesMatched).toEqual(1)

  })

})