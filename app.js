'use strict';

const express = require('express')
const jsonParser = require('body-parser').json
//const cors = require('cors')

const Aftership = require('aftership')('06979555-b9a4-46e9-babc-de5b3eb55579')

//const { shipments } = require('./routes')
const PORT = process.env.PORT || 3030

let app = express()
  //.use(cors())
  //.use(bodyParser.urlencoded({ extended: true }))
//  .use(bodyParser.json())
  // Our routes
  //.use(shipments)
app.use(jsonParser())




  // Aftership.GET('/trackings', function(req, res) {
  //   var body = res.data
  //   var trackings = body.trackings[0].checkpoints
  //
  //   trackings = JSON.stringify(trackings)
  //
  //   //(trackings)=> { res.json(trackings)}
  //
  //   //trackings = trackings.sort({ created_at: -1 })
  //
  //
  //   console.log(trackings)
  //   })

app.get('/trackings',(req, res, next) => {

  let query = {
  	slug: 'postnl'
  };

  Aftership.call('GET', '/trackings', query)
    .then(function(result) {
      let trackings = result.data.trackings
      console.log(trackings)
      res.json(trackings)
    })
    .catch(function(error) {
      console.log(error)
    })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    // only print full errors in development
    error: app.get('env') === 'development' ? err : {}
  })
})


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
