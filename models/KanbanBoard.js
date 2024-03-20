import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: String
});

const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cards: [cardSchema]
});

const kanbanBoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  columns: [columnSchema]
});

export default mongoose.models.KanbanBoard || mongoose.model('KanbanBoard', kanbanBoardSchema);
