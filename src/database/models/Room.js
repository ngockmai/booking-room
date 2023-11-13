import mongoose, { Schema, model, models } from "mongoose";
import Roomtype from "./Roomtype";
import Floor from "./Floor";

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  capacity: {
    type: Number,
    min: 1,
    max: 100,
    required: true,
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roomtype",
    required: true,
  },
  resources: [
    {
      name: {
        type: String,
        required: true,
      },
      description: String,
    },
  ],
  floorPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",
    required: true,
  },
});

const Room = models.Room || model("Room", roomSchema);

export default Room;
