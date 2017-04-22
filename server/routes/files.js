const debug = require('debug')('router:files');
const express = require('express');
const superAgent = require('superagent');
const config = require('../config');
const path = require('path');
const formidable = require('formidable');
const mongoose = require('mongoose');
const grid = require('gridfs-stream');
const fs = require('fs');
const util = require('util');

module.exports = (function() {
  'use strict';

  /**
   * Global Constants
   */
  const ROUTES = {
    UPLOAD: '/upload',
    IMAGES: '/images',
    DATE_ALBUM: '/album',
    ALBUM_IMAGES: '/album/:time',
    DISPLAY: '/display/:id'
  };

  const PATH_TEMP = path.resolve(config.ROOT_PATH, 'data');

  /**
   * Main
   */
  const router = new express.Router();

  router.post(ROUTES.UPLOAD, upload);
  router.get(ROUTES.IMAGES, images);
  router.get(ROUTES.DISPLAY, display);
  router.get(ROUTES.DATE_ALBUM, date_album);
  router.get(ROUTES.ALBUM_IMAGES, album_images);

  return router;

  function upload(req, res) {
    const form = new formidable.IncomingForm();
    console.log(PATH_TEMP);
    form.uploadDir = PATH_TEMP;
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
      if (err) {
        return;
      }
      console.log('File uploaded : ' + files.file.path);
      let filePath = files.file.path;
      const conn = mongoose.createConnection(config.dbUri);
      grid.mongo = mongoose.mongo;
      conn.once('open', function () {
        const gfs = grid(conn.db);
        const writestream = gfs.createWriteStream({
          filename: files.file.name,
          metadata: {test: 'this is a test'}
        });
        const stream = fs.createReadStream(files.file.path).pipe(writestream);

        var had_error = false;
        stream.on('error', function(err){
          had_error = true;
        });
        stream.on('close', function(){
          if (filePath !== undefined) {
          fs.unlink(filePath);
          }
        });
      });
    });
    form.on('end', function() {
      res.send('Completed ..... go and check fs.files & fs.chunks in  mongodb');
    });
  }

  function date_album(req, res) {
    const conn = mongoose.createConnection(config.dbUri);
    conn.once('open',  () => {
      const gfs = grid(conn.db, mongoose.mongo);
      gfs.files.find().toArray((err, files) => {

        var existance = {};
        const filteredImages = files.filter((f) => {

          return !isTimeExist(existance, f.uploadDate);
        });
        let copy;
        const album = filteredImages.map(f => {
          let time = new Date(f.uploadDate);
          time = new Date(time.getFullYear(), time.getMonth(), time.getDate());
          return ({id: f._id, filename: f.filename, date: time.getTime(), albumName: getAlbumName(f.uploadDate)});
        });
        res.send({album});
      });
    });

    function getAlbumName(time) {
      let dateTime = new Date(time);
      return (dateTime.getMonth()+1)+"月"+dateTime.getDate();
    }
  }

  function album_images(req, res) {
    let time = req.params.time;

    if (isNaN(parseInt(time))) {
      res.status(400).send('invalid input');
      return;
    }


    const PER_PAGE = 100;
    let page = (Math.abs(req.query.p) || 1) - 1;
    let limit = Math.abs(req.query.limit) || PER_PAGE;

    console.log('process time')
    time = parseInt(time);
    const reqTime = new Date(time);
    const upperTime = new Date(time + 1000*60*60*24);
    const conn = mongoose.createConnection(config.dbUri);
    const filter = {
      uploadDate: {
          $gte: reqTime,
          $lt: upperTime
        }
    };

    conn.once('open',  () => {
      const gfs = grid(conn.db, mongoose.mongo);
      gfs.files.find(filter).limit(limit).skip(limit * page).toArray((err, files) => {
          const images = files.map((f) => {
            return ({id: f._id, filename: f.filename, uploadDate: f.uploadDate})});
          const resJSON = {images: images};
          res.send(resJSON);
        });
    });
  }

  function isTimeExist(existance, time) {
    if (typeof existance === 'undefined' || !existance) {
      throw 'existArray not exist';
    }
    let date = new Date(time); // ISO time
    date = time.getFullYear() + time.getMonth() + time.getDate();
    if (date in existance) {
      return true;
    } else {
      existance[date]="";
    }
  }

  function images(req, res) {
    const conn = mongoose.createConnection(config.dbUri);

    conn.once('open',  () => {
      const gfs = grid(conn.db, mongoose.mongo);
      gfs.files.find().toArray((err, files) => {
        console.log(files);
        console.log(files[0].uploadDate);
        const images = files.map((f) => {
          console.log(f);
          return ({id: f._id, filename: f.filename, uploadDate: f.uploadDate})});
        const resJSON = {images: images};
        res.send(resJSON);
      });
    });
  };

  function display(req, res) {
    const conn = mongoose.createConnection(config.dbUri);
    conn.once('open',  () => {
      try {
        const gfs = grid(conn.db, mongoose.mongo);
        var readstream = gfs.createReadStream(
          {
            _id: req.params.id
          }
        );
        readstream.pipe(res);
        readstream.on('error', function (err) {
          res.end('Would you stop trying?');
        });
      } catch (e) {
        // res.end(e);
      }

    });
  };
})();
