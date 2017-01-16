const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const questionRoutes = require('./routes/question');

const formidable = require('formidable');
const mongoose = require('mongoose');
const grid = require('gridfs-stream');
const fs = require('fs');
const util = require('util');

(function() {
  'use strict';

  /**
   * Global Constants
   */
  const CLIENT_PATH = './client/build/';
  const API_PATH = '/api';
  const ROUTES = {
    upload: 'upload',
  };

  /**
   * Main
   */
  const app = express();
  const conn = mongoose.createConnection(config.dbUri);

  // setup models
  require('./models').connect(config.dbUri);
  grid.mongo = mongoose.mongo;

  // setup static files
//  app.use(express.static(CLIENT_PATH));

  // setup body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // setup routes
  // app.use(getAPIPath(ROUTES.QUESTION), questionRoutes);
  
app.post('/fileupload', function (req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/data";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (!err) {
          console.log('File uploaded : ' + files.file.path);
          conn.once('open', function () {
              const gfs = grid(conn.db);
              const writestream = gfs.createWriteStream({
                  filename: files.file.name
              });
          fs.createReadStream(files.file.path).pipe(writestream);
       });
     }        
   });
   form.on('end', function() {        
       res.send('Completed ..... go and check fs.files & fs.chunks in  mongodb');
   });

});

app.get('/images', (req, res) => {
     // console.log(req);
     const conn = mongoose.createConnection(config.dbUri);
     conn.once('open',  () => {
         const gfs = grid(conn.db);
         gfs.files.find().toArray((err, files) => {
             console.log(files);
             const images = files.map((f) => ({id: f._id, filename: f.filename}));
             const resJSON = {images: images};
             res.end(JSON.stringify(resJSON));
         });
     });
});

app.get('/display/:id', (req, res) => {
     const conn = mongoose.createConnection(config.dbUri);
     conn.once('open',  () => {
         const gfs = grid(conn.db, mongoose.mongo);
         var readstream = gfs.createReadStream({
             _id: req.params.id
         });
         readstream.pipe(res);
     });
});
// app.get('/image:
app.get('/', function(request, response){
    response.send(
        '<form method="post" action="/fileupload" enctype="multipart/form-data">'
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

})();
