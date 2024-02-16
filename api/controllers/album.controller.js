import Album from "../models/album.model.js";
import { errorHandler } from '../utilis/error.js';


export const createAlbum = async ( req, res, next) => {
    if (!req.body.title || !req.body.image) {
        return next(errorHandler(400, 'Please provide all required fields!'));
    }
    try {
        const { title, image } = req.body;
        const newAlbum = new Album({
            userId: req.user.id,
            title,
            image,
        });
        const savedAlbum = await newAlbum.save();
        res.status(201).json(savedAlbum);
    } catch (error) {
        next(error);
    }
};

export default getAlbums = async () => {

};