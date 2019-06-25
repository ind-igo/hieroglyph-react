// Globals
let videoVisible = false;
const youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

// DOM Objects
const Transcript_Area = document.getElementById('transcript');
const Submit_Button = document.getElementById('submit-button');
const Show_Button = document.getElementById('show-button');
const I_Frame = document.getElementById('youtube-iframe');
const URL_Input = document.getElementById('url-input');

// Attach Event Listeners
Submit_Button.addEventListener('click', submitVideo(e.target));
Show_Button.addEventListener('click', showVideo(e.target));

// =========
// Functions
// =========

// helper function
function getVideoId(url) {
	url = url
		.replace(/(>|<)/gi, '')
		.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

	let ID = '';
	if (url[2] !== undefined) {
		ID = url[2].split(/[^0-9a-z_\-]/i);
		ID = ID[0];
	} else {
		ID = url;
	}
	return ID;
}

// Show Video Functions
function showVideo(url) {
	let rightUrl = getVideoId(url);

	// Required for YouTube iframe to work
	I_Frame.src = `https://www.youtube.com/embed/${rightUrl}`;
	I_Frame.style.display = 'inline-block';
	I_Frame.allow =
		'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
	Show_Button.innerText = 'Hide Youtube Video';
}

function hideVideo() {
	I_Frame.style.display = 'none';
	I_Frame.src = '';
	Show_Button.innerText = 'Show Youtube Video';
}

function toggleVideoButton() {
	videoVisible = !videoVisible;
}

function showVideo(e) {
	e.preventDefault();
	let url = URL_Input.value;
	if (videoVisible) {
		hideVideo();
	} else {
		showVideo(url);
	}
	toggleVideoButton();
}

// Event Functions
function showTranscript(data_) {
	Transcript_Area.innerHTML = data_;
}

// Make an HTTP POST Request (refactor with Axios)
const postApi = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(data)
	});

	const resData = await response.json();
	return resData;
};

function submitVideo(e) {
	e.preventDefault();
	let url = URL_Input.value;
	if (youtubeRe.test(url) === false) {
		// formerly showError()
		URL_Input.style.color = 'red';
		URL_Input.style.borderColor = 'red';
		Transcript_Area.innerHTML = 'There is an error in your Youtube URL'; // formerly clearTranscriptError()
	} else {
		urlJson = {
			url: url
		};
		//post to AWS API - it takes in url as json and outputs text of video
		postApi(
			'https://3iy19oh41a.execute-api.us-east-1.amazonaws.com/test/transcribe',
			urlJson
		)
			.then(data => showTranscript(data.body))
			.catch(err => console.log(err));
		URL_Input.style.color = '';
		URL_Input.style.borderColor = '#D1D1D1';
		Submit_Button.style.color = '';
	}
}
