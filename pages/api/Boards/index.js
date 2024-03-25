import dbConnect from '../../../lib/db'; 
import Board from '../../../models/Board';

export default async function handler(req, res) {
  await dbConnect();
  
  switch (req.method) {
    case 'GET':
      // Handle GET
      break;
    case 'POST':
      // Handle POST
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
