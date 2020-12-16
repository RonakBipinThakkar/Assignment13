var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
app.use(bodyParser.json());
var dbPath = 'mongodb+srv://Ronak_Db_Default:WeakPassword@nodeproject.bnly6.mongodb.net/Assignment13?retryWrites=true&w=majority';
var Product = mongoose.model('product', {
    product: {
        productid: Number,
        category: String,
        price: String,
        name: String,
        instock: Boolean
    },
    id : Number
});
mongoose.connect(dbPath, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err) => {
    console.log("Mongodb connection is successfully established!", err);
});
//to retrieve products from the database
app.get('/product/get/', async (req, res) => {
    var products = {};
    var data = await Product.find({});
    data.forEach((value) => {
        products[value.id] = value.product;
    });
    res.send(products);
});
// to add product to database
app.post('/product/create/', async (req, res) => {
    try{
        var product = new Product(req.body);
        await product.save();
        console.log("Added the new product successfully!");
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
 // to update product
app.put('/product/update/:id', async (req, res) => {
    try{
        var reqestId = req.params.id;
        console.log(req.body)
        await Product.findOneAndUpdate({id: reqestId}, req.body);
        res.sendStatus(200);   
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
 // to delete the product
app.delete('/product/delete/:id', async (req, res) => {
    var reqestId = req.params.id;
    await Product.findOneAndDelete({id: reqestId});
    res.sendStatus(200);
});
app.listen(4000, () => {
    console.log('server is listening on port number:4000');
});