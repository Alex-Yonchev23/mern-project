import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, "You are not authenticated!"));
    }

    const decodedToken = jwt.decode(token);

    if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        res.clearCookie('access_token'); 
        return next(errorHandler(403, "Your session has expired"));
    }

    req.user = decodedToken;
    next();
}
