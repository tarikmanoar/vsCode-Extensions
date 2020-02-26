"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const errorHandler_1 = require("./errorHandler");
const FormatterProvider_1 = require("./FormatterProvider");
const utils_1 = require("./utils");
const ACTIVATION_COMMAND = vscode_1.commands.registerCommand('scss-formatter.activate', () => {
    vscode_1.window.showInformationMessage('SCSS Formatter is Active');
});
// method is called when extension is activated
function activate(context) {
    const scssFormatter = new FormatterProvider_1.SCSSFormatter();
    context.subscriptions.push(vscode_1.languages.registerDocumentFormattingEditProvider(utils_1.languageSelector, scssFormatter));
    context.subscriptions.push(ACTIVATION_COMMAND);
    context.subscriptions.push(...errorHandler_1.setupErrorHandler());
    context.subscriptions.push(...errorHandler_1.registerErrorHandlerDisposables());
}
exports.activate = activate;
// method is called when extension is deactivated
function deactivate() { } // tslint:disable-line:no-empty
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map