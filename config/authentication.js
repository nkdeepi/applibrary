const session = require('express-session')
const mongodbsession = require('connect-mongodb-session')(session)
const store = new mongodbsession({
    uri:"mongodb://localhost:27017/LibraryApp",
    collection:"mycollection"


})


const isLoggedin = (req,res,next)=>{
    if(req.session.auth){
        next()
    }
    else {
        res.redirect('/login')
    }
}
module.exports = {store,isLoggedin}