//create mini express app
const exp = require('express')
const userApi = exp.Router();
const expressErrorHandler = require("express-async-handler")
const multerObj=require("./middlewares/addfile")
const checkToken = require("./middlewares/verifyToken")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

//body parsing middleware
userApi.use(exp.json())


//create user
userApi.post("/createuser", multerObj.single('photo'), expressErrorHandler(async (req, res) => {

    let userCollectionObject = req.app.get("userCollectionObject")

    //get user obj and parse it
    let newUser = JSON.parse(req.body.userObj);

    //search for user
    let user = await userCollectionObject.findOne({ username: newUser.username })

    //if user is existed
    if (user !== null) {
        res.send({ message: "User already existed" })
    }
    else {
        //hash the password
        let hashedPassword = await bcryptjs.hash(newUser.password, 7)
        //replace plain pw with hashedPassword
        newUser.password = hashedPassword;
        //add CDN link of image
        newUser.profileImage = req.file.path;
        //insert user
        await userCollectionObject.insertOne(newUser)
        res.send({ message: "User created" })
    }


}))















//read all users using promise
userApi.get("/getusers", expressErrorHandler(async (req, res, next) => {

    let userCollectionObject = req.app.get("userCollectionObject")

    let usersList = await userCollectionObject.find().toArray();
    res.send({ message: usersList })

}))



//get user by username
userApi.get("/getuser/:username", expressErrorHandler(async (req, res, next) => {

    let userCollectionObject = req.app.get("userCollectionObject")

    //get username from url params
    let un = req.params.username;
    //search for user
    let user = await userCollectionObject.findOne({ username: un })

    if (user === null) {
        res.send({ message: "User not existed" })
    }
    else {
        res.send({ message: user })
    }

}))
















//update user
userApi.put("/updateuser/:username", expressErrorHandler(async (req, res, next) => {
    let userCollectionObject = req.app.get("userCollectionObject")

    let modifiedUser = req.body;

    await userCollectionObject.updateOne({ username: modifiedUser.username }, { $set: { ...modifiedUser } })

    res.send({ message: "user updated" })
}))



//delete
userApi.put("/deleteuser/:username", expressErrorHandler(async (req, res, next) => {
    let userCollectionObject = req.app.get("userCollectionObject")

    //get username from url params
    let un = req.params.username;

    //find user
    let user = await userCollectionObject.findOne({ username: un })

    //if user not existed
    if (user === null) {
        res.send({ message: "User not existed" })
    }
    else {
        await userCollectionObject.deleteOne({ username: un })
        res.send({ message: "User removed" })
    }


}))



//user login
userApi.post("/login", expressErrorHandler(async (req, res, next) => {

    let userCollectionObject = req.app.get("userCollectionObject")

    let credentials = req.body;

    //verify username
    let user = await userCollectionObject.findOne({ username: credentials.username })

    //if user is not existed
    if (user === null) {
        res.send({ message: "Invalid username" })
    }
    //if user is existed
    else {
        //compare passwords
        let result = await bcryptjs.compare(credentials.password, user.password)
        //if pws not mtched
        if (result === false) {
            res.send({ message: "Invalid password" })
        }
        //if passwords are matched
        else {
            //create a token and send it as res 
            let token = await jwt.sign({ username: credentials.username }, 'abcdef', { expiresIn: 10 })

            //remove password from user
            delete user.password;
            res.send({
                message: "login-success",
                token: token,
                username: credentials.username,
                userObj: user
            })
        }
    }
}))






//protected route
userApi.get("/testing", checkToken, expressErrorHandler((req, res) => {

    res.send({ message: "this is protected data" })
}))




module.exports = userApi;