import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// enables additional modifications to the database's schema
mongoose.models = {}
// it makes User collection in jovicData (name of DB)
export default mongoose.model('User', userSchema);