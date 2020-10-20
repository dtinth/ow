const PouchDB = require('pouchdb')
const dbName = '.data/ow'

module.exports = new PouchDB(dbName)