import jsdom from 'jsdom';

global.document = jsdom.jsdom('', { url: 'http://localhost/' });
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});
global.XMLHttpRequest = global.window.XMLHttpRequest;

global.navigator = {
  userAgent: 'node.js',
};

global.document.execCommand = () => {};
global.window.addResizeListener = () => {};
