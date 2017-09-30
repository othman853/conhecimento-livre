const MongoClient = require('mongodb').MongoClient
const models = require('./models')
const routes = require('./routes')
const application = require('./application')

const MONGO_URL = 'mongodb://localhost:27017/conhecimento-livre-dev'

// For didactical purposes
const expandedMongoConnect = (url) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (error, db) => {
      if (error) {
        return reject(error)
      }
      return resolve(db)
    })
  })
}

// This function is making the same thing as the one above, just with less lines...
const mongoConnect =
  (url) => new Promise((resolve, reject) =>
    MongoClient.connect(url,
      (error, db) => error ? reject(error) : resolve(db)))

const setupModels =
  (db) => models.configure(db)

const setupRoutes =
  (models) => routes.configure(models)

const startApplication =
  (routes) => application.configure(routes)

const handleStartupFail =
  (error) => console.log('Application failed to start', error.message)

mongoConnect(MONGO_URL)
  .then(setupModels)
  .then(setupRoutes)
  .then(startApplication)
  .catch(handleStartupFail)

