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

function getVideoId(url_){
    var ID = '';
  url_ = url_.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url_[2] !== undefined) {
    ID = url_[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
}
  else {
    ID = url_;
    }
    return ID;
}

//Function that shows the transcript once fetched
function showTranscript(data) {
    //select tbody for DOM manipulation
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = data;
};

//show video and move state +1
function showVideo(url_) {
    let iframe = document.getElementById('youtubeiframe');
    let rightUrl = getVideoId(url_)
    //this is all stuff to mimic the Youtube Embed format
    iframe.src = `https://www.youtube.com/embed/${rightUrl}`
    iframe.frameBorder = '0'
    iframe.width = '500';
    iframe.height = '316';
    iframe.margin = 'auto';
    iframe.style.display = 'inline-block';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
    document.getElementById('button2').innerText = "Hide Youtube Video"
    buttonState += 1;
}
//hide video and move state down 1
function hideVideo() {
  let iframe = document.getElementById('youtubeiframe');
  iframe.style.display = 'none';
  document.getElementById('button2').innerText = "Show Youtube Video"
  buttonState -= 1;
}

//declare button state
let buttonState = 0;

//create event listener for button
document.getElementById('button').addEventListener('click', function(e){
    let url = document.getElementById('youtube-url').value;
    urlJson = {
        'url' : url
    }
        //post to AWS API - it takes in url as json and outputs text of video
    postApi('https://3iy19oh41a.execute-api.us-east-1.amazonaws.com/test/transcribe', urlJson)
        .then(data => showTranscript(data.body))
        .catch(err => console.log(err));
    

    e.preventDefault();
});

//second button that inserts youtube url into the dom.... 
document.getElementById('button2').addEventListener('click', function(e){
    let url = document.getElementById('youtube-url').value;
    if (buttonState === 0){ 
      showVideo(url);
    } else {
      hideVideo()
    };
    console.log(buttonState);
    e.preventDefault();
});