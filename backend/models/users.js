const mongoose = require('mongoose');
const conn = require('../config/db');
//var bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profile:String,
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    try {
        const salt = bcrypt.genSaltSync(12);
        if(this.password && this.isModified('password')){
            this.password = bcrypt.hashSync(this.password , salt);
        }   
    } catch (error) {
        next(error)
    }
    next();
})

userSchema.methods.getAuthToken=async function(data){
    let params = {
        id:this._id,
        name:this.name,
        email:this.email
    }
    var tokenValue = jwt.sign(params,process.env.SECRETKEY);
    this.tokens= this.tokens.concat({token:tokenValue})
    console.log(this.token,'-',this.tokens)
    await this.save();
    return tokenValue;

 }

let users = conn.model('users', userSchema);



module.exports = users;