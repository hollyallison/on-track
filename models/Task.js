import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  content: { type: String, default: '' },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;

