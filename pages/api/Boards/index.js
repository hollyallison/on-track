import dbConnect from '../../../lib/db';
import KanbanBoard from '../../../models/KanbanBoard';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const boards = await KanbanBoard.find({});
      res.status(200).json(boards);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const board = new KanbanBoard(req.body); // Ensure the body contains the required fields
      await board.save();
      res.status(201).json(board);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
