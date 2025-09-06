export function randomString(length: number) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export function getFullImageUrl(url?: string | undefined | null) {
	if (url) {
		if (url?.startsWith?.('https') || url?.startsWith?.('http')) {
			return url;
		}
		return url && `${config.BLOB_BASE_URL}${url}`;
	} else {
		return;
	}
}
