import { Request, Response } from 'express';
require('dotenv').config();
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const FSFilesAdapter = require('@parse/fs-files-adapter');
import path from 'path';


const port = process.env.PORT ?? 1337;
const app = express();
const __dirname = path.resolve();
const fsAdapter = new FSFilesAdapter();
const config = {
    databaseURI: process.env.MONGODB_URI ?? 'postgresql://postgres:pass@localhost/postgres',
    cloud: process.env.CLOUD_CODE_MAIN ?? __dirname + '/cloud/main.js',
    appId: process.env.APP_ID ?? 'myAppId',
    masterKey: process.env.MASTER_KEY ?? 'myMasterKey', //Add your master key here. Keep it secret!
    serverURL: process.env.SERVER_URL ?? 'http://localhost:1337/parse', // Don't forget to change to https if needed
    // liveQuery: {
    //     classNames: [''], // List of classes to support for query subscriptions
    // },
    filesAdapter: fsAdapter,
    allowClientClassCreation: process.env.CLIENT_CLASS_CREATION ?? false,
};
const api = new ParseServer(config);

api.start().then(() => {
    console.log('server starting');
    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('Bienvenu sur l\'API deeply');
    });
    app.sendFiles = (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
    app.use('/parse', api.app);
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
