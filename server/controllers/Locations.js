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
  
const getLocations = (cb) => {
    const query = datastore
      .createQuery('Locations')
    


     return datastore.runQuery(query, (err, entites) => {
        entites.map(fromDatastore)
        cb(entites)
    })
  }

module.exports = {

    //vvvvvvvvvvvvvvvvvvvvvv getting all from data store

    read: (req, res) => { 
         getLocations((data) => {
            res.send(data)
        });
    },


    //vvvvvvvvvvvvvvvvvvvvvv create for must/ might


    create: (req, res) => {
        const ds = datastore
        let data = req.body

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


    //vvvvvvvvvvvvvvvvvvvvvvvvvvv delete for must/ might (don't seprate code)

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

   
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv update for must/ might (don't seprate code) 


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
