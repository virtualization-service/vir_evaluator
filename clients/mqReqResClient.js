const rabbitMqClient = require('./rabbitMqClient')
const processor = require('../processMessage').rank
const getRanker = require('./restClient').getRanker
const getDocuments = require('./restClient').getDocuments

let actualClientPromise
let srcQueue = process.env.SRC_QUEUE_NAME ? process.env.SRC_QUEUE_NAME : 'ranker'
let destQueue = process.env.DEST_QUEUE_NAME ? process.env.DEST_QUEUE_NAME : 'response'
let exchange = process.env.EXCHANGE ? process.env.EXCHANGE : 'virtualization'

const initializeClient = () => {
  if(!actualClientPromise){
    actualClientPromise = performInitialization()
  }
  return actualClientPromise
}

const performInitialization = () => {
  console.log("mqRequestResponseClient - performInitialization")
  return new Promise(async (resolve, reject) => {
    let actualClient
    try {
      actualClient = await rabbitMqClient.connect()
      await actualClient.createQueue(srcQueue)
      await actualClient.createExchange(exchange, 'topic')
      await actualClient.bindQueue(srcQueue, exchange, 'parser.completed')

      await actualClient.createQueue(destQueue)
      await actualClient.bindQueue(destQueue, exchange, 'evaluator.completed')

      await actualClient.onMessage(srcQueue, handleQueueMessage)
      resolve(actualClient)
      console.log('mqRequestResponseClient - successfully created queue[' + srcQueue + ']')
    }catch(error){
      console.error('mqRequestResponseClient - Failed to create queue', error)
      reject(error)
    }
  })
}

const handleQueueMessage = async (responseMsg) => {
  console.log('Handling response message')
  try {
    let msg = JSON.parse(responseMsg.content.toString())
    let ranker = await getRanker(msg.operation)
    ranker = JSON.parse(ranker)

    let collection = await getDocuments(msg.operation)
    collection = JSON.parse(collection)

    let rankSortedDocs = processor(msg.request.formatted_data, ranker.data, collection)
    let res = {"operation": msg.operation, "data": rankSortedDocs}

    performRequest(Buffer.from(JSON.stringify(res)), responseMsg.properties)
  }catch(error) {
    console.error('Could not parse the error message. Using entire response for error', error)
  }
}

const performRequest = async (msg, properties) => {
  let actualClient = await initializeClient()

  console.log('Placing message into exchange [destination : ' + exchange + ']')
  return await actualClient.sendMessage(exchange, 'ranker.completed', msg, properties)
}

module.exports = {
  performRequest,
  initializeClient
}