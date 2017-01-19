import jsdom from 'jsdom';
import gl from 'gl';
// import sinon from 'sinon';

global.document = jsdom.jsdom(null, {
  url: 'http://localhost/',
  virtualConsole: jsdom.createVirtualConsole().sendTo(console),
});
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.window.devicePixelRatio = 1;
global.window.HTMLElement.prototype.clientLeft = 0;
global.window.HTMLElement.prototype.clientTop = 0;

global.window.HTMLCanvasElement.prototype.getContext = function(type, attributes) {
  if (!this._webGLContext) {
    this._webGLContext = gl(this.width, this.height, attributes);
  }
  return this._webGLContext;
};

global.XMLHttpRequest = global.window.XMLHttpRequest;

global.navigator = {
  userAgent: 'node.js',
};

global.document.execCommand = () => {};
global.window.addResizeListener = () => {};

// This is a hacked up version of "flow-remove-types/register" which allows
// us to include "mapbox-gl" directly.

const Module = require('module');
const removeTypes = require('flow-remove-types');

const _compileSuper = Module.prototype._compile;
Module.prototype._compile = function _compile(source, filename) {
  const transformedSource = filename.indexOf('node_modules/mapbox-gl') !== -1 ? removeTypes(source) : source;
  _compileSuper.call(this, transformedSource, filename);
};
