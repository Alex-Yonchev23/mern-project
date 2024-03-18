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
    console.log('User ID from request:', req.user.id);
    console.log('User ID from params:', req.params.id);

    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    try {
        // Check when the last update was made
        const user = await User.findById(req.params.id);
        const lastUpdate = new Date(user.updatedAt);
        const now = new Date();

        // Calculate the time difference in milliseconds
        const timeDiffInMillis = now - lastUpdate;

        // Calculate the time left until the user can update again (in milliseconds)
        const timeLeftInMillis = 24 * 60 * 60 * 1000 - timeDiffInMillis; // One day in milliseconds

        /*
        if (timeDiffInMillis < 24 * 60 * 60 * 1000) {
            const { hours, minutes } = dateDiffInHoursMinutes(timeLeftInMillis, 0);
            return res.status(400).json({
                success: false,
                message: `You can update your information again in ${hours} hours and ${minutes} minutes.`,
                timeLeft: { hours, minutes } // Adding time left information
            });
        } */

        const { firstName, lastName, password } = req.body;

        const firstNameValidation = isValidName(firstName);
        if (firstNameValidation !== true) {
            return res.status(200).json({
                success: false,
                message: firstNameValidation,
            });
        }

        const lastNameValidation = isValidName(lastName);
        if (lastNameValidation !== true) {
            return res.status(200).json({
                success: false,
                message: lastNameValidation,
            });
        }
        
        if (password && !isPasswordValid(password)) {
            return res.status(201).json({
                success: false,
                message: "Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a digit, and a special symbol.",
            });
        }

        

        const updatedFields = {};
        if (req.body.firstName && req.body.firstName !== user.firstName) {
            updatedFields.firstName = req.body.firstName;
        }
        if (req.body.lastName && req.body.lastName !== user.lastName) {
            updatedFields.lastName = req.body.lastName;
        }
        if (req.body.password && req.body.password !== user.password) {
            updatedFields.password = bcryptjs.hashSync(req.body.password, 10);
        }
        if (req.body.avatar && req.body.avatar !== user.avatar) {
            updatedFields.avatar = req.body.avatar;
        }
        
        if (password) {            
            const isSamePassword = await bcryptjs.compare(req.body.password, user.password);
            if (isSamePassword) {
                return res.status(200).json({
                    success: false,
                    message: "New password cannot be the same as the old one.",
                });
            }
        }
        
        if (Object.keys(updatedFields).length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No changes are made.',
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: updatedFields
            },
            { new: true }
        );

        if (updatedUser) {
            const { password: hashedPassword, ...rest } = updatedUser._doc;
            return res.status(201).json({
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
    
    if (req.user.id !== req.params.id) {
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