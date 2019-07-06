module.exports = function(req, res, next) {
	const { session } = req; // destructure session object

	// creates session if none exists
	if (!session.user) {
		session.user = { username: '' };
	}

	next();
};
