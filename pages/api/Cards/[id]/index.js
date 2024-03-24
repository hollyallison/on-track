import dbConnect from '../../../../lib/db';
import KanbanBoard from '../../../../models/KanbanBoard';

export default async function handler(req, res) {
  const { id } = req.query; // Card ID
  await dbConnect();

  if (req.method === 'PUT') {
    const { title, description, status, columnId, boardId } = req.body;

    try {
      const board = await KanbanBoard.findById(boardId);
      if (!board) {
        return res.status(404).json({ success: false, error: "Board not found" });
      }

      const column = board.columns.id(columnId);
      const card = column.cards.id(id);
      if (!card) {
        return res.status(404).json({ success: false, error: "Card not found" });
      }

      card.title = title || card.title;
      card.description = description || card.description;
      card.status = status || card.status;
      await board.save();

      return res.status(200).json(card);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
