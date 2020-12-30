// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import { systemDefaultPlatform } from 'vscode-test/out/util';
import { spawn } from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let cmd_hello = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello Why3');
	});


	let cmd_info = vscode.commands.registerCommand('extension.why3info', () => {
		const why3 = spawn('why3', ['--version']);
		why3.stdout.on('data', (data) => {
			vscode.window.showInformationMessage(`Why3 version : ${data}`);
		});

		why3.stderr.on('data', (data) => {
			vscode.window.showErrorMessage(`Cannot retrieve Why3 version : ${data}`);
		});
	});

	context.subscriptions.push(cmd_hello);
	context.subscriptions.push(cmd_info);
}

export function deactivate() { }
