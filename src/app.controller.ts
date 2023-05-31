import { Controller, Get, Header, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly service: AppService) {}

	@Get('/')
	public getPage(): string {
		return `
		<html data-theme="dark">
			<head>
				<title>Patrick Tracker</title>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
			</head>
			<body>
				<main class="container">
					<h1>Current Punishment: ${this.service.getIndex().toFixed(4)} min.</h1>
					<div class="grid">
						<form action="/punish" method="POST">
							<button type="submit">Punish</button>
						</form>
						<form action="/reset" method="POST">
							<button type="submit">Reset</button>
						</form>
					</div>
				</main>
			</body>
		</html>
		`;
	}

	@Post('/punish')
	@HttpCode(303)
	@Header('Location', '/')
	public punish(): void {
		this.service.punish();
	}

	@Post('/reset')
	@HttpCode(303)
	@Header('Location', '/')
	public reset(): void {
		this.service.reset();
	}
}

