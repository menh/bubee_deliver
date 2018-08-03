const app = getApp()
Page({
  data:{
    phone:"",
    password:"",
    schoolNameList:[],
    dormitoryNameList:[],
    pantryman:{},
    serverIp: "",
    pantrymanId: "",
    indexS:0,
    indexD:0
  },
  onLoad:function()
  {
    const self=this;
    self.setData({
      serverIp: app.globalData.serverIp,
      pantrymanId: app.globalData.pantrymanId,
    });
    self.getSchoolList();
  },
  //获取输入账号
  phoneInput:function(e){
    this.setData({
      phone:e.detail.value
    })
  },

  //输入密码
  passwordInput:function(e){
    this.setData({
      password:e.detail.value
    })
  },

  //登录
  login:function(){
    if(this.data.phone.length==0||this.data.password.length==0){
      wx.showToast({
        title: '用户名或密码不能为空',
        icon:'loading',
        duration:2000
      })
    }
    else{
      wx.showToast({
        title:'登录成功',
        icon:'success',
        duration:2000
      })
    }
  },
  getSchoolList:function()
  {
    const self=this;
    wx.request({
      url: self.data.serverIp + 'getSchoolList.do',
      data: {
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        wx.setStorageSync('school', res.data);
        var schoolName = [];
        for (var i = 0; i < (res.data).length; i++) {
          schoolName.push(res.data[i].schoolName);
        }
        self.setData({
          schoolNameList: schoolName
        });
        
      },
      fail: function (res) {

      }
    })
  },

  getDormitoryList: function (schoolId)
  {
    const self=this;
    wx.request({
      url: self.data.serverIp + 'getDormitoryList.do',
      data: {
        schoolId: schoolId
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        wx.setStorageSync('dormitory', res.data);
        var dormitoryName = [];
        for (var i = 0; i < (res.data).length; i++) {
          dormitoryName.push(res.data[i].dormitoryName);
        }
        self.setData({
          dormitoryNameList: dormitoryName
        })
      },
      fail: function (res) {
      }
    })
  },
  listenSchoolSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    const self = this;
    var index = e.detail.value;
    var school = wx.getStorageSync('school') || [];
    var schoolId = school[index].schoolId;
    var pantryman=self.data.pantryman;
    pantryman.schoolId = schoolId;
    self.setData({
      pantryman: pantryman
    });
    self.getDormitoryList(schoolId);
  },
  listenDormitorySelected: function (e) {
    const self = this;
    var index = e.detail.value;
    var dormitory = wx.getStorageSync('dormitory') || [];
    var dormitoryId = dormitory[index].dormitoryId;
    var pantryman = self.data.pantryman;
    pantryman.dormitoryId = dormitoryId;
    self.setData({
      pantryman: pantryman
    })
  },

  bindName: function (e) {
    const self = this;
    var pantryman = self.data.pantryman;
    pantryman.name = e.detail.value;
    self.setData({
      pantryman: pantryman
    })
  },

  bindPhone: function (e) {
    const self = this;
    var pantryman = self.data.pantryman;
    pantryman.phone = e.detail.value;
    self.setData({
      pantryman: pantryman
    })
  },
  registerPantryman:function(){
    const self=this;
    var pantryman=self.data.pantryman;
    wx.request({
      url: self.data.serverIp + 'registerPantryman.do',
      data: {
        name:pantryman.name,
        phone:pantryman.phone,
        schoolId:pantryman.schoolId,
        dormitoryId:pantryman.dormitoryId,
        pantrymanStatus:0,
        employDate: app.formatTime(new Date()),
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        
      },
      fail: function (res) {
      }
    })
  }

})