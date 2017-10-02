'use strict';
module.exports = function(app) {
  var videoList = require('../controllers/videoController');

  // todoList Routes
  app.route('/videos')
    .get(videoList.list_all_videos);

  app.route('/videos/:videoId')
    .get(videoList.read_a_video);
  
  app.route('/videos/search/:text')
    .get(videoList.find_by_text);
  
  app.route('/videos/tags/:tag')
    .get(videoList.find_by_tags);

  app.route('/videos/idsearch')
    .post(videoList.find_by_list);

};