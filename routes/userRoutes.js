const express = require("express")
const { UserModel } = require("../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const{username,email,password} = req.body

    try {
        const checkUser = await UserModel.findOne({email})
        if(checkUser){
            return res.send({"msg":"this email is already used"})
        }
        bcrypt.hash(password, 7, async(err,hash)=>{
            if(err){
                res.send({"msg":err})
            }else{
                const newUser = new UserModel({username,email,password:hash})
                await newUser.save()
                res.status(200).send({"msg":"New user has been registered"})
            }
        })
    } catch (error) {
        res.status(400).send(`error ${error}`)
    }
})

//login
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err,result)=>{
                if(result){
                    const token = jwt.sign({userId:user._id,user:user.username},"masai",{expiresIn:"1h"})
                    res.status(200).send({"msg":"login Successful",token})
                }else{
                    res.send({"error-msg":err})
                }
            })
        } else {
            res.status(200).send({"msg":"wrong credential"})
        }
    } catch (error) {
        res.send(error)
    }
})


module.exports = {userRouter}