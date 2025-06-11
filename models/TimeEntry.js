import mongoose from "mongoose";

const timeEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  duration: { type: Number, required: true }, // en millisecondes
  date: { type: Date, default: Date.now }
});

export default mongoose.model("TimeEntry", timeEntrySchema);
