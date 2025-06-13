import mongoose from "mongoose";


const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);