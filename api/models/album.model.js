import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
    }, { timestamps: true }
);

const Album = mongoose.model('Album', albumSchema);

export default Album;