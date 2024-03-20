import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  metadata: mongoose.Schema.Types.Mixed,
  path: { type: String, required: true },
  description: String
});

export default mongoose.models.Photo || mongoose.model('Photo', photoSchema);
