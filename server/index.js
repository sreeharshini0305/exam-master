const dotenv=require('dotenv');
dotenv.config();
const express=require("express")
const app=express();
const cookieparser=require('cookie-parser');
app.use(cookieparser());
const cors=require('cors');
app.use(cors());
const router=require("./routers/Routes");
app.use(router);
app.use(express.json());
const mongoose=require("mongoose");
mongoose.connect(process.env.databasecnct,({ useNewUrlParser: true, useUnifiedTopology: true })).then(()=>{
    console.log("connected to the database");
})
app.get('/',(req,res)=>{
    res.send("backend server started");
})

app.listen(4000,()=>{
    console.log("connected");
})