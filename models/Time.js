import mongoose from 'mongoose';

const timeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  durationMs: { type: Number },
  manual: { type: Boolean, default: false },
  note: { type: String }
}, { timestamps: true });

export default mongoose.model('Time', timeSchema);
