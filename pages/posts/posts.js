// pages/posts/posts.js

var postData = require('../../data/post-data.js');


Page({
//产生事件 捕捉事件 回调函数 处理事件
  /**
   * 页面的初始数据
   */
  data: {
    posts_key:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 假设post_content1是服务器传过来的变量
    this.setData({posts_key:postData.postList});
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    });
  },

  onSwiperTap: function (event){
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }

})