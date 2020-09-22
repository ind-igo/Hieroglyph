// Transcriber. Grabs transcript from Youtube

import { getSubtitles } from 'youtube-captions-scraper';
import axios from 'axios';
import qs from 'qs';

export async function getTranscript(videoId_) {
  let finalTranscript;

  try {
    const subtitles = await getSubtitles({videoID: videoId_, lang: 'en'});
    const rawTranscript = formatSubtitles(subtitles);
    // TODO replace with https address of own model
    const punctuated = await axios.post(
      'http://206.189.162.188:80/EN',
      qs.stringify({
        text: rawTranscript
      })
    );
    finalTranscript = punctuated.data.replace('\'S', '\'s'); // TODO not sure why this isnt working
  } catch(err) {
    console.log(err);
    finalTranscript = "No transcript available";
  }

  return finalTranscript;
}

function formatSubtitles(subtitles) {
  if (!subtitles.length) return '';

	return subtitles
    .map((element) => element.text)
    .join(' ')
    .replace(/\n/gm, ' ')
    .trim();
}