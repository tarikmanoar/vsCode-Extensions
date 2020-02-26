"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const utils_1 = require("./utils");
let statusBarItem;
let outputChannel;
function checkForInConsoleTabSwitch(editor) {
    // output and debug console is also seen as an editor
    // hence switching tabs will trigger the function
    // this prevents hiding statusBarItem when switching between tabs
    return ['debug', 'output'].some((part) => editor.document.uri.scheme === part);
}
// toggle statusBarItem when document changes
function toggleStatusBarItem(editor) {
    if (!statusBarItem) {
        return;
    }
    if (editor !== undefined) {
        if (checkForInConsoleTabSwitch(editor)) {
            return;
        }
        // hide statusBarItem if document changes and doesn't match supported languages
        const score = vscode_1.languages.match(utils_1.supportedLanguages, editor.document);
        score ? statusBarItem.show() : statusBarItem.hide();
    }
    else {
        statusBarItem.hide();
    }
}
// add filepath to the output message
function addFilePathToMesssage(message, fileName) {
    const lines = message.split('\n');
    if (lines.length > 0) {
        lines[0] = lines[0].replace(/(\d*):(\d*)/g, `${fileName}:$1:$2`);
        return lines.join('\n');
    }
    return message;
}
// add message to the output channel
function addToOutput(message) {
    const title = `${new Date().toLocaleString()}:`;
    // Create a sort of title, to differentiate between messages
    outputChannel.appendLine(title);
    outputChannel.appendLine('-'.repeat(title.length));
    // Append actual output
    outputChannel.appendLine(`${message}\n`);
}
// update statusBarItem text and tooltip
function updateStatusBarItem(message) {
    statusBarItem.text = message;
    statusBarItem.show();
}
/**
 * Runs prettier and updates the status on the statusbarItem
 *
 * @param cb callback function to execute prettier
 * @param rawDocumentText unformatted source document
 * @param fileName name/path of the file formatted
 *
 * @returns {string} string with either formatted/raw document
 */
function safeExecution(cb, rawDocumentText, fileName) {
    try {
        const returnValue = cb();
        addToOutput(`${fileName} : Formatted Successfully`);
        updateStatusBarItem(`${utils_1.EXTENSION_NAME}: $(check)`);
        return returnValue;
    }
    catch (err) {
        addToOutput(addFilePathToMesssage(err.message, fileName));
        updateStatusBarItem(`${utils_1.EXTENSION_NAME}: $(x)`);
        return rawDocumentText;
    }
}
exports.safeExecution = safeExecution;
/**
 * Setup the output channel and the statusBarItem.
 * Create a command to show the output channel when statusbarItem is clicked
 *
 * @returns {Disposable} The command to open the output channel
 */
function setupErrorHandler() {
    // Setup the statusBarItem
    statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, -1);
    statusBarItem.text = utils_1.EXTENSION_NAME;
    statusBarItem.tooltip = `${utils_1.EXTENSION_NAME}: v${utils_1.EXTENSION_VERSION}`;
    statusBarItem.command = 'scss-formatter.open-output';
    toggleStatusBarItem(vscode_1.window.activeTextEditor);
    // Setup the outputChannel
    outputChannel = vscode_1.window.createOutputChannel(utils_1.EXTENSION_NAME);
    return [
        vscode_1.commands.registerCommand('scss-formatter.open-output', () => {
            outputChannel.show();
        }),
        vscode_1.commands.registerCommand('scss-formatter.show-output', () => {
            outputChannel.show();
        }),
        vscode_1.commands.registerCommand('scss-formatter.clear-output', () => {
            statusBarItem.text = utils_1.EXTENSION_NAME;
            outputChannel.clear();
        })
    ];
}
exports.setupErrorHandler = setupErrorHandler;
function registerErrorHandlerDisposables() {
    return [
        // Keep track whether to show/hide the statusbar
        vscode_1.window.onDidChangeActiveTextEditor((editor) => {
            toggleStatusBarItem(editor);
        })
    ];
}
exports.registerErrorHandlerDisposables = registerErrorHandlerDisposables;
//# sourceMappingURL=errorHandler.js.map