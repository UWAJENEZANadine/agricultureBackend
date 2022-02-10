import UserInfos from "../models/user";
import productInfos from "../models/products";

class datachecker{
    //check if email exist
    static async  isEmailExist(req,res,next){
        const user = await UserInfos.findOne({email:req.body.email});
        if(!user){
            return next();
        }
        return res.status(404).json({error:"email arleady exists!"})
    }

    static async checkProductAccess(req,res,next){

        const product = await productInfos.findById(req.params.id);

        if(req.user._id == product.seller._id){
            return next();
        }

     return res.status(404).json({ error: "You are not authorised to this product"})

    
    }
    
}

export default datachecker;