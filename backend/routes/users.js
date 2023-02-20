const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended:false}))

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
    //  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now()+'_'+file.originalname)
    }
  })
  const upload = multer({ storage: storage }) 

var jwt = require('jsonwebtoken');

var jwtAuth =(req,res,next)=>{
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,process.env.SECRETKEY,function(err,decoded){
        if(err){
            console.log(err)
            res.send({message:'invalid token'})
        }else{
            console.log(jwt.decode(token));
            res.user =jwt.decode(token);
            next();
        } 
    })
}

router.get('/',userController.userHome)
router.get('/list',jwtAuth,userController.userList);
router.post('/addUser',upload.single('image'),userController.addUser)
router.post('/login',userController.userLogin)

module.exports=router;