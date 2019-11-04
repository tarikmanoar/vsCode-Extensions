"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vscode_1 = require("vscode");
const helpers_1 = require("./helpers");
const laravel_1 = __importDefault(require("./laravel"));
const RouteProvider_1 = __importDefault(require("./providers/RouteProvider"));
const ConfigProvider_1 = __importDefault(require("./providers/ConfigProvider"));
const MixProvider_1 = __importDefault(require("./providers/MixProvider"));
const ViewProvider_1 = __importDefault(require("./providers/ViewProvider"));
const TranslationProvider_1 = __importDefault(require("./providers/TranslationProvider"));
const ControllerProvider_1 = __importDefault(require("./providers/ControllerProvider"));
let updateTimer;
let updatePending = false;
const which = require("which");
const configuration = vscode_1.workspace.getConfiguration('LaravelAssist');
function activate(context) {
    if (laravel_1.default.workspaceVerify()) {
        const cachePath = path_1.default.join(__dirname, './../assets/cache');
        fs_1.default.existsSync(cachePath) || helpers_1.mkdirsSync(cachePath);
        const fileName = helpers_1.randomString(8);
        const kernelPath = path_1.default.join(cachePath, fileName);
        fs_1.default.writeFileSync(kernelPath, laravel_1.default.getKernel());
        const config = vscode_1.workspace.getConfiguration('php');
        const executablePath = config.get('validate.executablePath') || which.sync('php', { nothrow: true });
        if (!fs_1.default.existsSync(executablePath))
            return vscode_1.window.showErrorMessage("Could not find php binary, configure 'validate.executablePath'");
        new laravel_1.default(kernelPath, executablePath);
        updateIntellisense();
        const LANGUAGES = [
            { scheme: 'file', language: 'php' },
            { scheme: 'file', language: 'blade' },
        ];
        const TRIGGER_CHARACTERS = `"'`;
        context.subscriptions.push(vscode_1.languages.registerCompletionItemProvider(LANGUAGES, new RouteProvider_1.default, ...TRIGGER_CHARACTERS));
        context.subscriptions.push(vscode_1.languages.registerCompletionItemProvider(LANGUAGES, new ConfigProvider_1.default, ...TRIGGER_CHARACTERS));
        context.subscriptions.push(vscode_1.languages.registerCompletionItemProvider(LANGUAGES, new MixProvider_1.default, ...TRIGGER_CHARACTERS));
        context.subscriptions.push(vscode_1.languages.registerCompletionItemProvider(LANGUAGES, new ViewProvider_1.default, ...TRIGGER_CHARACTERS));
        context.subscriptions.push(vscode_1.languages.registerCompletionItemProvider(LANGUAGES, new TranslationProvider_1.default, ...TRIGGER_CHARACTERS));
        context.subscriptions.push(vscode_1.languages.registerCompletionItemProvider(LANGUAGES, new ControllerProvider_1.default, ...TRIGGER_CHARACTERS));
        context.subscriptions.push(vscode_1.languages.registerHoverProvider(LANGUAGES, new ControllerProvider_1.default));
        const type = configuration.get('gotoController');
        if (type === "Definition") {
            context.subscriptions.push(vscode_1.languages.registerDefinitionProvider(LANGUAGES, new ControllerProvider_1.default));
        }
        else {
            context.subscriptions.push(vscode_1.languages.registerDocumentLinkProvider(LANGUAGES, new ControllerProvider_1.default));
        }
        let disposable = [];
        disposable[0] = vscode_1.commands.registerCommand('extension.updateIndexing', updateIntellisense);
        vscode_1.workspace.onDidSaveTextDocument(function (event) {
            if (isNeedUpdate(event.fileName)) {
                if (!updatePending) {
                    clearTimeout(updateTimer);
                    updateTimer = setTimeout(() => {
                        updatePending = true;
                        updateIntellisense();
                        updatePending = false;
                    }, 2000);
                }
            }
        });
    }
}
exports.activate = activate;
function isNeedUpdate(fileName) {
    return (fileName.endsWith("Controller.php") || fileName.endsWith(".blade.php") ||
        !!fileName.match(/\/config\/\w+\.php/) || !!fileName.match(/\/routes\/\w+\.php/) ||
        !!fileName.match(/\/lang\/\w+\.php/));
}
function updateIntellisense() {
    try {
        const data = laravel_1.default.runnerKernel();
        const result = helpers_1.tryParseJSON(data);
        if (result) {
            ConfigProvider_1.default.parse(result.config);
            RouteProvider_1.default.parse(result.route);
            ViewProvider_1.default.parse(result.view);
            TranslationProvider_1.default.parse(result.trans);
            ControllerProvider_1.default.parse(result.actions);
        }
        else {
            vscode_1.window.showErrorMessage(data);
        }
        MixProvider_1.default.parse();
    }
    catch (error) {
        console.error(error);
    }
}
function deactivate() {
    fs_1.default.unlinkSync(laravel_1.default.kernelPath);
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map