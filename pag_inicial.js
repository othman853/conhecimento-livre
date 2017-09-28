const cool = require('cool-ascii-faces')
const express = require('express')
const {join} = require('path')

const lazyLog = (message) => console.log.bind(console, message)

const port = (defaultPort = 3000) => process.env.PORT || defaultPort

const pathFor = (page) => join(`${__dirname}/${page}.html`
                            
const render = (buildFileName) => 
  (request, response) => response.sendFile(pathFor(buildFileName(request)))                          
                                
const app = express()

app.get('/', 
  render(() => 'index'))

app.get('/video/:id', 
  render(request => `video${request.params.id}`))

app.get('/cool', 
  (request, response) => response.send(cool())

app.listen(port(), 
  lazyLog(`Node app is running on port ${app.get('port')}`))
