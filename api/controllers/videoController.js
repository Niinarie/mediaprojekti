'use strict';


var mongoose = require('mongoose'),
  Video = mongoose.model('Video');

exports.list_all_videos = function(req, res) {
  Video.find({}, function(err, video) {
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

/*
exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

*/
