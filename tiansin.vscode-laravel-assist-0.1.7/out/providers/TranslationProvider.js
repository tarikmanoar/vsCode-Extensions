"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const vscode_1 = require("vscode");
const completion_1 = __importDefault(require("../completion"));
class TranslationProvider {
    static parse(obj) {
        function rawParse(obj, prefix) {
            let result = [];
            for (const key in obj) {
                const value = obj[key];
                const name = prefix ? `${prefix}.${key}` : key;
                if (value instanceof Object) {
                    result.push({ name: name, value: "array(...)" });
                    result = result.concat(rawParse(value, name));
                }
                else {
                    result.push({ name: name, value: value });
                }
            }
            return result;
        }
        TranslationProvider.items = rawParse(obj);
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
            Lang: {
                has: 0,
                trans: 0,
                get: 0,
                getFromJson: 0,
                hasForLocale: 0,
                transChoice: 0,
                choice: 0,
            }
        }, {
            __: 0,
            trans: 0,
            trans_choice: 0,
        }, {
            '@lang': 0,
        });
        if (complete.allowCompletion(document, position)) {
            for (let item of TranslationProvider.items) {
                let completeItem = this.createCompletionItem(item);
                completeItem.range = document.getWordRangeAtPosition(position, TranslationProvider.wordPattern);
                completionItems.push(completeItem);
            }
        }
        return completionItems;
    }
}
TranslationProvider.items = [];
TranslationProvider.wordPattern = /[\w\-_\.\:\/]+/g;
module.exports = TranslationProvider;
//# sourceMappingURL=TranslationProvider.js.map