import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
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
    avatar: {
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

mongoose.models = {}
export default mongoose.model('Post', postSchema);