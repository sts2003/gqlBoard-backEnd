import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MainBoard = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    imagePath: {
      type: String,
      required: false,
    },

    createdAt: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model(`MainBoard`, MainBoard, `MainBoard`);
