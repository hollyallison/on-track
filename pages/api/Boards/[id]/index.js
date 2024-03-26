// pages/api/Boards/[id]/index.js

import dbConnect from '@/lib/db';
import Board from '@/models/Board';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const board = await Board.findById(id).populate('columns');
        if (!board) {
          return res.status(404).json({ success: false, message: 'Board not found' });
        }
        res.status(200).json({ success: true, data: board });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    
    case 'PUT':
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
      try {
        const deletedBoard = await Board.findByIdAndDelete(id);
        if (!deletedBoard) {
          return res.status(404).json({ success: false, message: 'Board not found' });
        }
        res.status(204).json({ success: true, data: {} }); // No content to send back
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

