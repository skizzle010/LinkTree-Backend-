const User=require ('../models/User.js');

exports.getUserSocials = async (req, res, next) => {
    const handle = req.params.handle;
    try{
        const user = await User.findOne({handle: handle})
        const socials = user.socialMedia;    
        return res.json({message:'found',socials, status: 'success'})
    }catch(err){
        return res.json({message:'not found', status: 'error', error: err.message})
    }
}

