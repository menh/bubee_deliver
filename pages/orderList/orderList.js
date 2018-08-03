const app = getApp()
Page({
  data: {
    orderList: [],
    mapOrderDetail:"",
    mapAddress:"",
    mapGoodName:"",
    mapSchoolName:"",
    mapDormitoryName:"",
    readyToDeliverOrderCount:0,
    deliveringOrderCount:0,
    finishedOrderCount:0,
    pantryman:"",
    receiveCode:"",
    serverIp: "",
    pantrymanId: "",
    orderInfo: {
      orderId: "",
      address: "",
      orderTime: "",
      orderStatus: ""
    }
  },
  onLoad: function () {
    const self = this;
    self.setData({
      serverIp:app.globalData.serverIp,
      pantrymanId: app.globalData.pantrymanId
    });
    wx.request({
      url: self.data.serverIp+'getOrderListByPantrymanId.do',
      data: {//发送给后台的数据
        pantrymanId: self.data.pantrymanId
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "Content-Type": "applciation/json",
      success: function (res) {
        wx.setStorageSync("orderInfo", res.data);
        self.setData({
          orderList:res.data 
        })
        
        self.getOrderDetail();
        self.getAddressByAddressId();
        self.getPantrymanInfo();
        self.countReadyTodeliverOrder();
        self.countDeliveringOrder();
        self.countFinishedOrder();
        self.getGoodByOrderList();
        self.getMapSchool();
        self.getMapDormitory();
        //console.log(self.data.orderList);
      },
      fail: function (res) {
        console.log("fail");
      }
    });
  },
  getOrderDetail:function(){
    const self=this;
    var orderList=self.data.orderList;
    wx.request({
      url: self.data.serverIp + 'getOrderDetail.do',
      data: JSON.stringify(orderList),
      method: 'POST',
      "Content-Type": "applciation/json",
      success: function (res) {
        var mapOrderDetail=res.data;
        self.setData({
          mapOrderDetail: mapOrderDetail
        })
        wx.setStorageSync("orderDetail", mapOrderDetail);
      },
      fail: function (res) {
        console.log("fail");
      }
    });
  },
  getAddressByAddressId: function () {
    const self = this;
    var orderList = self.data.orderList;
    wx.request({
      url: self.data.serverIp + 'getAddressByAddressId.do',
      data: JSON.stringify(orderList),
      method: 'POST',
      "Content-Type": "applciation/json",
      success: function (res) {
        var mapAddress = res.data;
        self.setData({
          mapAddress: mapAddress
        })
        wx.setStorageSync("address", mapAddress);
      },
      fail: function (res) {
        console.log("fail");
      }
    });
  },
  getPantrymanInfo:function(){
    const self=this;
    wx.request({
      url: self.data.serverIp + 'getPantrymanInfo.do',
      data: {//发送给后台的数据
        pantrymanId: self.data.pantrymanId
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        self.setData({
          pantryman: res.data
        })
      },
      fail: function (res) {
        console.log("fail");
      }
    })
  },
  getGoodByOrderList: function () {
    const self = this;
    var orderList = self.data.orderList;
    wx.request({
      url: self.data.serverIp + 'getGoodByOrderList.do',
      data: JSON.stringify(orderList),
      method: 'POST',
      "Content-Type": "applciation/json",
      success: function (res) {
        var mapGoodName = res.data;
        self.setData({
          mapGoodName: mapGoodName
        })
        wx.setStorageSync("mapGoodName", mapGoodName);
      },
      fail: function (res) {
        console.log("fail");
      }
    });
  },
  getMapSchool:function(){
    const self = this;
    var orderList = self.data.orderList;
    wx.request({
      url: self.data.serverIp + 'getMapSchool.do',
      data: JSON.stringify(orderList),
      method: 'POST',
      "Content-Type": "applciation/json",
      success: function (res) {
        var mapSchoolName = res.data;
        self.setData({
          mapSchoolName: mapSchoolName
        })
        wx.setStorageSync("mapSchoolName", mapSchoolName);
      },
      fail: function (res) {
        console.log("fail");
      }
    });
  },
  getMapDormitory: function () {
    const self = this;
    var orderList = self.data.orderList;
    wx.request({
      url: self.data.serverIp + 'getMapDormitory.do',
      data: JSON.stringify(orderList),
      method: 'POST',
      "Content-Type": "applciation/json",
      success: function (res) {
        var mapDormitoryName = res.data;
        self.setData({
          mapDormitoryName: mapDormitoryName
        })
        wx.setStorageSync("mapDormitoryName", mapDormitoryName);
      },
      fail: function (res) {
        console.log("fail");
      }
    });
  },
  getOrders: function (){
    console.log(this.data.orders);
    console.log(111);
  },

  countReadyTodeliverOrder:function(){
    const self = this;
    wx.request({
      url: self.data.serverIp + 'countReadyTodeliverOrder.do',
      data: {
        pantrymanId: self.data.pantrymanId
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        self.setData({
          readyToDeliverOrderCount: res.data
        })
      },
      fail: function (res) {
        console.log("fail");
      }
    });
  },
  countDeliveringOrder:function(){
    const self = this;
    wx.request({
      url: self.data.serverIp + 'countDeliveringOrder.do',
      data: {
        pantrymanId: self.data.pantrymanId
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        self.setData({
          deliveringOrderCount: res.data
        })
      },
      fail: function (res) {
        console.log("fail");
      }
    });
  },
  countFinishedOrder:function(){
    const self = this;
    wx.request({
      url: self.data.serverIp + 'countFinishedOrder.do',
      data: {
        pantrymanId: self.data.pantrymanId
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        self.setData({
          finishedOrderCount: res.data
        })
      },
      fail: function (res) {
        console.log("fail");
      }
    });
  },
  toDeliver:function(e){
    const self = this;
    var benDeliverTime = app.formatTime(new Date());
    var status = e.target.dataset.status;
    var orderId=e.target.dataset.orderid;
    var pantrymanId= e.target.dataset.pantrymanid;
    wx.request({
      url: self.data.serverIp+'toDeliver.do',
      data: {//发送给后台的数据
        orderId: orderId,
        pantrymanId: self.data.pantrymanId,
        benDeliverTime: benDeliverTime 
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      //"Content-Type": "applciation/json",
      success: function (res) {
        self.setData({
          orderList: res.data
        })
      },
      fail: function (res) {
        console.log("fail");
      }
    })
  },

  receiveCode:function(e){
    this.setData({
      receiveCode:e.detail.value
    })
  },
  deliverFinish:function(e){
    const self = this;
    var endDeliverTime = app.formatTime(new Date());
    var status = e.target.dataset.status;
    var orderId = e.target.dataset.orderid;
    var pantryManId = e.target.dataset.pantrymanid;

    var receiveCode = self.data.receiveCode;
    if (receiveCode != '1234') {
      wx.showToast({
        title: '收件码错误',
        icon: 'success',
        duration: 1000,
        mask: true
      })
      return;
    }
    wx.request({
      url: self.data.serverIp+'deliverFinish.do',
      data: {//发送给后台的数据
        orderId: orderId,
        pantrymanId: self.data.pantrymanId,
        endDeliverTime: endDeliverTime
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      //"Content-Type": "applciation/json",
      success: function (res) {
        self.setData({
          orderList: res.data
        })
      },
      fail: function (res) {
        console.log("fail");
      }
    })
  }
})