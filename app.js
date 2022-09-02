require('dotenv').config()

const express = require("express");
const app = new express();
const bcrypt = require("bcrypt")
const session = require('express-session')
let port = process.env.PORT || 8000


//connecting client and server

const bookRoute = require("./src/routes/bookRoute");
const authorRoute = require("./src/routes/authourRoute");
const { userdata } = require('./config/connections')
const { store,isLoggedin } = require('./config/authentication')
 const jwt = require('./src/routes/jwt')
// const {bookdata,authordata}=require('./config/connections')

//setting middleware
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true })); //to be used in the case of post method

app.use(express.static("./public")); //indicating express that static files are contained in public folder,use before app.set
app.use(session({
  secret:process.env.SESSION_SECRET ,
  resave:false,
  saveUninitialized:false,
  store:store
  
}))


app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use("/books", bookRoute);
app.use("/author", authorRoute);
app.use('/jwt',jwt)




app.get("/", (req, res) => {
  // res.sendFile(__dirname+'/src/views/index.html')
  res.render("index");
});

//setting routes for register and login ,logout
app.get('/register',(req,res)=>{
  res.render("register")
})
app.get("/login",(req,res)=>{
  res.render('login',{message:"A"})
})
app.get('/logout',(req,res)=>{
  req.session.destroy((error)=>{
    if(error) throw error
    else{

      res.redirect('/login')
    }
  })
//destroy method is used to end the session ,
})
app.post('/registeruser',async(req,res)=>{
  let hashedpassword = await bcrypt.hash(req.body.password,10)
  const userdetails = {
    emailAddress:req.body.emailAddress,
    userName:req.body.userName,
    password: hashedpassword
    
  }
  console.log("reqbody",req.body)
  const newuserdetails = userdata(userdetails)
 await newuserdetails.save();
  res.redirect('/login')
  // console.log("dataposting")
  
})
//password is encrypted using bcrypt package.


app.post('/loginuser',(req,res)=>{
let email = req.body.emailAddress
let password = req.body.password
userdata.findOne({emailAddress:email}).then((values)=> 
{
  if(values == null ) {
    res.render("login",{message:"B"})

  }
  else
  {
    bcrypt.compare(password,values.password,(error,result)=>
    {
      if(error) throw error
      else {
        console.log("result",result)
        if(result) {
          req.session.auth = true
          //auth userdefined

          res.redirect('/books')
        }
        else{
          res.render('login',{message:"C"})
        }

      }


    
    })
  }
  console.log("login values",values)
}
)
// console.log("Username",username)
// console.log("password",password)
  

})
app.listen(port, () => {
  console.log("http://localhost:8000");
});










// const Books = [
//   {
//     bookname: "Tom and jerry",
//     Author: "Joseph",
//     Genre: "Comics",
//     image: "tom.jpg",
//   },
//   {
//     bookname: "Abc",
//     Author: " Jhon",
//     Genre: "Crime",
//     image: "chuchutv.jpg",
//   },
//   {
//     bookname: "XYZ",
//     Author: " Luther",
//     Genre: "Fanacy",
//     image: "kathu.jpg",
//   },
//   {
//     bookname: "PQR",
//     Author: "RAM",
//     Genre: "Thriller",
//     image: "cocomelon.jpg",
//   },
// ];
// const author = [
//   {
//     authorname: "Balaguruswamy",
//     authorage: "50",
//     publishedbooks: 7,
//     qualification: "MPhil",
//     image: "balaguruswamy.jpg",
//     details:
//       "Balaguruswamy is a teacher, consultant, author and former member of UPSC. He has also written: Programming in ANSI C, Programming With Java : A Primer, Computing Fundamentals And C Programming and Reliability Engineering among other titles. ",
//   },

//   {
//     authorname: "Chethan Bagath",
//     authorage: "60",
//     publishedbooks: 10,
//     qualification: "PHD",
//     image: "chethan.jpg",
//     details:
//       "Bhagat graduated in mechanical engineering at IIT Delhi a PGP at IIM Ahmedabad. He started his career as an investment banker but left it after a few years to pursue writing. He has written ten novels and three non-fiction books. His first novel, Five Point Someone, was published in 2004",
//   },
//   {
//     authorname: "Amritha Pritham",
//     authorage: "50",
//     publishedbooks: 7,
//     qualification: "PHD in Literature",
//     image: "amritha.jpg",
//     details:
//       "She was the first female recipient of the Sahitya Akademi Award in 1956 for Sunehadey (poetic diminutive of the Punjabi word  (Sunehe), Messages), Amrita Pritam received the Bhartiya Jnanpith Award, India's highest literary award, in 1982 for Kagaj te Canvas (Paper and Canvas).",
//   },
// ];