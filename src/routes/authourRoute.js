const express = require('express')
const { authordata} = require('../../config/connections')
const router = express.Router();




router.get("/", (req, res) => {
    authordata.find().then(( author )=>{
        // console.log(author)

        res.render("author", { author });
    })
  });

  
  

  router.get("/addauthor",(req,res)=>{
    res.render('addauthor')
  
  })
  router.post('/addauthor',async (req,res)=>{
    const adata={
      AuthorName:req.body.authorname,
      AuthorAge:req.body.authorage,
      NoBooks:req.body.nbooks,
      Qualification:req.body.qualification,
      Image:req.body.image
  
    }
    console.log("author data added",adata)
    const newAuthorData = authordata(adata);
    await newAuthorData.save();
    res.redirect('/author')
  
  })


 
  router.get("/:Aid", (req, res) => {
    const Aid = req.params.Aid;
    res.render("singleauthor", { author, Aid });
  });

  module.exports = router;