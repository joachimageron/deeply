"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g;
exports.__esModule = true;
require('dotenv').config();
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var FSFilesAdapter = require('@parse/fs-files-adapter');
var path_1 = __importDefault(require("path"));
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1337;
var app = express();
var __dirname = path_1["default"].resolve();
var fsAdapter = new FSFilesAdapter();
var config = {
    databaseURI: (_b = process.env.MONGODB_URI) !== null && _b !== void 0 ? _b : 'postgresql://postgres:pass@localhost/postgres',
    cloud: (_c = process.env.CLOUD_CODE_MAIN) !== null && _c !== void 0 ? _c : __dirname + '/cloud/main.js',
    appId: (_d = process.env.APP_ID) !== null && _d !== void 0 ? _d : 'myAppId',
    masterKey: (_e = process.env.MASTER_KEY) !== null && _e !== void 0 ? _e : 'myMasterKey',
    serverURL: (_f = process.env.SERVER_URL) !== null && _f !== void 0 ? _f : 'http://localhost:1337/parse',
    // liveQuery: {
    //     classNames: [''], // List of classes to support for query subscriptions
    // },
    filesAdapter: fsAdapter,
    allowClientClassCreation: (_g = process.env.CLIENT_CLASS_CREATION) !== null && _g !== void 0 ? _g : false
};
var api = new ParseServer(config);
api.start().then(function () {
    console.log('server starting');
    app.get('/', function (req, res) {
        res.status(200).send('Bienvenu sur l\'API deeply');
    });
    app.sendFiles = function (req, res) {
        res.sendFile(path_1["default"].join(__dirname, 'public', 'index.html'));
    };
    app.use('/parse', api.app);
    app.listen(port, function () {
        console.log("Server running on port ".concat(port));
    });
});
