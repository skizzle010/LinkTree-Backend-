const User = require("../models/User");
const jwt_decode = require('jwt-decode')

exports.dashBoardData = async(req,res)=>{
    const {tokenMail}=req.body;
    console.log(tokenMail)
    try{
        const decodedTokenMail = jwt_decode(tokenMail,process.env.JWT_SEC)
        const email = decodedTokenMail.email;
        const user = await User.findOne({email:email})
        const userData ={
            name: user.name,
            role: user.roles,
            avatar: user.avatar,
            handle: user.handle,
            links: user.links.length
        }
        return res.json({message:'success from backend',userData,status:'okay'})
    }catch(err){
        return res.json({status: 'error',error: error.message })
    }
}



