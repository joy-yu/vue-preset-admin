const SSH = require('simple-scp');
const minimist = require('minimist');
const serverConfig = require('./config/deploy.config');

const deployMode = minimist(process.argv.slice(2)).mode || 'test';
const deploy = new SSH(serverConfig[deployMode]);

deploy.dest('dist', '/usr/share/nginx/html/admin/');
