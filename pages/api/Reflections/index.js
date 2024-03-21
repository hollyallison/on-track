import dbConnect from '../../../lib/db'; 
import Reflection from '../../../models/Reflection'; 

export default async function handler(req, res) {
  try {
    await dbConnect(); // Ensure database connection is successful
  } catch (dbError) {
    console.error('Database connection error:', dbError);
    return res.status(500).json({ success: false, error: 'Database connection failed' });
  }

  if (req.method === 'POST') {
    const { date, type, questions } = req.body; 

    // Validate incoming data (simple validation example)
    if (!date || !type || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, error: 'Invalid request data' });
    }

    try {
      const newReflection = new Reflection({ date, type, questions });
      const savedReflection = await newReflection.save();
      res.status(201).json({ success: true, message: 'Reflection saved successfully', data: savedReflection });
    } catch (error) {
      console.error('Error saving reflection:', error);
      // Provide a more detailed error message in the response for debugging
      return res.status(500).json({
        success: false,
        error: 'Failed to save reflection',
        detail: error.message || 'Unknown error'
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
