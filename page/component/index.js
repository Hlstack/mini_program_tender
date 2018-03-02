const DBRequestUrl = require('../../config').DBRequestUrl

var dblogs = wx.getStorageSync('dblogs') || []

Page({
  onShareAppMessage: function() {
    return {
      title: '电网招标',
      path:'page/component/index'
    } 
  }, 
  data: {
    logs: dblogs
  },
  onLoad: function(){
    var that = this
    wx.request({
      url: DBRequestUrl,
      header: {
        'Content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          logs: res.data
        }) 
        wx.setStorageSync('dblogs', res.data) 
      },
      fail: function(){
        console.log('网络故障')  
      },
      complete: function(){
        console.log('传输完毕')
      } 
    })
  },
  onPullDownRefresh: function(){
    this.onLoad();
  },
  toast: function(e) {
    var lstdata = e.currentTarget.dataset.itemdata;
    console.log('单击',lstdata)
    wx.setStorageSync('lstdata', lstdata)
    wx.navigateTo({
      url: './pages/lstdata/lstdata'
    })
  }
})
