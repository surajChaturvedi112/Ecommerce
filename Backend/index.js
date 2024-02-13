const express = require("express");
require("./db/config");
const User =require("./db/User")
const app = express();
const cors = require("cors")
app.use(express.json());

app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result ? res.send("Data saved sucessfull") : res.send("Something went wrong");
})

app.post("/login", async (req, res) => {
    let user = await User.findOne(req.body).select("-password");
    if(req.body.email && req.body.password){
        user ? res.send(user) : res.send({result: "No user found"})     
    }else{
        res.send({result: "No user found"})
    }   
})

app.listen(5000, () => {
    console.log("server is running on port 5000");
});

