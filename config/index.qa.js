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
