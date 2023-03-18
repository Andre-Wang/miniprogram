import versionUtil from './utils/version-util';
App({
  onLaunch: function() {
    // 检查更新
    versionUtil.checkUpdate();
  },

  onLoad: function(options) {
    console.log(options);
    if (options.scene) {
      params = decodeURIComponent(options.scene).split('&')
      this.uuid = params[0].split('=')[1]
      this.useAuth = params[1].split('=')[1]
    } else {
      this.uuid = options.uuid
      this.useAuth = options.useAuth
    }
    if (+this.useAuth === 0) {
      wx.cloud.callFunction({
        name: 'openid_login',
        data: {
          uuid: this.uuid,
        },
      })
    }
  },

  globalData: {
  }


  
});
