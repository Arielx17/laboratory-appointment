<template>
  <view>
    <u-popup
        v-model="show"
        mode="center"
        border-radius="14"
        @close="popupClose"
    >
      <view class="padding-m">
        <u-form
            ref="uForm"
            :model="form"
            label-width="0"
            :error-type=" ['toast']"
        >
          <u-form-item
              label=""
              prop="phone"
              left-icon="account"
          >
            <u-input
                v-model="form.phone"
                :clearable="false"
                placeholder="请输入账号"
            />
          </u-form-item>
          <u-form-item
              label=""
              prop="password"
              left-icon="lock"
          >
            <u-input
                v-model="form.password"
                type="password"
                :clearable="false"
                placeholder="请输入密码"
            />
          </u-form-item>
        </u-form>

        <u-button
            type="primary"
            class="mb-s mt-m width-f"
            size="medium"
            @click="submit"
        >
          {{ loginShow ? '登 录' : '注 册' }}
        </u-button>

        <view
            class="ta-r"
            :class="loginShow ? 'color-danger' : 'color-success'"
            @click="register"
        >
          {{ loginShow ? '账号注册' : '账号登录' }}
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  name: 'LoginPopup',

  props: {

    initShow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {

      loginShow: true,

      show: this.initShow,
      form: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          {
            required: true,
            message: '请输入账号',
            trigger: ['change', 'blur']
          },

          {
            validator: (rule, value, callback) => {
              return this.$u.test.mobile(value)
            },
            message: '手机号码不正确',
            trigger: ['change', 'blur']
		  		}
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['change', 'blur']
          }
        ]
      }

    }
  },

  watch: {
    initShow(newValue) {
      this.show = newValue

      this.$nextTick(() => {
        this.$refs.uForm && this.$refs.uForm.setRules(this.rules)
      })
    }

  },

  methods: {

    register() {
      this.loginShow = !this.loginShow
    },

    submit() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          if (this.loginShow) {
            this.$u.api.home.login(this.form).then(res => {
			  				this.$u.vuex('vuex_token', res.data)
			  
			  this.$u.api.getUserInfo().then(res => {
				  this.$u.vuex('vuex_user', res.data)
				  this.$emit('update:initShow', false)
				  this.$emit('loginSuccess')
			  })
            })
          } else {
            this.$u.api.home.register(this.form).then(() => {
              uni.showToast({
                title: '注册账号成功',
                icon: 'success',
                success: () => {
                  this.loginShow = true
                }

              })
            })
          }
        } else {
          console.log('验证失败')
        }
      })
    },

    popupClose() {
      this.$emit('update:initShow', this.show)
    }
  }
}
</script>

<style lang="scss">

</style>
