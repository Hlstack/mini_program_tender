Page({
  data:{
    lstdata: []
  },
  onLoad: function() {
    this.setData({
      lstdata: wx.getStorageSync('lstdata')
    })
  },
  copytocb: function(e) {
    var cbdata = e.currentTarget.dataset.itemurl
    wx.setClipboardData({
       data: cbdata,
       success: function(res){
         wx.getClipboardData({
            success: function(res){
              console.log(res.data)
            }
         })
       }
    })
    wx.showToast({
      title: '已复制链接',
      duration: 2000
    })
  }
})
