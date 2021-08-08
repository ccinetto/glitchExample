"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewLine = exports.getLineHistory = void 0;
var lineHistory = [];

var getLineHistory = function getLineHistory() {
  return lineHistory;
};

exports.getLineHistory = getLineHistory;

var addNewLine = function addNewLine(newLine) {
  lineHistory.push(newLine);
};

exports.addNewLine = addNewLine;