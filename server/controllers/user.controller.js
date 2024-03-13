import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

export const test = (req, res) => {
    res.json({
        message: 'API is working!'
    });
};

const dateDiffInHoursMinutes = (date1, date2) => {
    const diffInMs = Math.abs(date1 - date2);
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
};

// update user 
export const updateUser = async (req, res, next) => {
   /* console.log('User ID from request:', req.user.id);
    console.log('User ID from params:', req.params.id);*/

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
            return res.status(200).json({
                success: false,
                message: `You can update your information again in ${hours} hours and ${minutes} minutes.`,
                timeLeft: { hours, minutes } // Adding time left information
            });
        }*/

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                }
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET);

        console.log(req.user);
        const expiryDate = new Date(Date.now() + 1 * 60 * 60 * 1000);
        res.cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
        }).status(201).json({
            success: true,
            message: 'Updated successfully!',
            user: rest,
        });
    } catch (error) {
        next(error);
    }
};
