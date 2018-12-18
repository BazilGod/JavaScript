const moment = require('moment');

class Logger{
    constructor(prefix = 'prefix', defaultLevel = 'LOG', dateFormat = 'dddd, MMMM Do YYYY, h:mm:ss a'){
        this.prefix = prefix;
        this.defaultLevel = defaultLevel;
        this.dateFormat = dateFormat;
    }

    format(message, level = this.defaultLevel) {
        return `${moment().format(this.dateFormat)} | ${this.prefix} | ${level} | ${message}\n`;
    }
}

module.exports = Logger;