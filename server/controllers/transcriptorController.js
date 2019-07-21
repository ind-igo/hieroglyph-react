const getSubtitles = require('youtube-captions-scraper').getSubtitles;

const ytRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

module.exports = {
  fetchTranscript: (req, res) => {
    const { url } = req.body;
    const videoId = url.match(ytRegex)[1];

    getSubtitles({
      videoID: videoId,
      lang: 'en'
    })
    .then(transcript => {
      //console.log(transcript[0].text);
      let fullTextArray = [];
      for(const element of transcript) {
        fullTextArray.push(element.text);
      }
      fullText = fullTextArray.join();
      const response = {"transcript": fullText};
      res.status(200).send(response);
    });
  }
};