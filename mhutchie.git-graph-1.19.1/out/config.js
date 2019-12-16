"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class Config {
    constructor() {
        this.config = vscode.workspace.getConfiguration('git-graph');
    }
    autoCenterCommitDetailsView() {
        return !!this.config.get('autoCenterCommitDetailsView', true);
    }
    combineLocalAndRemoteBranchLabels() {
        return !!this.config.get('combineLocalAndRemoteBranchLabels', true);
    }
    commitDetailsViewLocation() {
        return this.config.get('commitDetailsViewLocation', 'Inline') === 'Docked to Bottom'
            ? 1
            : 0;
    }
    commitOrdering() {
        const ordering = this.config.get('commitOrdering', 'date');
        return ordering === 'author-date'
            ? "author-date"
            : ordering === 'topo'
                ? "topo"
                : "date";
    }
    contextMenuActionsVisibility() {
        let userConfig = this.config.get('contextMenuActionsVisibility', {});
        let config = {
            branch: { checkout: true, rename: true, delete: true, merge: true, rebase: true, push: true, copyName: true },
            commit: { addTag: true, createBranch: true, checkout: true, cherrypick: true, revert: true, drop: true, merge: true, rebase: true, reset: true, copyHash: true },
            remoteBranch: { checkout: true, delete: true, fetch: true, pull: true, copyName: true },
            stash: { apply: true, createBranch: true, pop: true, drop: true, copyName: true, copyHash: true },
            tag: { viewDetails: true, delete: true, push: true, copyName: true },
            uncommittedChanges: { stash: true, reset: true, clean: true, openSourceControlView: true }
        };
        mergeConfigObjects(config, userConfig);
        return config;
    }
    customBranchGlobPatterns() {
        let inPatterns = this.config.get('customBranchGlobPatterns', []);
        let outPatterns = [];
        for (let i = 0; i < inPatterns.length; i++) {
            if (typeof inPatterns[i].name === 'string' && typeof inPatterns[i].glob === 'string') {
                outPatterns.push({ name: inPatterns[i].name, glob: '--glob=' + inPatterns[i].glob });
            }
        }
        return outPatterns;
    }
    customEmojiShortcodeMappings() {
        let inMappings = this.config.get('customEmojiShortcodeMappings', []);
        let outMappings = [];
        for (let i = 0; i < inMappings.length; i++) {
            if (typeof inMappings[i].shortcode === 'string' && typeof inMappings[i].emoji === 'string') {
                outMappings.push({ shortcode: inMappings[i].shortcode, emoji: inMappings[i].emoji });
            }
        }
        return outMappings;
    }
    dateFormat() {
        let configValue = this.config.get('dateFormat', 'Date & Time'), type = 0, iso = false;
        if (configValue === 'Relative') {
            type = 2;
        }
        else {
            if (configValue.endsWith('Date Only'))
                type = 1;
            if (configValue.startsWith('ISO'))
                iso = true;
        }
        return { type: type, iso: iso };
    }
    dateType() {
        return this.config.get('dateType', 'Author Date') === 'Commit Date'
            ? 1
            : 0;
    }
    defaultColumnVisibility() {
        let obj = this.config.get('defaultColumnVisibility', {});
        if (typeof obj === 'object' && obj !== null && typeof obj['Date'] === 'boolean' && typeof obj['Author'] === 'boolean' && typeof obj['Commit'] === 'boolean') {
            return { author: obj['Author'], commit: obj['Commit'], date: obj['Date'] };
        }
        else {
            return { author: true, commit: true, date: true };
        }
    }
    defaultFileViewType() {
        return this.config.get('defaultFileViewType', 'File Tree') === 'File List'
            ? 2
            : 1;
    }
    dialogDefaults() {
        let resetCommitMode = this.config.get('dialog.resetCurrentBranchToCommit.mode', 'Mixed');
        let resetUncommittedMode = this.config.get('dialog.resetUncommittedChanges.mode', 'Mixed');
        return {
            addTag: {
                pushToRemote: !!this.config.get('dialog.addTag.pushToRemote', false),
                type: this.config.get('dialog.addTag.type', 'Annotated') === 'Lightweight' ? 'lightweight' : 'annotated'
            },
            applyStash: {
                reinstateIndex: !!this.config.get('dialog.applyStash.reinstateIndex', false)
            },
            createBranch: {
                checkout: !!this.config.get('dialog.createBranch.checkOut', false)
            },
            deleteBranch: {
                forceDelete: !!this.config.get('dialog.deleteBranch.forceDelete', false)
            },
            merge: {
                noFastForward: !!this.config.get('dialog.merge.noFastForward', true),
                squash: !!this.config.get('dialog.merge.squashCommits', false)
            },
            popStash: {
                reinstateIndex: !!this.config.get('dialog.popStash.reinstateIndex', false)
            },
            rebase: {
                ignoreDate: !!this.config.get('dialog.rebase.ignoreDate', true),
                interactive: !!this.config.get('dialog.rebase.launchInteractiveRebase', false)
            },
            resetCommit: {
                mode: resetCommitMode === 'Soft' ? "soft" : (resetCommitMode === 'Hard' ? "hard" : "mixed")
            },
            resetUncommitted: {
                mode: resetUncommittedMode === 'Hard' ? "hard" : "mixed"
            },
            stashUncommittedChanges: {
                includeUntracked: !!this.config.get('dialog.stashUncommittedChanges.includeUntracked', true)
            }
        };
    }
    fetchAndPrune() {
        return !!this.config.get('fetchAndPrune', false);
    }
    fetchAvatars() {
        return !!this.config.get('fetchAvatars', false);
    }
    fileEncoding() {
        return this.config.get('fileEncoding', 'utf8');
    }
    graphColours() {
        return this.config.get('graphColours', ['#0085d9', '#d9008f', '#00d90a', '#d98500', '#a300d9', '#ff0000'])
            .filter((v) => v.match(/^\s*(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8}|rgb[a]?\s*\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\))\s*$/) !== null);
    }
    graphStyle() {
        return this.config.get('graphStyle', 'rounded') === 'angular'
            ? 1
            : 0;
    }
    initialLoadCommits() {
        return this.config.get('initialLoadCommits', 300);
    }
    integratedTerminalShell() {
        return this.config.get('integratedTerminalShell', '');
    }
    loadMoreCommits() {
        return this.config.get('loadMoreCommits', 75);
    }
    maxDepthOfRepoSearch() {
        return this.config.get('maxDepthOfRepoSearch', 0);
    }
    muteMergeCommits() {
        return !!this.config.get('muteMergeCommits', true);
    }
    openDiffTabLocation() {
        return this.config.get('openDiffTabLocation', 'Active') === 'Active' ? vscode.ViewColumn.Active : vscode.ViewColumn.Beside;
    }
    openToTheRepoOfTheActiveTextEditorDocument() {
        return this.config.get('openToTheRepoOfTheActiveTextEditorDocument', false);
    }
    refLabelAlignment() {
        let configValue = this.config.get('referenceLabelAlignment', 'Normal');
        return configValue === 'Branches (on the left) & Tags (on the right)'
            ? 1
            : configValue === 'Branches (aligned to the graph) & Tags (on the right)'
                ? 2
                : 0;
    }
    retainContextWhenHidden() {
        return !!this.config.get('retainContextWhenHidden', true);
    }
    showCommitsOnlyReferencedByTags() {
        return !!this.config.get('showCommitsOnlyReferencedByTags', true);
    }
    showCurrentBranchByDefault() {
        return !!this.config.get('showCurrentBranchByDefault', false);
    }
    showStatusBarItem() {
        return !!this.config.get('showStatusBarItem', true);
    }
    showTags() {
        return !!this.config.get('showTags', true);
    }
    showUncommittedChanges() {
        return !!this.config.get('showUncommittedChanges', true);
    }
    tabIconColourTheme() {
        return this.config.get('tabIconColourTheme', 'colour') === 'grey'
            ? 1
            : 0;
    }
    useMailmap() {
        return !!this.config.get('useMailmap', false);
    }
    gitPath() {
        return vscode.workspace.getConfiguration('git').get('path', null);
    }
}
function getConfig() {
    return new Config();
}
exports.getConfig = getConfig;
function mergeConfigObjects(base, user) {
    if (typeof base !== typeof user)
        return;
    let keys = Object.keys(base);
    for (let i = 0; i < keys.length; i++) {
        if (typeof base[keys[i]] === 'object') {
            if (typeof user[keys[i]] === 'object') {
                mergeConfigObjects(base[keys[i]], user[keys[i]]);
            }
        }
        else if (typeof user[keys[i]] === typeof base[keys[i]]) {
            base[keys[i]] = user[keys[i]];
        }
    }
}
//# sourceMappingURL=config.js.map