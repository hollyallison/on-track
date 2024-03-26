// pages/api/Columns/[id]/index.js
import dbConnect from '../../../lib/db';
import Column from '../../../models/Column';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  const { query: { id }, method } = req;
  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const column = await Column.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!column) {
          return res.status(404).json({ success: false, message: 'Column not found' });
        }
        res.status(200).json({ success: true, data: column });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        await Column.findByIdAndDelete(id);
        await Task.deleteMany({ columnId: id });
        res.status(204).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

