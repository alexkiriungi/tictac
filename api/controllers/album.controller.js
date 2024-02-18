import Album from "../models/album.model.js";
import { errorHandler } from '../utilis/error.js';


export const createAlbum = async (req, res, next) => {
    if (!req.body.title || !req.body.file) {
        return next(errorHandler(400, 'An error occurred... Please fill all required fields'));
    }
    try {
        const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
        const newAlbum = new Album({
            userId: req.user.id,
            title: req.body.title,
            image: req.body.file,
            slug,
        });
        const savedAlbum = await newAlbum.save();
        res.status(201).json(savedAlbum);
    } catch (error) {
        next(error);
    }
};

export const getalbums = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const albums = await Album.find({
            ...(req.query.userId && { userId: req.query.userId } ),
            ...(req.query.title && { title: req.query.title }),
            ...(req.query.image && { image: req.query.image }),
            ...(req.query.albumId && { _id: req.query.albumId }),
        }).sort({ updatedAt: sortDirection}).skip(startIndex).limit(limit);
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
        console.log(albums);
    } catch (error) {
    next(error);
}
};