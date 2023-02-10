import { mock } from "mockjs";
import { successRes } from "../helper.js";

const eventNames = [
	"选课",
	"选课结束",
	"期中考试",
	"课程《机器学习》测试",
	"课程《计算机网络》项目1截止",
];
export const getEvent = () => {
	const res = [];
	for (let i = 0; i < 15; i++) {
		let dateShift = Math.floor(Math.random() * 10);
		let curDate = new Date();
		curDate.setDate(curDate.getDate() + dateShift);
		let event = mock({
			id: i,
			"type|0-2": 0,
			"description|1": eventNames,
			time: curDate,
		});
		res.push(event);
	}
	return successRes(res);
};
