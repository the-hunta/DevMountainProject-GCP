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

function fromDatastore(obj) {
    obj.id = obj[datastore.KEY].id;
    return obj;
}
  
const getMustLocations = (cb) => {
    const query = datastore
      .createQuery('Locations')
      .filter('mustSee', true)
     
     return datastore.runQuery(query, (err, entites) => {
        entites.map(fromDatastore)
        cb(entites)
    })
  };
  

module.exports = {

    read: (req, res) => { 
        const locations =  getMustLocations((data) => {
            res.send(data)
        });
    },


    create: (req, res) => {
        const ds = datastore
        let data = req.body
        data.mightSee= false

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
               return 
      
          }
         
          res.status(500).send(err) 

            });
             
    },


    delete: (req, res) => {
        let { id } = req.params
        const key = datastore.key(["Locations", parseInt(id, 10)]);
        datastore.delete(key, (err) => {
          if (!err) {
            res.status(200).json('success')
            return;
          }
          res.status(500).send(err)
        });
    },


    update: (req, res) => {
        let {id} = req.params
        let data = req.body

        const key = datastore.key(["Locations", parseInt(id, 10)]);
        const entity =  {
            key: key,
            data: toDatastore(data),
  
          };
          
          datastore.save(entity, err => {
              data.id = entity.key.id; 
          if (!err) {
              
            res.status(200).send(data)
            return;
          }
          res.status(500).send(err)
        });
    }
    
}



