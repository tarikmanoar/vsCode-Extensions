"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const utils_1 = require("./utils");
function addGitRepository(gitExecutable, repoManager) {
    if (gitExecutable === null) {
        vscode.window.showErrorMessage(utils_1.UNABLE_TO_FIND_GIT_MSG);
        return;
    }
    vscode.window.showOpenDialog({ canSelectFiles: false, canSelectFolders: true, canSelectMany: false }).then(uris => {
        if (uris && uris.length > 0) {
            let path = utils_1.getPathFromUri(uris[0]);
            if (utils_1.isPathInWorkspace(path)) {
                repoManager.registerRepo(path, false).then(status => {
                    if (status.error === null) {
                        vscode.window.showInformationMessage('The repository "' + status.root + '" was added to Git Graph.');
                    }
                    else {
                        vscode.window.showErrorMessage(status.error + ' Therefore it could not be added to Git Graph.');
                    }
                });
            }
            else {
                vscode.window.showErrorMessage('The folder "' + path + '" is not within the opened Visual Studio Code workspace, and therefore could not be added to Git Graph.');
            }
        }
    }, () => { });
}
exports.addGitRepository = addGitRepository;
function removeGitRepositoy(gitExecutable, repoManager) {
    if (gitExecutable === null) {
        vscode.window.showErrorMessage(utils_1.UNABLE_TO_FIND_GIT_MSG);
        return;
    }
    let repoPaths = Object.keys(repoManager.getRepos());
    let items = repoPaths.map(path => ({ label: utils_1.getRepoName(path), description: path }));
    vscode.window.showQuickPick(items, { canPickMany: false, placeHolder: 'Select a repository to remove from Git Graph' }).then((item) => {
        if (item && item.description !== undefined) {
            if (repoManager.ignoreRepo(item.description)) {
                vscode.window.showInformationMessage('The repository "' + item.label + '" was removed from Git Graph.');
            }
            else {
                vscode.window.showErrorMessage('The repository "' + item.label + '" is not known to Git Graph.');
            }
        }
    }, () => { });
}
exports.removeGitRepositoy = removeGitRepositoy;
//# sourceMappingURL=commands.js.map