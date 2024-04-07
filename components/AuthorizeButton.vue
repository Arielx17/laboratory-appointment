<template>
  <view class="authorize-button">

    <image 
      src="../static/images/authorize.png" 
      mode="" />

    <button 
      class="login-button" 
      type="primary" 
      @click="getUserInfo">授权登录</button>

    <u-popup 
      v-model="show" 
      mode="center" 
      border-radius="14">
      <view style="padding:48rpx">
        <u-avatar 
          :src="userInfo.avatarUrl" 
          size="160" />

        <view style="margin: 12rpx 0;">
          {{ userInfo.nickName }}
        </view>

        <view class="phone-button">
          <u-button 
            style="width: 100%;" 
            open-type="getPhoneNumber" 
            type="success"
            @getphonenumber="getPhoneNumber">授权手机</u-button>
        </view>

      </view>

    </u-popup> 

  </view>
</template>

<script>
export default {
  name: 'AuthorizeButton',

  props: {
    redirect: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      code: '',
	  userInfo: {}

    }
  },

  created() {
    uni.login({
      success: (res) => {
        this.code = res.code
      }

    })
  },

  methods: {

    getUserInfo() {
      wx.getUserProfile({
        desc: '获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (userRes) => {
		  this.userInfo = userRes.userInfo
          this.show = true
        }
      })
    },

    getPhoneNumber(phoneRes) {
      uni.checkSession({
        success: () => {
          let {
            encryptedData,
            iv
          } = phoneRes.detail

          this.$u.api.createUser({

            iv,
            encryptedData,
            code: this.code,
            userInfo: this.userInfo
          }).then(res => {
			  this.$u.vuex('vuex_user', res.data)
			  if (this.redirect) {
			    uni.navigateTo({
			      url: this.redirect
			    })
			  }
			  
			  this.$emit('closeAuthorize')
          })
        },
        fail: () => {
          uni.login({
            success: (res) => {
              this.code = res.code
              this.getPhoneNumber(phoneRes)
            }

          })
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
	.authorize-button {

		text-align: center;

		image {
			margin: 150rpx 0 80rpx 0;
			width: 244px;
		}

		.login-button {
			width: 500rpx;

			box-shadow: 0 0 20rpx rgba(25, 190, 107, 0.8);

		}

		.phone-button {
			width: 400rpx;
			margin-top: 50rpx;
		}

	}
</style>
