// Create API endpoint here with Post function. Route will be /api
import { getTranscript } from '../_services/transcriptor.js';

export async function post(req, res) {
	const { video_url } = req.body;
	console.log(" vidoe url is : " + video_url);
	const transcript = await getTranscript(video_url);
	console.log(transcript);

	console.log("IM IN!!");

	res.json({ transcript: transcript })
}