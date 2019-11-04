'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const emmetActions_1 = require("./emmetActions");
function activate(context) {
    let emmetActions = new emmetActions_1.EmmetActions();
    let disposable = vscode.commands.registerCommand('extension.emmetMe', () => {
        try {
            emmetActions.emmetMe();
        }
        catch (e) { }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map