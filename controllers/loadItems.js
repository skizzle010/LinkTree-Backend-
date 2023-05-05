const User = require("../models/User");
const jwt_decode = require('jwt-decode')

exports.loadLinks = async(req,res)=>{
    const {tokenMail}=req.body;
    try{
        const decodedTokenMail = jwt_decode(tokenMail,process.env.JWT_SEC)
        const email = decodedTokenMail.email;
        const user = await User.findOne({email:email})
        const links = user.links;
        return res.json({message:'found',links,status:'success'})
    }catch(err){
        return res.json({status: 'error',error: err.message })
    }

}

