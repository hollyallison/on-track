import mongoose from 'mongoose';

const moodTrackerSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  mood: { type: String, required: true }
});

export default mongoose.models.MoodTracker || mongoose.model('MoodTracker', moodTrackerSchema);
