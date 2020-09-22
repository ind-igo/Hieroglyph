// Create API endpoint here with Post function. Route will be /api
import { getTranscript } from '../_services/youtube_transcriber.js';

export async function get(req, res) {
	const videoId = req.query.v;
	const transcript = await getTranscript(videoId);
	// Enable Vercel to cache response for 1 year
	res.set('Cache-Control', 's-maxage=30000000, stale-while-revalidate');
	res.json({ text: transcript })
}