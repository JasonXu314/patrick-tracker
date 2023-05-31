import { BadRequestException, Injectable } from '@nestjs/common';

export enum Severity {
	EGREGIOUS = 'egregious',
	ANNOYANCE = 'annoyance'
}

@Injectable()
export class AppService {
	private _index = 0;
	private _lastTime = -1;

	public beginSession(): void {
		if (this._lastTime === -1) {
			this._lastTime = Date.now();
		} else {
			throw new BadRequestException('Session has already been started');
		}
	}

	public annoyance(): void {
		if (this._lastTime === -1) {
			throw new BadRequestException('No session in progress');
		}

		const now = Date.now();
		this._index += 120 / ((now - this._lastTime) / 1000);
		this._lastTime = now;
	}

	public egregious(): void {
		if (this._lastTime === -1) {
			throw new BadRequestException('No session in progress');
		}

		const now = Date.now();
		this._index += (120 / ((now - this._lastTime) / 1000)) ** 2;
		this._lastTime = now;
	}

	public getIndex(): number {
		return this._index;
	}

	public endSession(): void {
		this._index = 0;
		this._lastTime = -1;
	}

	public hasSession(): boolean {
		return this._lastTime !== -1;
	}
}

