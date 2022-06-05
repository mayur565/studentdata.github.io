const mongoose = require("mongoose")

const studentschema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
      },
      lname: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      
})

module.exports = studentdata = new mongoose.model("stddata" , studentschema)

