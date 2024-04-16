import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";


//test server
export const test = (req, res) => {
    res.json({
        message: 'API is working!'
    });
};

//--------------------------------------------------------------------------------------

//update User 
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
            return "Name cannot be empty.";
        }

        const validNameRegex = /^[A-Za-z -]+$/;

        if (!validNameRegex.test(name)) {
            return "Name must only contain letters, spaces, or hyphens.";
        }

        const repeatedCharactersRegex = /(.)\1{2,}/;
        if (repeatedCharactersRegex.test(name)) {
            return "Name cannot contain repeating characters.";
        }
    }
    return true; 
};


export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        
        // Check if the user is newly signed up
        const isNewUser = (!user.createdAt || user.createdAt.toString() === user.updatedAt.toString());

        // Check if the user making the request matches the user being updated
        if ((req.user.id || req.user._id) !== req.params.id) {
            return next(errorHandler(201, 'Unauthorized'));
        }

        const now = new Date();
        const lastUpdate = new Date(user.updatedAt);
        const timeDiffInMillis = now - lastUpdate;

        // If user is newly signed up, allow update immediately
        if (isNewUser) {
            return updateUserDetails(req, res, next);
        }

        // Otherwise, check time difference and allow update if more than 24 hours have passed
        const timeLeftInMillis = 24 * 60 * 60 * 1000 - timeDiffInMillis; // One day in milliseconds

        if (timeDiffInMillis < 24 * 60 * 60 * 1000) {
            const { hours, minutes } = dateDiffInHoursMinutes(timeLeftInMillis, 0);
            return res.status(400).json({
                success: false,
                message: `You can update your information again in ${hours} hours and ${minutes} minutes.`,
                timeLeft: { hours, minutes } // Adding time left information
            });
        }

        // If more than 24 hours have passed, allow update
        return updateUserDetails(req, res, next);

    } catch (error) {
        console.error('Update User Error:', error);
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
                message: "Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a digit, and a special symbol.",
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
                    message: "New password cannot be the same as the old one.",
                });
            }
        }

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No changes are made.',
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
                message: 'Updated successfully!',
                user: rest,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Failed to update user.',
            });
        }
    } catch (error) {
        console.error('Update User Error:', error);
        next(error);
    }
};


//--------------------------------------------------------------------------------------

//delete User

export const deleteUser = async (req, res, next) => {
    
    if ( (!req.user.isAdmin && req.user.id !== req.params.userId)) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(deletedUser){
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
            });
        }else{
            return res.status(200).json({
                success: false,
                message: 'Failed to delete user.',
            });
        }
        }catch(error){
            next(error);
        }
}    

//get users

// Modify your getUsers controller to accept pagination parameters
export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    const limit = parseInt(req.query.limit) || 9; // Default limit to 9 if not provided
    const startIndex = parseInt(req.query.startIndex) || 0; // Default startIndex to 0 if not provided

    try {
        const users = await User.find().skip(startIndex).limit(limit);
        const totalUsers = await User.countDocuments(); // Get total count of users
        const remainingUsers = totalUsers - (startIndex + limit); // Calculate remaining users

        return res.status(200).json({
            success: true,
            message: 'Users retrieved successfully!',
            users,
            remainingUsers: remainingUsers > 0 ? remainingUsers : 0, // Send remainingUsers count to frontend
        });
    } catch (error) {
        next(error);
    }
};
