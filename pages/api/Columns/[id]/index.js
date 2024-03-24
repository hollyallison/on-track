import dbConnect from '../../../../lib/db';
import KanbanBoard from '../../../../models/KanbanBoard';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query; // Column ID

  if (req.method === 'PUT') {
    const { title } = req.body;

    try {
      // Find the board containing the column
      const board = await KanbanBoard.findOne({ "columns._id": id });
      if (!board) {
        return res.status(404).json({ message: 'Column not found' });
      }

      // Update the column title
      const column = board.columns.id(id);
      column.title = title;
      await board.save();

      res.json(column);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else if (req.method === 'DELETE') { // Correct placement for the else if block
    try {
      const board = await KanbanBoard.findOne({ "columns._id": id });
      if (!board) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      board.columns.id(id).remove();
      await board.save();
  
      res.status(204).end(); // No content to send back
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }  
}
