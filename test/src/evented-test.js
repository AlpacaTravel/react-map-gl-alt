import { describe } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import Evented from '../../src/evented';

describe('Evented', () => {
  const on = sinon.spy();
  on.withArgs('resize');
  on.withArgs('remove');
  on.withArgs('render');
  on.withArgs('load');
  on.withArgs('error');
  on.withArgs('movestart');
  on.withArgs('moveend');
  on.withArgs('boxzoomend');
  on.withArgs('boxzoomstart');
  on.withArgs('dragstart');
  on.withArgs('dragend');
  on.withArgs('webglcontextlost');
  on.withArgs('webglcontextrestored');
  on.withArgs('dataloading');
  on.withArgs('mouseout');
  on.withArgs('mousedown');
  on.withArgs('mouseup');
  on.withArgs('mousemove');
  on.withArgs('click');
  on.withArgs('dblclick');
  on.withArgs('contextmenu');
  on.withArgs('touchstart');
  on.withArgs('touchend');
  on.withArgs('touchcanel');
  on.withArgs('move');
  on.withArgs('zoomstart');
  on.withArgs('zoomend');
  on.withArgs('zoom');
  on.withArgs('rotatestart');
  on.withArgs('rotate');
  on.withArgs('rotateend');
  on.withArgs('drag');
  on.withArgs('pitch');
  const map = { on };
  const mapAccessor = {};
  const evented = new Evented(map, mapAccessor);
  describe('while handling map resize events', () => {
    const type = 'resize';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      evented.on(type, listener);
      callback();
      expect(listener.calledOnce);
      done();
    });
  });
  describe('while handling map remove events', () => {
    const type = 'resize';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners', () => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      evented.on(type, listener);
      callback();
      expect(listener.calledOnce);
    });
  });
  describe('while handling map render events', () => {
    const type = 'render';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners', () => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      evented.on(type, listener);
      callback();
      expect(listener.calledOnce);
    });
  });
  describe('while handling map load events', () => {
    const type = 'load';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners', () => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      evented.on(type, listener);
      callback();
      expect(listener.calledOnce);
    });
  });
  describe('while handling map error events', () => {
    const type = 'error';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with arguments', () => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      evented.on(type, listener);
      listener.withArgs('message');
      callback('message');
      expect(listener.withArgs('message').calledOnce);
    });
  });
  describe('while handling map movestart events', () => {
    const type = 'movestart';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map moveend events', () => {
    const type = 'moveend';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map boxzoomend events', () => {
    const type = 'boxzoomend';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map boxzoomstart events', () => {
    const type = 'boxzoomstart';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map dragstart events', () => {
    const type = 'dragstart';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map dragend events', () => {
    const type = 'dragend';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map webglcontextlost events', () => {
    const type = 'webglcontextlost';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with webglcontext event', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = {};
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.equal(event);
      done();
    });
  });
  describe('while handling map webglcontextrestored events', () => {
    const type = 'webglcontextrestored';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with webglcontext event', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = {};
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.equal(event);
      done();
    });
  });
  describe('while handling map dataloading events', () => {
    const type = 'dataloading';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with data event', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = {};
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.equal(event);
      done();
    });
  });
  describe('while handling map mouseout events', () => {
    const type = 'mouseout';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map mousedown events', () => {
    const type = 'mousedown';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map mouseup events', () => {
    const type = 'mouseup';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map mousemove events', () => {
    const type = 'mousemove';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map click events', () => {
    const type = 'click';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map dblclick events', () => {
    const type = 'dblclick';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map contextmenu events', () => {
    const type = 'contextmenu';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map touchstart events', () => {
    const type = 'touchstart';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map touchend events', () => {
    const type = 'touchend';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map touchcanel events', () => {
    const type = 'touchcanel';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map move events', () => {
    const type = 'move';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map zoomstart events', () => {
    const type = 'zoomstart';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map zoomend events', () => {
    const type = 'zoomend';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map zoom events', () => {
    const type = 'zoom';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map rotatestart events', () => {
    const type = 'rotatestart';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map rotate events', () => {
    const type = 'rotate';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map rotateend events', () => {
    const type = 'rotateend';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map drag events', () => {
    const type = 'drag';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling map pitch events', () => {
    const type = 'pitch';
    it('registers to listen for event', () => {
      expect(on.withArgs(type, sinon.match.func).calledOnce);
    });
    it('propagates event to listeners with scrubbed map facade', (done) => {
      const call = on.withArgs(type, sinon.match.func).firstCall;
      /* eslint no-unused-expressions: 0 */
      expect(call.args).to.exist;
      const callback = call.args[1]; // Get the callback
      const listener = sinon.spy(); // A listener..
      const event = { target: map };
      evented.on(type, listener);
      callback(event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.exist;
      const received = listener.firstCall.args[0];
      expect(received).to.exist;
      expect(received).to.not.equal(event); // Should clone
      expect(received.target).to.exist;
      expect(received.target).to.equal(mapAccessor);
      done();
    });
  });
  describe('while handling unknown events', () => {
    const type = 'unknown';
    it('will scrub arguments', () => {
      const listener = sinon.spy();
      const event = {};
      evented.on(type, listener);
      evented.notifyListeners(type, event);
      expect(listener.calledOnce);
      expect(listener.firstCall.args).to.be.empty;
    });
  });
  describe('while notifying listeners', () => {
    it('will notify multiple listeners', (done) => {
      const listenerA = sinon.spy();
      const listenerB = sinon.spy();
      const listenerC = sinon.spy();
      evented.on('resize', listenerA);
      evented.on('resize', listenerB);
      evented.on('data', listenerC);
      evented.notifyListeners('resize');
      expect(listenerA.calledOnce);
      expect(listenerB.calledOnce);
      expect(listenerC.calledOnce).to.equal(false);
      done();
    });
    it('will unregister listeners', (done) => {
      const listenerA = sinon.spy();
      const listenerB = sinon.spy();
      const listenerC = sinon.spy();
      evented.on('resize', listenerA);
      evented.on('resize', listenerB);
      evented.off('resize', listenerB);
      evented.on('data', listenerC);
      evented.notifyListeners('resize');
      expect(listenerA.calledOnce);
      expect(listenerB.calledOnce).to.equal(false);
      expect(listenerC.calledOnce).to.equal(false);
      done();
    });
  });
});
