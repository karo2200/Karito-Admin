import { CircularProgress, Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
	useS3_CompleteMultipartUploadMutation,
	useS3_GeneratePresignedUrlMutation,
	useS3_GeneratePresignedUrlsMutation,
} from 'src/graphql/generated';
import { fileUploader } from 'src/hooks/useUploadToAws';

import { IPageProps } from './type-page';
const UploadPage: FC<IPageProps> = ({ onDrop, Empty, Url, name, label }) => {
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null); // <-- for preview image URL
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [resultUrl, setResultUrl] = useState<string | null>(null);

	const { mutateAsync: generatePresignedUrlMutate } = useS3_GeneratePresignedUrlMutation();
	const { mutateAsync: generatePresignedUrlsMutate } = useS3_GeneratePresignedUrlsMutation();
	const { mutateAsync: completeMultipartUploadMutate } = useS3_CompleteMultipartUploadMutation();

	useEffect(() => {
		setPreviewUrl(Url || null);
	}, [Url]);

	useEffect(() => {
		if (!file) return;

		const objectUrl = URL.createObjectURL(file);
		setPreviewUrl(objectUrl);
		handleUpload();

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
			if (url != '') {
				onDrop(url);
				setResultUrl(url);
			} else setError('حجم تصویر باید زیر یک مگ باشد');
		} catch (err: any) {
			setError(err.message || 'Upload failed');
		} finally {
			setUploading(false);
		}
	};

	return (
		<Grid container spacing={2} dir="rtl">
			{/* عنوان بالای آپلود فایل */}
			<Grid item xs={12}>
				<h5 style={{ margin: 0 }}> {label}</h5>
			</Grid>

			{/* input فایل */}
			<Grid item xs={12} sm={9} sx={{ display: 'flex', alignItems: 'center' }}>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => {
						//OnhandelEmpty(false);
						setFile(e.target.files ? e.target.files[0] : null);
					}}
				/>
			</Grid>

			{/* نمایش پیش‌نمایش وقتی آپلود انجام نشده یا تمام شده */}
			{!uploading && previewUrl && (
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<img src={previewUrl} alt="Preview" style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'contain' }} />
				</Grid>
			)}

			{/* نمایش لودینگ هنگام آپلود */}
			{uploading && (
				<Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<CircularProgress size={24} />
				</Grid>
			)}

			{error && (
				<Grid item xs={12}>
					<p style={{ color: 'red' }}>خطا در آپلود فایل</p>
				</Grid>
			)}
		</Grid>
	);
};
export default UploadPage;
