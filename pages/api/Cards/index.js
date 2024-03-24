import dbConnect from '../../../lib/db';
import Card from '../../../models/KanbanBoard';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { title, description, status, columnId } = req.body;
      const newCard = await Card.create({ title, description, status, column: columnId });
      return res.status(201).json(newCard);
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
