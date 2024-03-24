import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  }
});


const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
});

const kanbanBoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  columns: [columnSchema]
}, { timestamps: true });

export default mongoose.models.KanbanBoard || mongoose.model('KanbanBoard', kanbanBoardSchema);

