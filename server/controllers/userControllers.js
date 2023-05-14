import User from '../models/User';

export const registerUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		// check whether user exist
		let user = await User.findOne({
			email,
		});

		if (user) {
			throw new Error('User email already registered');
		}

		// create a new user
		user = await User.create({
			email,
			name,
			password,
		});

		return res.status(201).json({
			_id: user._id,
			avatar: user.avatar,
			name: user.name,
			email: user.email,
			verified: user.verified,
			admin: user.admin,
			token: await user.generateJWT(),
		});
	} catch (error) {
		next(error);
	}
};

export const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({
			email,
		});

		if (!user) {
			throw new Error('User not found!');
		}

		if (await user.comparePassword(password)) {
			return res.status(200).json({
				_id: user._id,
				avatar: user.avatar,
				name: user.name,
				email: user.email,
				verified: user.verified,
				admin: user.admin,
				token: await user.generateJWT(),
			});
		} else {
			throw new Error('Invalid Email or Passwrod!');
		}
	} catch (error) {
		next(error);
	}
};

export const userProfile = async (req, res, next) => {
	try {
		let user = await User.findById(req.user._id);

		if (user) {
			return res.status(201).json({
				_id: user._id,
				avatar: user.avatar,
				name: user.name,
				email: user.email,
				verified: user.verified,
				admin: user.admin,
			});
		} else {
			let error = new Error('User not found');
			error.statusCode = 404;
			next(error);
		}
	} catch (error) {
		next(error);
	}
};
