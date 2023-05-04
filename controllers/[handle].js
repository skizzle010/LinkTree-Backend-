const User = require('../models/User');

exports.getUserData = async (req, res) => {
    const handle=req.params.handle;
    try{
        const user = await User.findOne({handle:req.params.handle});

        const userData = {
            name:user.handle,
            avatar:user.avatar,
            bio:user.bio,
            links:user.links

        }
        return  res.json({message:'found',userData,status:'success'})
    }catch(err){

        return res.json({status:'error',error:err.message})
    }
}

