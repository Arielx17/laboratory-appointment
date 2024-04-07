<template>
	<view class="login">
		<div class="title">实验室预约系统</div>

		<div class="form-wrap">
			<u-form labelPosition="left" :model="form" :rules="rules" ref="formRef" labelWidth="150rpx">
				<u-form-item label="学号" prop="username" borderBottom>
					<u-input v-model="form.username" :border="false" placeholder="请输入学号"></u-input>
				</u-form-item>
				<u-form-item label="密码" prop="password" borderBottom>
					<u-input v-model="form.password" placeholder="请输入密码" :border="false"></u-input>
				</u-form-item>
			</u-form>

			<u-button @click="submit" class="login-btn" type="primary">登录</u-button>
		</div>
		<text class="tip">其他方式登录</text>
		<u-image width="80rpx" height="80rpx"
			src="https://dynamic-image.yesky.com/160x160/uploadImages/2022/081/16/K0617JS228XL.jpg"
			shape="circle"></u-image>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				form: {
					username: '',
					password: '',
				},

				rules: {
					'username': {
						required: true,
						message: '请输入登录学号',
						trigger: ['blur', 'change']
					},
					'password': {

						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					},

				},
			}
		},
		onReady() {
			//如果需要兼容小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.formRef.setRules(this.rules)

		},

		methods: {


			submit() {
				this.$refs.formRef.validate().then(res => {
					let form = uni.$u.deepClone(this.form)
					uni.switchTab({
						url: '/pages/home/home'
					})
					// this.$store
					// 	.dispatch('user/login', form)
					// 	.then(() => {
					// 		this.$store
					// 			.dispatch('user/getUserInfo')
					// 			.then(() => {
					// 				uni.switchTab({
					// 					url: '/pages/home/home'
					// 				})
					// 			})
					// 			.catch(() => {})
					// 	})


				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		display: flex;
		min-height: 100vh;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #f3f4f6;

		.title {

			font-weight: bold;
			font-size: 36rpx;
			margin-bottom: 30rpx;

		}

		.form-wrap {

			width: 80%;
			background-color: #ffffff;
			padding: 30rpx 40rpx 50rpx 30rpx;
			border-radius: 20rpx;
			margin-bottom: 60rpx;

			.login-btn {
				margin-top: 50rpx;
			}

		}

		.tip {
			margin-bottom: 20rpx;
			color: gray;
		}


	}
</style>