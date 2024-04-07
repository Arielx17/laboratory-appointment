<template>
	<view class="home">
		<view class="index-container">
			<u-swiper :list="swiperList" height="300"/>

		</view>

		<view class="title">告警信息</view>
		<view class="info-list">
			<view class="item" v-for='info in dangerInfo'>{{info.info}}
			</view>
		</view>
		<view class="title">我的预约</view>
		<view class="appointment" v-for="item in appointmentList">
			<view class="top">
				<view class="icon">
					<u-icon name="laboratory-color" custom-prefix="custom-icon"></u-icon>
				</view>
				<view class="name">{{item.labor}}</view>
			</view>
			<view class="bottom">
				<view class="seat">{{item.seat}}</view>
				<view class="time">
					<view>{{item.date}}</view>
					<view>{{item.time}}</view>
				</view>
			</view>
		</view>

		<u-tabbar v-model="current" :list="vuex_tabbar" active-color="#2979ff" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '待收货'
				}, {
					name: '待付款'
				}, {
					name: '待评价',
					count: 5
				}],
				dangerInfo: [{
					info: '告警信息1'
				}, {
					info: '告警信息1'
				}, {
					info: '告警信息1'
				}],
				appointmentList:[
					{labor:'实验室01',seat:'01座',time:'08:00-10:00',date:'2024.01.23'},
					{labor:'实验室01',seat:'01座',time:'08:00-10:00',date:'2024.01.23'},
					{labor:'实验室01',seat:'01座',time:'08:00-10:00',date:'2024.01.23'},
					{labor:'实验室01',seat:'01座',time:'08:00-10:00',date:'2024.01.23'},
				],

				// 顶部轮播
				swiperList: [
					'https://cdn.uviewui.com/uview/swiper/1.jpg','https://cdn.uviewui.com/uview/swiper/2.jpg'
				],

				current: 0,

			}

		},

		onLoad() {},

		onShow() {},

		onShareAppMessage(res) {
			return {

			}
		},

		onShareTimeline() {
			return {

			}
		},

		methods: {}
	}
</script>

<style lang="scss" scoped>
	.home {
		background-color: #f5f6f8;
		min-height: 100vh;

		.title {
			font-weight: bold;
			font-size: 30rpx;
			padding: 32rpx;
		}

		.info-list {
			margin: 0 32rpx;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 20rpx;
			box-shadow: 0px 0px 12px 10px #F0F1F3;

			.item {
				&:not(:last-child) {
					margin-bottom: 10rpx;
				}

				&:before {
					content: ' · ';
					font-weight: bold;

				}

			}

		}

		.appointment {
			margin: 0 32rpx 24rpx;
			background-color: #fff;
			border-radius: 20rpx;
			box-shadow: 0px 0px 12px 10px #F0F1F3;

			.top {
				display: flex;
				align-items: center;
				padding: 30rpx;
				border-bottom: 1px solid lightgray;

				.icon {
					height: 100rpx;
					width: 100rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
					border: 1px solid lightgray;
					margin-right: 30rpx;
					font-size: 36rpx;
				}

				.name {
					font-size: 34rpx;
				}
			}

			.bottom {
				display: flex;
				align-items: center;
				padding: 30rpx;
				justify-content: space-between;

				.seat {
					font-size: 34rpx;
				}

				.time {
					font-size: 30rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-end;
				}
			}
		}

		.index-container {

			margin: 0 20rpx;

			.nav-title {
				font-size: $uni-font-size-lg;
				margin: 48rpx 0 24rpx 0;
				text-align: center;
				padding: 12rpx;
				border-bottom: 2px solid #a0cfff;

			}

		}

	}
</style>
