const express = require("express");
const router = express.Router();
const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    console.log("Authheader",authHeader)
    const token= authHeader && authHeader.split(' ')[1]
    console.log("AuthToken",token)
    if(token==null) return res.sendStatus(401) 
    
    jwttoken.verify(token,process.env.JWT_KEY,(err,user)=>{
        if(err) return res.sendStatus(403)
        
        req.user=user
        console.log("user",user)
        next()
    })
}
const jwttoken = require('jsonwebtoken')
let tokenArray = []

router.get('/getuser', authenticateToken,(req,res)=>{
let user = req.user
res.json(user)
})

router.post('/jwt', (req, res) => {
    const details = {
        password: req.body.password,
        emailAddress: req.body.emailAddress

    }
    const token = jwttoken.sign(details, process.env.JWT_KEY,{expiresIn:"1m"})
    tokenArray.push(token)
    res.json(token)



})





module.exports = router;