import User from '../models/User';

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// check whether user exist
		let user = await User.findOne({
			email,
		});

		if (user) {
			return res.status(400).json({ message: 'User already registered' });
		}

		// create a new user
		user = await User.create({
			email,
			name,
			password,
		});

		return res.status(201).json({
			_id: user.id._id,
			avatar: user.avatar,
			name: user.name,
			email: user.email,
			verified: user.verified,
			admin: user.admin,
			token: null,
		});
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export { registerUser };
