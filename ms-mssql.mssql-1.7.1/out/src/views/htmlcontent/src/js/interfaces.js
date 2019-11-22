"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
/**
 * Interfaces needed for interacting with the localwebservice
 * Separate from the contracts defined in the models folder because that version has
 * a dependency on vscode which will not build on the front end
 * Must be updated whenever there is a change to these interfaces
 */
Object.defineProperty(exports, "__esModule", { value: true });
class DbCellValue {
}
exports.DbCellValue = DbCellValue;
class ResultSetSubset {
}
exports.ResultSetSubset = ResultSetSubset;
class ResultSetSummary {
}
exports.ResultSetSummary = ResultSetSummary;
class BatchSummary {
}
exports.BatchSummary = BatchSummary;
class QueryEvent {
}
exports.QueryEvent = QueryEvent;
var FieldType;
(function (FieldType) {
    FieldType[FieldType["String"] = 0] = "String";
    FieldType[FieldType["Boolean"] = 1] = "Boolean";
    FieldType[FieldType["Integer"] = 2] = "Integer";
    FieldType[FieldType["Decimal"] = 3] = "Decimal";
    FieldType[FieldType["Date"] = 4] = "Date";
    FieldType[FieldType["Unknown"] = 5] = "Unknown";
})(FieldType = exports.FieldType || (exports.FieldType = {}));

//# sourceMappingURL=interfaces.js.map
