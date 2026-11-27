import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    headline1: {
      type: String,
      required: true,
    },
    description1: {
      type: String,
      required: true,
    },
    content1: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    headline2: {
      type: String,
      required: true,
    },
    description2: {
      type: String,
      required: true,
    },
    content2: {
      type: String,
      required: true,
    },
    imagesecond: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// enables additional modifications to the database's schema
mongoose.models = {};
// it makes Post collection in jovicData (name of DB)
export default mongoose.model("Post", postSchema);
