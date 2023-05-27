import { Link, useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs';
import MainLayout from '../../components/MainLayout';
import { images, stables } from '../../contants';
import SuggestedPost from './container/SuggestedPost';
import CommentsContainer from '../../components/comments/CommentsContainer';
import SocialShareButtons from '../../components/SocialShareButtons';
import { useQuery } from '@tanstack/react-query';
import { getSinglePost } from '../../services/index/post';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { generateHTML } from '@tiptap/html';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton';
import ErrorMessage from '../../components/ErrorMessage';

const postsdata = [
	{
		_id: '1',
		image: images.Post1Image,
		title: 'Help children get better education',
		createdAt: '2023-01-28T15:35:53.607+0000',
	},
	{
		_id: '2',
		image: images.Post1Image,
		title: 'Help children get better education',
		createdAt: '2023-01-28T15:35:53.607+0000',
	},
	{
		_id: '3',
		image: images.Post1Image,
		title: 'Help children get better education',
		createdAt: '2023-01-28T15:35:53.607+0000',
	},
	{
		_id: '4',
		image: images.Post1Image,
		title: 'Help children get better education',
		createdAt: '2023-01-28T15:35:53.607+0000',
	},
];

const tagsData = [
	'Medical',
	'Lifestyle',
	'Learn',
	'Healthy',
	'Food',
	'Diet',
	'Education',
];

const ArticleDetail = () => {
	const { slug } = useParams();
	const [breadCrumbsData, setBreadCrumbsData] = useState([]);
	const [body, setBody] = useState(null);

	useEffect(() => {
		console.log(body);
	}, [body]);

	const { data, isLoading, isError } = useQuery({
		queryFn: () => getSinglePost({ slug }),
		onSuccess: data => {
			console.log(data);
			setBreadCrumbsData([
				{
					name: 'Home',
					link: '/',
				},
				{
					name: 'Blog',
					link: '/blog',
				},
				{
					name: 'Article title',
					link: `/blog/${data?.slug}`,
				},
			]);
			setBody(
				parse(
					generateHTML(data?.body, [Bold, Italic, Text, Paragraph, Document])
				)
			);
		},
		queryKey: ['blog', slug],
		onError: error => {
			toast.error(error.message);
			console.log(error);
		},
	});
	return (
		<MainLayout>
			{isLoading ? (
				<ArticleDetailSkeleton />
			) : isError ? (
				<ErrorMessage message="Something went wrong, please try again later." />
			) : (
				<section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
					<article className="flex-1">
						<BreadCrumbs data={breadCrumbsData} />
						<img
							className="rounded-xl w-full"
							src={
								data?.photo
									? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
									: images.SamplePostImage
							}
							alt={data?.title}
						/>
						<div className="mt-4 flex gap-3">
							{data?.categories?.map(category => (
								<Link
									key={category?.name}
									to={`/blog?category=${category?.name}`}
									className="text-primary text-sm font-roboto inline-block md:text-base"
								>
									{category?.name}
								</Link>
							))}
						</div>
						<h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
							{data?.title}
						</h1>
						<div className="mt-4 prose prose-sm sm:prose-base">{body}</div>
						<CommentsContainer className="mt-10" loggedInUserId="a" />
					</article>
					<div>
						<SuggestedPost
							header="Latest articles"
							posts={postsdata}
							tags={tagsData}
							className="mt-8 lg:mt-0 lg:max-w-xs"
						/>
						<div className="mt-7">
							<h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
								Share on:
							</h2>
							<SocialShareButtons
								url={encodeURI(
									'https://moonfo.com/post/client-side-and-server-side-explanation'
								)}
								title={encodeURIComponent(
									'Client-side and Server-side explanation'
								)}
							/>
						</div>
					</div>
				</section>
			)}
		</MainLayout>
	);
};

export default ArticleDetail;
