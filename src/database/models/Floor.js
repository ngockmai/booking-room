import { Schema, model, models } from "mongoose";

export const floorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
});

const Floor = models.Floor || model("Floor", floorSchema);

export default Floor;
