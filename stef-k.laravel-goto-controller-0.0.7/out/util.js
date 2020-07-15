'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const fs = require("fs");
const readLine = require("n-readlines");
class LaravelControllerLink extends vscode_1.DocumentLink {
    constructor(range, path, controllerName, funcName) {
        super(range, null);
        this.filePath = path;
        this.controllerName = controllerName;
        this.funcName = funcName;
    }
}
exports.LaravelControllerLink = LaravelControllerLink;
/**
 * Finds the controler's filepath
 * @param text
 * @param document
 */
function getFilePath(text, document) {
    let pathCtrl = '/app/Http/Controllers'; // initial pathController value in package.json
    pathCtrl = vscode_1.workspace.getConfiguration('laravel_goto_controller').pathController; // default settings or user settings
    let filePath = vscode_1.workspace.getWorkspaceFolder(document.uri).uri.fsPath + pathCtrl;
    // split the method (if not a resource controller) from the controller name
    let controllerFileName = text.replace(/\./g, '/').replace(/\"|\'/g, '') + '.php';
    if (controllerFileName.includes('\\')) {
        controllerFileName = controllerFileName.replace(/\\/g, '\/');
    }
    let targetPath = filePath + '/' + controllerFileName;
    if (fs.existsSync(targetPath)) {
        return targetPath;
    }
    let dirItems = fs.readdirSync(filePath);
    for (let item of dirItems) {
        targetPath = filePath + '/' + item + '/' + controllerFileName;
        if (fs.existsSync(targetPath)) {
            return targetPath;
        }
    }
    return null;
}
exports.getFilePath = getFilePath;
function getLineNumber(text, path) {
    let file = new readLine(path);
    let lineNum = 0;
    let line;
    while (line = file.next()) {
        lineNum++;
        line = line.toString();
        if (line.toLowerCase().includes('function ' + text.toLowerCase() + '(')) {
            return lineNum;
        }
    }
    return -1;
}
exports.getLineNumber = getLineNumber;
//# sourceMappingURL=util.js.map