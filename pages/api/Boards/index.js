// pages/api/Boards/index.js
import dbConnect from '@/lib/db';
import Board from '@/models/Board';

export default async function handler(req, res) {
  await dbConnect();
  
  switch (req.method) {
    case 'GET':
      try {
        // Fetch all boards from the database
        const boards = await Board.find({}).populate('columns'); // Optionally populate columns if you need them
        res.status(200).json({ success: true, data: boards });
      } catch (error) {
        // If an error occurs, send back a 400 status with the error message
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        // Create a new board with the data provided in the request body
        const newBoard = await Board.create(req.body);
        res.status(201).json({ success: true, data: newBoard });
      } catch (error) {
        // Handle validation errors or other issues with creating a board
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      // If the method is not GET or POST, return a 405 Method Not Allowed status
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
