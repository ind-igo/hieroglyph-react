const getSubtitles = require('youtube-captions-scraper').getSubtitles;

const ytRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

module.exports = {
	fetch: (req, res) => {
		const { url } = req.body;
		console.log(url);
		const videoId = url.match(ytRegex)[1];

		getSubtitles({
			videoID: videoId,
			lang: 'en'
		}).then(transcript => {
			//console.log(transcript[0].text);
			let fullTextArray = [];
			for (const element of transcript) {
				fullTextArray.push(element.text);
			}
			const fullText = fullTextArray.join();

			const db = req.app.get('db');
			const title = 'example title'; // get from scrapper

			db.add_transcript([url, title, fullText]);

			const response = { transcript: fullText };
			res.status(200).send(response);
		});
	}
};
