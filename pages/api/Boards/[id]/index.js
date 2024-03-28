import dbConnect from '@/lib/db';
import Board from '@/models/Board';
import Column from '@/models/Column';
import Task from '@/models/Task';

export default async function handler(req, res) {
  await dbConnect(); // Ensure DB connection
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        // Attempt to find the board and deeply populate columns and tasks
        const board = await Board.findById(id)
          .populate({
            path: 'columns',
            populate: {
              path: 'tasks',
            },
          });

        if (!board) {
          // If no board is found, return a 404 status
          return res.status(404).json({ success: false, message: 'Board not found' });
        }

        // Successfully found and populated the board, return it
        res.status(200).json({ success: true, data: board });
      } catch (error) {
        // General error handling
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      // Handling board updates
      try {
        const board = await Board.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!board) {
          return res.status(404).json({ success: false, message: 'Board not found' });
        }
        res.status(200).json({ success: true, data: board });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      // Handling board deletion
      try {
        const deletedBoard = await Board.findByIdAndDelete(id);
        if (!deletedBoard) {
          return res.status(404).json({ success: false, message: 'Board not found' });
        }
        res.status(204).send(); // Successful deletion, no content to return
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      // Handling unsupported methods
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}


