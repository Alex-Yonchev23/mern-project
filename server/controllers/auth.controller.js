import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


/*-------------------------------SIGN UP--------------------------------*/

const isPasswordValid = (password) => {
  const isLengthValid = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return isLengthValid && hasUpperCase && hasLowerCase && hasDigit && hasSpecialSymbol;
};

export const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      return res.status(200).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(200).json({
        success: false,
        message: "Invalid email!",
      });
    }

    if (!isPasswordValid(password)) {
      return res.status(200).json({
        success: false,
        message: "Password must contain :\n at least 8 characters\n ,uppercase letter\n ,lowercase letter\n ,digit \n ,special symbol.",
      });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully!",
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).json({
        success: false,
        message: "Email already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


/*-------------------------------LOG IN--------------------------------*/


export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email: email });

    if (!validUser) 
      return next(errorHandler(404, 'User not found'));
      const validPassword = bcryptjs.compareSync(password,validUser.password); 
      
    if(!validPassword)
      return next(errorHandler(401,'Invalid email or password'))
    
    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const { password: hashedPassword, ...rest } = validUser._doc;
    res
    .cookie('access_token',token ,{ httpOnly: true })
    .status(200)
    .json(rest);
  } catch (error) {
    next(error)
  }
}
