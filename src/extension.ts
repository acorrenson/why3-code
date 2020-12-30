// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import { systemDefaultPlatform } from 'vscode-test/out/util';
import { spawn } from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let cmd_info = vscode.commands.registerCommand('extension.version', () => {
		const why3 = spawn('why3', ['--version']);

		why3.stdout.on('data', (data) => {
			vscode.window.showInformationMessage(`Why3 version : ${data}`);
		});

		why3.on('error', (err) => {
			vscode.window.showErrorMessage(`Cannot retrieve Why3 version : ${err}`);
		});
	});

	let cmd_prove = vscode.commands.registerCommand('extension.prove', () => {
		const file = vscode.window.activeTextEditor?.document.uri.fsPath;
		if (file) {
			const why3 = spawn('why3', ['prove', '-P', 'alt-ergo', file]);

			why3.stderr.on('data', (data) => {
				vscode.window.showErrorMessage(`Error : ${data}`);
			});

			why3.stdout.on('data', (data) => {
				vscode.window.showInformationMessage(`Result : ${data}`);
			});

			why3.on('error', (err) => {
				vscode.window.showErrorMessage(`Failure : ${err}`);
			});

			why3.on('exit', (code) => {
				if (code !== null && code === 0) {
					vscode.window.showInformationMessage('Sucess');
				} else {
					vscode.window.showErrorMessage('Failed');
				}
			});
		}
	});

	context.subscriptions.push(cmd_info);
	context.subscriptions.push(cmd_prove);
}

export function deactivate() { }
