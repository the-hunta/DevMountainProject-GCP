
let id=  1
let MightSeeLocations =[
{
    id: id++,
    country: 'United States',
    state_provence: 'Washinton',
    city: 'Seattle',
    imageUrl: 'https://s3.amazonaws.com/fjwp/blog/wp-content/uploads/2015/10/11-Great-Flexible-Jobs-in-Seattle-Washington-Hiring-Now.jpg'
},
{
    id: id++,
    country: 'Japan',
    state_provence: '',
    city: 'Tokyo',
    imageUrl:'https://d36tnp772eyphs.cloudfront.net/blogs/1/2011/05/japan-1200x729.jpg'
},
{
    id: id++,
    country: 'Canada',
    state_provence: 'Nova Scotia',
    city: 'Halifax',
    imageUrl:'https://www.g4s.com/en-ca/-/media/g4s/canada/images/modules/header/herowide/1200x420_halifax.ashx'
},
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
  

const getMightLocations = () => {
    const query = datastore
      .createQuery('Locations')
      .filter('mightSee', true)
     
    return datastore.runQuery(query);
  };

// const createMightLocation = (data, res) => {
//       const ds = datastore
     
    
//   }




module.exports = {

    //WORKING
    read: (req, res) => { 
        const locations =  getMightLocations().then((data) => {
            
            console.log('this is after the const')
            console.log(data)

            res.send(data)
        });
        
    },

    
    create: (req, res) => {
        const ds = datastore
        let data = req.body
        data.mightSee= true

        console.log(data)

        const kind = 'Locations';
        key = ds.key(kind);
  

        const entity =  {
          key: key,
          data: toDatastore(data),

        };
        
        ds.save(entity, err => {
            data.id = entity.key.id; 
            console.log('testing the save')
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
        let index = getMightLocations.findIndex(location => +location.id === +id)
        getMightLocations.splice(index, 1)
        res.send(getMightLocations)
    },
    update: (req, res) => {
        let {id} = req.params
        let updateLocation = req.body
        updateLocation.id = id

        let index = getMightLocations.findIndex(location => +location.id === +id)

        getMightLocations.splice(index, 1, updateLocation)
        res.send(getMightLocations)
    }
    
}

