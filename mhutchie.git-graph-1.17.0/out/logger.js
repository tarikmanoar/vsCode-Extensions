"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class Logger {
    constructor() {
        this.channel = vscode.window.createOutputChannel('Git Graph');
    }
    dispose() {
        this.channel.dispose();
    }
    log(message) {
        this.channel.appendLine(timestamp() + message);
    }
    logCmd(cmd, args) {
        this.channel.appendLine(timestamp() + '> ' + cmd + ' ' + args.join(' ').replace(/--format=[^ ]+/, '--format=...'));
    }
    logError(message) {
        this.channel.appendLine(timestamp() + 'ERROR: ' + message);
    }
}
exports.Logger = Logger;
function timestamp() {
    const date = new Date();
    return '[' + date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate()) + ' ' + pad2(date.getHours()) + ':' + pad2(date.getMinutes()) + ':' + pad2(date.getSeconds()) + '.' + pad3(date.getMilliseconds()) + '] ';
}
function pad2(i) {
    return (i > 9 ? '' : '0') + i;
}
function pad3(i) {
    return (i > 99 ? '' : i > 9 ? '0' : '00') + i;
}
function maskEmail(email) {
    return email.substring(0, email.indexOf('@')) + '@*****';
}
exports.maskEmail = maskEmail;
//# sourceMappingURL=logger.js.map