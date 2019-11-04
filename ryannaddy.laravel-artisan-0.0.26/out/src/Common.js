"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const cp = require("child_process");
const Output_1 = require("./utils/Output");
const path_1 = require("path");
class Common {
    // protected static get artisanRoot(): string {
    //   let config = workspace.getConfiguration("artisan")
    //   let location = config.get<string | number | null | string[]>("location")
    //   if (location) {
    //     if (typeof location == 'string') {
    //       return location.replace(/\$\{workspaceRoot\}/g, workspace.rootPath)
    //     } else if (typeof location == 'number') {
    //       return workspace.workspaceFolders[location].uri.fsPath
    //     }
    //   }
    //   // If we have gotten this far then a location hasn't been specified
    //   // We then get the first workspace
    //   if (workspace.workspaceFolders) {
    //     return workspace.workspaceFolders[0].uri.fsPath
    //   }
    //   // Last resort get the root path (this is technically deprecated)
    //   return workspace.rootPath
    // }
    // protected static get artisan(): string {
    //   return this.artisanRoot + '/artisan'
    // }
    static listArtisanPaths() {
        return __awaiter(this, void 0, void 0, function* () {
            let config = vscode_1.workspace.getConfiguration("artisan");
            let additionalLocations = config.get("location");
            additionalLocations = typeof additionalLocations == 'string' ? new Array(1).concat(additionalLocations) : additionalLocations;
            let list = this.artisanFileList.concat(additionalLocations.map(i => vscode_1.Uri.parse(i)));
            if (list.length == 1 && list[0].fsPath.length)
                return list[0].fsPath;
            else if (list.length == 0)
                return 'artisan';
            let artisanToUse = yield Common.getListInput('Which artisan should execute this command?', list
                // Get the fs path from the URI
                .map(i => i.fsPath)
                // Remove Non-String values
                .filter(String)
                // Remove Duplicates
                .filter((v, i, a) => a.indexOf(v) === i));
            return artisanToUse;
        });
    }
    static execCmd(command, callback, artisan) {
        return __awaiter(this, void 0, void 0, function* () {
            let artisanToUse = artisan ? artisan : yield this.listArtisanPaths();
            // // If only one artisan is found use it
            // if (this.artisanFileList.length == 1) artisanToUse = this.artisanFileList[0].fsPath
            // // If more than one artisan is found ask which one to use
            // else if (this.artisanFileList.length > 1) artisanToUse = await this.listArtisanPaths()
            let artisanRoot = artisanToUse.replace(/artisan$/, '').replace(/\\$/g, '');
            // Try an get a custom php location
            let config = vscode_1.workspace.getConfiguration('artisan');
            let phpLocation = config.get('php.location', 'php');
            let dockerEnabled = config.get('docker.enabled', false);
            let dockerCommand = config.get('docker.command', null);
            let maxBuffer = config.get('maxBuffer', 1024 * 200);
            let cmd = '';
            if (dockerEnabled) {
                command = `php artisan ${command}`;
                cmd = `cd ${artisanRoot} && ${dockerCommand} ${command}`;
            }
            else {
                command = `"${phpLocation}" artisan ${command}`;
                cmd = process.platform == 'win32' ?
                    // Windows command
                    `cd /d "${artisanRoot}" && ${command}` :
                    // Unix command
                    `cd "${artisanRoot}" && ${command}`;
            }
            Output_1.default.command(command.trim());
            cp.exec(cmd, { maxBuffer }, (err, stdout, stderr) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    Output_1.default.error(err.message.trim());
                    Output_1.default.showConsole();
                }
                yield callback({
                    err, stdout, stderr, artisan: {
                        dir: artisanRoot, path: artisanToUse
                    }
                });
            }));
        });
    }
    static openFile(root, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // let doc = await workspace.openTextDocument(this.artisanRoot + '/' + filename)
                let doc = yield vscode_1.workspace.openTextDocument(path_1.join(root, filename));
                vscode_1.window.showTextDocument(doc);
                this.refreshFilesExplorer();
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
    static parseCliTable(cliTable) {
        let clirows = cliTable.split(/\r\n|\n/g);
        let headers = [];
        let rows = [];
        // Parse the cli table
        for (let i = 0, len = clirows.length; i < len; i++) {
            if (i == 0 || i == 2) {
                continue;
            }
            else if (i == 1) {
                (headers = clirows[i].split('|')).forEach((v, k) => {
                    headers[k] = v.replace(/[\u001b\u009b][[()#?]*(?:[0-9]{1,4}(?:[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '').trim();
                    if (headers[k] == '') {
                        delete headers[k];
                    }
                });
            }
            else {
                if (clirows[i].indexOf('|') > -1) {
                    let row = [];
                    clirows[i].split(/ \| /g).forEach((v) => {
                        row.push(v.replace(/^\||\|$/g, '').trim());
                    });
                    rows.push(row);
                }
            }
        }
        return { headers: headers, rows: rows };
    }
    // protected static async openVirtualFile(path: string, title: string, content: string) {
    //   let uri = Uri.parse('laravel-artisan://artisan/' + path)
    //   let doc = await workspace.openTextDocument(uri)
    //   let edit = new WorkspaceEdit()
    //   let range = new Range(0, 0, doc.lineCount, doc.getText().length)
    //   edit.set(uri, [new TextEdit(range, content)])
    //   workspace.applyEdit(edit)
    //   commands.executeCommand('vscode.previewHtml', uri, ViewColumn.One, title)
    // }
    static get tableStyle() {
        return `<style>
      * { box-sizing: border-box; }
      body { padding: 0; margin: 0; }
      table { border-collapse: collapse; width: 95vw; margin: auto; }
      table thead { font-size: 16px; text-align: left; }
      table tbody { font-size: 14px; }
      table td, table th { padding: 10px; }
      table tbody tr:nth-child(odd) { background-color: rgba(0,0,0,0.25); }
      table td a { color: #4080d0; cursor: pointer; }
      .hidden { display: none; }
      .search { padding-top: 15px; padding-bottom: 15px; width: 95vw; margin: auto; }
      #filter { display: block; padding: 5px; width: 100%; }
    </style>`;
    }
    static openVirtualHtmlFile(openPath, title, headers, rows, artisanRoot) {
        return __awaiter(this, void 0, void 0, function* () {
            let html = `<div class="search"><input type="text" id="filter" placeholder="Search for an item (RegExp Supported)"></div>`;
            html += `${this.tableStyle}<table>`;
            html += '<thead><tr>';
            headers.forEach(header => {
                html += '<th>' + header + '</th>';
            });
            html += '</tr></thead><tbody>';
            rows.forEach(row => {
                html += '<tr>';
                row.forEach(item => {
                    if (item.match(/app\\/i)) {
                        html += `<td><a href="file:///${vscode_1.workspace.rootPath}/${item.replace(/@.+$/, '').replace(/^App/, 'app')}.php" data-method="${item.replace(/^.+@/, '')}" class="app-item">` + item + '</a></td>';
                    }
                    else {
                        html += '<td>' + item + '</td>';
                    }
                });
                html += '</tr>';
            });
            html += '</tbody></table>';
            html += `<script>
    const filter = document.querySelector('#filter')
    const body = document.querySelector('table tbody')
    const rootPath = '${artisanRoot.replace(/\\/g, '/')}'
    const vscode = acquireVsCodeApi()
    console.log(rootPath)
    filter.focus()
    function filterItems(){
      let v = filter.value
      document.querySelectorAll('tbody > tr').forEach(row => {
        let txt = row.textContent
        let reg = new RegExp(v, 'ig')
        if (reg.test(txt) || v.length == 0) {
          row.classList.remove('hidden')
        } else {
          row.classList.add('hidden')
        }
      })
    }
    function routeEvents(){
      Array.from(body.querySelectorAll('a')).forEach(item => {
        item.addEventListener('click', e => {
          e.preventDefault()
          let target = e.currentTarget
          vscode.postMessage({ file: target.href, method: target.getAttribute('data-method') })
        })
      })
    }
    filter.addEventListener('input', filterItems)
    window.addEventListener('message', msg => {
      let rows = msg.data.rows
      let html = ''
      rows.forEach(row => {
        html += '<tr>'
        row.forEach(item => {
          if (item.match(/app\\\\/i)) {
            let file = \`\${rootPath}/\${item.replace(/@.+$/, '').replace(/^App/, 'app')}.php\`.replace(/\\\\/g, '/')
            html += \`<td><a href="\${file}" data-method="\${item.replace(/^.+@/, '')}" class="app-item">\` + item + '</a></td>'
          } else {
            html += '<td>' + item + '</td>'
          }
        })
        html += '</tr>'
      })
      body.innerHTML = html
      filterItems()
      routeEvents()
    })
    routeEvents()
  </script>`;
            const panel = vscode_1.window.createWebviewPanel(openPath, title, vscode_1.ViewColumn.Active, {
                enableScripts: true,
                retainContextWhenHidden: true
            });
            panel.webview.html = html;
            panel.webview.onDidReceiveMessage((msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg.file) {
                    let uri = vscode_1.Uri.parse(msg.file);
                    let method = msg.method || '';
                    let doc = yield vscode_1.workspace.openTextDocument(uri);
                    let activeDoc = yield vscode_1.window.showTextDocument(doc);
                    if (method.length > 0) {
                        let idx = doc.getText().indexOf(`function ${method}`);
                        if (idx > -1) {
                            let pos = doc.positionAt(idx + 9);
                            activeDoc.selection = new vscode_1.Selection(pos, pos);
                        }
                    }
                }
            }));
            return panel;
        });
    }
    static getInput(placeHolder) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = yield vscode_1.window.showInputBox({ placeHolder: placeHolder.replace(/\s\s+/g, ' ').trim() });
            name = name == undefined ? '' : name;
            // if (name.length == 0) {
            //   window.showErrorMessage('Invalid ' + placeHolder)
            //   return ''
            // }
            return name;
        });
    }
    static getListInput(placeHolder, list) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = yield vscode_1.window.showQuickPick(list, { placeHolder: placeHolder });
            name = name == undefined ? '' : name;
            return name;
        });
    }
    static getYesNo(placeHolder) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield vscode_1.window.showQuickPick(['Yes', 'No'], { placeHolder });
            return value.toLowerCase() == 'yes' ? true : false;
        });
    }
    static getNoYes(placeHolder) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield vscode_1.window.showQuickPick(['No', 'Yes'], { placeHolder });
            return value.toLowerCase() == 'yes' ? true : false;
        });
    }
    static showMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            vscode_1.window.showInformationMessage(message);
            return true;
        });
    }
    static showError(message, consoleErr = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (consoleErr !== null) {
                message += ' (See output console for more details)';
                console.error(consoleErr + ' (See output console for more details)');
            }
            vscode_1.window.showErrorMessage(message);
            return false;
        });
    }
    static refreshFilesExplorer() {
        vscode_1.commands.executeCommand('workbench.files.action.refreshFilesExplorer');
    }
    static getCommandList() {
        return new Promise(resolve => {
            this.execCmd(`list --format=json`, (info) => {
                let commands = JSON.parse(info.stdout).commands;
                let commandList = [];
                commands.forEach(command => {
                    let commandItem = { name: command.name, description: command.description, options: [], arguments: [] };
                    for (let i in command.definition.options) {
                        if (['help', 'quiet', 'verbose', 'version', 'ansi', 'no-ansi', 'no-interaction', 'env'].indexOf(i) > -1)
                            continue;
                        commandItem.options.push(command.definition.options[i]);
                    }
                    for (let i in command.definition.arguments) {
                        commandItem.arguments.push(command.definition.arguments[i]);
                    }
                    commandList.push(commandItem);
                });
                resolve(commandList);
            });
        });
    }
}
Common.artisanFileList = [];
exports.default = Common;
//# sourceMappingURL=Common.js.map