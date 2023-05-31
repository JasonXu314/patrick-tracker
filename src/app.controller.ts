import { Body, Controller, Get, Header, HttpCode, ParseEnumPipe, Post } from '@nestjs/common';
import { AppService, Severity } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly service: AppService) {}

	@Get('/')
	public getPage(): string {
		const hasSession = this.service.hasSession();

		return `
		<html data-theme="dark">
			<head>
				<title>Patrick Tracker</title>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
				<link rel="stylesheet" href="/styles.css">
			</head>
			<body>
				<main class="container">
					<h1>Current Punishment: ${this.service.getIndex().toFixed(4)} min.</h1>
					<div>
						<div class="grid">
							<form>
								${
									hasSession
										? `
								<div class="grid">
									<button name="severity" type="submit" value="annoyance" formaction="/punish" formmethod="POST">Annoyance</button>
									<button name="severity" type="submit" value="egregious" formaction="/punish" formmethod="POST">Egregious</button>
								</div>
								<div class="grid">
									<button class="reset" type="submit" formaction="/reset" formmethod="POST">Reset</button>
									<button class="reset" type="submit" formaction="/end" formmethod="POST">End Session</button>
								</div>
								`
										: `
								<button class="success" type="submit" formaction="/begin" formmethod="POST">Begin Session</button>
								`
								}
							</form>
						</div>
					</div>
				</main>
			</body>
		</html>
		`;
	}

	@Get('/styles.css')
	public styles(): string {
		return `
			:is(button,input[type=submit],input[type=button],[role=button]).success {
				--background-color: #73cb87;
				--border-color: #73cb87;
				--color: black;
			}

			:is(button,input[type=submit],input[type=button],[role=button]).reset {
				--background-color: #f44846;
				--border-color: #f44846;
				--color: black;
			}
		`;
	}

	@Post('/punish')
	@HttpCode(303)
	@Header('Location', '/')
	public punish(@Body('severity', new ParseEnumPipe(Severity)) severity: Severity): void {
		if (severity === Severity.ANNOYANCE) {
			this.service.annoyance();
		} else {
			this.service.egregious();
		}
	}

	@Post('/begin')
	@HttpCode(303)
	@Header('Location', '/')
	public begin(): void {
		this.service.beginSession();
	}

	@Post('/end')
	public end(): string {
		const finalIdx = this.service.getIndex();
		this.service.endSession();

		return `
			<html data-theme="dark">
				<head>
					<title>Patrick Tracker - Results</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
				</head>
				<body>
					<main class="container">
						<h1>Final Punishment: ${finalIdx} min.</h1>
						<a href="/" role="button">Back</a>
					</main>
				</body>
			</html>
		`;
	}
}

