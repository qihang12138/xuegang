// pages/logIn/logIn.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getuserinfo(e) {
    let { errMsg, userInfo } = e.detail;

    if (errMsg === "getUserInfo:fail auth deny") {
      wx.showToast({
        title: '请先授权',
        icon: 'none'
      })
      return;
    }
    wx.login({
      success(res) {
        let { errMsg, code } = res,
        formData = {
          code,
          nickname: userInfo.nickName,
          image: userInfo.avatarUrl,
          fid:0
        }, isOK = true;

        // for(let k in formData) {
        //   if(formData[k] === "") isOK = false
          
        //   break
        // }

        // if (!isOK) {
          
        //   return 
        // }

        app.http({
          url: app.api.ApiWechat,
          method: 'POST',
          data: formData
        }).then(res => {
          let { error_code, msg, data: { uid } } = res
          if (error_code === 0) {
            wx.setStorageSync('uid', uid);
            app.util.toast({
              title: msg
            }).then(() => {
              // wx.reLaunch({
              //   url: '/pages/index/index'
              // })
              wx.navigateTo({});
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})