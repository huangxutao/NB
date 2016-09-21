var db     = require('./db');
var mongoose = require('mongoose');

// Defining Schema
var PostSchema = new mongoose.Schema({
  title: String,
  date: {
    publish: Date,
    update: Date
  },
  content: {
    html: String,
    markdown: String,
    summary: String
  },
  tags: String,
  category: String,
  isDraft: Boolean
});

// 添加 Schema method
PostSchema.static('getAll', function(cb) {
  return this.find(
    {},
    {'_id': 1,'title': 1},
    {sort: {'_id': -1}},
  cb);
});

PostSchema.static('getCount', function(cb) {
  return this.count({}, cb);
});

PostSchema.static('getPage', function(page, cb) {
  return this.find(
    {},
    {'content.html': 0, 'content.markdown': 0},
    {limit: 8, sort: {'_id': -1}, skip: (page - 1) * 8},
  cb);
});

PostSchema.static('getPreArticle', function(id, cb) {
  return this.findOne(
    {'_id': {'$gt': id}},
    {'title': 1, '_id': 1},
    {sort: {'_id': 1}},
  cb);
});

PostSchema.static('getArticle', function(id, cb) {
  return this.findOne(
    {'_id': id},
    {'content.summary': 0},
  cb);
});

PostSchema.static('getNextArticle', function(id, cb) {
  return this.findOne(
    {'_id': {'$lt': id}},
    {'title': 1, '_id': 1},
    {sort: {'_id': -1}},
  cb);
});

PostSchema.static('getTag', function(tag, cb) {
  return this.find(
    {'tags': {$regex: tag}},
    {'_id': 1,'title': 1, 'date': 1},
    {sort: {'_id': -1}},
  cb);
});

// Defining Model
var PostModel = mongoose.model('Post', PostSchema);

// 创建model
module.exports = PostModel;
