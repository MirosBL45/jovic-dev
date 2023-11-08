import mongoose from "mongoose";

const { Schema } = mongoose;

const postdbSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },

}, { timestamps: true });

export default mongoose.model('Postdb', postdbSchema);