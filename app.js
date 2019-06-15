// Globals
let videoVisible = false;
let youtubeRe = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/


// Make an HTTP POST Request
async function postApi(url ='', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    });

    const resData = await response.json();
    return resData;
};

function getVideoId(url_) {
  let ID = '';
  url_ = url_.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

  if(url_[2] !== undefined) {
    ID = url_[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url_;
  }
  return ID;
}

function showTranscript(data_) {
    const transcriptArea = document.getElementById('transcript');
    transcriptArea.innerHTML = data_;
};

function clearTranscriptError() {
  const transcriptArea = document.getElementById('transcript');
  const errorMsg = "There is an error in your Youtube URL";
  transcriptArea.innerHTML = errorMsg;
};

function showVideo(url_) {
  let iframe = document.getElementById('youtubeiframe');
  let rightUrl = getVideoId(url_);

    // Required for YouTube iframe to work
    iframe.src = `https://www.youtube.com/embed/${rightUrl}`;
    iframe.frameBorder = '0';
    iframe.width = '500';
    iframe.height = '316';
    iframe.margin = 'auto';
    iframe.style.display = 'inline-block';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    document.getElementById('button2').innerText = "Hide Youtube Video";
}

function hideVideo() {
  let iframe = document.getElementById('youtubeiframe');
  iframe.style.display = 'none';
  document.getElementById('button2').innerText = "Show Youtube Video";
}

function showError() {
  document.getElementById('youtube-url').style.color = "red";
  document.getElementById('youtube-url').style.borderColor = "red";
}

function toggleVideoButton() {
  videoVisible = !videoVisible;
}

// ==================
// Event Listeners
// ==================

// Fetch transcript on submit
document.getElementById('submit-button').addEventListener('click', function(e){
  let url = document.getElementById('youtube-url').value;
  if(youtubeRe.test(url) === false) {
    showError();
    clearTranscriptError();
  } else {
    urlJson = {
      'url' : url
    }
    //post to AWS API - it takes in url as json and outputs text of video
    postApi('https://3iy19oh41a.execute-api.us-east-1.amazonaws.com/test/transcribe', urlJson)
      .then(data => showTranscript(data.body))
      .catch(err => console.log(err));
    document.getElementById('youtube-url').style.color ="";
    document.getElementById('youtube-url').style.borderColor = "#D1D1D1";
    document.getElementById('submit-button').style.color ="";
  }

  e.preventDefault();
});

// Insert Youtube video and show/hide button
document.getElementById('button2').addEventListener('click', function(e){
    let url = document.getElementById('youtube-url').value;
    if (videoVisible) {
      hideVideo();
    } else {
      showVideo(url);
    }
    toggleVideoButton();
    e.preventDefault();
});