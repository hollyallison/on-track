import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true } // Text is the answer
});

const reflectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true, enum: ['Daily', 'Monthly', 'Quarterly'] },
  questions: [questionSchema]
}, { timestamps: true });

export default mongoose.models.Reflection || mongoose.model('Reflection', reflectionSchema);


