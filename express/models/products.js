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
    constructor(id,title,imgUrl,price,description){
      this.id=id;
        this.title=title;
        this.imgUrl=imgUrl;
        this.price=price;
        this.description=description;
    }

    save() {
      
       getProductsFromFile(products=>{
        if(this.id){
          const existingProductIndex = products.findIndex(prod => prod.id === this.id);
          const updatedProducts = [...products];
          updatedProducts[existingProductIndex]=this;
          fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
            if (err) {
              console.log('Error writing file:', err);
            }
          });
        }else{
          this.id=Math.random().toString();
          products.push(this);
          fs.writeFile(p, JSON.stringify(products), (err) => {
            if (err) {
              console.log('Error writing file:', err);
            }
          });
        }
        
       });
      }
      

    static fetchAll(cb){
       getProductsFromFile(cb);
    }
    static fetchById(id,cb){
      getProductsFromFile(products=>{
        const product=products.find(p=>p.id===id);
        cb(product);
      })
    }
}