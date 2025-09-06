export const MIN_CHUNK_SIZE = 20 * 1024 * 1024; // 20MB

export type UploadFile = File;

export async function fileUploader(
	file: UploadFile,
	generatePresignedUrlFn: (objectKey: string) => Promise<string>,
	generatePresignedUrlsFn: (objectKey: string, fileSize: number, partSize: number) => Promise<string[]>,
	completeMultipartUploadFn: (objectKey: string, parts: { ETag: string; PartNumber: number }[]) => Promise<string>
): Promise<string> {
	const size = file.size;

	if (size <= MIN_CHUNK_SIZE) {
		// Single part upload
		return uploadSinglePart(file, generatePresignedUrlFn);
	} else {
		// Multipart upload
		return uploadMultiPart(file, size, generatePresignedUrlsFn, completeMultipartUploadFn);
	}
}

async function uploadSinglePart(
	file: UploadFile,
	generatePresignedUrlFn: (objectKey: string) => Promise<string>
): Promise<string> {
	const objectKey = file.name;

	const presignedUrl = await generatePresignedUrlFn(objectKey);
	if (!presignedUrl) throw new Error('Failed to get presigned URL');

	const response = await fetch(presignedUrl, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/octet-stream',
			'x-amz-acl': 'public-read',
		},
		body: file,
	});

	if (!response.ok) throw new Error(`Upload failed: ${response.status}`);

	// Usually you return the file URL or key
	return presignedUrl.split('?')[0]; // URL without query params
}

async function uploadMultiPart(
	file: UploadFile,
	size: number,
	generatePresignedUrlsFn: (objectKey: string, fileSize: number, partSize: number) => Promise<string[]>,
	completeMultipartUploadFn: (objectKey: string, parts: { ETag: string; PartNumber: number }[]) => Promise<string>
): Promise<string> {
	const objectKey = file.name;

	const urls = await generatePresignedUrlsFn(objectKey, size, MIN_CHUNK_SIZE);
	if (!urls.length) throw new Error('No presigned URLs received');

	const parts: { ETag: string; PartNumber: number }[] = [];

	for (let i = 0; i < urls.length; i++) {
		const presignedUrl = urls[i];
		const start = i * MIN_CHUNK_SIZE;
		const end = Math.min(start + MIN_CHUNK_SIZE, size);

		const slice = file.slice(start, end);

		const response = await fetch(presignedUrl, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/octet-stream' },
			body: slice,
		});

		if (!response.ok) throw new Error(`Part ${i + 1} failed`);

		const eTag = response.headers.get('ETag')?.replace(/"/g, '');
		if (!eTag) throw new Error('Missing ETag');

		parts.push({ ETag: eTag, PartNumber: i + 1 });
	}

	// Complete multipart upload
	return completeMultipartUploadFn(objectKey, parts);
}
