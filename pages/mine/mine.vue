<template>
	<view class="mine">

		<view>
			<view class="header">
				<u-avatar :src="vuex_user.avatarUrl" size="large" />
				<view class="header-right">
					<view class="header-right-name" v-if="vuex_user.nickName">
						{{ vuex_user.nickName }}
					</view>
					<view class="header-right-name" @click="$u.route('/pages/login/login')" v-else>
						点击登录
					</view>
				</view>
			</view>

			<u-cell-group>
				<u-cell-item v-for="(item,index) in navList" :key="index" :title="item.title"
					@click="openDialog(item.show)">
					<u-icon slot="icon" :name="item.icon" style="margin-right: 20rpx;" size="46" />
				</u-cell-item>
			</u-cell-group>
		</view>
		<u-modal title="预约记录 " v-model="listShow" confirm-text="关闭">
			<u-cell-group>
				<u-cell-item :title="item.labor+item.seat" :value="item.date" :arrow="false"
					v-for="item in appointmentList"></u-cell-item>
			</u-cell-group>
		</u-modal>
		<u-modal title="建议与反馈" :show-title="false" v-model="adviceShow" confirm-text="提交"  :show-cancel-button="true">
			<view class="margin-l">
				<u-form :model="adviceForm" ref="uForm">
					<u-form-item label="建议与反馈" label-position="top"><u-input v-model="adviceForm.advice"
							type="textarea" /></u-form-item>
				</u-form>
			</view>
		</u-modal>
		<u-modal title="修改密码" :show-title="false" v-model="updatePassword" confirm-text="修改" :show-cancel-button="true">
			<view class="margin-l">
				<u-form :model="passwordForm" ref="uForm" label-width="100">
					<u-form-item label="原密码"><u-input v-model="passwordForm.oldPwd" /></u-form-item>
					<u-form-item label="新密码"><u-input v-model="passwordForm.newPwd" /></u-form-item>
				</u-form>
			</view>
		</u-modal>
		<view class="login-out-button" v-if="vuex_user.nickName">
			<u-button type="error" @click="loginOut">退出登录</u-button>
		</view>

		<u-tabbar :list="vuex_tabbar" active-color="#2979ff" />

	</view>
</template>

<script>
	export default {

		data() {
			return {
				listShow: false,
				adviceShow: false,
				updatePassword: false,

				adviceForm: {
					advice: ''
				},
				passwordForm: {
					oldPwd: '',
					newPwd: ''
				},
				appointmentList: [{
						labor: '实验室01',
						seat: '01座',
						time: '08:00-10:00',
						date: '2024.01.23'
					},
					{
						labor: '实验室01',
						seat: '01座',
						time: '08:00-10:00',
						date: '2024.01.23'
					},
					{
						labor: '实验室01',
						seat: '01座',
						time: '08:00-10:00',
						date: '2024.01.23'
					},
					{
						labor: '实验室01',
						seat: '01座',
						time: '08:00-10:00',
						date: '2024.01.23'
					},
				],
				navList: [{
						icon: 'list-dot',
						title: '预约记录',
						src: '/pages/service-record/service-record',
						show: 'listShow',
					},

					{
						icon: 'email',
						title: '建议与反馈',
						src: '/pages/about/about',
						show: 'adviceShow',
					},
					{
						icon: 'edit-pen',
						title: '修改密码',
						src: '/pages/mine-info/mine-info',
						show: 'updatePassword',
					}
				]
			}
		},

		methods: {
			openDialog(url) {
				this[url] = true
			},
			toLoginPage() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			loginOut() {
				this.$u.vuex('vuex_user', {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine {

		.header {
			background: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;

			margin-bottom: 80rpx;
			padding: 30rpx 0;

			&-right {
				margin-left: 24rpx;

				&-name {
					font-size: $uni-font-size-lg;
					font-weight: bold;
					margin-bottom: 24rpx;
					margin-top: 12rpx;
				}

			}
		}

		.login-out-button {
			width: 500rpx;
			margin: auto;
			margin-top: 100rpx;

			.u-btn {
				box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.5);
			}

		}

	}
</style>

<style>
	page {
		background: #F7F7F7;
	}
</style>