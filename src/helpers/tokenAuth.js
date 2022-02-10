import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class TokenAuth {
  /**
   * general token
   * @static
   * @params {object} data object
   * @memberof tokenAuth
   * return {string} token
   */
  static tokenGenerator(data) {
    const token = jwt.sign(data, process.env.JWT_KEY);
    return token;
  }
  static decodeToken(token) {
    const data = jwt.verify(token, process.env.JWT_KEY);
    return data;
  }
  catch(_err) {
    return console.err();
  }
}
export default TokenAuth;
