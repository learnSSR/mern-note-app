const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
      pic: {
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    },
    {
      timestamps: true,
    }
  );

  //encrypt the password

  userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  })

  //decrypt the password

  userSchema.methods.matchPassword = async function(enteredPassword){
     return await bcrypt.compare(enteredPassword, this.password)
  }

  const User = mongoose.model( 'User', userSchema)
//   async function  show(){
//    const data = await User.find({})
//    console.log(data)
//   }
//   show()
  module.exports = User