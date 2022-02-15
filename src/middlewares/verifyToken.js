// import { userInfo } from "os";
import {nextTick} from "process";
import TokenAuth from "../helpers/tokenAuth";
import UserInfos from "../models/user";



const isUserExist = async (req,res,next)=>{
    try{
        const token = req.header("x-auth-token");
        if(!token){
            return res.status(400).json({error:"no token provided"})
        }
        const data =TokenAuth.decodeToken(token);
        const {name}= data
        if(name==="jswebTokenError"){
            return res.status(400).json({error:"invalid jwt"})
        }
        if(name==="tokenExpiredError"){
        return res.status(400).json({error:"token is expired"})
    }
    

    // console.log(data);
    req.user=data.user;
    const user = await UserInfos.findById(req.user._id)
    return next();
    }
    catch(error){
        console.log(error);
    }
}
export default isUserExist;