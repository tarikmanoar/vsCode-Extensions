'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const util = require("./util");
class LinkProvider {
    /**
   * provideDocumentLinks
   */
    provideDocumentLinks(document, token) {
        let documentLinks = [];
        let index = 0;
        let reg = /(['"])[^'"]*\1/g;
        while (index < document.lineCount) {
            let line = document.lineAt(index);
            let result = line.text.match(reg);
            if (result != null) {
                for (let item of result) {
                    let splitted = item.replace(/\"|\'/g, '').split('@');
                    if (splitted.length != 2) {
                        //Search for the Controller keyword in the string name
                        if (splitted[0].includes('Controller')) {
                            //In this case, because there is no method definition in routes 
                            //we send it to the index method by default
                            splitted[1] = 'index';
                        }
                        else {
                            continue;
                        }
                    }
                    let filePath = util.getFilePath(splitted[0], document);
                    if (filePath != null) {
                        let start = new vscode_1.Position(line.lineNumber, line.text.indexOf(item) + 1);
                        let end = start.translate(0, item.length - 2);
                        let documentLink = new util.LaravelControllerLink(new vscode_1.Range(start, end), filePath, splitted[0], splitted[1]);
                        documentLinks.push(documentLink);
                    }
                }
            }
            index++;
        }
        return documentLinks;
    }
    /**
     * resolveDocumentLink
     */
    resolveDocumentLink(link, token) {
        let lineNum = util.getLineNumber(link.funcName, link.filePath);
        let path = link.filePath;
        if (lineNum != -1)
            path += "#" + lineNum;
        link.target = vscode_1.Uri.parse("file:" + path);
        return link;
    }
}
exports.LinkProvider = LinkProvider;
//# sourceMappingURL=link.js.map