import UserInfos from "../models/user";
import bcrypt from "bcrypt";
import tokenAuth from "../helpers/tokenAuth";
import sendSms from "../helpers/sendSms";

class UserController {
  //Create user

  static async createUser(req, res) {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashPassword;

    const user = await UserInfos.create(req.body);

    if (!user) {
      return res.status(404).json({ error: "user not registered" });
    }
    return res
      .status(200)
      .json({ message: "User created successfully", data: user });
  }

  static async getallUser(req, res) {
    const users = await UserInfos.find(req.body);
    if (!users) {
      return res.status(400).json({ error: "user not registerd" });
    }
    return res.status(200).json({ message: "user is found", data: users });
  }
  static async getOneUser(req, res) {
    const users = await UserInfos.findById(req.params.id);
    if (!users) {
      return res.status(400).json({ error: "user not registerd" });
    }
    const token = tokenAuth.tokenGenerator({ user: users });
    return res.status(200).json({ message: "user is found", data: users,  token: token });
  }
  static async deleteOneUser(req, res) {
    const users = await UserInfos.findByIdAndDelete(req.params.id);
    if (!users) {
      return res.status(400).json({ error: "user not deleted" });
    }

    return res.status(200).json({ message: "user is deleted" });
  }
  static async updateUser(req, res) {
    const users = await UserInfos.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!users) {
      return res.status(400).json({ error: "user is not updated" });
    }
    return res.status(200).json({ message: "user is already updated" });
  }
  //login function
  static async userLogin(req, res) {
    const user = await UserInfos.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      user.password = null;
      const token = tokenAuth.tokenGenerator({ user: user });
      return res.status(200).json({
        message: "user succesfully logged in",
        token: token,
        data: user,
      });
    }
    return res.status(400).json({ error: "password is wrong" });
  }
  
}

export default UserController;
