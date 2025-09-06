const API_URL = 'http://193.151.152.161:8081/graphql';
const SUBSCRIPTION_URL = 'http://193.151.152.161:8081/graphql';
const BLOB_BASE_URL = 'http://193.151.152.161:8081/graphql';
const BLOB_URL =
	'https://apssocialorderstorage.blob.core.windows.net/images?sp=racwdli&st=2022-08-23T04:42:55Z&se=2122-08-23T12:42:55Z&spr=https&sv=2021-06-08&sr=c&sig=xY%2FGjm%2B9BYN5uM2maAMNg0kuaTE5EQeK9J1pmXyWaro%3D';

const config = {
	API_URL,
	BLOB_URL,
	BLOB_BASE_URL,
	SUBSCRIPTION_URL,
	//
	UPLOAD_URL: 'https://karito-dev.s3.ir-thr-at1.arvanstorage.ir',
	AWS_BUCKET_NAME: 'karito-dev',
	AWS_BUCKET_URL: 'https://bucket-qa-version.s3.ca-central-1.amazonaws.com/',
	AWS_REGION: 'ir-thr-at1',
	ACLs: 'enabled',
	AWS_ACCESS_KEY_ID: '89b30745-61e9-43c7-9e32-5512ed68333e',
	AWS_SECRET_ACCESS_KEY: '9b26f6aa5ce7310a85f075933df9d3c5ddd2c0d51ea00faf036f823071832257',
	//
	FIREBASE: {
		APP_ID: '',
		API_KEY: '',
		PROJECT_ID: '',
		AUTH_DOMAIN: '',
		STORAGE_BUCKET: '',
		MESSAGING_SENDER_ID: '',
	},
};

module.exports = config;
