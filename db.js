const mongoose = require("mongoose")
require("dotenv").config()


const conntection = mongoose.connect(process.env.mongoUrl)

module.exports = {conntection}
