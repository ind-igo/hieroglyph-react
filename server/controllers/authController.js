let users = [
	{
		id: 0,
		username: 'shopper',
		password: '1234'
	}
];

module.exports = {
	// app.post('/api/login', authController.login);
	login: (req, res) => {
		const { session } = req;
		console.log(req.body);
		const { username, password } = req.body;

		const user = users.find(
			user => user.username === username && user.password === password
		);

		// Update the value of username to the user's username on the request session's user object.
		if (user) {
			session.user.username = user.username;
			res.status(200).send(session.user);
		} else {
			res.status(500).send('Not authorized');
		}
	},
	register: (req, res) => {
		res.status(200).send('register');
	},
	logout: (req, res) => {
		res.status(200).send('logout');
	},
	getUser: (req, res) => {
		const { user } = req.session;
		res.status(200).send(user);
	}
};

// app.post('/api/register', authController.register);
// app.post('/api/login', authController.login);
// app.post('/api/signout', authController.signout);
// app.get('/api/user', authController.getUser);
