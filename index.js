const express = require('express');
const ParseServer = require('parse-server').ParseServer;

const index = express();
const api = new ParseServer({
   databaseURI: 'postgresql://postgres:pass@localhost/postgres', // Mettez à jour avec vos infos
   appId: 'monAppId',
   masterKey: 'monMasterKey',
   serverURL: 'http://localhost:1337/parse'
});

api.start().then(() => {
  console.log('Parse Server is running...');
  index.get('/', function(req, res) {
      res.status(200).send('Express is running here.');
   });
   index.use('/parse', api.app);

   const port = 1337;
   index.listen(port, function() {
      console.log('parse-server-example running on port ' + port + '.');
   });
});

// Serve the Parse API at /parse URL prefix
