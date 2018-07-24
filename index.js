"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("./src/react");

Object.keys(_react).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _react[key];
    }
  });
});

var _commonService = require("./src/commonService");

Object.keys(_commonService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _commonService[key];
    }
  });
});
