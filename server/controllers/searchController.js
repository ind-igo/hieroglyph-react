module.exports = {
  index: (req, res) => {
    const esClient = req.app.locals.esClient;
    const { videoId, title, transcript } = req.body;

    esClient.index({
      index: 'transcripts',
      body: {
        title: title,
        text: transcript
      }
    })
    esClient.ping().then(result => console.log(result));

    res.status(200).send("all is gud");
  }
};