const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const mongoose = require('./db/mongoose')
const Message = require('./db/model')

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({ extended: false }))


io.on('connection', socket => {
  socket.on('message', body => {
    // const data  = new Message(body);  
    // await data.save();

    socket.broadcast.emit('message', {
      from: body.from,
      body: body.body
    })
  });
  socket.on('active', active => {
    socket.broadcast.emit('active', active)
  })
})

server.listen(3000)
