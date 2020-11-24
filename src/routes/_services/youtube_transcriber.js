// Transcriber. Grabs transcript from Youtube

import { getSubtitles } from 'youtube-captions-scraper';
import axios from 'axios';
import qs from 'qs';

const { HG_PUNCTUATOR_URL } = process.env;

export async function getTranscript(videoId_) {
  try {
    const subtitles = await getSubtitles({videoID: videoId_, lang: 'en'});
    const rawTranscript = formatSubtitles(subtitles);
    // TODO replace with https address of own model
    // TODO Push to queue to be transcribed, return "ok" immediately
    const punctuated = await axios.post(
      HG_PUNCTUATOR_URL,
      qs.stringify({
        text: rawTranscript
      })
    );
    let finalTranscript = punctuated.data.replace('\'S', '\'s'); // TODO not sure why this isnt working
    return Promise.resolve(finalTranscript);
  } catch(err) {
    console.log(err);
    return Promise.reject('No Transcript Available.');
  }
}

function formatSubtitles(subtitles) {
  if (!subtitles.length) return '';

	return subtitles
    .map((element) => element.text)
    .join(' ')
    .replace(/\n/gm, ' ')
    .trim();
}