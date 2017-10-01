const convict = require('convict');

// Define a schema
const config = convict({
appName: {
    doc: "App name",
    format: String,
    default: "pft",
    env: "APP_NAME"
},   
 env: {
   doc: "The application environment.",
   format: ["production", "development", "test"],
   default: "development",
   env: "NODE_ENV"
 },
 ip: {
   doc: "The IP address to bind.",
   format: "ipaddress",
   default: "127.0.0.1",
   env: "IP_ADDRESS",
 },
 port: {
   doc: "The port to bind.",
   format: "port",
   default: 3000,
   env: "PORT"
 },
 db: {
   uri: {
     doc: "Mongo uri",
     format: String,
     default: 'users'
   }
 }
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;