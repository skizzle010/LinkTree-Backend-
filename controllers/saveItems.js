const User = require("../models/User");
const jwt_decode = require('jwt-decode')

exports.saveLinks = async (req, res) => {
    const {tokenMail,links}=req.body;
    try{
        const decodedTokenMail = jwt_decode(tokenMail,process.env.JWT_SEC)
        const email = decodedTokenMail.email;
        const user = await User.findOne({email:email});
        const newLinks = links.map((l)=>({
            url:l.link.url,
            title: l.link.title,
            icon:""
        }))
        user.links = newLinks;
        await user.save();
        return res.json({message:'saved',status:'success'})
    }catch(err){
        return res.json({status: 'error',error: err.message })

    }
}

// exports.saveSocials = async (req, res) => {
//     const   {tokenMail,socials}=req.body;
//     try{
//         const decodedTokenMail = jwt_decode(tokenMail,process.env.JWT_SEC)
//         const email = decodedTokenMail.email;
//         const user = await User.findOne({email:email});
//         user.socialMedia = socials;
//         user.save();
//         return res.json({message:'saved',status:'success'})
//     }catch(err){
//         return res.json({status: 'error',error: error.message })

//     }
// }


