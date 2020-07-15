'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const util = require("../util");
class HoverProvider {
    provideHover(doc, pos) {
        let config = vscode_1.workspace.getConfiguration('laravel_goto_view');
        let reg = new RegExp(config.regex);
        let linkRange = doc.getWordRangeAtPosition(pos, reg);
        if (!linkRange)
            return;
        let filePaths = util.getFilePaths(doc.getText(linkRange), doc);
        let workspaceFolder = vscode_1.workspace.getWorkspaceFolder(doc.uri);
        if (filePaths.length > 0) {
            let text = "";
            for (let i in filePaths) {
                text += config.folderTip ? `\`${filePaths[i].name}\`` : '';
                text += ` [${workspaceFolder.name + filePaths[i].showPath}](${filePaths[i].fileUri})  \r`;
            }
            return new vscode_1.Hover(new vscode_1.MarkdownString(text));
        }
    }
}
exports.default = HoverProvider;
//# sourceMappingURL=hoverProvider.js.map