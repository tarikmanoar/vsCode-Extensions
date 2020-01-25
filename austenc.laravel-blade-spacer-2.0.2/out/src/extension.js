'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function activate(context) {
    let spacer = new Spacer();
    let controller = new SpacerController(spacer);
    context.subscriptions.push(spacer);
    context.subscriptions.push(controller);
}
exports.activate = activate;
class Spacer {
    measurements(document, selection) {
        return {
            start: selection.start,
            end: selection.end,
            selected: document.getText(new vscode_1.Range(selection.start, selection.end)),
            firstChar: document.getText(new vscode_1.Range(selection.start, new vscode_1.Position(selection.start.line, selection.start.character + 1))),
            twoBefore: document.getText(new vscode_1.Range(new vscode_1.Position(selection.start.line, Math.max(selection.start.character - 2, 0)), selection.start)),
            threeBefore: document.getText(new vscode_1.Range(new vscode_1.Position(selection.start.line, Math.max(selection.start.character - 3, 0)), selection.start)),
            fourBefore: document.getText(new vscode_1.Range(new vscode_1.Position(selection.start.line, Math.max(selection.start.character - 4, 0)), selection.start)),
            charAfter: document.getText(new vscode_1.Range(selection.end, new vscode_1.Position(selection.end.line, selection.end.character + 1))),
            twoAfter: document.getText(new vscode_1.Range(selection.end, new vscode_1.Position(selection.end.line, selection.end.character + 2))),
        };
    }
    space(editor) {
        let selections = editor.selections;
        let document = editor.document;
        let tagType = '';
        let offsetEnd = 2;
        for (let i = 0; i < selections.length; i++) {
            let s = this.measurements(document, selections[i]);
            if (s.twoBefore === '{{' && s.firstChar !== ' ' && s.twoAfter !== '--') {
                tagType = 'double';
                if (s.twoAfter !== '}}') {
                    offsetEnd = 0;
                }
            }
            if (s.fourBefore === '{{ {' && s.firstChar !== ' ') {
                tagType = 'triple';
            }
            if (s.threeBefore === '{!!' && s.firstChar !== ' ') {
                tagType = 'unescaped';
                offsetEnd = 1;
                if (s.charAfter !== '}') {
                    offsetEnd = 0;
                }
            }
            if (s.fourBefore === '{{ -' && s.firstChar === ' ') {
                tagType = 'comment';
            }
        }
        if (tagType === 'double') {
            let allRanges = selections.map(value => {
                return new vscode_1.Range(value.start.line, value.start.character - 2, value.end.line, value.end.character + offsetEnd);
            });
            editor.insertSnippet(new vscode_1.SnippetString("{{ ${1:${TM_SELECTED_TEXT/[\{\}\ ]/$1/g}} }}$0"), allRanges);
        }
        if (tagType === 'doubleWithoutEnd') {
            let allRanges = selections.map(value => {
                return new vscode_1.Range(value.start.line, value.start.character - 2, value.end.line, value.end.character);
            });
            editor.insertSnippet(new vscode_1.SnippetString("{{ ${1:${TM_SELECTED_TEXT/[\{\}\ ]/$1/g}} }}$0"), allRanges);
        }
        if (tagType === 'triple') {
            let allRanges = selections.map(value => {
                return new vscode_1.Range(value.start.line, value.start.character - 4, value.end.line, value.end.character + 4);
            });
            editor.insertSnippet(new vscode_1.SnippetString("{{{ ${1:${TM_SELECTED_TEXT/[\{\}\ ]/$1/g}} }}}$0"), allRanges);
        }
        if (tagType === 'unescaped') {
            let allRanges = selections.map(value => {
                return new vscode_1.Range(value.start.line, value.start.character - 3, value.end.line, value.end.character + offsetEnd);
            });
            editor.insertSnippet(new vscode_1.SnippetString("{!! ${1:${TM_SELECTED_TEXT/[!\{\}\ ]/$1/g}} !!}$0"), allRanges);
        }
        if (tagType === 'comment') {
            let allRanges = selections.map(value => {
                return new vscode_1.Range(value.start.line, value.start.character - 4, value.end.line, value.end.character + 3);
            });
            editor.insertSnippet(new vscode_1.SnippetString("{{-- ${1:${TM_SELECTED_TEXT/[\-\{\}\ ]/$1/g}} --}}$0"), allRanges, { undoStopBefore: false, undoStopAfter: true });
        }
    }
    dispose() {
    }
}
class SpacerController {
    constructor(spacer) {
        this.spacer = spacer;
        let subscriptions = [];
        vscode_1.window.onDidChangeTextEditorSelection(this.onEvent, this, subscriptions);
        vscode_1.window.onDidChangeActiveTextEditor(this.onEvent, this, subscriptions);
        this.disposable = vscode_1.Disposable.from(...subscriptions);
    }
    onEvent() {
        const editor = vscode_1.window.activeTextEditor;
        if (editor) {
            this.spacer.space(editor);
        }
    }
    dispose() {
        this.disposable.dispose();
    }
}
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map