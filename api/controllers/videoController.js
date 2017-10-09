'use strict';


var mongoose = require('mongoose'),
  Video = mongoose.model('Video');

exports.list_all_videos = function(req, res) {
  Video.find(function(err, video) {
    if (err)
      res.send(err);
    res.json(video);
  });
};

exports.create_a_video = function(req, res) {
  var new_video = new Task(req.body);
  new_video.save(function(err, video) {
    if (err)
      res.send(err);
    res.json(video);
  });
};

exports.read_a_video = function(req, res) {
  Video.findOne({'id': req.params.videoId}, function(err, video) {
    if (err)
      res.send(err);
    res.json(video);
  });
};

exports.find_by_text = function(req,res) {
  Video.find({$or: [{$text: {$search: req.params.text}}, {name: {$regex: req.params.text}}, {tags: { $in: [req.params.text]}}]}, function(err,video){
    if (err)
      res.send(err);
    res.json(video);
  });
};


exports.find_by_tags = function(req,res) {
  Video.find({tags: { $in: [req.params.tag]} }, function(err,video){
    if (err)
      res.send(err);
    res.json(video);
  });
};

exports.find_by_list = function(req,res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(req.body);
 var array = req.body.list.split(',');
  Video.find({id: { $in: array }}, function(err,videos) {
    if (err)
      res.send(err);
    console.log(videos);
    res.json(videos);
  })
}
