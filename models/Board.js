import mongoose from 'mongoose';

const kanbanBoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: true },
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }],
}, { timestamps: true });

let KanbanBoard;
if (mongoose.models.KanbanBoard) {
  KanbanBoard = mongoose.model('KanbanBoard');
} else {
  KanbanBoard = mongoose.model('KanbanBoard', kanbanBoardSchema);
}

export default KanbanBoard = mongoose.models.KanbanBoard || mongoose.model('KanbanBoard', kanbanBoardSchema);

