// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import { systemDefaultPlatform } from 'vscode-test/out/util';
import { spawn } from 'child_process';
import * as commands from './commands';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let cmd_info = vscode.commands.registerCommand('why3.version', () => {
		const why3 = spawn('why3', ['--version']);

		why3.stdout.on('data', (data) => {
			vscode.window.showInformationMessage(`Why3 version : ${data}`);
		});

		why3.on('error', (err) => {
			vscode.window.showErrorMessage(`Cannot retrieve Why3 version : ${err}`);
		});
	});

	let cmd_prove = vscode.commands.registerCommand('why3.prove', () => {
		const file = vscode.window.activeTextEditor?.document.uri.fsPath;

		let succ = (c: commands.Context) => {
			vscode.window.showInformationMessage(`Sucess ${c}`);
		};

		let err = (e: string) => {
			vscode.window.showErrorMessage(e);
		};

		if (file) {
			commands.prove(file, 'alt-ergo', succ, err);
		}
	});

	context.subscriptions.push(cmd_info);
	context.subscriptions.push(cmd_prove);
}

export function deactivate() { }
