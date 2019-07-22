import React, { Component } from 'react';
import axios from 'axios';
import './Upload.scss';

export default class Upload extends Component {
	constructor() {
		super();
		this.state = {
			url: '',
			urlValid: true,
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
						onChange={e => this.setState({ url: e.target.value })}
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
			</div>
		);
	}

	// TDD here
	validateUrl = e => {
		e.preventDefault();

		// url input validation
		const { url } = this.state;

		const regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

		if (regex.test(url)) console.log('valid URL');
		else console.log('invalid URL');
		}
	};

	getTranscript = () => {
		const { url } = this.state;

		axios
			.post('/api/fetch', { url })
			.then(res => {
				this.setState({ transcript: res.data.body });
				console.log(this.state.transcript);
			})
			.catch(err => console.log(err));
	};
}
