import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

/*-------------------------------РЕГИСТРАЦИЯ--------------------------------*/

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

  if (!validNameRegex.test(name)) {
    return "Името трябва да съдържа само букви, интервали или тирета.";
  }

  const repeatedCharactersRegex = /(.)\1{2,}/;
  if (repeatedCharactersRegex.test(name)) {
    return "Името не може да съдържа повтарящи се символи.";
  }
  return true;
};

export const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {

    if (!firstName || !lastName || !email || !password) {
      return res.status(200).json({
        success: false,
        message: "Всички полета са задължителни!",
      });
    }

    if (!firstName.trim() || !lastName.trim() || !isValidName(firstName) || !isValidName(lastName) || !email.trim() || !password) {
      return res.status(200).json({
        success: false,
        message: "Невалидно първо име или фамилия!",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(200).json({
        success: false,
        message: "Невалиден имейл!",
      });
    }

    if (!isPasswordValid(password)) {
      return res.status(200).json({
        success: false,
        message: "Паролата трябва да съдържа:\n поне 8 символа\n ,главна буква\n ,малка буква\n ,цифра \n ,специален символ.",
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
      message: "Потребителят е създаден успешно!",
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Потребителят вече съществува",
      });
    }
    res.status(500).json({
      success: false,
      message: "Вътрешна грешка на сървъра",
    });
  }
};


/*-------------------------------ВХОД--------------------------------*/

export const login = async (req, res, next) => {
  const { email, password, remember_me } = req.body;

  try {
    const validUser = await User.findOne({ email: email });

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Имейл и парола са задължителни!",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(401).json({
        success: false,
        message: "Невалиден имейл!",
      });
    }

    if (!validUser) {
      return next(errorHandler(401, 'Потребителят не съществува!'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, 'Невалиден имейл или парола!'));
    }

    const expiresIn = remember_me ? '3d' : '1h';

    const token = jwt.sign({ _id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET, { expiresIn });
    const { password: hashedPassword, ...rest } = validUser._doc;

    const cookieOptions = {
      httpOnly: true,
      expires: remember_me ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) : new Date(Date.now() + 3600000),
    };

    res
      .cookie('access_token', token, cookieOptions)
      .status(201)
      .json({
        success: true,
        message: 'Влизането е успешно!',
        user: rest,
      });

  } catch (error) {
    next(error);
  }
};

/*-------------------------------GOOGLE АУТЕНТИКАЦИЯ--------------------------------*/

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(201)
        .json({
          success: true,
          message: 'Влизането е успешно!',
          user: rest,
        });
    } else {
      const generateRandomPassword = (length = 12) => {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(),.?":{}|<>';

        const getRandomChar = () => charset[Math.floor(Math.random() * charset.length)];

        const password = Array.from({ length })
          .map((_, index) => (index < 4 ? getRandomChar() : getRandomChar(charset)))
          .sort(() => Math.random() - 0.5)
          .join('');

        return password;
      };

      const hashedPassword = bcryptjs.hashSync(generateRandomPassword(), 10);
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      res
        .cookie('access_token', token, {
          httpOnly: true,
          exp: expiryDate
        })
        .status(201)
        .json({
          success: true,
          message: 'Влизането е успешно!',
          user: rest,
        });
    }
  } catch (error) {
    if (error.message.includes('ERR_INTERNET_DISCONNECTED')) {
      return res.status(201).json({ success: false, message: 'Връзката с интернет е загубена. Моля, проверете вашата интернет връзка.' });
    } else if (error.message.includes('ERR_CONNECTION_REFUSED')) {
      return res.status(201).json({ success: false, message: 'Връзката е отхвърлена. Моля, опитайте отново по-късно.' });
    }
    res.status(500).json({ success: false, message: 'Възникна неочаквана грешка. Моля, опитайте отново по-късно.' });
    next(error);
  }
}

/*-------------------------------ИЗХОД--------------------------------*/

export const logout = (req, res) => {
  res
    .clearCookie('access_token')
    .status(200)
    .json({
      success: true,
      message: 'Излизането е успешно!',
    });
}
