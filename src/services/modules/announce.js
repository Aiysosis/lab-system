import { mock } from "mockjs";
import { successRes } from "../helper.js";
import { announceNames, avatars } from "../mockData.js";

export const getAllAnnounce = () => {
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
