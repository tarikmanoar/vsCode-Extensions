'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// This code is originally from https://github.com/DonJayamanne/bowerVSCode
// License: https://github.com/DonJayamanne/bowerVSCode/blob/master/LICENSE
const vscode_1 = require("vscode");
class ProgressIndicator {
    constructor() {
        this._tasks = [];
        this.progressText = ['|', '/', '-', '\\', '|', '/', '-', '\\'];
        this.progressCounter = 0;
        this._statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
    }
    beginTask(task) {
        this._tasks.push(task);
        this.displayProgressIndicator();
    }
    endTask(task) {
        if (this._tasks.length > 0) {
            this._tasks.pop();
        }
        this.setMessage();
    }
    setMessage() {
        if (this._tasks.length === 0) {
            this._statusBarItem.text = '';
            this.hideProgressIndicator();
            return;
        }
        this._statusBarItem.text = this._tasks[this._tasks.length - 1];
        this._statusBarItem.show();
    }
    displayProgressIndicator() {
        this.setMessage();
        this.hideProgressIndicator();
        this._interval = setInterval(() => this.onDisplayProgressIndicator(), 100);
    }
    hideProgressIndicator() {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = undefined;
        }
        this.progressCounter = 0;
    }
    onDisplayProgressIndicator() {
        if (this._tasks.length === 0) {
            return;
        }
        let txt = this.progressText[this.progressCounter];
        this._statusBarItem.text = this._tasks[this._tasks.length - 1] + ' ' + txt;
        this.progressCounter++;
        if (this.progressCounter >= this.progressText.length - 1) {
            this.progressCounter = 0;
        }
    }
}
exports.default = ProgressIndicator;

//# sourceMappingURL=progressIndicator.js.map
