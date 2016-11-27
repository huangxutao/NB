var db     = require('./db');
var mongoose = require('mongoose');

/***
 * Defining Schema
 */
var PostSchema = new mongoose.Schema({
  title: String,
  wrapper: String,
  date: {
    publish: Date,
    update: Date
  },
  content: {
    html: String,
    markdown: String,
    summary: {
      html: String,
      text: String
    }
  },
  tags: Array,
  category: String,
  views: {
    detail: Array,  // [view_IP, view_count, last_view_time]
    count: Number  // all count
  },
  loves: Array,  // [love_IP]
  isDraft: Boolean
});

/***
 * 添加 Schema method
 */


// get 已发布计数
PostSchema.static('getCount', function(cb) {
  return this.count({'isDraft': false}, cb);
});

// get 分页
PostSchema.static('getPage', function(page_num, cb) {
  return this.find(
    {'isDraft': false},
    {'content.html': 0, 'content.markdown': 0},
    {limit: 8, sort: {'_id': -1}, skip: (page_num - 1) * 8},
  cb);
});

// get 前一篇文章,非草稿 (只获取文章的 title 和 id)
PostSchema.static('getPreArticle', function(id, cb) {
  return this.findOne(
    {'_id': {'$gt': id}, 'isDraft': false},
    {'title': 1, '_id': 1},
    {sort: {'_id': 1}},
  cb);
});

// get 一篇文章，非草稿 （获取文章大部分的信息）
PostSchema.static('getCurrArticle', function(id, cb) {
  return this.findOne(
    {'_id': id},
    {'content.summary': 0, 'content.markdown': 0, 'isDraft': 0},
  cb);
});

// get 后一篇文文章 (只获取文章的 title 和 id)
PostSchema.static('getNextArticle', function(id, cb) {
  return this.findOne(
    {'_id': {'$lt': id}, 'isDraft': false},
    {'title': 1, '_id': 1},
    {sort: {'_id': -1}},
  cb);
});

// get 归档页，获取所有非草稿的文章的 title, id 和 date.publish
PostSchema.static('getArchive', function(cb) {
  return this.find(
    {'isDraft': false},
    {'_id': 1,'title': 1, 'date.publish': 1},
    {sort: {'_id': -1}},
  cb);
});

// get 特定标签页，获取所有具有该标签的文章 （欠考虑，应该考虑以分页的形式）
PostSchema.static('getTag', function(tag, cb) {
  return this.find(
    {'tags': {$regex: tag}, 'isDraft': false},
    {'content.html': 0, 'content.markdown': 0},
    {sort: {'_id': -1}},
  cb);
});

// get 特定类别页，获取该分类所有的文章 （欠考虑，应该考虑以分页的形式）
PostSchema.static('getCategory', function(category, cb) {
  return this.find(
    {'category': category, 'isDraft': false},
    {'content.html': 0, 'content.markdown': 0},
    {sort: {'_id': -1}},
  cb);
});

// get 已发布的文章 (后台) （欠考虑，应该考虑以分页的形式）
PostSchema.static('getPublished', function(cb) {
  return this.find(
    {'isDraft': false},
    {'_id': 1,'title': 1, 'date': 1},
    {sort: {'_id': -1}},
  cb);
});

// get 草稿 (后台) （欠考虑，应该考虑以分页的形式）
PostSchema.static('getDraft', function(cb) {
  return this.find(
    {'isDraft': true},
    {'_id': 1,'title': 1, 'date': 1},
    {sort: {'_id': -1}},
  cb);
});

// get 一篇文章 (后台)
PostSchema.static('getOne', function(id, cb) {
  return this.findOne(
    {'_id': id},
    {'content.summary': 0, 'content.html': 0},
  cb);
});


/***
 * Defining Model
 */
var PostModel = mongoose.model('Post', PostSchema);

// 创建model
module.exports = PostModel;
