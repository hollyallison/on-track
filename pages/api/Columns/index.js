// pages/api/Columns/index.js
import dbConnect from '@/lib/db';
import Column from '@/models/Column';
import Board from '@/models/Board'; 

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const column = await Column.create(req.body);
        if (req.body.boardId) {
          await Board.findByIdAndUpdate(req.body.boardId, { $push: { columns: column._id } });
        }
        res.status(201).json({ success: true, data: column });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method Not Allowed`);
  }
}

