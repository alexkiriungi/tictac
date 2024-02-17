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
const uploadFiles = upload.fields([{ name: 'title', maxCount: 1 }, { name: 'image', maxCount: 3}])

router.post('/create', verifyToken, uploadFiles, createAlbum);
router.get('/getalbums', getAlbums);

export default router;