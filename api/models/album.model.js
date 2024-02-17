import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        image: {
            type: String,
            default: "",
        },
    }, { timestamps: true }
);

const Album = mongoose.model('Album', albumSchema);

export default Album;