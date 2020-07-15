'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const fs = require("fs");
const path = require("path");
function getFilePath(text, document) {
    let paths = getFilePaths(text, document);
    return paths.length > 0 ? paths[0] : null;
}
exports.getFilePath = getFilePath;
function getFilePaths(text, document) {
    let workspaceFolder = vscode_1.workspace.getWorkspaceFolder(document.uri).uri.fsPath;
    let config = vscode_1.workspace.getConfiguration('laravel_goto_view');
    let paths = scanViewPaths(workspaceFolder, config);
    let file = text.replace(/\"|\'/g, '').replace(/\./g, '/').split('::');
    let result = [];
    for (let item in paths) {
        let showPath = paths[item] + `/${file[0]}`;
        if (file.length > 1) {
            if (item !== file[0]) {
                continue;
            }
            else {
                showPath = paths[item] + `/${file[1]}`;
            }
        }
        for (let extension of config.extensions) {
            showPath = showPath + extension;
            let filePath = workspaceFolder + showPath;
            if (fs.existsSync(filePath)) {
                result.push({
                    "name": item,
                    "showPath": showPath,
                    "fileUri": vscode_1.Uri.file(filePath)
                });
            }
        }
    }
    return result;
}
exports.getFilePaths = getFilePaths;
function scanViewPaths(workspaceFolder, config) {
    let folders = Object.assign({}, config.folders);
    // Modules
    let modulePath = path.join(workspaceFolder, 'Modules');
    if (fs.existsSync(modulePath)) {
        fs.readdirSync(modulePath).forEach(element => {
            let file = path.join(modulePath, element);
            if (fs.statSync(file).isDirectory()) {
                folders[element.toLocaleLowerCase()] = "/Modules/" + element + "/resources/views";
            }
        });
    }
    // vendor
    let vendorPath = path.join(workspaceFolder, 'resources/views/vendor');
    if (fs.existsSync(vendorPath)) {
        fs.readdirSync(vendorPath).forEach(element => {
            let file = path.join(vendorPath, element);
            if (fs.statSync(file).isDirectory()) {
                folders[element.toLocaleLowerCase()] = "/resources/views/vendor/" + element;
            }
        });
    }
    return folders;
}
//# sourceMappingURL=util.js.map