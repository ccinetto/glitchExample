"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWsServer = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

var _lines = require("../utils/lines");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var initWsServer = function initWsServer(server) {
  var io = (0, _socket["default"])(server);
  io.on('connection', function (socket) {
    console.log('Nueva Conexion establecida!'); //Le envio a cada nueva conexion el historial actual asi puede ver lo que ya se dibujo

    var history = (0, _lines.getLineHistory)();

    var _iterator = _createForOfIteratorHelper(history),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var aLine = _step.value;
        var newData = {
          line: aLine
        };
        socket.emit('new-line', newData);
      } //Recibo una linea Nueva

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    socket.on('new-line', function (data) {
      var line = data.line;
      (0, _lines.addNewLine)(line); // console.log(line);

      io.emit('new-line', data);
    });
  });
  return io;
};

exports.initWsServer = initWsServer;