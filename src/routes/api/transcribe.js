// Create API endpoint here with Post function. Route will be /api
const AWS = require('aws-sdk');
import { getTranscript } from '../_services/youtube_transcriber.js';

const S3 = new AWS.S3({ apiVersion: '2006-03-01' });
const { BUCKET_NAME } = process.env;

export async function get(req, res) {
  const videoId = req.query.v;

  // Check in S3 for transcript by video ID
  const presentInS3 = await S3.headObject({
    Bucket: BUCKET_NAME,
    Key: videoId
  })
    .promise()
    .then(() => true)
    .catch(err => {
      if(err.code === 'NotFound') {
        return false;
      }
      console.log('Error retrieving transcript: ' + err);
      throw err;
    });

  let transcript;

  if(presentInS3) {
    transcript = await S3.getObject({
      Bucket: BUCKET_NAME,
      Key: videoId
    })
      .promise()
      .then((data) => data.Body.toString('utf-8'))
      .catch(err => {
        console.log(err);
        return 'No transcript retrieved. Something is wrong.'
      });
  }
  else {
    // TODO Get ok from transcriber and return 202
    try {
      transcript = await getTranscript(videoId);

      S3.putObject({
        Bucket: BUCKET_NAME,
        Key: videoId,
        Body: transcript,
        ContentType: 'application/text; charset=utf-8',
        CacheControl: 'max-age=86400'
      })
        .promise()
        .then(() => console.log(`Transcript ${videoId} successfully uploaded`))
        .catch(err => console.log(err));
    }
    catch {
      transcript = "No Transcript is available. If the video is brand new, it is likely Youtube has not transcribed the video yet. Try again at a later time."
    }
  }

  res.json({ text: transcript });
}