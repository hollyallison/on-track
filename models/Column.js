import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

const Column = mongoose.model('Column', columnSchema);
export default Column;

