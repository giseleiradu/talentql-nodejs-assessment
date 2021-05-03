import dotenv from 'dotenv';
import { User } from '../models/index';
import encrypt from '../helpers/encrypt';
import mailer from '../helpers/mailer';

dotenv.config();
/**
 * Authentication class
 */

export default class Users{
    /**
     * Registration functionality
     * @param {string} req 
     * @param {string} res 
     * @returns {string}
     */

      static async signUp(req, res) {
        try {
        const hashedPassword = encrypt.hashPassword(req.body.password);

        const {email, username } = req.body;
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            isLoggedIn: false
        });
        // const token = await Users.generateToken(newUser.get());
        if (process.env.NODE_ENV !== 'test') await mailer(newUser.email, newUser.username);
        delete newUser.dataValues.password;
        return res.status(201).json({
            message:"successfully registered",
            newUser,
            // token
        });
        } catch (error) {
            console.log(`error`, error)
        if (error.errors[0].message === 'email must be unique') {
            return res.status(400).json({
            status: 409,
            message: 'Email already exists',
            });
        }
        return res.status(400).json({
            status: 400,
            message: error.errors[0].message,
        });
        }
    }

    /**
   * The controller to create a user.
   * @param {req} req the request.
   * @param {res} res the response.
   * @returns {void}
  */
  static async logIn(req, res) {
    const { body } = req;
    const user = await User.findOne({ where: { email: body.email, } });
    if (!user || !encrypt.comparePassword(user.get().password, body.password)) {
      return res.status(401).json({
        status: 401,
        message: 'The credentials you provided are incorrect',
      });
    }
    await User.update({ isLoggedIn: true }, { where: { id: user.id } });
    const token = await Users.generateToken(user.get());
    delete user.dataValues.password;
    const {isLoggedIn} = user;
    return res.status(200).json({
      message:"successfully logged in",
      user,
      isLoggedIn,
      token
    });
  }

    /**
   * The controller for signing out
   * @param {req} req the request
   * @param {res} res the response
   * @return {void}
   */
  static async signOut(req, res) {
    try {
      const { id } = req.user;
      await User.update({ isLoggedIn: false }, { where: { id, } });
      return res.status(200).json({
        status: 200,
        message: 'Successfully signed out.',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

    /**
     * The controller to create a user.
     * @param {user} user the data user.
     * @returns {void}
     */
    static async generateToken(user) {
        const {
        id,
        firstname,
        lastname,
        email,
        } = user;
        return encrypt.generateToken({
        id, firstname, lastname, email,
        });
    }
}