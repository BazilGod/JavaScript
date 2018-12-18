const FileLogger = require('./file-logger');
const fs = require('fs');

let queue = [];

class DeferredFileLogger extends FileLogger{
    constructor(file = "defferedDefFile.txt", queueLength = 1, prefix = "prefix", defaultLevel = "LOG", dateFormat = "dddd, MMMM Do YYYY, h:mm:ss a") {
        super(file, prefix, defaultLevel, dateFormat);
        this.queueLength = queueLength;
    }

    log(message, level = this.defaultLevel) {
        queue.push(this.format(message));
        return new Promise((resolve, reject) => {
            if (queue.length === this.queueLength) {
                if (typeof(this.file) === 'string' || this.file instanceof String) {
                    fs.appendFile(this.file, queue.join(''), (err) => {
                        if (err) {
                            console.error(err);
                            reject(false);
                        }
                        else {
                            queue = [];
                            resolve(true);
                        }
                    });
                }
                else {
                    this.file.write(queue.join(''), (err) => {
                        if (err) {
                            console.error(err);
                            reject(false);
                        }
                        else {
                            queue = [];
                            resolve(true);
                        }
                    });
                }
            }
            else resolve(true);
        });
    }
}

module.exports = DeferredFileLogger;