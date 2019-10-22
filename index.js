const express = require('express')

const port = process.env.PORT || 5050
const static = process.env.NODE_ENV === "production" ? "build" : "/Users/hsmith/DevMountain/NODB-project/build"
let locations = require('./server/controllers/Locations')

const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore()

const app = express()
app.use(express.json())
app.use(express.static(static))



//Locations EndPoints 
app.get('/api/Locations', locations.read)
app.post('/api/Locations', locations.create)

app.put('/api/Locations/:id', locations.update)
app.delete('/api/Locations/:id', locations.delete)

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// this is for the new combined server file --> server/controllers/locations.js  
// doesnt have local data and will pull from the Data store on GCP



app.listen(port, () => {
    console.log('Listening on port', port)
})
 