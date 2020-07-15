'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const link_1 = require("./link");
const util = require("./util");
const REG = /(['"])[^'"]*\1/;
function activate(context) {
    let hover = vscode_1.languages.registerHoverProvider({ scheme: 'file', language: 'php' }, {
        provideHover(document, position, token) {
            let linkRange = document.getWordRangeAtPosition(position, REG);
            if (linkRange) {
                let filePath = util.getFilePath(document.getText(linkRange), document);
                let workspaceFolder = vscode_1.workspace.getWorkspaceFolder(document.uri);
                if (filePath != null) {
                    return new vscode_1.Hover(workspaceFolder.name + filePath.replace(workspaceFolder.uri.fsPath, ''));
                }
            }
            return;
        }
    });
    let link = vscode_1.languages.registerDocumentLinkProvider({ scheme: 'file', language: 'php' }, new link_1.LinkProvider());
    context.subscriptions.push(hover);
    context.subscriptions.push(link);
}
exports.activate = activate;
function deactivate() {
    //
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map