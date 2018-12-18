const Logger = require('./logger');
const moment = require('moment');

class ConsoleLogger extends Logger{
    constructor(prefix = "prefix", defaultLevel = "LOG", dateFormat = "dddd, MMMM Do YYYY, h:mm:ss a") {
        super(prefix, defaultLevel, dateFormat);
    }

    format(message, level = this.defaultLevel) {
        return `${moment().format(this.dateFormat)} | ${this.prefix} | ${message}\n`;
    }

    log(message, level = this.defaultLevel) {
        if (level === 'LOG') console.log(this.format(message, level));
        else if (level === 'INFO') console.info(this.format(message, level));
        else if (level === 'WARN') console.warn(this.format(message, level));
        else if (level === 'ERROR') console.error(this.format(message, level));
        else console.log(this.format(message, this.defaultLevel));
    }
}

module.exports = ConsoleLogger;