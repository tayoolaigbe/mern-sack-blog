import CommentForm from './CommentForm';

const CommentsContainer = ({ className }) => {
	return (
		<div className={`${className}`}>
			<CommentForm btnLabel="Send" />
		</div>
	);
};

export default CommentsContainer;
