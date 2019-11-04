"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vscode_1 = require("vscode");
const helpers_1 = require("../helpers");
const laravel_1 = __importDefault(require("../laravel"));
class ControllerLink extends vscode_1.DocumentLink {
    constructor(range, script, controller, method) {
        super(range);
        this.script = script;
        this.controller = controller;
        this.method = method;
    }
}
class ControllerProvider {
    static parse(obj) {
        let result = [];
        for (const iter of obj) {
            result.push({
                baseName: iter.base,
                fullName: iter.full,
                method: iter.method,
                script: iter.script,
            });
        }
        ControllerProvider.items = result;
    }
    parseAction(action) {
        let split = action.split('@');
        let Controller, Method = null;
        if (split.length === 2) {
            Method = split[1];
            Controller = split[0];
        }
        else {
            Controller = action;
        }
        return { Controller, Method };
    }
    basename(namespace) {
        return namespace.split('\\').reverse()[0];
    }
    getControllerPath(workspacePath, controller) {
        for (const iter of ControllerProvider.items) {
            if (iter.baseName === controller ||
                this.basename(iter.fullName) === this.basename(controller)) {
                return iter.script;
            }
        }
        let configuration = vscode_1.workspace.getConfiguration('LaravelAssist');
        let pathControllers = configuration.get('pathControllers');
        if (Array.isArray(pathControllers)) {
            for (const iter of pathControllers) {
                let script = path_1.default.join(workspacePath, iter, controller);
                if (path_1.default.isAbsolute(iter)) {
                    script = path_1.default.join(iter, controller);
                }
                script += ".php";
                if (fs_1.default.existsSync(script)) {
                    return script;
                }
            }
        }
    }
    getMethodPosition(document, methodName) {
        let pattern = new RegExp(`function\\s+${methodName}\\s*\\(([^)]*)`);
        let result = pattern.exec(document.getText());
        if (result) {
            return document.positionAt(result.index);
        }
    }
    getClassPosition(document, className) {
        let pattern = new RegExp(`class\\s+${className}\\s+`);
        let result = pattern.exec(document.getText());
        if (result) {
            return document.positionAt(result.index);
        }
    }
    getPosition(document, Controller, Method) {
        if (Method) {
            let position = this.getMethodPosition(document, Method);
            if (position)
                return position;
        }
        return this.getClassPosition(document, Controller) || new vscode_1.Position(0, 0);
    }
    provideHover(document, position, token) {
        let linkRange = document.getWordRangeAtPosition(position, ControllerProvider.controllerPattern);
        if (linkRange) {
            let action = helpers_1.trim(document.getText(linkRange), ["'", '"']);
            const { Controller } = this.parseAction(action);
            const workspacePath = laravel_1.default.workspacePath();
            if (workspacePath) {
                const script = this.getControllerPath(workspacePath, Controller);
                if (script)
                    return new vscode_1.Hover(path_1.default.relative(workspacePath, script));
            }
        }
    }
    provideDefinition(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let linkRange = document.getWordRangeAtPosition(position, ControllerProvider.controllerPattern);
            if (linkRange) {
                let action = helpers_1.trim(document.getText(linkRange), ["'", '"']);
                const { Controller, Method } = this.parseAction(action);
                const workspacePath = laravel_1.default.workspacePath();
                if (workspacePath) {
                    const script = this.getControllerPath(workspacePath, Controller);
                    if (script) {
                        let target = vscode_1.Uri.file(script);
                        let document = yield vscode_1.workspace.openTextDocument(script);
                        let position = this.getPosition(document, Controller, Method);
                        return new vscode_1.Location(target, position);
                    }
                }
            }
        });
    }
    provideDocumentLinks(document, token) {
        let links = [];
        let fullText = document.getText();
        let result;
        let pattern = new RegExp(ControllerProvider.controllerPattern, 'g');
        const workspacePath = laravel_1.default.workspacePath();
        if (workspacePath) {
            while (result = pattern.exec(fullText)) {
                const action = helpers_1.trim(result[0], ["'", '"']);
                const line = document.positionAt(result.index);
                const { Controller, Method } = this.parseAction(action);
                const script = this.getControllerPath(workspacePath, Controller);
                if (script) {
                    const start = new vscode_1.Position(line.line, line.character + 1);
                    const end = new vscode_1.Position(line.line, start.character + action.length);
                    const linkRange = new vscode_1.Range(start, end);
                    links.push(new ControllerLink(linkRange, script, Controller, Method));
                }
            }
        }
        return links;
    }
    resolveDocumentLink(link, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let target = vscode_1.Uri.file(link.script);
            let document = yield vscode_1.workspace.openTextDocument(target);
            let position = this.getPosition(document, link.controller, link.method);
            link.target = vscode_1.Uri.parse(`file:${link.script}#${position.line + 1}`);
            return link;
        });
    }
    provideCompletionItems(document, position, token, context) {
        let completionItems = [];
        return completionItems;
    }
}
ControllerProvider.items = [];
ControllerProvider.controllerPattern = /(['"])[\w\\]*Controller(@\w+)?\1/;
module.exports = ControllerProvider;
//# sourceMappingURL=ControllerProvider.js.map