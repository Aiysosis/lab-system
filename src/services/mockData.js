import { mock } from "mockjs";

export const avatars = [
	"https://api.aiysosis.ink/files?path=imagesOrigin/image-1675664093541.jpg",
	"https://api.aiysosis.ink/files?path=imagesOrigin/image-1675664111392.jpg",
	"https://api.aiysosis.ink/files?path=imagesOrigin/image-1675664132536.jpg",
	"https://api.aiysosis.ink/files?path=imagesOrigin/image-1675664147706.jpg",
	"https://api.aiysosis.ink/files?path=imagesOrigin/image-1675664163045.jpg",
	"https://api.aiysosis.ink/files?path=imagesOrigin/image-1675664178026.jpg",
	"https://api.aiysosis.ink/files?path=imagesOrigin/image-1675664191532.jpg",
	"https://api.aiysosis.ink/files?path=imagesOrigin/image-1675664203479.jpg",
	"https://api.aiysosis.ink/files?path=imagesOrigin/image-1675664215149.jpg",
	"https://api.aiysosis.ink/files?path=imagesOrigin/image-1675664228496.jpg",
];

export const courseNames = [
	"计算机网络",
	"嵌入式操作系统",
	"软件工程课程设计",
	"容错与安全计算",
	"云计算",
	"汇编语言",
	"Web系统与技术",
	"Java EE程序设计",
	"c++程序设计",
	"编译原理",
	"信息安全基础",
	"用户交互技术",
	"机器学习",
	"计算机视觉",
	"软件测试",
];

export const announceNames = [
	"2023实验教学启动",
	"关于实验选课的通知",
	"实验评分规则",
	"实验规范学习",
	"新开实验课程",
	"关于实验课程重修",
];

export const practiceList = [
	{
		id: 1,
		name: "练习1",
		submited: true,
		marked: true,
		endTime: "2023-1-1",
		timeLimit: 5,
	},
	{
		id: 2,
		name: "练习2",
		submited: false,
		endTime: "2023-1-1",
		timeLimit: 5,
	},
	{
		id: 3,
		name: "练习3",
		submited: true,
		marked: false,
		endTime: "2024-1-1",
		timeLimit: 5,
	},
	{
		id: 4,
		name: "练习4",
		submited: false,
		marked: false,
		endTime: "2024-1-1",
		timeLimit: 5,
	},
];

export const practiceProblems = [
	{
		id: 1,
		description:
			"从器件角度看，计算机经历了五代变化。但从系统结构看，至今绝大多数计算机仍属于（  ）计算机。",
		type: 0,
		options: JSON.stringify(["并行", "冯·诺依曼", "智能", "串行"]),
		answer: JSON.stringify([1]),
	},
	{
		id: 2,
		description:
			"常用的虚拟存储系统由（  ）两级存储器组成，其中辅存是大容量的磁表面存储器。",
		type: 0,
		options: JSON.stringify([
			"cache-主存",
			"主存-辅存",
			"cache-辅存",
			"通用寄存器-cache",
		]),
		answer: JSON.stringify([1]),
	},
	{
		id: 3,
		description: "描述PCI总线中基本概念不正确的句子是（  ）",
		type: 1,
		options: JSON.stringify([
			"PCI总线是一个与处理器无关的高速外围设备",
			"PCI总线的基本传输机制是猝发式传送",
			"PCI设备一定是主设备",
			"系统中只允许有一条PCI总线",
		]),
		answer: JSON.stringify([2, 3]),
	},
];

const projectScore = mock({
	"value|3": [
		{
			type: "project",
			"score|35-85": 20,
			project: {
				name: "课程项目",
				"fullMark|1": [40, 50, 60, 70, 80, 90, 100],
			},
		},
	],
});
const exerciseScore = mock({
	"value|3": [
		{
			type: "exercise",
			"score|1-5": 3,
			practice: {
				name: "课程练习",
			},
		},
	],
});
export const scores = [
	mock({
		type: "attendance",
		"score|10-20": 15,
	}),
	...exerciseScore.value,
	...projectScore.value,
];
