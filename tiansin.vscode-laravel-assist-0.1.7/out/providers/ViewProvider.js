"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
const vscode_1 = require("vscode");
const helpers_1 = require("../helpers");
const completion_1 = __importDefault(require("../completion"));
class ViewProvider {
    static parse(obj) {
        ViewProvider.items = [];
        for (const path of obj.paths) {
            ViewProvider.getViews(path);
        }
        for (const namespace in obj.views) {
            for (const path of obj.views[namespace]) {
                ViewProvider.getViews(path, namespace);
            }
        }
    }
    static getViews(base, namespace) {
        helpers_1.walk(base, (fullPath) => {
            if (fullPath.endsWith(ViewProvider.bladeSuffix)) {
                let fileName = path_1.default.relative(base, fullPath);
                fileName = fileName.replace(ViewProvider.bladeSuffix, '');
                fileName = fileName.replace('/', '.');
                if (namespace) {
                    ViewProvider.items.push({
                        name: `${namespace}::${fileName}`,
                        path: fullPath,
                    });
                }
                else {
                    ViewProvider.items.push({
                        name: fileName,
                        path: fullPath,
                    });
                }
            }
        });
    }
    createCompletionItem(item) {
        let completeItem = new vscode_1.CompletionItem(item.name, vscode_1.CompletionItemKind.Value);
        if (item.path)
            completeItem.detail = item.path;
        return completeItem;
    }
    provideCompletionItems(document, position, token, context) {
        let completionItems = [];
        let complete = new completion_1.default({
            View: {}
        }, {
            view: 0,
            links: 0,
        }, {
            "@extends": 0,
            "@component": 0,
            "@include": 0,
            "@each": 0,
        });
        if (complete.allowCompletion(document, position)) {
            for (let item of ViewProvider.items) {
                let completeItem = this.createCompletionItem(item);
                completeItem.range = document.getWordRangeAtPosition(position, ViewProvider.wordPattern);
                completionItems.push(completeItem);
            }
        }
        return completionItems;
    }
}
ViewProvider.items = [];
ViewProvider.bladeSuffix = ".blade.php";
ViewProvider.wordPattern = /[\w\-_\.\:\/]+/g;
module.exports = ViewProvider;
//# sourceMappingURL=ViewProvider.js.map