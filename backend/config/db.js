const mongoose = require('mongoose')
const chalk = require('chalk')
mongoose.set('strictQuery', false);
const connectDB = async ()=>{
     try {
      const conn = await mongoose.connect(process.env.MONGO_URI, { 
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log(chalk.rgb(255, 136, 0).bold(`mongodb connect : ${conn.connection.host}`))
     } catch (error) {
        console.log("error",error)
        process.exit()
     }
}
//https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg

module.exports = connectDB