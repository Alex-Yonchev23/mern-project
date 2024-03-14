import express from "express";
import { signup,login,google,logout} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/sign-up', signup);
router.post('/log-in', login);
router.post('/google', google);
router.get('/log-out', logout);



export default router;
