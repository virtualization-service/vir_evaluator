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
    {"name": "c", "rank": 4, uniqueValues: [3]},
    {"name": "d", "rank": 8, uniqueValues: [4]},
    {"name": "e", "rank": 16, uniqueValues: [5]}
  ]

  it('should return the records with descending order of derived rank', () => {
    let res = app.evaluate(newRequest, currentRank, collection)

    console.log(res)

    expect(res.find( x => x.rank === 31).response.raw_data).toEqual("abcde")
    expect(res.find( x => x.rank === 31).propertiesMatched).toEqual(5)
    expect(res.find( x => x.rank === 31).confidene).toEqual(100)
    
    expect(res.find( x => x.rank === 30).response.raw_data).toEqual("bcde")
    expect(res.find( x => x.rank === 30).propertiesMatched).toEqual(4)
    expect(res.find( x => x.rank === 30).confidene).toEqual(96)

    expect(res.find( x => x.rank === 28).response.raw_data).toEqual("cde")
    expect(res.find( x => x.rank === 28).propertiesMatched).toEqual(3)
    expect(res.find( x => x.rank === 28).confidene).toEqual(90)

    expect(res.find( x => x.rank === 24).response.raw_data).toEqual("de")
    expect(res.find( x => x.rank === 24).propertiesMatched).toEqual(2)
    expect(res.find( x => x.rank === 24).confidene).toEqual(77)

    expect(res.find( x => x.rank === 22).response.raw_data).toEqual("bce")
    expect(res.find( x => x.rank === 22).propertiesMatched).toEqual(3)
    expect(res.find( x => x.rank === 22).confidene).toEqual(70)

    expect(res.find( x => x.rank === 17).response.raw_data).toEqual("ae")
    expect(res.find( x => x.rank === 17).propertiesMatched).toEqual(2)
    expect(res.find( x => x.rank === 17).confidene).toEqual(54)

    expect(res.find( x => x.rank === 11).response.raw_data).toEqual("abd")
    expect(res.find( x => x.rank === 11).propertiesMatched).toEqual(3)
    expect(res.find( x => x.rank === 11).confidene).toEqual(35)

    expect(res.find( x => x.rank === 10).response.raw_data).toEqual("bd")
    expect(res.find( x => x.rank === 10).propertiesMatched).toEqual(2)
    expect(res.find( x => x.rank === 10).confidene).toEqual(32)

    expect(res.find( x => x.rank === 6).response.raw_data).toEqual("bc")
    expect(res.find( x => x.rank === 6).propertiesMatched).toEqual(2)
    expect(res.find( x => x.rank === 6).confidene).toEqual(19)

    expect(res.find( x => x.rank === 1).response.raw_data).toEqual("a")
    expect(res.find( x => x.rank === 1).propertiesMatched).toEqual(1)
    expect(res.find( x => x.rank === 1).confidene).toEqual(3)

  })

})