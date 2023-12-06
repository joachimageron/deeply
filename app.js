const express = require('express');
const ParseServer = require('parse-server').ParseServer;

const app = express();
const api = new ParseServer({
   databaseURI: 'postgresql://postgres:pass@localhost/postgres', // Mettez à jour avec vos infos
   appId: 'monAppId',
   masterKey: 'monMasterKey',
   serverURL: 'http://localhost:1337/parse'
});

api.start().then(() => {
  console.log('Parse Server is running...');
   app.use('/parse', api.app);

   const port = 1337;
   app.listen(port, function() {
      console.log('parse-server-example running on port ' + port + '.');
   });
});

// Serve the Parse API at /parse URL prefix
