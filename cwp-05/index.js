const http = require('http');
const com = require("./controllers/Comments");
const art = require("./controllers/Articles");
const error = require('./lib/error-sending');
const logger = require('./lib/logger');
let articles = require("./content/articles.json");

const port = 3000;

let controllers = {
    comments: new com.Comments(),
    articles: new art.Articles()
};

const handlers = {
    '/api/articles/readall': controllers.articles.readAll,
    '/api/articles/read': controllers.articles.read,
    '/api/articles/create': controllers.articles.create,
    '/api/articles/update': controllers.articles.update,
    '/api/articles/delete': controllers.articles.delete,
    '/api/comments/create': controllers.comments.create,
    '/api/comments/delete': controllers.comments.delete,
    '/api/logs': logger.sendLogs
};

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        if (err) {
            res.statusCode = err.code;
            res.end(JSON.stringify(err));
        } else {
            logger.writeToLog(req.url, payload);
            const handler = getHandler(req.url);
            handler(req, res, payload, (err, result) => {
                res.setHeader('Content-Type', 'application/json');
                if (err) {
                    res.statusCode = err.code;
                    res.end(JSON.stringify(err));
                } else {
                    res.statusCode = 200;
                    res.end(JSON.stringify(result));
                }
            });
        }
    });
});

server.listen(port, () => console.log(`Server running at http://localhost:${port}/`));

function getHandler(url) {
    return handlers[url] || error.pageNotFoundError;
}

function parseBodyJson(req, cb) {
    let body = [];
    req.on('data', chunk => body.push(chunk))
       .on('end', () => {
        body = Buffer.concat(body).toString();

        if (body !== "") {
            try {
                params = JSON.parse(body);
                cb(null, params);
            } catch (err) {
                console.log(err);
                error.requestInvalidError(req, null, null, cb);
            }
        }
    });
}

