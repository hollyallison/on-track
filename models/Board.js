import mongoose from 'mongoose';
import columnSchema from './column'; 

const kanbanBoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }],
}, { timestamps: true });

const KanbanBoard = mongoose.model('KanbanBoard', kanbanBoardSchema);
export default KanbanBoard;


