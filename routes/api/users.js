import express, { Router } from 'express';
import multer from 'multer';

import {
    register,
    login,
    logout,
    getCurrentUser,
    updateStatus,
    updAvatar
} from "../../controllers/usersControllers.js";
import userMiddleware from '../../middlewares/userMiddleware.js';
import updStatusMiddleware from '../../middlewares/updStatusMiddleware.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const router = Router();

router.post('/register', userMiddleware, register);
router.post('/login', userMiddleware, login);

router.use(authMiddleware);
router.post('/logout', logout);
router.get('/current', getCurrentUser);
router.patch('/', updStatusMiddleware, updateStatus);
router.patch('/avatars', upload.single('avatar'), updAvatar);

export default router;