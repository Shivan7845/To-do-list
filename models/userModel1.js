const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
    task_no :String,
    date : String,
    work : String,
})
const work = mongoose.model("work" , userModel);
module.exports = work;