const SearchRequestUrl = require('../../../../config').SearchRequestUrl

Page({
  onShareAppMessage: function() {
    return {
      title: '电网招标',
      path:'page/component/index'
    } 
  },
  data:{
    searchKeyword: '',
    searchResList: [],
    isFromSearch: true,
    searchLoading: false
  },
  // 输入框事件
  bindKeywordInput: function(e){
    this.setData({
      searchKeyword: e.detail.value
    })
  },

  fetchSearchList: function(){
    var that = this
    console.log(this.data.searchKeyword)
    var keyword = this.data.searchKeyword
    if (keyword == ''){
      wx.showToast({
        title:'请输入关键词',
        duration: 2000
      }) 
      that.setData({
        searchLoading:false 
      })
    }else{
    wx.request({
      url: SearchRequestUrl + keyword,
      header: {
        'Content-type': 'application/json'
      },
      success: function(res){
        console.log(res.data)
        that.setData({
          searchResList: res.data,
          searchLoading: false
        })
      },
      fail: function(){
        console.log('网络故障')
      },
      complete: function(){
        console.log('查询完毕')
        if (that.data.searchResList.length == 0){
          wx.showToast({
             title: "未有匹配结果",
             duration: 2000
          })   
        } 
      }
    })
    }
  }, 
  keywordSearch: function(e){
    this.setData({
      isFromSearch: true,
      searchResList: [],
      searchLoading: true
    })
    this.fetchSearchList()
  },
  toast: function(e) {
    var qydata = e.currentTarget.dataset.itemdata;
    console.log('单击',qydata)
    wx.setStorageSync('qydata', qydata)
    wx.navigateTo({
      url: '../qydata/qydata'
    })
  }
})
