// models/Goal.js
import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  progress: Number,
  completed: { type: Boolean, default: false }
});

export default mongoose.models.Goal || mongoose.model('Goal', goalSchema);
