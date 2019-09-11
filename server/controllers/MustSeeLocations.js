let id = 1
let MustSeeLocations = [
    {
        id: id++,
        country: 'United Kingdom',
        state_provence: 'England',
        city: 'London',
        imageUrl: 'https://sumfinity.com/wp-content/uploads/2018/04/London-Tower-Bridge-England-Night.jpg'
    },
    {
        id: id++,
        country: 'Ghana',
        state_provence: '',
        city: 'Cape Coast',
        imageUrl: 'https://viewghana.com/wp-content/uploads/2018/02/Cape_Coast_Castle_Cape_Coast_Ghana.jpg'
    },
    {
        id: id++,
        country: 'Puerto rico',
        state_provence: '',
        city: 'Culebra',
        imageUrl: 'https://canariolagoonhotel.com/wp-content/uploads/2016/05/clearbeach.jpg'
    }

]

const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();

const getMustLocations = () => {
    const query = datastore
      .createQuery('Locations')
      .filter('mustSee', true)
     
    return datastore.runQuery(query);
  };
  

module.exports = {
    read: (req, res) => { 
        const locations =  getMustLocations().then((data) => {
        
        console.log(data)
        res.send(data)
        });
        
    },

    create: (req, res) => {
        let newLocation = req.body
        newLocation.id = id++
        MustSeeLocations.push(newLocation)

        res.status(200).send(MustSeeLocations)
    },
    delete: (req, res) => {
        let { id } = req.params
        let index = MustSeeLocations.findIndex(location => +location.id === +id)
        MustSeeLocations.splice(index, 1)
        res.send(MustSeeLocations)
    },
    update: (req, res) => {
        let {id} = req.params
        let updateLocation = req.body
        updateLocation.id = id

        let index = MustSeeLocations.findIndex(location => +location.id === +id)

        MustSeeLocations.splice(index, 1, updateLocation)
        res.send(MustSeeLocations)
    }
}