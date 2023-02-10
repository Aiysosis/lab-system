import { mock } from "mockjs";
import { randomStr, successRes } from "../helper.js";
import { avatars } from "../mockData.js";

//用户注册
export const userEnable = data => {
	return successRes(null);
};

//用户登录(只是拿到token)
export const userLogin = status => {
	const token = status;
	return successRes(token);
};
//获取用户
export const getUserByToken = token => {
	const mockJobNumber = randomStr(7);
	const mockPsw = randomStr(12);
	const user = mock({
		"id|+1": 1,
		email: "@email",
		enablingEmail: "@email",
		name: "@cname",
		password: mockPsw,
		enablingPassword: 123456,
		"subject|1": ["软件工程", "计算机科学", "人工智能", "自动化"],
		description: "这个人很懒，什么也没有留下",
		"avatar|1": avatars,
		"age|19-24": 20,
		jobNumber: mockJobNumber,
		"grade|2000-2023": 2019,
		enabled: true,
		createdTime: "@date",
		type: token,
		"gender|1": ["male,female"],
	});
	return successRes(user);
};
