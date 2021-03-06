const convict = require('convict');
const path = require('path');

// Define a schema
const config = convict({
	appName: {
		doc: 'App name',
		format: String,
		default: 'pft',
		env: 'APP_NAME',
	},
	env: {
		doc: 'The application environment.',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV',
	},
	ip: {
		doc: 'The IP address to bind.',
		format: 'ipaddress',
		default: '127.0.0.1',
		env: 'IP_ADDRESS',
	},
	port: {
		doc: 'The port to bind.',
		format: 'port',
		default: 3000,
		env: 'PORT',
	},
	db: {
		uri: {
			doc: 'Mongo uri',
			format: String,
			default: null,
			env: 'MONGODB_URI',
		},
	},
	loggerLevel: {
		doc: 'log level.',
		format: [
			'fatal',
			'error',
			'warn',
			'info',
			'debug',
			'trace',
		],
		default: 'info',
		env: 'LOG_LEVEL',
	},
	helper: {
		doc: 'helper for insert data to db',
		format: String,
		default: 'db helper',
		env: 'DB_HELPER',
	},
	facebook: {
		appId: {
			doc: 'facebook application id',
			format: String,
			default: 'facebookAppId',
		},
		secret: {
			doc: 'facebook application secret',
			format: String,
			default: 'facebookSecret',
		},
	},
	jwtSecret: {
		doc: 'private key for json tokens',
		format: String,
		default: 'secret',
	},
});

// Load environment dependent configuration
const env = config.get('env');
const configPath = path.resolve(`./config/${env}.json`);
config.loadFile(configPath);
// Perform validation
config.validate({
	allowed: 'strict',
});

module.exports = config;
