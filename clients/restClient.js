const fetch = require('node-fetch')
const ranksURL = process.env.RANKER_DB_SERVICE_URL ? process.env.RANKER_DB_SERVICE_URL : 'http://../api/Data/ranker'
const docsURL = process.env.DOCS_DB_SERVICE_URL ? process.env.DOCS_DB_SERVICE_URL : 'http://../api/Data/responses'
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const getRanker = async (operationName) => {
  let url = ranksURL + '?operation=' + operationName
  let request = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }

  try {
    res = await fetch(url, request)
    if (!res.ok) {
      throw new Error('Fetch Error: ' + res.status + ' - ' + await res.text())
    }
  } catch (error) {
    console.error('Error during fetch of rank "' + url + '": ', error)
    throw error
  }

  return await res.json()

}

const getDocuments = async (operationName) => {
  let url = docsURL + '?operation=' + operationName
  let request = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }

  try {
    res = await fetch(url, request)
    if (!res.ok) {
      throw new Error('Fetch Error: ' + res.status + ' - ' + await res.text())
    }
  } catch (error) {
    console.error('Error during fetch of rank "' + url + '": ', error)
    throw error
  }

  return await res.json()

}

module.exports = {
  getRanker,
  getDocuments
}