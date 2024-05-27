const mongoose =require("mongoose");

const testnameSchema=new mongoose.Schema({
    testname:{
        type:"String",
    },
    testid:{
        type:"String"
    },
    noofque:{
        type:"Number",
    },
    time:{
        type:"Number",
    }
});
const testnames=mongoose.model("Testnames",testnameSchema);
module.exports=testnames;