"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prettier_1 = require("prettier");
const vscode_1 = require("vscode");
const errorHandler_1 = require("./errorHandler");
function formatDocument(document) {
    return __awaiter(this, void 0, void 0, function* () {
        const workspaceConfiguration = vscode_1.workspace.getConfiguration('scssFormatter');
        const rawDocumentText = document.getText();
        const { fileName, languageId } = document;
        const options = Object.assign(Object.assign({}, Object.assign({}, workspaceConfiguration)), { parser: languageId });
        return errorHandler_1.safeExecution(() => prettier_1.format(rawDocumentText, options), rawDocumentText, fileName);
    });
}
// get range for the current document
function fullDocumentRange(document) {
    const rangeStart = document.lineAt(0).range.start;
    const rangeEnd = document.lineAt(document.lineCount - 1).range.end;
    return new vscode_1.Range(rangeStart, rangeEnd);
}
class SCSSFormatter {
    provideDocumentFormattingEdits(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const formattedDocument = yield formatDocument(document);
            return [vscode_1.TextEdit.replace(fullDocumentRange(document), formattedDocument)];
        });
    }
}
exports.SCSSFormatter = SCSSFormatter;
//# sourceMappingURL=FormatterProvider.js.map