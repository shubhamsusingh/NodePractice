const fs=require('fs');
const path= require('path');
const Product = require('./products');
const cart= require('./cart');
const p=path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);
module.exports=class Cart{
    static addProduct(id,productPrice){
        fs.readFile(p,(err,fileContent)=>{
            let cart={product:[],totalPrice:0};
            if(!err){
                cart=JSON.parse(fileContent);
            }
            const existingProductIndex = cart.product.findIndex(prod=>prod.id==id);
            const existingProduct=cart.product[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct={...existingProduct};
                updatedProduct.qty=updatedProduct.qty+1;
                cart.product=[...cart.product];
                cart.product[existingProductIndex]=updatedProduct;
            }else{
                updatedProduct={id:id,qty:1};
                cart.product=[...cart.product,updatedProduct];
            }
            cart.totalPrice=cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
            })

        })
    }

   static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return;
        }
        const cart = JSON.parse(fileContent);
        const product = cart.product.find(prod => prod.id === id);
        if (!product) {
            return;
        }
        const productQty = product.qty;
        cart.product = cart.product.filter(prod => prod.id !== id);
        cart.totalPrice = cart.totalPrice - productPrice * productQty;
        fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(err);
        });
    });
}

}