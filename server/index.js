const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const filesRoutes = require('./routes/files');

(function() {
  'use strict';

  var cluster = require('cluster');


  if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }
    cluster.on('exit', function (worker) {
      console.log('Worker %d died :(', worker.id);
      cluster.fork();
    });
  } else {
    /**
     * Global Constants
     */
    const CLIENT_PATH = './client/build/';
    const API_PATH = '/api';
    const ROUTES = {
      FILES: '/files',
    };

    /**
     * Main
     */
    const app = express();


    // setup models
    require('./models').connect(config.dbUri);

    // setup static files
    app.use(express.static(CLIENT_PATH));

    // setup body parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // setup routes
    // app.use(getAPIPath(ROUTES.QUESTION), questionRoutes);
    app.use(ROUTES.FILES, filesRoutes);


    // app.get('/image:
    app.get('/self_upload', function(request, response){
      response.send(
        '<form method="post" action="/files/upload" enctype="multipart/form-data">'
        + '<input type="file" id="file" name="file">'
        + '<input type="submit" value="submit">'
        + '</form>'
      );
    });
    // start the server
    app.listen(config.port, () => {
      console.log(`Server is running on http://0.0.0.0:${config.port}`);
    });

    return app;

    /**
     * Functions
     */
    function getAPIPath(route) {
      return `${API_PATH}${route}`;
    }
  }
})();
