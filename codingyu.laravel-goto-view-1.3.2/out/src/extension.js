'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const linkProvider_1 = require("./providers/linkProvider");
const hoverProvider_1 = require("./providers/hoverProvider");
function activate(context) {
    let hover = vscode_1.languages.registerHoverProvider(['php', 'blade'], new hoverProvider_1.default());
    let link = vscode_1.languages.registerDocumentLinkProvider(['php', 'blade'], new linkProvider_1.default());
    context.subscriptions.push(hover, link);
}
exports.activate = activate;
function deactivate() {
    //
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map