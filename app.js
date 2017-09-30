const MongoClient = require('mongodb').MongoClient
const models = require('./models')
const routes = require('./routes')
const application = require('./application')

const MONGO_URL = 'mongodb://localhost:27017/conhecimento-livre-dev'

const PORT = process.env.PORT || 3000

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
    MongoClient.connect(url, (error, db) => error ? reject(error) : resolve(db)))

const setupModels =
  (db) => models.configure(db)

const setupRoutes =
  (models) => routes.configure(models)

const setupApplication =
  (routes) => application.configure(routes, PORT)

const start =
   (application) => application.listen()

const handleStartupFail =
  (error) => console.log('Application failed to start', error.message)

mongoConnect(MONGO_URL)
  .then(setupModels)
  .then(setupRoutes)
  .then(setupApplication)
  .then(start)
  .catch(handleStartupFail)

