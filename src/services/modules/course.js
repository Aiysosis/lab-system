import { mock } from "mockjs";
import { randomStr, successRes } from "../helper.js";
import {
	announceNames,
	avatars,
	courseNames,
	practiceList,
	practiceProblems,
	scores,
} from "../mockData.js";

export const getCourses = () => {
	const list = mock({
		"value|15": [
			{
				id: "@id",
				"name|1": courseNames,
				"isCourseOpen|1": true,
				startTime: "@date",
				endTime: "@date",
				usualRatio: 0.2,
				projectRatio: 0.5,
				practiceRatio: 0.3,
				"teachers|1-2": [
					{
						name: "@cname",
					},
				],
			},
		],
	});
	return successRes(list.value);
};

export const findByCourseId = id => {
	const data = mock({
		id: "@id",
		"name|1": courseNames,
		startTime: "@date",
		endTime: "@date",
		creator: {
			name: "@cname",
		},
		"teachers|1-2": [
			{
				name: "@cname",
			},
		],
		usualRatio: 0.2,
		projectRatio: 0.5,
		practiceRatio: 0.3,
	});
	return successRes(data);
};

export const findProject = () => {
	const list = [];
	for (let i = 1; i <= 6; i++) {
		const project = mock({
			id: "@id",
			name: `课程项目${i}`,
			"fullMark|1": [40, 50, 60, 70, 80, 90, 100],
			submited: i % 2 === 0,
			"endTime|1": ["2024-1-1", "2023-1-1"],
		});
		list.push(project);
	}
	return successRes(list);
};

export const findProjectById = isEnd => {
	const res = mock({
		id: "@id",
		name: `课程项目`,
		"fullMark|1": [40, 50, 60, 70, 80, 90, 100],
		submited: true,
		startTime: "2022-1-1",
		endTime: isEnd ? "2023-1-1" : "2024-1-1",
		desc: "这是项目需求。科任教师可以通过本系统发布项目，描述项目需求、上传附件；同时学生可以在本系统中完成实验报告的提交。学生可以重复提交某一项目，但每一个项目存在期限，超过期限的项目将无法提交。如果成功在截止日期之前完成提交，正常截止后会显示”已提交“的字样。",
		"files|3": [
			{
				"url|1": avatars,
				name: "项目附件",
			},
		],
	});
	return successRes(res);
};

export const getAnnounceByCourseId = () => {
	const res = mock({
		"value|5": [
			{
				id: "@id",
				"title|1": announceNames,
				createdTime: "@datetime",
				content:
					"这是公告的具体内容，公告分为了课程公告和全局公告两个部分，其中课程公告由科任教师发布，只有在本课程内的同学可以查看；全局公告由教师发布，所有同学都可以查看。公告同样可能跟随附件，有附件的公告会在内容右侧列举附件，这样相较于常用的公告不容易遗漏附件。",
				"files|0-2": [
					{
						name: "公告附件",
						"url|1": avatars,
					},
				],
			},
		],
	});
	return successRes(res.value);
};

export const getPracticeByCourseId = () => {
	return successRes(practiceList);
};

export const getProblemsByPracticeId = () => {
	return successRes(practiceProblems);
};

export const findScoresByCourse = () => {
	return successRes(scores);
};

export const createPractice = () => {
	return successRes(null);
};

export const getHomeworkList = () => {
	let list = [];
	for (let i = 0; i < 10; i++) {
		const mockJobNumber = randomStr(7);
		const item = mock({
			creator: {
				jobNumber: mockJobNumber,
				name: "@cname",
			},
			name: `实验报告_${mockJobNumber}`,
			"url|1": avatars,
		});
		list.push(item);
	}

	return successRes(list);
};

export const findCourseFiles = () => {
	let list = [];
	for (let i = 1; i < 6; i++) {
		let item = mock({
			name: `课程资料_${i}`,
			id: i,
			"url|1": avatars,
			time: "@date",
			creator: {
				name: "@cname",
			},
		});
		list.push(item);
	}
	return successRes(list);
};

export const submitPractice = () => {
	return successRes(null);
};
