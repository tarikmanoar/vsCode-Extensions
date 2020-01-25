'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const util = require("../util");
class LinkProvider {
    provideDocumentLinks(doc) {
        let documentLinks = [];
        let config = vscode_1.workspace.getConfiguration('laravel_goto_view');
        if (config.quickJump) {
            let reg = new RegExp(config.regex, 'g');
            let linesCount = doc.lineCount <= config.maxLinesCount ? doc.lineCount : config.maxLinesCount;
            let index = 0;
            while (index < linesCount) {
                let line = doc.lineAt(index);
                let result = line.text.match(reg);
                if (result != null) {
                    for (let item of result) {
                        let file = util.getFilePath(item, doc);
                        if (file != null) {
                            let start = new vscode_1.Position(line.lineNumber, line.text.indexOf(item) + 1);
                            let end = start.translate(0, item.length - 2);
                            let documentlink = new vscode_1.DocumentLink(new vscode_1.Range(start, end), file.fileUri);
                            documentLinks.push(documentlink);
                        }
                        ;
                    }
                }
                index++;
            }
        }
        return documentLinks;
    }
}
exports.default = LinkProvider;
//# sourceMappingURL=linkProvider.js.map