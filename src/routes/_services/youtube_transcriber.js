// Transcriber. Grabs transcript from Youtube

import { getSubtitles } from "youtube-captions-scraper";

export async function getTranscript(videoId_) {
  let transcript;

  try {
    const subtitles = await getSubtitles({videoID: videoId_, lang: 'en'});
    transcript = formatSubtitles(subtitles);
  } catch (err) {
    console.log(err);
    transcript = "No transcript available";
  }

  return transcript;
}

function formatSubtitles(subtitles) {
  if (!subtitles.length) return '';

	return subtitles
    .map((element) => element.text)
    .join(' ')
    .replace(/\n/gm, ' ')
    .trim();
}