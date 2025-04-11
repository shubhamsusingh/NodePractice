const fs= require('fs');
const path=require('path');

module.exports = class Product{
    constructor(t){
        this.title=t;
    }

    save() {
        const p = path.join(
          path.dirname(process.mainModule.filename),
          'data',
          'products.json'
        );
      
        fs.readFile(p, (err, fileContent) => {
          let products = [];
          if (!err) {
            try {
              products = JSON.parse(fileContent);
            } catch (parseErr) {
              console.log('Error parsing JSON:', parseErr);
              products = [];
            }
          }
          products.push(this);
          fs.writeFile(p, JSON.stringify(products), (err) => {
            if (err) {
              console.log('Error writing file:', err);
            }
          });
        });
      }
      

    static fetchAll(cb){
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
          );
        fs.readFile(p,(err,filrContent)=>{
            if(err){
               cb([]);
            }
            cb(JSON.parse(filrContent)) ;
        })
        // return products;
    }
}