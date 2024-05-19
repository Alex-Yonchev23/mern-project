import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// Тест на сървъра
export const test = (req, res) => {
    res.json({
        message: 'API функционира успешно!'
    });
};

//--------------------------------------------------------------------------------------

// Актуализация на потребител
const dateDiffInHoursMinutes = (date1, date2) => {
    const diffInMs = Math.abs(date1 - date2);
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
};

const isPasswordValid = (password) => {
    const isLengthValid = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return isLengthValid && hasUpperCase && hasLowerCase && hasDigit && hasSpecialSymbol;
};

const isValidName = (name) => {

    if (name && typeof name === 'string') {
        
        if (!name.trim()) {
            return "Името не може да бъде празно.";
        }

        const validNameRegex = /^[A-Za-z -]+$/;

        if (!validNameRegex.test(name)) {
            return "Името трябва да съдържа само букви, интервали или тирета.";
        }

        const repeatedCharactersRegex = /(.)\1{2,}/;
        if (repeatedCharactersRegex.test(name)) {
            return "Името не може да съдържа повтарящи се символи.";
        }
    }
    return true; 
};


export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        
        const isNewUser = (!user.createdAt || user.createdAt.toString() === user.updatedAt.toString());

        if ((req.user.id || req.user._id) !== req.params.id) {
            return next(errorHandler(401, 'Неразрешен достъп'));
        }

        const now = new Date();
        const lastUpdate = new Date(user.updatedAt);
        const timeDiffInMillis = now - lastUpdate;

        if (isNewUser) {
            return updateUserDetails(req, res, next);
        }

        const timeLeftInMillis = 24 * 60 * 60 * 1000 - timeDiffInMillis;

        if (timeDiffInMillis < 24 * 60 * 60 * 1000) {
            const { hours, minutes } = dateDiffInHoursMinutes(timeLeftInMillis, 0);
            return res.status(400).json({
                success: false,
                message: `Можете да актуализирате данните си отново след ${hours} часа и ${minutes} минути.`,
                timeLeft: { hours, minutes } // Добавяне на информация за оставащото време
            });
        }

        return updateUserDetails(req, res, next);

    } catch (error) {
        console.error('Грешка при актуализиране на потребителя:', error);
        next(error);
    }
};

const updateUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const { firstName, lastName, password, avatar } = req.body;

        const firstNameValidation = isValidName(firstName);
        if (firstNameValidation !== true) {
            return res.status(400).json({
                success: false,
                message: firstNameValidation,
            });
        }

        const lastNameValidation = isValidName(lastName);
        if (lastNameValidation !== true) {
            return res.status(400).json({
                success: false,
                message: lastNameValidation,
            });
        }

        if (password && !isPasswordValid(password)) {
            return res.status(400).json({
                success: false,
                message: "Паролата трябва да съдържа поне 8 символа, главна буква, малка буква, цифра и специален символ.",
            });
        }

        const updatedFields = {};
        if (firstName && firstName !== user.firstName) {
            updatedFields.firstName = firstName;
        }
        if (lastName && lastName !== user.lastName) {
            updatedFields.lastName = lastName;
        }
        if (password && password !== user.password) {
            updatedFields.password = bcryptjs.hashSync(password, 10);
        }
        if (avatar && avatar !== user.avatar) {
            updatedFields.avatar = avatar;
        }

        if (password) {            
            const isSamePassword = await bcryptjs.compare(password, user.password);
            if (isSamePassword) {
                return res.status(400).json({
                    success: false,
                    message: "Новата парола не може да бъде същата като старата.",
                });
            }
        }

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Няма направени промени.',
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );

        if (updatedUser) {
            const { password: hashedPassword, ...rest } = updatedUser._doc;
            return res.status(200).json({
                success: true,
                message: 'Успешно актуализиранe!',
                user: rest,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Неуспешно актуализиране на потребителя.',
            });
        }
    } catch (error) {
        console.error('Грешка при актуализиране на потребителя:', error);
        next(error);
    }
};


//--------------------------------------------------------------------------------------

// Изтриване на потребител

export const deleteUser = async (req, res, next) => {
    
    if ((!req.user.isAdmin && req.user.id !== req.params.userId)) {
        return next(errorHandler(401, 'Неразрешен достъп'));
    }

    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(deletedUser){
            return res.status(200).json({
                success: true,
                message: 'Потребителят е изтрит успешно!',
            });
        }else{
            return res.status(200).json({
                success: false,
                message: 'Неуспешно изтриване на потребител.',
            });
        }
        }catch(error){
            next(error);
        }
}    

// Получаване на потребители

export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'Нямате право да виждате всички потребители'));
    }
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === 'asc' ? 1 : -1;
  
      const users = await User.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const usersWithoutPassword = users.map((user) => {
        const { password, ...rest } = user._doc;
        return rest;
      });
  
      const totalUsers = await User.countDocuments();
  
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthUsers = await User.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        users: usersWithoutPassword,
        totalUsers,
        lastMonthUsers,
      });
    } catch (error) {
      next(error);
    }
  };
  

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        const {password, ...rest} = user._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}
