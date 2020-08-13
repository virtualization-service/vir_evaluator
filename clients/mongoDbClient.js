//Initilizing constants
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_DB_CONNECTION_STRING
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const projection = {
  '_id': 0
};
const filter = {};

//getDocuments called from mqReqResClient
const executeCalls = async function (operation,type) {
  await client.connect().catch(err => { console.log(err); });
  if (!client) {
    return;
  }
  let db = client.db("tms_logs_D");
  if(type=="getDocuments")
  {
  let docs = await db.listCollections().toArray();
  for (const doc of docs) {
    if (doc.name == operation) {
      const collection = db.collection(operation);
      let response = await collection.find(filter,{ projection: projection }).toArray();
      return JSON.stringify(response);
    }
  }
  if(type=="getRanker")
  {
    let filterOperation = { 'operation': operation };
    let collection = db.collection('rankers');
    const response = await collection.find(filterOperation, { projection: projection }).toArray();
    return JSON.stringify(response);
  }
}
};

//Exporting methods so that other functions can call
module.exports = {
  executeCalls
}