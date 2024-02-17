import express from 'express';
import { errorHandler } from '../utilis/error.js';
import { verifyToken } from '../utilis/verifyUser.js';
import multer from 'multer';
import { createAlbum, getAlbums } from '../controllers/album.controller.js';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function( req, file, cb) {
        cb( errorHandler(400, 'Error! Please try again!'), '../client/public/images' );
    },
    filename: (req, file, cb) => {
        cb(errorHandler(400, 'Error! Please try again!'), Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage});


router.post('/create', verifyToken, upload.single('image'), createAlbum);
router.get('/getalbums', getAlbums);

export default router;