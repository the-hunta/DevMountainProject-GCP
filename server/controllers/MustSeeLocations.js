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


// Translates from the application's format to the datastore's
// extended entity property format. It also handles marking any
// specified properties as non-indexed. Does not translate the key.
//
// Application format:
//   {
//     id: id,
//     property: value,
//     unindexedProperty: value
//   }
//
// Datastore extended format:
//   [
//     {
//       name: property,
//       value: value
//     },
//     {
//       name: unindexedProperty,
//       value: value,
//       excludeFromIndexes: true
//     }
//   ]
function toDatastore(obj, nonIndexed) {
    nonIndexed = nonIndexed || [];
    const results = [];
    Object.keys(obj).forEach(k => {
      if (obj[k] === undefined) {
        return;
      }
      results.push({
        name: k,
        value: obj[k],
        excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
      });
    });
    return results;
  }
  

const getMustLocations = () => {
    const query = datastore
      .createQuery('Locations')
      .filter('mustSee', true)
     
    return datastore.runQuery(query);
  };
  

module.exports = {

    //WORKING
    read: (req, res) => { 
        const locations =  getMustLocations().then((data) => {
        
        console.log(data)
        res.send(data)
        });
    },



    create: (req, res) => {
        const ds = datastore
        let data = req.body
        data.mightSee= false

        console.log(data)

        const kind = 'Locations';
        key = ds.key(kind);

        const entity =  {
            key: key,
            data: toDatastore(data),
  
          };
          
          ds.save(entity, err => {
              data.id = entity.key.id; 
          if (!err) {
               res.status(200).send(data) 
               console.log(data)
               return 
      
          }
         
          res.status(500).send(err) 
            });
             
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