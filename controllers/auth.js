const User = require("../models/User");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { createError } = require("../error");
const cookieParser =require("cookie-parser")

exports.registerUser = async (req, res, next) => {
  const {handle,email,password,category} = req.body;
  console.log(category);
  try{
    const findUser = await User.findOne({ email:email });
    if(findUser){return res.json({message:"User already exists",status:"fail"}) }
    const defaultLink = {url: 'youtube.com',title:"Youtube",icon:""}
    const defaultLink2 = {url: 'instagram.com',title:"Instagram",icon:""}

    const user = await User.create({handle,email,password,roles:category,links:[defaultLink,defaultLink2]})
    console.log(user);

    const token = jwt.sign({email:email},process.env.JWT_SEC)
    return res.json({message:'success',status:'success','token':token,id:user._id})
  }catch(err){
    console.log(err);
    if(err.code === '11000'){
      return res.json({message: "Try a different handle or email",status: 'error'})
    }
    return res.json({message:err.message,status:'error'})
  }
}




  exports.login = (req, res)=>{
    const { email, password } = req.body;
    try {
        const user = User.findOne({email: email, password: password});

        if(!user){
            return res.json({status: 'not found', error: 'Invalid credentials'})
        }
        const token = jwt.sign({email: email}, process.env.JWT_SEC);
        return res.json({message: 'user found', status: 'success', 'token': token, id: user._id});
    } catch (err) {
        return res.json({message: err.message, status: 'error'});
    }
}


  //   const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  //   if (originalPassword !== req.body.password)
  //     return res.status(401).json("Wrong Credentials!");

  //   const accessToken = jwt.sign(
  //     {
  //       id: user._id,
  //       isAdmin: user.isAdmin,
  //     },
  //     process.env.JWT_SEC,
  //     { expiresIn: "5d" }
  //   );
  //   res
  //     .cookie("access_token", accessToken, {
  //       httpOnly: true,
  //     })
  //     .status(200)
  //     .json(user);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
