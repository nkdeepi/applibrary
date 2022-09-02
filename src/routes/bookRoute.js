const express = require("express");
const { bookdata } = require("../../config/connections");
const {isLoggedin} = require('./../../config/authentication')
const router = express.Router();

router.get("/",isLoggedin, async (req, res) => {
  // const data = await bookdata.find()
  bookdata.find().then((Books) => {
    // console.log("books are",Books)

    res.render("books", { Books });
    // res.json(Books)
  });
  // res.render("books",{data})
});
router.get("/addingbooks",(req,res)=>{
  console.log("book adding")

  res.render('addbook')
})

// router.get("/addbook", (req, res) => {
  
//     res.render("addbook",{ Books});
//   });
  

// http://localhost:8000/books

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  bookdata.findById(id).then((Books) => {
    // console.log("Single Book",Books)

    res.render("book", { Books, id });
  });
});
//adding new books

router.post("/addbook", async (req, res) => {
  const data = {
    BookName: req.body.BookName,
    Author: req.body.Author,
    Genre: req.body.Genre,
    Image: req.body.Image,
  };
  console.log("added", data);
  const newdata = bookdata(data);
  await newdata.save();
  res.redirect("/books");
  // res.send("added")
});

//update

router.get("/updatebooks/:id", (req, res) => {
  const id = req.params.id;
  bookdata.findById(id).then((Books) => {
    console.log("LIST OF Books", Books);

    res.render("updateBook", { Books });
  });
});
router.post("/updatebooks/:id", (req, res) => {
    // console.log("worked")
  const id = req.params.id;
//   console.log(req.body)

  const updateddata = {
    BookName: req.body.BookName,
    Author: req.body.Author,
    Genre: req.body.Genre,
    Image: req.body.Image,
  };
//     console.log(updateddata)
  //   console.log(id)
  //   console.log(req.body)
//   bookdata.updateOne({ _id: id }, { $set: updateddata }).then((err) => {
//     console.log(err);
//     res.redirect("/books");
//   });
bookdata.findByIdAndUpdate(id,{$set:updateddata}).then((error)=>{
    console.log(error)
    res.redirect('/books')
})
});

//delete

router.get("/deletebooks/:id", (req, res) => {
  const id = req.params.id;
  bookdata.findById(id).then((Books) => {
    console.log("LIST OF Books", Books);

    res.render("deletebooks", { Books });
  });
});
router.get("/dropbook/:id",(req,res)=>{
    const id = req.params.id;
    bookdata.findByIdAndDelete(id).then((result)=>{

        console.log(result)
        res.redirect('/books')
    })

})

router.post("/deletebooks/:id", (req, res) => {
  const id = req.params.id;
//   const deletedata = {
//     BookName: req.body.BookName,
//     Author: req.body.Author,
//     Genre: req.body.Genre,
//     Image: req.body.Image,
//   };
  bookdata.deleteOne({ _id: id }).then((error) => {
    console.log(error);
    res.redirect("/books");
  });
});

module.exports = router;

// const Storage=multer.diskStorage({
//     destination:'./public/uploades',
//     filename:function(req,file,callback){
//         callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
// const upload=multer({
//     storage:Storage
// }).single('image')
// Rijil s10:28 AM
// enctype="multipart/form-data

// router.post('/addbooks',(req,res) => { //http://localhost:8000/books/addbook

//     console.log(req.body)
//     upload(req,res,(error)=>{
//         if(error){
//         console.log("err",error)
//     }else{
//     const regBook = new bookData({
//         bookname:req.body.bookname,
//         bookdesc:req.body.bookdesc,
//         language:req.body.language,
//         email:req.body.email,
//         country:req.body.country,
//         price:req.body.price,
//         image:{
//             data:req.file.filename,
//             co
// Rijil s10:32 AM
// contentType:'image/png'
//         }
//     })
//    // let bookinfo = bookData(regBook)
//    regBook.save((error,result)=> {
//         if(error)
//             throw error;
//         else {
//             //console.log(result)
//            // res.json(result);
//            res.redirect('/books')
//         }
//    })
// }
// })

// //    res.send(bookData);

// })
// ysq-cruf-vop
