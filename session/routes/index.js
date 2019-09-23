var express = require('express');
var router = express.Router();
 
router.get('/index', function(req, res, next) {  
  if(req.session.user!== null){
    req.user=req.session.user;
  }   
  console.log(req.user)
  res.render('index', req); 
});
 
 
router.get('/login', function (req,res,next){   
  res.render('login')  
})
 
 
router.post('/login', function (req,res,next){   
  var username = req.body.username;
  var pwd = req.body.pwd;
  var user={  
    username:'admin',  
    pwd:123456  
  }  
  if(username==user.username && pwd==user.pwd){
    req.session.user =  {username:username,pwd:123456};
    res.redirect('index'); 
  }else{
    req.error = '用户名密码错误'
    res.render('login' , req) ;
  }  
  
})  
 
 
router.get('/logout', function (req,res,next){ 
  //删除Cookie   
  delete req.session.user;
  res.redirect('index'); 
})
module.exports = router;
