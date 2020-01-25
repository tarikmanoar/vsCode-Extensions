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
const vscode = require("vscode");
const utils_1 = require("./utils");
const FILE_CHANGE_REGEX = /(^\.git\/(config|index|HEAD|refs\/stash|refs\/heads\/.*|refs\/remotes\/.*|refs\/tags\/.*)$)|(^(?!\.git).*$)|(^\.git[^\/]+$)/;
class RepoFileWatcher {
    constructor(logger, repoChangeCallback) {
        this.repo = null;
        this.fsWatcher = null;
        this.refreshTimeout = null;
        this.muted = false;
        this.resumeAt = 0;
        this.logger = logger;
        this.repoChangeCallback = repoChangeCallback;
    }
    start(repo) {
        if (this.fsWatcher !== null) {
            this.stop();
        }
        this.repo = repo;
        this.fsWatcher = vscode.workspace.createFileSystemWatcher(repo + '/**');
        this.fsWatcher.onDidCreate(uri => this.refresh(uri));
        this.fsWatcher.onDidChange(uri => this.refresh(uri));
        this.fsWatcher.onDidDelete(uri => this.refresh(uri));
        this.logger.log('Started watching repo: ' + repo);
    }
    stop() {
        if (this.fsWatcher !== null) {
            this.fsWatcher.dispose();
            this.fsWatcher = null;
            this.logger.log('Stopped watching repo: ' + this.repo);
        }
        if (this.refreshTimeout !== null) {
            clearTimeout(this.refreshTimeout);
            this.refreshTimeout = null;
        }
    }
    mute() {
        this.muted = true;
    }
    unmute() {
        this.muted = false;
        this.resumeAt = (new Date()).getTime() + 1500;
    }
    refresh(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.muted)
                return;
            if (!utils_1.getPathFromUri(uri).replace(this.repo + '/', '').match(FILE_CHANGE_REGEX))
                return;
            if ((new Date()).getTime() < this.resumeAt)
                return;
            if (this.refreshTimeout !== null) {
                clearTimeout(this.refreshTimeout);
            }
            this.refreshTimeout = setTimeout(() => {
                this.repoChangeCallback();
            }, 750);
        });
    }
}
exports.RepoFileWatcher = RepoFileWatcher;
//# sourceMappingURL=repoFileWatcher.js.map