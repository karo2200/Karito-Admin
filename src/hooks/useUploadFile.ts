/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlobServiceClient } from '@azure/storage-blob';
import config from 'config';
import { useState } from 'react';

import { randomString } from '@/utils';

const blobServiceClient = new BlobServiceClient(config.BLOB_URL);
const containerClient = blobServiceClient.getContainerClient(config.CONTAINER_NAME);

export default function useFileUpload(callback?: (data: { file: File; url: string; progress: number }) => void) {
	const [isUploading, setIsUploading] = useState(false);
	const [result, setResult] = useState<{ file?: any; url?: string; progress?: number }>({
		file: undefined,
		url: undefined,
		progress: undefined,
	});

	async function upload(file: File) {
		if (!file) return;
		try {
			setIsUploading(true);
			const [fileName, extension] = file?.name?.split('.');
			const name = `${fileName}-${randomString(10)}.${extension}`;
			const size = file.size;
			const blockBlobClient = containerClient.getBlockBlobClient(name);
			const _URL = window.URL || window.webkitURL;
			const objectUrl = _URL.createObjectURL(file);
			const result = { progress: 0, file: { ...file, name }, url: name, objectUrl };
			await blockBlobClient.upload(file, size, {
				onProgress: ({ loadedBytes }) => {
					setResult({
						...result,
						progress: +((loadedBytes / size) * 100).toFixed(2),
					});
				},
			});
			result.progress = 100;

			setResult(result as any);
			callback?.(result as any);
			return result;
		} catch (error) {
			// ignore error
		} finally {
			setIsUploading(false);
		}
	}

	function reset() {
		const initialData = { file: undefined, url: undefined, progress: undefined };

		setResult(initialData);
		callback?.(initialData as any);
	}

	return { uploadFile: upload, reset, isUploading, ...result };
}
