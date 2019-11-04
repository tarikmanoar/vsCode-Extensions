"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const vscode_1 = require("vscode");
const completion_1 = __importDefault(require("../completion"));
class RouteProvider {
    static parse(obj) {
        let result = [];
        for (const i in obj) {
            const value = obj[i];
            result.push({
                name: value.name,
                action: value.action,
                method: value.method,
                parameters: value.parameters,
                uri: value.uri,
            });
        }
        RouteProvider.items = result;
    }
    createCompletionItem(item) {
        if (item.name) {
            let completeItem = new vscode_1.CompletionItem(item.name, vscode_1.CompletionItemKind.Value);
            completeItem.detail = `${item.action}\n\n${item.method}:${item.uri}`;
            return completeItem;
        }
    }
    provideCompletionItems(document, position, token, context) {
        let completionItems = [];
        let complete = new completion_1.default({
            URL: {
                route: 0,
                signedRoute: 0,
                temporarySignedRoute: 0,
            }
        }, {
            route: 0
        });
        if (complete.allowCompletion(document, position)) {
            for (let item of RouteProvider.items) {
                let completeItem = this.createCompletionItem(item);
                if (completeItem instanceof vscode_1.CompletionItem) {
                    completeItem.range = document.getWordRangeAtPosition(position, RouteProvider.wordPattern);
                    completionItems.push(completeItem);
                }
            }
        }
        return completionItems;
    }
}
RouteProvider.items = [];
RouteProvider.wordPattern = /[\w\-_\.\:\/]+/g;
module.exports = RouteProvider;
//# sourceMappingURL=RouteProvider.js.map