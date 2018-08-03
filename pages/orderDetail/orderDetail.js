const app = getApp()
Page({
  data:{
    hidden:true,
    address:"",
    orderInfo:"",
    orderDetail:"",
    connectFail:"",
    refuseReceive:"",
    errorDetail:"",
    serverIp: "",
    pantrymanId: "",
    mapGoodName: "",
    mapSchoolName: "",
    mapDormitoryName: ""
  },
  onLoad: function (options){
    const self=this;
    self.setData({
      serverIp: app.globalData.serverIp,
      pantrymanId: app.globalData.pantrymanId,
      mapGoodName: wx.getStorageSync("mapGoodName"),
      mapSchoolName: wx.getStorageSync("mapSchoolName"),
      mapDormitoryName: wx.getStorageSync("mapDormitoryName")
    });
    
    var orderInfo={};
    var orderId = options.orderId;
    var orderInfoList = wx.getStorageSync('orderInfo');
    for(var i=0;i<orderInfoList.length;i++){
      if(orderInfoList[i].orderId==orderId){
        orderInfo=orderInfoList[i];
        break;
      }
    }
    console.log(orderInfo);
    var mapOrderDetail=wx.getStorageSync('orderDetail');
    var mapAddress=wx.getStorageSync("address");
    console.log(mapAddress);
    var orderDetail = mapOrderDetail[orderId];
    var address = mapAddress[orderInfo.addressId];
    console.log(address);
    self.setData({
      orderInfo:orderInfo,
      orderDetail:orderDetail,
      address:address
    })
  },
  orderError:function(){
    this.setData({
      hidden:!this.data.hidden
    });
  },
  cancel:function(){
    console.log("cancel");
    this.setData({
      hidden: !this.data.hidden
    });
  },
  confirm:function(){
    console.log("confirm");
    const self=this;
    self.setData({
      hidden: !this.data.hidden
    });
    var orderInfo=self.data.orderInfo;


    wx.request({
      url: self.data.serverIp + 'addErrorOrder.do',
      data: {//发送给后台的数据
        orderId: orderInfo.orderId,
        contactFailed: "",
        refuseReceive: "",
        errorDetail:self.data.errorDetail,
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
  checkboxchange:function(e){
    console.log(e);
    console.log(e.detail.value);
    var errorDetail = e.detail.value.join(',');
    console.log(errorDetail);
    const self=this;
    self.setData({
      errorDetail: errorDetail
    })
  }
  
})