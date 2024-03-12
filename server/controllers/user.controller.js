import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';


export const test = (req, res) => {
    res.json({
        message: 'API is working!'
    })
};

// update user 

export const updateUser = async( req , res , next ) => {
    console.log('User ID from request:', req.user.id);
    console.log('User ID from params:', req.params.id);

    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'Unauthorized'));
    }
    try {
        if(req.body.password) {
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
        const token = jwt.sign({ id: updatedUser._id}, process.env.JWT_SECRET);

        console.log(req.user);
        const expiryDate = new Date(Date.now() + 1 * 60 * 60 * 1000); 
        res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(201)
        .json({
          success: true,
          message: 'Update successful!',
          user: rest,
        });
    } catch (error) {
        console.error('Update User Error:', error);
        next(error);
    }
}