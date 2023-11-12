const User = require('../models/People');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');


function getLogin(req,res,next){
    res.render("index",{
        tittle:"Login - Chat Application"
    })
}

async function login(req,res,next){
    try{
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }],
        });
        if(user && user._id){
            const isValidPassword = bcrypt.compare(user.password,req.body.password);
            console.log("User is valid");
            if(isValidPassword){
                console.log("Password is valid");
                const userObject = {
                    username:user.name,
                    mobile: user.mobile,
                    email:user.email,
                    role:user,
                };
                const token = jwt.sign(userObject,process.env.JWT_SECRET,{
                    expiresIn:'1h'
                })

                res.cookie(process.env.APP_NAME,token,{
                    maxAge:8600000,
                    httpOnly:true,
                    signed:true,
                });

                res.locals.loggedInUser = userObject;
                res.render("inbox");
            }else{
                throw createError("Login Failed, Please Try again Later");
            }  
        }else{
            throw createError("Login Failed, Please Try again Later");
        }   
    }catch (err) {
    res.render("index", {
      data: {
        username: req.body.name,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

function logout(req,res){
    res.clearCookie('Chat Application');
    res.send("Logged Out");
}

module.exports ={
    getLogin,
    login,
    logout
};