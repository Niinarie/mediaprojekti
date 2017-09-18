'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VideoSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  src: Array,
  poster: String,
  length: String,
  tags: Array
}, { collection: 'videoinfo' });

module.exports = mongoose.model('Video', VideoSchema);