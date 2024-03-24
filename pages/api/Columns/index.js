import dbConnect from '../../../lib/db';
import KanbanBoard from '../../../models/KanbanBoard';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { boardId, title } = req.body;

    try {
      const board = await KanbanBoard.findById(boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }

      const newColumn = { title, cards: [] };
      board.columns.push(newColumn);
      await board.save();

      res.status(201).json(newColumn);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
