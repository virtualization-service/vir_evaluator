var exports = module.exports = {}

exports.evaluate = (newRequest, currentRank, collection) => {
  if (!newRequest) {
    console.error("param : 'newRequest' should be an object")
    return
  }
  if (!currentRank || !Array.isArray(currentRank)) {
    console.error("param : 'currentRank' should be an array")
    return
  }
  if (!collection || !Array.isArray(collection)) {
    console.error("param : 'collection' should be an array")
    return
  }

  let requestKeys = Object.keys(newRequest)

  collection.forEach(x => {
    x.rank = 0
    let docKeys = Object.keys(x.request.formatted_data)
    x.propertiesMatched = 0
    currentRank.forEach(r => {
      if (docKeys.includes(r.name) && requestKeys.includes(r.name)) {
        if(newRequest[r.name][0] === x.request.formatted_data[r.name][0]){
          x.rank += r.rank
          x.propertiesMatched += 1
        }
      }
    })
  })

  // 16 -> "1000"
  let maxRankBinary = Math.max(...currentRank.map(x => x.rank)).toString(2)

  // "1" -> "1111" -> 15
  let maxPossibleRank = parseInt("1".repeat(maxRankBinary.length), 2)

  //console.log(maxRankBinary, maxPossibleRank)

  let res = collection.map( x => {
    return {
      rank : x.rank,
      response: {
        raw_data: x.response.raw_data
      },
      propertiesMatched: x.propertiesMatched,
      confidene: parseInt((x.rank/maxPossibleRank) * 100)
    }
  })

  res.sort((x, y) => x.rank < y.rank)

  return res
}