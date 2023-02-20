const Users = require('../models/users')
const bcrypt = require('bcrypt');
const { response } = require('express');
const userHome =(req,res)=>{
    res.send('hello world');
}

const userList = async(req,res)=>{
    console.log(res.user);
    let currentUser = res.user
    let data=await Users.find();
    let userData = await Users.findOne({email:currentUser.email})
    console.log(userData); 
    res.json({data,currentUser,userData})
}

const addUser = async(req,res)=>{
    console.log(req.body);
    let profile = (req.file)?req.file.filename:null;
    let {name,email,password} = req.body;
    let data =await Users({
        name,
        email,
        password,
        profile
    })
    
    let response =await  data.save()
    let myToken =await data.getAuthToken();
    res.status(200).json({message:'ok',token:myToken}) 
    // res.status(200).json({message:'ok'}) 
}

// const userLogin = async(req,res)=>{
//     if(!req.body.email||!req.body.password){
//         res.status(301).json({message:'error'})
//     }
//     console.log(req.body)
//     let user = await Users.findOne({email:req.body.email})
    
//     if(user){
//         let match = await bcrypt.compare(req.body.password,user.password)
//         if(match){
//             let myToken =await user.getAuthToken();
//             res.status(200).json({message:'ok'})
//         }else{
//             res.status(301).json({message:'invalid password  '})
//         }
        
//     }else{
//         res.status(301).json({message:'invalid email '})
//     }
//     console.log(user)
// }

const userLogin = async(req,res)=>{
    if(!req.body.email||!req.body.password){
        res.status(301).json({message:'error'})
    }
    console.log(req.body)
    let user = await Users.findOne({email:req.body.email})
    var resposnseType={
        message:'ok'
    }
    if(user){
        let match = await bcrypt.compare(req.body.password,user.password)
        if(match){
            let myToken =await user.getAuthToken();
            resposnseType.message='Login Successful';
            resposnseType.token = myToken;
        }else{
            resposnseType.message='Invalid Password';
        }
        
    }else{
        resposnseType.message='Invalid email id';
    }
    res.json({message:resposnseType})
}

module.exports={
    userHome,
    userList,
    addUser,
    userLogin
}