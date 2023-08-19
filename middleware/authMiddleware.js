const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.userId = decoded.userId
                req.body.user = decoded.user
                next()
            }else{
                res.send(err)
            }
        })
    }else{
        res.send({"msg":"please login"})
    }
}


module.exports = {auth}
