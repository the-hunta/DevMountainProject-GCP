
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
    obj.id = obj[Datastore.KEY].id;
    return obj;
}

const getMightLocations = (cb) => {
    const query = datastore
      .createQuery('Locations')
      .filter('mustSee', false)
      // .order('country')
     
      return datastore.runQuery(query, (err, entites) => {
        entites.map(fromDatastore)
        cb(entites)
    })
  };



module.exports = {

  read: (req, res) => {
      const locations =  getMightLocations((data) => {
       res.send(data)
        });
    },

  create: (req, res) => {
        const ds = datastore
        let data = req.body
        data.mightSee = true
 
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
        const key = datastore.key(["Locations", parseInt(id, 10)]);
        datastore.delete(key, (err) => {
          if (!err) {
            res.status(200).json('success')

            console.log()
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

            console.log()
            return;
          }
          res.status(500).send(err)
        });
      }
   
  }


