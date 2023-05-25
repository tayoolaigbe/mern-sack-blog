import Post from '../models/Post';
import Comment from '../models/Comment';

export const createComment = async (req, res, next) => {
	try {
		const { desc, slug, parent, replyOnUser } = req.body;

		const post = await Post.findOne({
			slug: slug,
		});

		if (!post) {
			const error = new Error('Post not found!');
			return next(error);
		}

		const newComment = new Comment({
			user: req.user._id,
			desc,
			post: post._id,
			parent,
			replyOnUser,
		});
		const createdCommment = await newComment.save();
		return res.json(createdCommment);
	} catch (error) {
		next(error);
	}
};
