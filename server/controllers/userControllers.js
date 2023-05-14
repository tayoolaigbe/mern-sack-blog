import User from '../models/User';

import { uploadPicture } from '../middleware/uploadPictureMiddleware';
import { fileRemover } from '../utils/fileRemover';

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

export const updateProfile = async (req, res, next) => {
	try {
		let user = await User.findById(req.user._id);
		if (!user) {
			throw new Error('User not found!');
		}

		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password && req.body.password.length < 6) {
			throw new Error('Password should be at least 6 characters.');
		} else if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUserProfile = await user.save();

		return res.status(200).json({
			_id: updatedUserProfile._id,
			avatar: updatedUserProfile.avatar,
			name: updatedUserProfile.name,
			email: updatedUserProfile.email,
			verified: updatedUserProfile.verified,
			admin: updatedUserProfile.admin,
			token: await updatedUserProfile.generateJWT(),
		});
	} catch (error) {
		next(error);
	}
};

export const updateProfilePicture = async (req, res, next) => {
	try {
		const upload = uploadPicture.single('profilePicture');

		upload(req, res, async function (err) {
			if (err) {
				const error = new Error('An Unknown Error occured when uploading!');
				next(error);
			} else {
				if (req.file) {
					const updatedUser = await User.findByIdAndUpdate(
						req.user._id,
						{
							avatar: req.file.filename,
						},
						{ new: true }
					);

					return res.status(201).json({
						_id: updatedUser._id,
						avatar: updatedUser.avatar,
						name: updatedUser.name,
						email: updatedUser.email,
						verified: updatedUser.verified,
						admin: updatedUser.admin,
						token: await updatedUser.generateJWT(),
					});
				} else {
					let filename;
					let updatedUser = await User.findById(req.user._id);
					filename = updatedUser.avatar;
					updatedUser.avatar = '';
					await updatedUser.save();
					fileRemover(filename);

					return res.status(201).json({
						_id: updatedUser._id,
						avatar: updatedUser.avatar,
						name: updatedUser.name,
						email: updatedUser.email,
						verified: updatedUser.verified,
						admin: updatedUser.admin,
						token: await updatedUser.generateJWT(),
					});
				}
			}
		});
	} catch (error) {
		next(error);
	}
};
