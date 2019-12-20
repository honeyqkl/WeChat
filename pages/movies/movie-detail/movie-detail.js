// pages/movies/movie-detail/movie-detail.js
import {Movie} from 'class/Movie.js';
var app = getApp();
var util = require('../../../utils/util.js')
Page({
  data: {
    movie:{}
  },
  onLoad: function (options) {
    var movieId = options.id;

    var url = app.globalData.doubanBase 
    + "/v2/movie/subject/" + movieId;

    var movie = new Movie(url);
    var that = this;
    // movie.getMovieData(function(movie){
    //   that.setData({
    //     movie : movie
    //   })
    // });
    movie.getMovieData( (movie) => {
      this.setData({
        movie: movie
      })
    });
  },

  // processDoubanData:function(data){
  //   if(!data){
  //     return;
  //   }
  //   var director = {
  //     avatar : "",
  //     name: "",
  //     id: ""
  //   }
  //   console.log(data.directors[0]);
    
  //   if (data.directors[0] != null){
  //     if (data.directors[0].avatars.large != null){
  //       director.avatar = data.directors[0].avatars.large
  //     }
  //     director.name = data.directors[0].name;
  //     director.id = data.directors[0].id;
  //   }

  //   var movie = {
  //     movieImg: data.images ? data.images.large : "",
  //     country:data.countries[0],
  //     title:data.title,
  //     originalTitle: data.original_title,
  //     wishCount:data.wish_count,
  //     commentCount:data.comments_count,
  //     year:data.year,
  //     generes:data.genres.join("、"),
  //     stars: util.convertToStarsArray(data.rating.stars),
  //     score:data.rating.average,
  //     director:director,
  //     casts:util.convertToCastString(data.casts),
  //     castsInfo: util.convertToCastInfos(data.casts),
  //     summary:data.summary
  //   }
  //   console.log(movie);
  //   this.setData({
  //     movie:movie
  //   })
  // },
  viewMoviePostImg:function(e){
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src], // http列表
      current: src //当前显示的src
    })
  }

})