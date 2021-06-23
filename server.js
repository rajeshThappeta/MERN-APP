//create express app
const exp = require('express')
const app = exp();
const path = require("path")


//connecting build of react with current server
app.use(exp.static(path.join(__dirname, './build/')))

//import apis
const userApi = require("./APIS/user-api")
const adminApi = require("./APIS/admin-api")
const productApi = require("./APIS/product-api")



//db connectivity

//import mongo client
const mongoClient = require("mongodb").MongoClient;

//db connection url
const dburl = "mongodb+srv://cdb21dx003:cdb21dx003@cluster0.rjvoz.mongodb.net/cdb21dx003db?retryWrites=true&w=majority"




//connect with mongodb server
mongoClient.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) {
        console.log("err in db connect ", err)
    }
    else {
        //create database object
        let databaseObject = client.db("cdb21dx003")
        //create user collection object
        let userCollectionObject = databaseObject.collection("usercollection")
        let adminCollectionObject = databaseObject.collection("admincollection")
        let productCollectionObject = databaseObject.collection("productcollection")

        //sharing collection object
        app.set("userCollectionObject", userCollectionObject)
        app.set("adminCollectionObject", adminCollectionObject)
        app.set("productCollectionObject", productCollectionObject)


        console.log("DB connection success")
    }

})
























//execute specific api based on path
app.use('/user', userApi)
app.use('/admin', adminApi)
app.use('/product', productApi)













app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})


//handle invalid path
app.use((req, res, next) => {
    res.send({ message: `path ${req.url} is invalid` })
})

//handle errors
app.use((err, req, res, next) => {
    console.log(err)
    res.send({ message: err.message })

})


//assign port
const port = 8080;
app.listen(port, () => console.log(`server listening on port ${port}..`))