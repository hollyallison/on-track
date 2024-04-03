import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  content: { type: String, default: '' },
columnId: { type: mongoose.Schema.Types.ObjectId, ref: 'Column' }


}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;



