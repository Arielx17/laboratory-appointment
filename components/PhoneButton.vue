<template>
  <view>
    <u-button
        open-type="getPhoneNumber"
        type="primary"
        @getphonenumber="getPhoneNumber"
    >
      {{ title }}
    </u-button>
  </view>
</template>

<script>
export default {
  name: 'PhoneButton',
  props: {
    title: {
      default: '获取手机号'
    }

  },
  data() {
    return {
      phone: '',
      code: ''
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

    getPhoneNumber(phoneRes) {
      uni.checkSession({
        success: (res) => {
          if (!this.phone) {
            this.$u.api.home.createUser({

              iv: phoneRes.detail.iv,
              code: this.code,
              encryptedData: phoneRes.detail.encryptedData
            }).then((userRes) => {
              this.phone = userRes.data

              this.$emit('getPhone', this.phone)
            })
          } else {
            this.$emit('getPhone', this.phone)
          }
        }

      })
    }
  }
}
</script>

<style lang="scss">

</style>
