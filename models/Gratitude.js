import mongoose from 'mongoose';

const gratitudeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  items: [{ type: String }]
});

export default mongoose.models.Gratitude || mongoose.model('Gratitude', gratitudeSchema);
