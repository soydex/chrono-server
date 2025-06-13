import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  JobTitle: { type: String, default: 'Team Com y Média' },
  role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
