//api/Boards/[id].js
import dbConnect from '../../../lib/db';
import KanbanBoard from '../../../models/KanbanBoard';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const board = await KanbanBoard.findById(id).populate('columns.cards');
        if (!board) {
          return res.status(404).json({ error: 'Board not found' });
        }
        res.status(200).json(board);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
      break;

    case 'PUT':
      try {
        const board = await KanbanBoard.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!board) {
          return res.status(404).json({ error: 'Board not found' });
        }
        res.status(200).json(board);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
      break;

    case 'DELETE':
      try {
        const deletedBoard = await KanbanBoard.findByIdAndDelete(id);
        if (!deletedBoard) {
          return res.status(404).json({ error: 'Board not found' });
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
