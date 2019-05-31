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

function showVideo(url_) {
    let iframe = document.createElement('iframe');
    let rightUrl = getVideoId(url_)
    //this is all stuff to mimic the Youtube Embed format
    iframe.src = `https://www.youtube.com/embed/${rightUrl}`
    iframe.frameBorder = '0'
    iframe.width = '560';
    iframe.height = '315';
    iframe.margin = 'auto';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
    console.log(iframe);
    
    //select the dom - use container
    let container = document.querySelector('.container')
    container.insertBefore(iframe, container.childNodes[6]);

}

//declare the global var
const url = document.getElementById('youtube-url').value;
console.log(url);

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
    showVideo(url);
    
    e.preventDefault();
});