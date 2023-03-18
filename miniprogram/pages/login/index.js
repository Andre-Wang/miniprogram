// pages/about/index.js
import tabbar from '../tabbar';
const app = getApp();

wx.cloud.init({
  env: 'tigerstore-0g7k0td909dcaaa5'
});
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    version: '....',
    list:tabbar,
    hasLogin: false,
    hasUserInfo: false,
    canIUseGetUserProfile: false
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function() {
    db.collection('version').get().then(_ => {
      const {
        data
      } = _;
      this.setData({
        version: data[0].version
      });
    }).catch(err=>{
      console.error(err);
    });
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  copyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: () => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        });
      }
    });
  },

  onImage() {
    wx.previewImage({
      urls: ['https://pic1.zhimg.com/80/v2-efda715dcd7e93325b213400b67c1e80_hd.png']
    });
  },

  getUserInfo(info) {
    console.log('getUserInfo')
    const userInfo = info.detail.userInfo
    this.setData({
      userInfo,
      hasUserInfo: true
    })
  },

  handleGetUserProfile(e) {
    console.log('getUserProfile')
    wx.getUserProfile({
      desc: '用于演示 wx.getUserProfile', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('wx.getUserProfile: ', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res.userInfo.avatarUrl);
      }
    })
  },

  clear() {
    this.setData({
      hasUserInfo: false,
      userInfo: {}
    })
  },

  login() {
    const that = this;
    wx.login({
      success(res) {
        app.globalData.hasLogin = true;
        that.setData({
          hasLogin: true,
        });
      },
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
});
