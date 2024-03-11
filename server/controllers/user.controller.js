import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
    res.json({
        message: 'API is working!'
    })
};

// update user 

export const updateUser = async( req , res , next ) => {
    console.log('User ID from request:', req.user._id);
    console.log('User ID from params:', req.params.id);

    if (req.user._id !== req.params.id) {
        return next(errorHandler(401, 'You can update only your account!'));
    }  

    try {
        if(req.body.password) {
            req.body.password = bcrypt.hash(req.body.password, 10);
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
        
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}