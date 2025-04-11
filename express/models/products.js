const fs= require('fs');
const path=require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
  );

const getProductsFromFile = cb=>{
    
    fs.readFile(p,(err,filrContent)=>{
        if(err){
          return cb([]);
        }else{

            cb(JSON.parse(filrContent)) ;
        }
    })
}
module.exports = class Product{
    constructor(title,imgUrl,price,description){
        this.title=title;
        this.imgUrl=imgUrl;
        this.price=price;
        this.description=description;
    }

    save() {
       getProductsFromFile(products=>{
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) {
            console.log('Error writing file:', err);
          }
        });
       });
      }
      

    static fetchAll(cb){
       getProductsFromFile(cb);
    }
}