import express from "express";
import UserController from "../controllers/userController";
import Validator from '../middlewares/validator';
import datachecker from '../middlewares/datachecker';


const userRouter = express.Router(); 	
//  userRouter.post("/register",
//  datachecker.isEmailExist,
//  Validator.newAccountRules(),
//  Validator.ValidatorInput,
//   UserController.createUser)

//import verfyAccess from "../middlewares/verifyAccess"
  

userRouter.post("/register", UserController.createUser)

userRouter.get("/all",UserController.getallUser)
userRouter.get("/:id",UserController.getOneUser)
userRouter.delete("/:id",UserController.deleteOneUser)
userRouter.patch("/:id",  UserController.updateUser)
userRouter.post("/login",UserController.userLogin)





export default userRouter;