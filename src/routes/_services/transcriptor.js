// Transcriber. Grabs transcript from Youtube

import { getSubtitles } from "youtube-captions-scraper";

export async function getTranscript(video_url) {
  let transcript;

  try {
    const subtitles = await getSubtitles({videoID: video_url, lang: 'en'});
    console.log(subtitles);
    transcript = formatSubtitles(subtitles);
  } catch(err) {
    console.log(err);
    transcript = "";
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