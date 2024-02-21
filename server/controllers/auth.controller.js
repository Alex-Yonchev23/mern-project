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


const isValidName = (name) => {
  const validNameRegex = /^[A-Za-z -]+$/;
  return validNameRegex.test(name);
};

export const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {

    if (!firstName || !lastName || !email || !password) {
      return res.status(200).json({
        success: false,
        message: "All fields are required!",
      });
    }

    if (!firstName.trim() || !lastName.trim() || !isValidName(firstName) || !isValidName(lastName) || !email.trim() || !password) {
      return res.status(200).json({
        success: false,
        message: "Invalid first name or last name!",
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
  const { email, password, remember_me } = req.body;

  try {
    const validUser = await User.findOne({ email: email });

    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "Email and password are required!",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(200).json({
        success: false,
        message: "Invalid email!",
      });
    }

    if (!validUser) {
      return next(errorHandler(200, 'User not found!'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(200, 'Invalid email or password!'));
    }

    const expiresIn = remember_me ? '3d' : '1h';

    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET, { expiresIn });
    const { password: hashedPassword, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: remember_me ? 3 * 24 * 60 * 60 * 1000 : 3600000,
      })
      .status(201)
      .json({
        success: true,
        message: 'Login successful!',
        user: rest,
      });

  } catch (error) {
    next(error);
  }
};