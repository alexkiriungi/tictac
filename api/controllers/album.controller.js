import Album from "../models/album.model.js";
import { errorHandler } from '../utilis/error.js';


export const createAlbum = async (req, res, next) => {
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

export default getAlbums = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const albums = await Album.find()
        .sort({ updatedAt: sortDirection}).skip(startIndex).limit(limit);
        const totalAlbums = await Album.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() -1,
            now.getDate(),
        );

        const lastMontAlbums = await Album.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });
        res.status(200).json({
            albums,
            totalAlbums,
            lastMontAlbums
        });
    } catch (error) {
    next(error);
}
};