const fs = require('fs');
const env = process.argv[2]?.replace?.('-', '') || 'dev';
const index = fs.readFileSync(`./config/index.${env}.js`, 'utf8');

console.log(`Writing config file in ${env} mode`);

fs.writeFileSync('./config/index.js', index);
