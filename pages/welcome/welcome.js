Page({
  onTap: function(){
    console.log('成功');
    wx.switchTab({
      url: '/pages/posts/posts',
    })
  }
})  