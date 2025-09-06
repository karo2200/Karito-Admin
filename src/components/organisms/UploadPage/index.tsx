import React, { FC, useEffect, useState } from 'react';
import {
	useS3_CompleteMultipartUploadMutation,
	useS3_GeneratePresignedUrlMutation,
	useS3_GeneratePresignedUrlsMutation,
} from 'src/graphql/generated';
import { fileUploader } from 'src/hooks/useUploadToAws';

import { IPageProps } from './type-page';
const UploadPage: FC<IPageProps> = ({ onDrop, Empty, OnhandelEmpty, Url }) => {
	console.log(Empty);
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null); // <-- for preview image URL
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [resultUrl, setResultUrl] = useState<string | null>(null);

	const { mutateAsync: generatePresignedUrlMutate } = useS3_GeneratePresignedUrlMutation();
	const { mutateAsync: generatePresignedUrlsMutate } = useS3_GeneratePresignedUrlsMutation();
	const { mutateAsync: completeMultipartUploadMutate } = useS3_CompleteMultipartUploadMutation();
	useEffect(() => {
		if (Empty) {
			setPreviewUrl(null);
			return;
		}
	}, [Empty]);
	useEffect(() => {
		if (Url != '') {
			setPreviewUrl(Url);
			return;
		}
	}, [Url]);

	useEffect(() => {
		if (!file) {
			setPreviewUrl(null);
			return;
		}
		const objectUrl = URL.createObjectURL(file);
		setPreviewUrl(objectUrl);
		handleUpload();
		// Clean up the URL object when file changes or component unmounts
		return () => URL.revokeObjectURL(objectUrl);
	}, [file]);

	const generatePresignedUrlFn = async (objectKey: string): Promise<string> => {
		const res = await generatePresignedUrlMutate({ input: { objectKey } });
		const url = res.s3_generatePresignedUrl?.result?.presignedUrl;
		if (!url) throw new Error('No presigned URL');
		return url;
	};

	const generatePresignedUrlsFn = async (objectKey: string, fileSize: number, partSize: number): Promise<string[]> => {
		const res = await generatePresignedUrlsMutate({ input: { objectKey, fileSize, partSize } });
		const urls = res.s3_generatePresignedUrls?.result?.presignedUrls;
		if (!urls || urls.length === 0) throw new Error('No presigned URLs');
		return urls;
	};

	const completeMultipartUploadFn = async (
		objectKey: string,
		parts: { ETag: string; PartNumber: number }[]
	): Promise<string> => {
		const res = await completeMultipartUploadMutate({ input: { objectKey, parts } });
		return res.s3_completeMultipartUpload?.status;
	};

	const handleUpload = async () => {
		if (!file) return;
		setUploading(true);
		setError(null);
		setResultUrl(null);

		try {
			const url = await fileUploader(file, generatePresignedUrlFn, generatePresignedUrlsFn, completeMultipartUploadFn);
			onDrop(url);
			setResultUrl(url);
		} catch (err: any) {
			setError(err.message || 'Upload failed');
		} finally {
			setUploading(false);
		}
	};

	return (
		<div>
			<input
				type="file"
				accept="image/*"
				onChange={(e) => {
					OnhandelEmpty(false);
					setFile(e.target.files ? e.target.files[0] : null);
				}}
			/>

			{/* Show preview */}
			{previewUrl ? (
				<div style={{ marginTop: 10 }}>
					<img src={previewUrl} alt="Preview" style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'contain' }} />
				</div>
			) : (
				''
			)}

			{error && <p style={{ color: 'red' }}>خطا در آپلود فایل</p>}
		</div>
	);
};
export default UploadPage;
