var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function (req,res,next){   
  res.render('login')  
})

router.get('/index', function(req, res, next) {  
   if(req.cookies.user !== null){
    req.user=req.cookies.user;
  }
  res.render('index', req);
});

router.get('/logout', function (req,res,next){ 
  //删除Cookie  
  res.clearCookie('user');
  res.redirect('index'); 
})
router.post('/login', function (req,res,next){   
  var username = req.body.username;
  var pwd = req.body.pwd;
  var user={  
    username:'admin',  
    pwd:123456  
  }  
  if(username==user.username && pwd==user.pwd){
    //设置cookie
    console.log(Object.keys(res),"and")
    res.cookie("user", {username: username}, {maxAge: 10000 , httpOnly: true});
    res.redirect('index'); 
  }else{
    req.error = '用户名密码错误'
    res.render('login' , req) ;
  }  
  
}) 

router.get("/error",(req,res)=>{
  res.render("error")
})

module.exports = router;
