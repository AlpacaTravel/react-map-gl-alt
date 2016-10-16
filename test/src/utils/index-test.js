import { describe } from 'mocha';
import { expect } from 'chai';
import { diff, has, mod } from '../../../src/utils';

describe('Utils', () => {
  describe('diff() function', () => {
    it('will correctly diff booleans', () => {
      expect(diff('foo', { foo: true }, { foo: true })).to.equal(false);
      expect(diff('foo', { foo: false }, { foo: true })).to.equal(true);
    });
    it('will correctly diff empty values', () => {
      expect(diff('foo', {}, { foo: true })).to.equal(true);
      expect(diff('foo', null, { foo: true })).to.equal(true);
      expect(diff('foo', null, null)).to.equal(true);
      expect(diff('foo', {}, {})).to.equal(true);
      expect(diff('foo', { foo: true }, null)).to.equal(true);
      expect(diff('foo', { foo: true }, {})).to.equal(true);
    });
    it('will correctly diff array values', () => {
      expect(diff('foo', { foo: [1, 2, 3] }, { foo: [1, 2, 3] })).to.equal(false);
      expect(diff('foo', { foo: [2, 1, 3] }, { foo: [1, 2, 3] })).to.equal(true);
      expect(diff('foo', { foo: [2, 1, 3] }, { foo: [1, 2, 4] })).to.equal(true);
      expect(diff('foo', { foo: [2, 3] }, { foo: [1, 2, 4] })).to.equal(true);
    });
    it('will correctly diff object values', () => {
      expect(diff('foo', { foo: { bar: true } }, { foo: { bar: false } })).to.equal(true);
      expect(diff('foo', { foo: { bar: true } }, { foo: { bar: true } })).to.equal(false);
      expect(diff('foo', { foo: { bar: 1 } }, { foo: { bar: 0 } })).to.equal(true);
    });
  });
  describe('has() function', () => {
    it('will respond true when an object has a property', () => {
      expect(has({ a: 'val' }, 'a'));
    });
    it('will response false when an object does not have a property', () => {
      expect(has({ a: 'val' }, 'b')).to.equal(false);
    });
  });
  describe('mod() function', () => {
    it('will correctly mod supplied coordinates', () => {
      expect(mod(190 + 180, 360) - 180).to.equal(-170);
      expect(mod(-190 + 180, 360) - 180).to.equal(170);
    });
  });
});
