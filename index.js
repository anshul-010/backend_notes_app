const express = require("express")
const {conntection} = require("./db")
const { userRouter } = require("./routes/userRoutes")
const { noteRouter } = require("./routes/noteRoutes")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use("/note",noteRouter)

app.get("/",(req,res)=>{
    res.send("this is a home page")
})

app.listen(8080,async()=>{
    try {
        await conntection
        console.log(`Connected to DB`)
        console.log(`server is running on port 8080`)
    } catch (error) {
        console.log(error)
    }
})