<template>
	<div class="container">
		<el-dialog title="Tips" :visible.sync="dialogVisible" width="50%">
			<p>
				hi！这是一个基于具体需求的实验教学系统，本系统面向学生和教师，提供实验教学的相关功能。不同的用户类型所使用的功能有所不同，因此您可以选择使用哪种身份登录，我们会随机为您生成用户信息。
			</p>
			<P
				>本页面为前端效果展示，所以数据统一使用Mock生成，各个页面的信息可能存在不合理的情况。
			</P>
			<p>不需要注册，您可以直接输入任意用户名和密码，点击登录即可。</p>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false"
					>cool</el-button
				>
			</span>
		</el-dialog>
		<el-dialog
			title="选择用户类型"
			:visible.sync="chooseStatus"
			width="50%"
		>
			<el-radio v-model="status" label="student">学生</el-radio>
			<el-radio v-model="status" label="teacher">教师</el-radio>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="login">确定</el-button>
			</span>
		</el-dialog>
		<div
			:class="{
				rotate: this.animation,
				'main-container': true,
			}"
		>
			<div class="register-container">
				<div class="main">
					<div class="title">注册</div>
					<el-input
						class="login-input"
						@focus="cleanRegisterInfo()"
						v-model="rEmail"
						placeholder="邮箱"
						autocomplete="on"
						clearable
					></el-input>
					<div class="input-info" v-if="onRegisterEmailInfo">
						{{ registerEmailInfo }}
					</div>
					<el-input
						class="login-input"
						@focus="cleanRegisterInfo()"
						v-model="rJobNumber"
						placeholder="学工号"
						autocomplete="on"
						clearable
					></el-input>
					<div class="input-info" v-if="onRegisterJobNumberInfo">
						{{ registerJobNumberInfo }}
					</div>
					<el-input
						type="password"
						class="login-input"
						@focus="cleanRegisterInfo()"
						v-model="rPsw"
						placeholder="输入密码"
						autocomplete="on"
						clearable
					></el-input>
					<div class="input-info" v-if="onRegisterPswInfo">
						{{ registerPswInfo }}
					</div>
					<el-input
						type="password"
						class="login-input"
						@input="checkPsw"
						@focus="cleanRegisterInfo()"
						v-model="rPsw2"
						placeholder="确认密码"
						autocomplete="on"
						clearable
					></el-input>
					<div class="input-info" v-if="onRegisterPsw2Info">
						{{ registerPsw2Info }}
					</div>
					<div class="forget" @click="backToLogin">登录</div>
					<input
						type="button"
						@click="register"
						class="button"
						value="Join Us"
					/>
				</div>
			</div>
			<div class="cover">
				<div
					:class="{
						'cover-box': true,
						'cover-box-r': this.goRegister,
					}"
				>
					<div class="cover-inner-box"></div>
				</div>
			</div>
			<div class="login-container">
				<div class="main">
					<div class="title">登录</div>
					<el-input
						class="login-input"
						@focus="cleanLoginInfo()"
						v-model="email"
						placeholder="邮箱/学工号"
						autocomplete="on"
						clearable
					></el-input>
					<div class="input-info" v-if="onLoginEmailInfo">
						{{ loginEmailInfo }}
					</div>
					<el-input
						type="password"
						class="login-input"
						@focus="cleanLoginInfo()"
						v-model="psw"
						placeholder="输入密码"
						autocomplete="on"
						clearable
					></el-input>
					<div class="input-info" v-if="onLoginPswInfo">
						{{ loginPswInfo }}
					</div>
					<div class="forget" @click="changeToRegister">注册</div>
					<input
						type="button"
						@click="beforeLogin"
						class="button"
						value="GO"
					/>
				</div>
			</div>
		</div>
		<loading v-show="loading" />
	</div>
</template>

<script>
import API from "@/services/index.js";
import loading from "../components/Loading.vue";
var qs = require("qs"); //格式化数据用的，很重要

//import axios from 'axios'
export default {
	components: {
		loading,
	},
	data() {
		return {
			dialogVisible: true,
			chooseStatus: false,
			status: "student",
			animation: false,
			goRegister: false,
			loading: false,
			email: "",
			psw: "",
			rEmail: "",
			rPsw: "",
			rPsw2: "",
			rJobNumber: "",
			loginEmailInfo: "",
			loginPswInfo: "",
			registerEmailInfo: "",
			registerJobNumberInfo: "",
			registerPswInfo: "",
			registerPsw2Info: "",
			pswCheck: true,
			identify_number: "", //学号，工号
		};
	},
	computed: {
		onLoginEmailInfo: function () {
			return this.loginEmailInfo != "";
		},
		onLoginPswInfo: function () {
			return this.loginPswInfo != "";
		},
		onRegisterEmailInfo: function () {
			return this.registerEmailInfo != "";
		},
		onRegisterJobNumberInfo: function () {
			return this.registerJobNumberInfo != "";
		},
		onRegisterPswInfo: function () {
			return this.registerPswInfo != "";
		},
		onRegisterPsw2Info: function () {
			return this.registerPsw2Info != "";
		},
	},
	methods: {
		changeToRegister() {
			// this.$router.push({
			//     path:'/psw',
			// })
			this.cleanLoginInfo();
			this.cleanLoginInput();
			this.goRegister = true;
			this.animation = true;
		},
		backToLogin() {
			this.cleanRegisterInfo();
			this.cleanRegisterInput();
			this.goRegister = false;
			this.animation = false;
		},
		cleanLoginInfo() {
			this.loginEmailInfo = "";
			this.loginPswInfo = "";
		},
		cleanLoginInput() {
			this.email = "";
			this.psw = "";
		},
		cleanRegisterInput() {
			this.rEmail = "";
			this.rJobNumber = "";
			this.rPsw = "";
			this.rPsw2 = "";
		},
		cleanRegisterInfo() {
			this.registerEmailInfo = "";
			this.registerJobNumberInfo = "";
			this.registerPswInfo = "";
			this.registerPsw2Info = "";
		},
		beforeLogin() {
			if (this.email == "") {
				this.loginEmailInfo = "邮箱不能为空";
				return;
			}
			if (this.psw == "") {
				this.loginPswInfo = "请输入密码";
				return;
			}
			this.chooseStatus = true;
		},
		login() {
			// let data = {
			// 	emailOrJobNumber: this.email,
			// 	password: this.psw,
			// };
			this.chooseStatus = false;
			API.user
				.userLogin(this.status)
				.then(async res => {
					//console.log(res.data.token);
					let token = res.data;
					await this.$store.dispatch("UserLogin", token);
					//跳到目标页
					this.$router.push("/home");
					this.loading = false;
				})
				.catch(err => {
					this.loading = false;
					this.loginPswInfo = "邮箱或密码错误";
					console.log(err);
				});
		},
		checkPsw() {
			if (this.rPsw2 != this.rPsw) {
				this.registerPsw2Info = "两次输入的密码不一致";
				this.pswCheck = false;
			} else {
				this.registerPsw2Info = "";
				this.pswCheck = true;
			}
		},
		register() {
			//this.loading=true;
			if (!this.pswCheck) return;
			if (this.rEmail == "") {
				this.registerEmailInfo = "邮箱不能为空";
				return;
			}
			if (this.rJobNumber == "") {
				this.registerJobNumberInfo = "请输入学工号";
				return;
			}
			if (this.rPsw == "") {
				this.registerPswInfo = "请输入密码";
				return;
			}
			if (this.rPsw2 == "") {
				this.registerPsw2Info = "请确认密码";
				return;
			}
			this.loading = true;
			let data = {
				email: this.rEmail,
				password: this.rPsw,
				jobNumber: this.rJobNumber,
			};
			API.user
				.userEnable(qs.stringify(data))
				.then(res => {
					this.loading = false;
					alert("验证邮件已发出，请注意查收");
					//this.$router.push('/home');
				})
				.catch(err => {
					this.loading = false;
					alert(err.data.message);
					console.log(err);
				});
		},
	},
};
</script>

<style scoped>
.el-input >>> .el-input__inner {
	box-sizing: border-box;
	border: none;
	outline: none;
	border-radius: 0;
	background-color: rgba(255, 255, 255, 0);
	color: whitesmoke;
	border-bottom: silver 2px solid;
	transition: all 0.5s ease;
}
.el-input >>> .el-input__inner:focus {
	border-bottom: whitesmoke 2px solid;
}
</style>
<style lang="scss" scoped>
* {
	user-select: none;
}
.container {
	padding: 0;
	margin: 0;
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: white;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	.main-container {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		width: 960px;
		height: 600px;
		min-height: 600px;
		background-image: linear-gradient(
			to bottom left,
			violet,
			rgb(0, 174, 255)
		);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-radius: 20px;
		box-shadow: 30px 30px 60px #bebebe, -30px -30px 60px #ffffff;
		.login-container {
			box-sizing: border-box;
			width: 320px;
			height: 100%;
			//background-color: rgba($color: #777272, $alpha: 0.2);
			backdrop-filter: brightness(88%);
			border-top-right-radius: 20px;
			border-bottom-right-radius: 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.main {
				box-sizing: border-box;
				width: 100%;
				padding: 30px;
				padding-bottom: 70px;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				//background-color: gray;
				.title {
					box-sizing: border-box;
					margin-bottom: 5px;
					font-family: Arial, Helvetica, sans-serif;
					font-size: 22px;
					color: white;
					transition: all 0.5s ease;
				}
				.login-input {
					margin-top: 30px;
					box-sizing: border-box;
					width: 100%;
					transition: all 0.5s ease;
				}
				.input-info {
					width: 100%;
					padding-left: 15px;
					font-size: 12px;
					color: rgb(255, 123, 106);
					margin-top: 5px;
				}
				.button {
					box-sizing: border-box;
					width: 110px;
					height: 40px;
					margin-top: 20px;
					border-radius: 20px;
					outline: none;
					border: none;
					color: white;
					background-color: rgb(69, 102, 163);
					transition: all 0.5s ease;
					cursor: pointer;
				}
				.button:hover {
					background-color: rgb(219, 137, 219);
				}
				.forget {
					margin-top: 20px;
					box-sizing: border-box;
					width: 100%;
					//@debugbackground-color: lightblue;
					text-align: right;
					color: silver;
					font-size: 13px;
					transition: all 0.5s ease;
				}
				.forget:hover {
					color: white;
				}
			}
		}

		.cover {
			width: 320px;
			height: 100%;
			background-color: gray;
			flex-shrink: 0;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			.cover-box {
				width: 640px;
				height: 100%;
				flex-shrink: 0;
				background-image: linear-gradient(
					to bottom left,
					violet,
					rgb(0, 174, 255)
				);
				z-index: 100;
				transition: all 0.3s ease;
				transform: translateX(-320px);
				border-radius: 20px 0 0 20px;
				// .cover-inner-box{
				//     width:100%;
				//     height: 100%;
				//     background-image: url('../assets/login.png');
				//     background-position: center;
				//     background-repeat: no-repeat;
				//     background-size: 70% 70%;
				// }
			}
			.cover-box-r {
				transform: translateX(0);
				border-radius: 0 20px 20px 0;
			}
		}

		.register-container {
			box-sizing: border-box;
			width: 320px;
			height: 100%;
			//background-color: rgba($color: #777272, $alpha: 0.2);
			backdrop-filter: brightness(90%);
			border-radius: 20px 0 0 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.main {
				box-sizing: border-box;
				width: 100%;
				padding: 30px;
				padding-bottom: 70px;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				//background-color: gray;
				.title {
					box-sizing: border-box;
					margin-bottom: 5px;
					font-family: Arial, Helvetica, sans-serif;
					font-size: 22px;
					color: white;
					transition: all 0.5s ease;
				}
				.login-input {
					margin-top: 30px;
					box-sizing: border-box;
					width: 100%;
					transition: all 0.5s ease;
				}
				.input-info {
					width: 100%;
					padding-left: 15px;
					font-size: 12px;
					color: rgb(255, 123, 106);
					margin-top: 5px;
				}
				.button {
					box-sizing: border-box;
					width: 110px;
					height: 40px;
					margin-top: 20px;
					border-radius: 20px;
					outline: none;
					border: none;
					color: white;
					background-color: rgb(69, 102, 163);
					transition: all 0.5s ease;
				}
				.button:hover {
					background-color: rgb(219, 137, 219);
				}
				.forget {
					margin-top: 20px;
					box-sizing: border-box;
					width: 100%;
					//@debugbackground-color: lightblue;
					text-align: right;
					color: silver;
					font-size: 13px;
					transition: all 0.5s ease;
				}
				.forget:hover {
					color: white;
				}
			}
		}
	}
	.rotate {
		animation-name: rotate;
		animation-duration: 0.6s;
		animation-timing-function: ease;
		animation-iteration-count: 1;
	}
	.rotate-reverse {
		animation-name: rotate;
		animation-duration: 0.8s;
		animation-timing-function: ease;
		animation-direction: reverse;
		animation-iteration-count: 1;
	}
	@keyframes rotate {
		0% {
			transform: rotate(0);
		}
		50% {
			transform: rotate(8deg);
		}
		100% {
			transform: rotate(0);
		}
	}
}
</style>
