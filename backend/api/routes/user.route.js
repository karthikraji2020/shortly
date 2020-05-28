const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');
const checkAuth = require('./../middleware/check-auth');

/*
        https://localhost:3000/userid/createshorturl
*/ 


router.post('/register',userController.user_register);
router.post('/login',userController.user_login);
router.get('/',userController.get);
router.delete("/:userId", checkAuth, userController.user_delete);


router.post('/posts/upvote', function(req, res) {
// /////////////////////
  // dbo.createCollection("customers", function(err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  //   db.close();
  // });
// ///////////////
  // const post = new Post({
  //   // _id: mongoose.Types.ObjectId(),
  //   title: req.body.title,
  //   url: req.body.url,
  //   votes: req.body.votes + 1
  // })

  // post.save(function(err, rec) {
  //   if(err) {
  //     return res.status(400).send("error while creting a post")
  //   }
  //    console.log(rec);
  //   res.send(rec);
  // })
})

module.exports = router;
