const getSubtitles = require('youtube-captions-scraper').getSubtitles;

const ytRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

module.exports = {
	fetch: (req, res) => {
		const { url } = req.body;
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
			const fullText = fullTextArray.join(' ');

			const title = 'example title'; // get from scraper

			const response = {
        url: "fuckoff",
        title: title,
        transcript: fullText
      };
			res.status(200).send(response);
		});
  },
  cacheTranscript: (req, res) => {
    const db = req.app.get('db');

    const { title, url, transcript } = req.body;

    db.hg_transcripts.save({
      url: url,
      title: title,
      transcript: transcript
    })
    .then(retval => {
      console.log(retval)
    });

    res.status(200).send("all is gud");
  }
};
