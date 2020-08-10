//Initilizing constants
const { MongoClient } = require('mongodb');
const uri = "mongodb://lrqi_db:lrqi_db_pwd@lrqidb-shard-00-00-wksjy.mongodb.net:27017,lrqidb-shard-00-01-wksjy.mongodb.net:27017,lrqidb-shard-00-02-wksjy.mongodb.net:27017/test?ssl=true&replicaSet=LRQIDB-shard-0&authSource=admin&retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const projection = {
  '_id': 0
};
const filter = {};

//getDocuments called from mqReqResClient
const getDocuments = async function (operation) {
  await client.connect().catch(err => { console.log(err); });
  if (!client) {
    return;
  }
  let db = client.db("tms_logs_D");
  let docs = await db.listCollections().toArray();
  console.log(docs);
  for (const doc of docs) {
    if (doc.name == operation) {
      console.log(doc.name);
      const collection = db.collection(operation);
      let response = await collection.find(filter,{ projection: projection }).toArray();
      console.log(response);
      console.log(JSON.stringify(response))
      return JSON.stringify(response);
    }
  }
};

//getRanker called from mqReqResClient
const getRanker = async function (operation) {
  await client.connect().catch(err => { console.log(err); });
  if (!client) {
    return;
  }
  let db = client.db("tms_logs_D");
  let filterOperation = { 'operation': operation };
  let collection = db.collection('rankers');
  console.log('Collection')
  const response = await collection.find(filterOperation, { projection: projection }).toArray();
  return JSON.stringify(response);
};

//Exporting methods so that other functions can call
module.exports = {
  getRanker,
  getDocuments
}