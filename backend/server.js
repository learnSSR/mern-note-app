const chalk=require("chalk");
const express = require('express');
const data = require('./data/data')
const dotenv  =require('dotenv');
const path = require('path')
const connectDB = require('./config/db.js')
const userRoutes = require('./Routes/userRoutes')
const noteRoutes = require('./Routes/noteRoutes')
const { notFound, errorHandler } = require('./Middleware/errorMiddleware')

const app = express();
dotenv.config();
 connectDB();
app.use(express.json())
//sending and testing changes to github

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

//------------------- deployment --------------------

__dirname=path.resolve()
console.log(__dirname)
if (!(process.env.NODE_ENV === 'development')){
    //      request , respond 
app.get('/',(req,res, nxt)=>{
    res.send('Api in running...')
})
}else{
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'/frontend/build',"index.html"));
    })
}
// app.get('/api/notes/:id', (req,res)=>{
//     console.log(req.params)
//     const {id} = req.params
//     res.json(data.find(dt=>dt._id == id ))
// })

app.use(notFound)
app.use(errorHandler)
app.use(logger)

function logger(req, res ,next){
    console.log("logger")
    next()

}

app.listen(process.env.PORT || 5000,()=>{
    console.log(chalk.magentaBright(`server started in PORT ${process.env.PORT}`))
})
