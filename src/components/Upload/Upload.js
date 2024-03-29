import React, { Component } from 'react';
import axios from 'axios';
import './Upload.scss';

export default class Upload extends Component {
	constructor() {
		super();

		this.state = {
			// input & validation for sending url
			urlInput: '',
			urlValid: true,

			// transcript
			showVideo: false,
			transcript: ''
		};
	}

	render() {
		return (
			<div className='container'>
				{/* Form */}
				<div id='url-form'>
					<input
						id='url-input'
						className='u-full-width'
						type='text'
						placeholder='Insert YouTube URL'
						onChange={e => this.setState({ urlInput: e.target.value })}
					/>
					<button
						id='submit-button'
						className='u-full-width'
						onClick={() => this.getTranscript()}>
						Submit
					</button>
				</div>

				{/* Video Player */}
				<div id='wrapper'>
					<iframe
						title='youtube-frame'
						id='youtube-iframe'
						allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
					/>
				</div>
				{/* Button Cluster */}

				<div className='transcript-bar'>
					<h5>Transcript</h5>
					<button id='show-button' type='button'>
						Show Youtube Video
					</button>
				</div>
				<hr />
				<div id='transcript' />

				{/* If page cannot load (required by Azure) */}
				{/* <div class="container">
				<h1 style="text-align:center;">Hieroglyph</h1>
				<h3 style="text-align:center;">404 - Page Not Found</h3>
			</div> */}
			</div>
		);
	}

	//
	validateUrlInput = e => {
		e.preventDefault();

		// url input validation
		const { urlInput } = this.state;

		const regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

		if (regex.test(urlInput)) {
			console.log('valid URL');
			// this.getTranscript(urlInput);
		} else {
			console.log('invalid URL');
			// show invalid message & red input field
		}

		// later validation features:
		// turn input field green if valid field
		// need to either clear out input field after valid submission
		// turn input field red if invalid input
	};

	getTranscript = () => {
		const { urlInput } = this.state;

		axios
			.post('/api/fetch', { url: urlInput })
			.then(res => {
				this.setState({ transcript: res.data.body });
				console.log(this.state.transcript);
			})
			.catch(err => console.log(err));
	};
}
