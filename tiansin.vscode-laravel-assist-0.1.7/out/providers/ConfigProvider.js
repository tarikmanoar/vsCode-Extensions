"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const vscode_1 = require("vscode");
const completion_1 = __importDefault(require("../completion"));
class ConfigProvider {
    static parse(obj) {
        function rawParse(obj, prefix) {
            let result = [];
            for (const key in obj) {
                const value = obj[key];
                const name = prefix ? `${prefix}.${key}` : key;
                if (value instanceof Array) {
                    result.push({ name: name, value: "array(...)" });
                }
                else if (value instanceof Object) {
                    result.push({ name: name, value: "array(...)" });
                    result = result.concat(rawParse(value, name));
                }
                else {
                    result.push({ name: name, value: value });
                }
            }
            return result;
        }
        ConfigProvider.items = rawParse(obj);
    }
    createCompletionItem(item) {
        let completeItem = new vscode_1.CompletionItem(item.name, vscode_1.CompletionItemKind.Value);
        if (item.value)
            completeItem.detail = item.value.toString();
        return completeItem;
    }
    provideCompletionItems(document, position, token, context) {
        let completionItems = [];
        let complete = new completion_1.default({
            Config: {
                get: 0,
                set: 0,
                has: 0,
                prepend: 0,
                push: 0,
            }
        }, {
            config: 0
        });
        if (complete.allowCompletion(document, position)) {
            for (let item of ConfigProvider.items) {
                let completeItem = this.createCompletionItem(item);
                completeItem.range = document.getWordRangeAtPosition(position, ConfigProvider.wordPattern);
                completionItems.push(completeItem);
            }
        }
        return completionItems;
    }
}
ConfigProvider.items = [];
ConfigProvider.wordPattern = /[\w\-_\.\:\/]+/g;
module.exports = ConfigProvider;
//# sourceMappingURL=ConfigProvider.js.map