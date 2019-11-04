"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const vscode_1 = require("vscode");
const laravel_1 = __importDefault(require("../laravel"));
const completion_1 = __importDefault(require("../completion"));
class MixProvider {
    static parse() {
        let result = [];
        let configuration = vscode_1.workspace.getConfiguration('LaravelAssist');
        let mix_manifest = configuration.get('mix-manifest');
        if (mix_manifest) {
            let filePath = laravel_1.default.workspacePath(mix_manifest);
            if (filePath && fs_1.default.existsSync(filePath)) {
                const mixes = JSON.parse(fs_1.default.readFileSync(filePath, { encoding: "utf8" }));
                for (const key in mixes) {
                    result.push({
                        path: key.startsWith('/') ? key.slice(1) : key,
                        value: mixes[key]
                    });
                }
            }
        }
        MixProvider.items = result;
    }
    createCompletionItem(item) {
        let completeItem = new vscode_1.CompletionItem(item.path, vscode_1.CompletionItemKind.Value);
        if (item.value)
            completeItem.detail = item.value;
        return completeItem;
    }
    provideCompletionItems(document, position, token, context) {
        let completionItems = [];
        let complete = new completion_1.default({}, {
            mix: 0,
            asset: 0,
        });
        if (complete.allowCompletion(document, position)) {
            for (let item of MixProvider.items) {
                let completeItem = this.createCompletionItem(item);
                completeItem.range = document.getWordRangeAtPosition(position, MixProvider.wordPattern);
                completionItems.push(completeItem);
            }
        }
        return completionItems;
    }
}
MixProvider.items = [];
MixProvider.wordPattern = /[\w\-_\.\:\/]+/g;
module.exports = MixProvider;
//# sourceMappingURL=MixProvider.js.map