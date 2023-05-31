import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	private _index = 0;
	private _lastTime = Date.now();

	public punish(): void {
		const now = Date.now();
		this._index += 30 / ((now - this._lastTime) / 1000);
		this._lastTime = now;
	}

	public getIndex(): number {
		return this._index;
	}

	public reset(): void {
		this._index = 0;
		this._lastTime = Date.now();
	}
}

