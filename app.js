//app.js
App({
  onLaunch: function () {
    wx.setStorageSync("orderInfo", '');
    wx.setStorageSync("orderDetail", '');
    wx.setStorageSync("address", '');

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const self=this;
    // 登录
    console.log('wx login');
    wx.login({
      success:function( res) {
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code=res.code;
        
        if(res.code){
          wx.getUserInfo({
            success:function(res){
              console.log(res.userInfo);
              self.getOpenid(code);
            },
            fali:function(e){
              console.log('erroe');
            }
          })
          //self.getOpenid(code);
          //console.log(res.code);
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  getOpenid: function (code) {
    console.log('getOpenid');
    var that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.globalData.appid + '&secret=' + that.globalData.secret + '&js_code=' + code + '&grant_type=authorization_code',
      data: {},
      method: 'GET',
      success: function (res) {
        var obj = {};
        obj.openid = res.data.openid;
        obj.expires_in = Date.now() + res.data.expires_in;
        obj.session_key = res.data.session_key;
        wx.setStorageSync('openid', obj.openid);
        console.log('obj');
        console.log(obj);
      }
    })
  },
  
  formatTime: function (date) {  
    var year = date.getFullYear()  
    var month = date.getMonth() + 1  
    var day = date.getDate()  
  
    var hour = date.getHours()  
    var minute = date.getMinutes()  
    var second = date.getSeconds()  
    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  }, 
  formatNumber:function(n) {  
    n = n.toString()  
    return n[1] ? n : '0' + n
  } ,

  globalData: {
    serverIp: 'http://localhost:8080/bubee/',
    pantrymanId:'P00000001',
    userInfo: null
  }
})