const express = require('express')

// const port = 5050

const port = process.env.PORT || 5050
const static = process.env.NODE_ENV === "production" ? "build" : "/Users/hsmith/DevMountain/NODB-project/build"
let mustSee = require('./server/controllers/MustSeeLocations')
let mightSee = require('./server/controllers/MightSeeLocations')
let locations = require('./server/controllers/Locations')



const {Datastore} = require('@google-cloud/datastore');
// Instantiate a datastore client
const datastore = new Datastore()


const app = express()
app.use(express.json())
app.use(express.static(static))
// const model = require('./model-datastore');




// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

//Locations EndPoints *****NEW****
app.get('/api/Locations', locations.read)
app.post('/api/Locations', locations.create)

app.put('/api/Locations/:id', locations.update)
app.delete('/api/Locations/:id', locations.delete)

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// this is for the new combined server file --> server/controllers/locations.js  
// doesnt have local data and will pull from the Data store on GCP



//end points go here
//mightSee
app.get('/api/MightSeeLocations', mightSee.read)
app.post('/api/MightSeeLocations', mightSee.create)
app.put('/api/MightSeeLocations/:id', mightSee.update)
app.delete('/api/MightSeeLocations/:id', mightSee.delete)

//mustSee
app.get('/api/MustSeeLocations', mustSee.read)
app.post('/api/MustSeeLocations', mustSee.create)
app.put('/api/MustSeeLocations/:id', mustSee.update)
app.delete('/api/MustSeeLocations/:id', mustSee.delete)




app.listen(port, () => {
    console.log('Listening on port', port)
})
 