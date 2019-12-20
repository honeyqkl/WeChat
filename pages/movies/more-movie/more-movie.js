// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    movies:{},
    requestUrl:"",
    totalCount:8,
    isEmpty:true
  },

  onLoad: function(options) {
    var category = options.category;
    // console.log(category);
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters" + "?count=9";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon" + "?count=9";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/top250" + "?count=9";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },

  onScrollLower:function(event){
    var nexturl = this.data.requestUrl + "&start=" + this.data.totalCount;
    // console.log("触发");
    
    // console.log(nexturl);
    util.http(nexturl, this.processDoubanData)
    wx.showNavigationBarLoading()
    wx.stopPullDownRefresh();
  },

// 处理数据
  processDoubanData : function(res){
    // console.log(res);
    var movies = [];
    for(var idx in res.subjects){
      var subject = res.subjects[idx];
      var title = subject.title;
      if(title.length >= 6){
        title = title.substring(0,6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId:subject.id
      }
      movies.push(temp)
    }
    var totalMovies={}

    //如果要绑定新加载的数据需要把旧数据和新数据和在一起
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty = false
    }
    this.setData({
      movies:totalMovies
    });
    wx.hideNavigationBarLoading();
    this.data.totalCount += 3;
  }, 
  onPullDownRefresh:function(event){
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 8;
    var refreshUrl = this.data.requestUrl + "&start=0";
    util.http(refreshUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    console.log(movieId);
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  }


})