import { Schema, model, models } from "mongoose";

export const roomtypeSchema = new Schema({
  typeName: {
    type: String,
    required: true,
  },
  description: String,
  color: String,
});

const Roomtype = models.Roomtype || model("Roomtype", roomtypeSchema);

export default Roomtype;
