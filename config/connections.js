//now we are using mongoose for database connection




const mongoose=require('mongoose')
const url = process.env.MONGODBURL
// const url="mongodb://localhost:27017/LibraryApp"
mongoose.connect(url)

const schema=mongoose.Schema
const bookschema= new schema(
        {
    BookName:String,
    Author:String,
    Genre:String,
    Image:String

        }
)
const authorschema=new schema(
    {
        AuthorName:String,
        AuthorAge:String,
        NoBooks:String,
        Qualification:String,
        Image:String

    }
)
const userschema = new schema(
    {
        emailAddress:String,
        userName:String,
        password:String

    }
)
//creating collections
 const bookdata = mongoose.model("bookdetails",bookschema)
const authordata = mongoose.model("authordetails",authorschema)
const userdata = mongoose.model("userdetails",userschema)

 module.exports={bookdata,authordata,userdata}

//steps:1.require mongoose
//2.create connection..for that copy url from compass
//3.create schema 
//4.according to our needs create different schema objects by making instance of the schema above created
//5.create collections
//6.export collection

// const mongoose=require('mongoose')
// const url="mongodb://localhost:27017/LibraryApp"
// mongoose.connect('url')
// const schema= mongoose.Schema
// const authorschema=new schema(
//     {
//         AuthorName:String,
//         AuthorAge:String,
//         NoBooks:String,
//         Qualification:String,
//         Image:String

//     }
// )
// const authordata=mongoose.model("authordetails",authorschema)
// module.exports={authordata}
