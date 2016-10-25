import { describe } from 'mocha';
import { expect } from 'chai';
import { getInteractiveLayerIds, update, areGeoJSONSourcePropertiesSimilar, processStyleChanges } from '../../../src/utils/styles';
import Immutable from 'immutable';
import { styleSat as styleA, styleSatCountryLabels as styleB } from '../../example-styles';
import sinon from 'sinon';
import { Style } from 'mapbox-gl';

const basicStyle = {
  version: 8,
  center: [-73.9749, 40.7736],
  zoom: 12.5,
  sources: {},
  layers: [],
};

const getMapStylesMock = () => ({
  setStyle: sinon.spy(),
  addLayer: sinon.spy(),
  removeLayer: sinon.spy(),
  addSource: sinon.spy(),
  removeSource: sinon.spy(),
  setFilter: sinon.spy(),
  setLayerZoomRange: sinon.spy(),
  setPaintProperty: sinon.spy(),
  setLayoutProperty: sinon.spy(),
  setCenter: sinon.spy(),
});

describe('Styles util', () => {
  describe('getInteractiveLayerIds() function', () => {
    describe('while working with string styles', () => {
      it('will not return layer IDs', () => {
        expect(getInteractiveLayerIds('mapbox://styles/mapbox/streets-v9')).to.have.length(0);
      });
    });
    describe('while working with style spec objects for standard arrays', () => {
      const mapStyle = {
        layers: [
          { id: 'layer1', interactive: true },
          { id: 'layer2' },
          { id: 'layer3', interactive: false },
          { id: 'layer4', interactive: true },
        ],
      };

      it('will return interactive layer IDs for standard arrays', () => {
        const result = getInteractiveLayerIds(mapStyle);
        expect(result).to.have.length(2);
        expect(result[0]).to.equal('layer1');
        expect(result[1]).to.equal('layer4');
      });
      it('will return interactive layer IDs for immutable styles', () => {
        const result = getInteractiveLayerIds(Immutable.fromJS(mapStyle));
        expect(result).to.have.length(2);
        expect(result[0]).to.equal('layer1');
        expect(result[1]).to.equal('layer4');
      });
    });
  });
  describe('areGeoJSONSourcePropertiesSimilar() function', () => {
    describe('while supplying similar source', () => {
      it('will return true', (done) => {
        const style = new Style(basicStyle);
        style.on('style.load', () => {
          const source = {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Point',
                geometry: {
                  coordinates: [10, 20],
                },
              }],
            },
            maxzoom: 10,
            cluster: true,
            clusterRadius: 20,
            clusterMaxZoom: 8,
          };
          style.addSource('test', source);
          expect(areGeoJSONSourcePropertiesSimilar(style.getSource('test'), source)).to.equal(true);
          done();
        });
      });
    });
    describe('when supplying unsimilar source', () => {
      it('will return false', (done) => {
        const style = new Style(basicStyle);
        style.on('style.load', () => {
          const sourceA = {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [],
            },
          };
          const sourceB = {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [],
            },
            maxzoom: 12,
          };
          style.addSource('test', sourceA);
          expect(areGeoJSONSourcePropertiesSimilar(style.getSource('test'), sourceB)).to.equal(false);
          done();
        });
      });
    });
  });
  describe('processStyleChanges() function', () => {
    describe('when processing standard changes', () => {
      it('will apply changes to the map style', () => {
        const changes = [
          { command: 'foo', args: ['bar'] },
          { command: 'bar', args: ['foo', 'bar'] },
        ];
        const mapMock = {
          foo: () => {},
          bar: () => {},
        };
        sinon.spy(mapMock, 'foo');
        sinon.spy(mapMock, 'bar');
        processStyleChanges(mapMock, changes);
        expect(mapMock.foo.withArgs('bar').calledOnce).to.equal(true);
        expect(mapMock.bar.withArgs('foo', 'bar').calledOnce).to.equal(true);
      });
    });
    describe('when processing similar GeoJSON sources', () => {
      let mapMock = null;
      let geoJSONSourceB = null;
      const compose = new Promise((fulfill, reject) => {
        const changes = [
          { command: 'removeSource', args: ['test'] },
          { command: 'addSource', args: ['test'] },
        ];
        const style = new Style(basicStyle);
        const geoJSONSourceA = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Point',
              geometry: {
                coordinates: [10, 20],
              },
            }],
          },
        };
        geoJSONSourceB = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Point',
              geometry: {
                coordinates: [20, 10],
              },
            }],
          },
        };
        const nextStyle = {
          ...basicStyle,
          sources: {
            test: geoJSONSourceB,
          },
        };
        mapMock = {
          addSource: () => {},
          removeSource: () => {},
          getSource: (id) => (style.getSource(id)),
        };
        sinon.spy(mapMock, 'addSource');
        sinon.spy(mapMock, 'removeSource');
        sinon.spy(mapMock, 'getSource');
        style.on('style.load', () => {
          // Add a geoJSON source
          style.addSource('test', geoJSONSourceA);
          // Process the changes
          processStyleChanges(mapMock, changes, nextStyle);
          // Fulfill
          fulfill();
        }).on('error', reject);
      });

      it('will not remove the existing source', (done) => {
        compose.then(() => {
          expect(mapMock.removeSource.calledOnce).to.equal(false);
          done();
        }).catch(done);
      });
      it('will not attempt to add the new source', (done) => {
        compose.then(() => {
          expect(mapMock.addSource.calledOnce).to.equal(false);
          done();
        }).catch(done);
      });
      it('will return the new style data', (done) => {
        compose.then(() => {
          const source = mapMock.getSource('test');
          const { data } = source.serialize();
          const dataCoordinates = data.features[0].geometry.coordinates;
          const newSourceDataCoordinates = geoJSONSourceB.data.features[0].geometry.coordinates;
          expect(dataCoordinates[0]).to.equal(newSourceDataCoordinates[0]);
          expect(dataCoordinates[1]).to.equal(newSourceDataCoordinates[1]);
          done();
        }).catch(done);
      });
    });
  });
  describe('update() function', () => {
    describe('while working with style differences', () => {
      it('will replace the map style when they are simple style references', () => {
        const map = getMapStylesMock();
        update(map, 'abc', 'def');
        expect(map.setStyle.calledOnce).to.equal(true);
      });

      it('will update the map style with differences', () => {
        const map = getMapStylesMock();
        update(map, styleA, styleB);
        expect(map.addSource.calledOnce).to.equal(true);
        expect(map.addLayer.calledOnce).to.equal(true);
      });

      it('will return on immutable object comparisons', () => {
        const map = getMapStylesMock();
        const style = Immutable.fromJS(styleA);
        update(map, style, style);
      });

      it('will accept different immutable objects', () => {
        const map = getMapStylesMock();
        const iStyleA = Immutable.fromJS({ ...basicStyle, center: [10, 20] });
        const iStyleB = Immutable.fromJS({ ...basicStyle, center: [20, 10] });
        update(map, iStyleA, iStyleB);
      });
    });
  });
});
