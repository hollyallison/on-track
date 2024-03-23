import dbConnect from '../../../lib/db'; 
import Gratitude from '../../../models/Gratitude'; 

export default async function handler(req, res) {
    await dbConnect();

    // Added logging for debugging purposes
    console.log("Received request:", req.method, req.body);

    if (req.method === 'POST') {
        const { date, items } = req.body;

        // More explicit validation, checking for both presence and correct types
        if (typeof date !== 'string' || !Array.isArray(items) || items.length === 0) {
            console.error('Validation Failed - Missing or Invalid date or items:', { date, items });
            return res.status(400).json({ success: false, error: 'Missing or invalid date or items' });
        }

        try {
            // Attempt to create a new gratitude entry
            const newGratitude = await Gratitude.create({ date, items });
            console.log('Gratitude saved successfully:', newGratitude);
            return res.status(201).json({ success: true, data: newGratitude });
        } catch (error) {
            console.error('Failed to save gratitude:', error);
            return res.status(500).json({ success: false, error: 'Server error: ' + error.message });
        }
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method ' + req.method + ' Not Allowed');
    }
}
