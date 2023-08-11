const express = require('express')
const mangoose = require('mangoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const {readdirSync} = require('fs')

//server
const app = express()

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true
})
.then(()=>console.log("DB CONNECTED"))
.catch(err=>console.log(`DB CONNECTION ERROR`,err))

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}))
app.use(cors())
readdirSync("./routes").map((r)=>app.use(require("/api","./routes" + r)))

//route
app.get("/api", (req,res)=>{
    res.json({
        data:"hey you hit node api"
    })
})

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})