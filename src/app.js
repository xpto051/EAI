const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const corsConfig = require('./config/cors');

//const db = require('./dal');

/**
 *
 */
class App {
    constructor() {
        this.server = express();

        this.middleware();

        this.routes();
    }

    middleware() {
        this.server.use(cors(corsConfig))
    }
    /**
     *
     */
    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;