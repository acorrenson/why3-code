"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// import { systemDefaultPlatform } from 'vscode-test/out/util';
const child_process_1 = require("child_process");
const commands = require("./commands");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let cmd_info = vscode.commands.registerCommand('why3.version', () => {
        const why3 = child_process_1.spawn('why3', ['--version']);
        why3.stdout.on('data', (data) => {
            vscode.window.showInformationMessage(`Why3 version : ${data}`);
        });
        why3.on('error', (err) => {
            vscode.window.showErrorMessage(`Cannot retrieve Why3 version : ${err}`);
        });
    });
    let cmd_prove = vscode.commands.registerCommand('why3.prove', () => {
        var _a;
        const file = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri.fsPath;
        let succ = (c) => {
            vscode.window.showInformationMessage(`Sucess ${c}`);
        };
        let err = (e) => {
            vscode.window.showErrorMessage(e);
        };
        if (file) {
            commands.prove(file, 'alt-ergo', succ, err);
        }
    });
    context.subscriptions.push(cmd_info);
    context.subscriptions.push(cmd_prove);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map