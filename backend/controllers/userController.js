const User = require('../Models/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken')
 
const registerUser =  asyncHandler(async (req, res)=>{
        const { name, email, password, pic } = req.body
        
        
        const userExists = await User.findOne({email})

        if (userExists){
            res.status(400)
            throw new Error("User Aleardy Exist")
        }

        const user = await User.create({
            name,
            email,
            password,
            pic,
        })

        if (user){
            res.status(200).json({
                _id: user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                isAdmin:user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error("Error Occured!")
        }
});

const authUser =  asyncHandler(async (req, res)=>{
    const {  email, password } = req.body
    
   
        const user = await User.findOne({email})

        if (user && (await user.matchPassword(password))){
            res.status(200).json({
                 _id: user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                isAdmin:user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(400)
            throw new Error("Invalid Email & Password!!")
        }
});

const updateUserProfile =  asyncHandler(async( req, res )=>{
    const { name, email, password, pic  } = req.body;

    const userProfile  = await User.findById(req.user._id)
    
    if (userProfile){
        userProfile.name = name || userProfile.name
        userProfile.email = email || userProfile.email
        userProfile.pic =  pic || userProfile.pic
        userProfile.password = password || userProfile.password

        const updatedUser = await userProfile.save()
        console.log(updatedUser)
            res.status(201).json({
                _id: updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                pic:updatedUser.pic,
                password:updatedUser.password,
                token:generateToken(updatedUser._id)
            })
    } else {
        res.send(404)
        throw new Error('User Not found !!')
    }
})




module.exports = { registerUser, authUser, updateUserProfile }