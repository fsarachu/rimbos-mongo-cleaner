const log = require('simple-node-logger').createSimpleLogger({
    logFilePath: 'cleaner.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
});

module.exports = log;