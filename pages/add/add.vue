<template>
	<view class="add">
		<view class="title">实验室</view>
		<view class="labor-list">
			<view :class="['item',{'select':item.name ===selectForm.labor}]" v-for='(item,index) in laborList'
				:key="index" @click="selectForm.labor = item.name">
				{{item.name}}
				<u-icon name="checkmark-circle-fill" color="#ffb200" size="40" v-if="item.name ===selectForm.labor">
				</u-icon>
			</view>
		</view>
		<view class="title">时间段</view>
		<view class="time-list">
			<view :class="['item',{'select':item.time ===selectForm.time}]" v-for="(item,index) in timeList"
				:key="index" @click="selectForm.time = item.time">
				{{item.time}}
				<u-icon name="checkmark-circle-fill" color="#ffb200" size="40" v-if="item.time ===selectForm.time">
				</u-icon>
			</view>
		</view>
		<view class="title">座位</view>
		<view class="seat-list">
			<view v-for="(item,index) in seatList" :key="index"
				:class="['item',{'not-spare':!item.isSpare},{'select':item.name ===selectForm.seat}]"
				@click="()=>{if(item.isSpare){selectForm.seat = item.name}}">
				{{item.name}}
				<u-icon name="checkmark-circle-fill" color="#ffb200" size="40" v-if="item.name ===selectForm.seat">
				</u-icon>
			</view>
		</view>
		<u-button shape="circle" type="warning" :ripple="true">确认预约</u-button>

		<u-tabbar v-model="current" :list="vuex_tabbar" active-color="#2979ff" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectForm: {
					labor: '实验室01',
					time: '',
					seat: ''
				},

				laborList: [{
					name: '实验室01'
				}, {
					name: '实验室02'
				}, {
					name: '实验室03',
				}],

				timeList: [{
						time: '08:00-10:00'
					},
					{
						time: '10:00-12:00'
					},
					{
						time: '12:00-14:00'
					},
					{
						time: '14:00-16:00'
					}, {
						time: '16:00-18:00'
					},
				],
				seatList: [{
					name: '01座',
					isSpare: true,
				}, {
					name: '02座',
					isSpare: true,
				}, {
					name: '03座',
					isSpare: false,
				}, {
					name: '04座',
					isSpare: true,
				}, {
					name: '05座',
					isSpare: true,
				}, {
					name: '06座',
					isSpare: true,
				}],
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
	.add {
		margin: 0 32rpx;
		// background-color: #f5f6f8;

		.title {
			font-weight: bold;
			font-size: 30rpx;
			padding: 32rpx 0;
		}

		.labor-list {

			display: flex;

			>.item {
				padding: 30rpx;
				border-radius: 20rpx;
				border: 2px solid lightgray;

				&:not(:last-child) {
					margin-right: 32rpx;
				}

				&.select {
					border: 2px solid #ffb200;
					position: relative;
					background-color: #fff9eb;
				}


				::v-deep .u-icon{
					position: absolute;
					top: -22%;
					background: #fff;
				}


			}



		}

		.time-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			>.item {
				width: 48%;
				padding: 30rpx;
				border-radius: 20rpx;
				border: 2px solid lightgray;
				margin-bottom: 24rpx;
				position: relative;

				&.select {
					border: 2px solid #ffb200;
					background-color: #fff9eb;
				}

				::v-deep .u-icon {
					position: absolute;
					top: -22%;
					right: -5%;
					background: #fff;
				}

			}
		}

		.seat-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: flex-start;
			align-content: flex-start;
			margin-bottom: 32rpx;

			>.item {
				height: fit-content;
				padding: 20rpx 24rpx;
				border-radius: 20rpx;
				border: 2px solid lightgray;
				margin-bottom: 20rpx;

				&:not(:nth-child(5n)) {
					margin-right: 2%;
				}

				&.select {
					border: 2px solid #ffb200;
					position: relative;
					background-color: #fff9eb;
				}

				&.not-spare {
					color: #bbbbbb;
					border-color: #ececec;
				}

				::v-deep .u-icon {
					position: absolute;
					top: -22%;
					background: #fff;
				}
			}
		}
	}
</style>
