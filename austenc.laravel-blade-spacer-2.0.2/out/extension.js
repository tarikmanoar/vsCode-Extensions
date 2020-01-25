'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function activate(context) {
    const triggers = ['{}', '!', '-', '{'];
    const expressions = [
        /({{)([^\s].*?)?(}})/,
        /({!!)(.*?)?(})/,
        /({{[\s]?--)(.*?)?(}})/
    ];
    const spacer = new Spacer();
    let tagType = -1;
    context.subscriptions.push(vscode_1.workspace.onDidChangeTextDocument(e => {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let ranges = [];
        let offsets = [];
        // changes (per line) come in right-to-left when we need them left-to-right
        e.contentChanges.slice().reverse().forEach(change => {
            if (triggers.indexOf(change.text) !== -1) {
                if (!offsets[change.range.start.line]) {
                    offsets[change.range.start.line] = 0;
                }
                let start = change.range.start.translate(0, offsets[change.range.start.line] -
                    spacer.charsForChange(e.document, change));
                let lineEnd = e.document.lineAt(start.line).range.end;
                for (let i = 0; i < expressions.length; i++) {
                    // if we typed a - or a !, don't consider the "double" tag type
                    if (['-', '!'].indexOf(change.text) !== -1 &&
                        i === spacer.TAG_DOUBLE) {
                        continue;
                    }
                    let tag = expressions[i].exec(e.document.getText(new vscode_1.Range(start, lineEnd)));
                    if (tag) {
                        tagType = i;
                        ranges.push(new vscode_1.Range(start, start.translate(0, tag[0].length)));
                        offsets[start.line] += tag[1].length;
                    }
                }
            }
        });
        if (ranges.length > 0) {
            spacer.replace(editor, tagType, ranges);
            ranges = [];
            tagType = -1;
        }
    }));
}
exports.activate = activate;
class Spacer {
    constructor() {
        this.TAG_DOUBLE = 0;
        this.TAG_UNESCAPED = 1;
        this.TAG_COMMENT = 2;
    }
    charsForChange(doc, change) {
        if (change.text === '!') {
            return 2;
        }
        else if (change.text === '-') {
            let textRange = doc.getText(new vscode_1.Range(change.range.start.translate(0, -2), change.range.start.translate(0, -1)));
            if (textRange === ' ') {
                return 4;
            }
            return 3;
        }
        return 1;
    }
    replace(editor, tagType, ranges) {
        if (tagType === this.TAG_DOUBLE) {
            editor.insertSnippet(new vscode_1.SnippetString('{{ ${1:${TM_SELECTED_TEXT/[{}]//g}} }}$0'), ranges);
        }
        else if (tagType === this.TAG_UNESCAPED) {
            editor.insertSnippet(new vscode_1.SnippetString('{!! ${1:${TM_SELECTED_TEXT/[{} !]//g}} !!}$0'), ranges);
        }
        else if (tagType === this.TAG_COMMENT) {
            editor.insertSnippet(new vscode_1.SnippetString('{{-- ${1:${TM_SELECTED_TEXT/(--)|[{} ]//g}} --}}$0'), ranges);
        }
    }
}
//# sourceMappingURL=extension.js.map