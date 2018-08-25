"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("./react");

Object.keys(_react).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _react[key];
    }
  });
});

var _commonServices = require("./commonServices");

Object.keys(_commonServices).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _commonServices[key];
    }
  });
});
