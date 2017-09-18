'use strict';
module.exports = function(app) {
  var videoList = require('../controllers/videoController');

  // todoList Routes
  app.route('/videos')
    .get(videoList.list_all_videos);

  app.route('/videos/:videoId')
    .get(videoList.read_a_video);
};