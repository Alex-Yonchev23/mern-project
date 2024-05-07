import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    // Check if token exists
    if (!token) {
        return next(errorHandler(401, "You are not authenticated!"));
    }

    // Verify token validity
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Token is invalid or expired
            res.clearCookie('access_token'); // Clear the access token
            return next(errorHandler(403, "Your session has expired. Please log in again."));
        }

        // Token is valid, attach user to request object
        req.user = user;
        next();
    });
}