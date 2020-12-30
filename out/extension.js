"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// import { systemDefaultPlatform } from 'vscode-test/out/util';
const child_process_1 = require("child_process");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let cmd_info = vscode.commands.registerCommand('extension.why3info', () => {
        const why3 = child_process_1.spawn('why3', ['--version']);
        why3.stdout.on('data', (data) => {
            vscode.window.showInformationMessage(`Why3 version : ${data}`);
        });
        why3.on('error', (err) => {
            vscode.window.showErrorMessage(`Cannot retrieve Why3 version : ${err}`);
        });
    });
    context.subscriptions.push(cmd_info);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map