// export abstract class Result<T = void> {
// 	abstract success: boolean;

// 	static ok<T>(data: T) {
// 		return new ResultOk(data);
// 	}
// 	static err(message: string) {
// 		return new ResultErr(message);
// 	}
// }

export type Result<T = void> = ResultOk<T> | ResultErr<T>;

export class ResultOk<T> {
	success: true = true;
	data: T;

	constructor(data: T) {
		this.data = data;
	}
}

export class ResultErr<T> {
	success: false = false;
	message: string;

	constructor(message: string) {
		this.message = message;
	}
}
