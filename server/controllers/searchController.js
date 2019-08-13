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
    .then(response => console.log(response));

    res.status(200).send("Item indexed!");
  },

  search: (req, res) => {
    const esClient = req.app.locals.esClient;
    const { searchTerm } = req.body;

    esClient.search({
      index: 'transcripts',
      q: searchTerm
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

    res.status(200).send(body);
  }
};