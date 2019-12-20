// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/post-data.js');
var postId;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },
  onLoad: function(options) {
    postId = options.id;
    var postData = postsData.postList[postId];
    console.log(postData);
    this.setData(postData);

    console.log(app.globalData.g_isPlayingMusic);
    var postsCollected = wx.getStorageSync("posts_collected");
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }

    if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      this.setData({
        isPlayingMusic : true
      })
    } else {
      this.setData({
        isPlayingMusic: false
      })
    }
    this.setMusicMonitor();
 
  },

  setMusicMonitor : function(){
    //监听音乐播放
    var that = this;
    wx.getBackgroundAudioManager().onPlay(function () {
      that.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = postId;
    });
    wx.getBackgroundAudioManager().onPause(function () {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    wx.getBackgroundAudioManager().stop(function () {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },

  onCollectionTap: function(event) {
    this.getPostsCollectedSyc();
  },

  getPostsCollectedAsy: function() {
    
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[postId];

        //去反操作
        postCollected = !postCollected;
        postsCollected[postId] = postCollected;
        //更新了文章是否的缓存值
        wx.setStorageSync("posts_collected", postsCollected);

        //更新数据绑定
        that.setData({
          collected: postCollected
        });

        wx.showToast({
          title: postCollected ? '收藏成功' : '取消成功',
          duration: 1000,
          icon: 'success'
        })
      },
    })
  },

  getPostsCollectedSyc: function() {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[postId];

    //去反操作
    postCollected = !postCollected;
    postsCollected[postId] = postCollected;
    //更新了文章是否的缓存值
    wx.setStorageSync("posts_collected", postsCollected);

    //更新数据绑定
    this.setData({
      collected: postCollected,
    });

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: 'success'
    })
  },

  onShareTap: function(event) {
    var itemList = [
      "分享到微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        console.log(res);
        wx.showModal({
          title: '用户分享到了' + itemList[res.tapIndex],
          content: '现在无法实现分享功能，什么时候能支持呢',
        
        })
        //res.tapIndex 数组元素的序号 从0开始
      }
    });
  },
  onMusicTap: function(event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    var postData = postsData.postList[postId];
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      });
      // 正在播放音乐取消 
        // app.globalData.g_isPlayingMusic = false;
    } else {

      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImgUrl
      });
      this.setData({
        isPlayingMusic: true
      });
      // app.globalData.g_isPlayingMusic = true;

    }


  },
 

})