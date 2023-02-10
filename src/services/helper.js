export function successRes(data) {
	return Promise.resolve({
		code: 200,
		message: "ok",
		data,
	});
}

export function errorRes(data) {
	return Promise.reject({
		code: 400,
		message: "bad request",
		data,
	});
}

/**
 * @param {number} length
 */
export function randomStr(length) {
	return Math.random().toString(36).slice(-length);
}
