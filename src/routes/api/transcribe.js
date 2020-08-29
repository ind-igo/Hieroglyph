// Create API endpoint here with Post function. Route will be /api
import { getTranscript } from '../_services/youtube_transcriber.js';

export async function get(req, res) {
	const videoId = req.query.v;
	const transcript = await getTranscript(videoId);
	res.json({ text: transcript })
}