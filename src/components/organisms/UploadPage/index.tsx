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
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
			if (url !== '') {
				onDrop(url);
				setResultUrl(url);
			} else {
				setError('حجم تصویر باید زیر یک مگ باشد');
			}
		} catch (err: any) {
			setError(err.message || 'خطا در آپلود فایل');
		} finally {
			setUploading(false);
		}
	};

	return (
		<Grid container spacing={2} dir="rtl">
			{/* عنوان */}
			<Grid item xs={12}>
				<h5 style={{ margin: 0 }}>{label}</h5>
			</Grid>

			{/* آپلودر زیبا */}
			<Grid item xs={12} sm={9}>
				<label
					style={{
						border: '2px dashed #6c87fd',
						padding: '14px 18px',
						borderRadius: '12px',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: '#f7f9ff',
						color: '#4a5ac9',
						fontSize: '14px',
						fontWeight: 500,
						transition: '0.3s',
						textAlign: 'center',
					}}
					onMouseEnter={(e) => (e.currentTarget.style.background = '#eef2ff')}
					onMouseLeave={(e) => (e.currentTarget.style.background = '#f7f9ff')}
				>
					{previewUrl ? 'تغییر تصویر' : '+ آپلود تصویر'}

					<input
						type="file"
						accept="image/*"
						style={{ display: 'none' }}
						onChange={(e) => {
							setFile(e.target.files ? e.target.files[0] : null);
						}}
					/>
				</label>
			</Grid>

			{/* پیش‌نمایش فوق‌العاده زیبا */}
			{!uploading && previewUrl && (
				<Grid item xs={12} sm={3} style={{ textAlign: 'center' }}>
					<div
						style={{
							width: '50px',
							height: '50px',
							borderRadius: '12px',
							overflow: 'hidden',
							border: '2px solid #d5d8ff',
							background: '#fff',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
						}}
					>
						<img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
					</div>
				</Grid>
			)}

			{/* لودینگ مدرن */}
			{uploading && (
				<Grid item xs={12} sm={3} style={{ textAlign: 'center' }}>
					<div
						style={{
							width: '50px',
							height: '50px',
							borderRadius: '12px',
							border: '2px dashed #b9b9b9',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							background: '#fafafa',
						}}
					>
						<CircularProgress size={30} />
					</div>
				</Grid>
			)}

			{/* خطا */}
			{error && (
				<Grid item xs={12}>
					<p style={{ color: 'red', margin: 0 }}>{error}</p>
				</Grid>
			)}
		</Grid>
	);
};

export default UploadPage;
