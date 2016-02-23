import {getEventsFromAttributes, getBindablePropertyName, _hyphenate, _unhyphenate, isTemplateProperty, addHyphenAndLower, getKendoPropertyName, pruneOptions, fireEvent, fireKendoEvent} from 'src/common/util';
import {constants} from 'src/common/constants';
import {initialize} from 'aurelia-pal-browser';
import {DOM} from 'aurelia-pal';

describe('Util', () => {
  beforeEach(() => {
    initialize();
  });

  it('getEventsFromAttributes ignores non-kendo attributes', () => {
    let element = DOM.createElement('div');
    element.setAttribute('id', '');
    element.setAttribute('name', '');
    element.setAttribute(`${constants.eventPrefix}my-event.trigger`, '');

    let response = getEventsFromAttributes(element);
    expect(response.includes('id')).toBe(false);
    expect(response.includes('name')).toBe(false);
    expect(response.includes('myEvent')).toBe(true);
  });

  it('getEventsFromAttributes removes prefix', () => {
    let element = DOM.createElement('div');
    element.setAttribute(`${constants.eventPrefix}my-event`, '');

    let response = getEventsFromAttributes(element);
    expect(response.includes('myEvent')).toBe(true);
  });

  it('getEventsFromAttributes unhyphenates and camelcases', () => {
    let element = DOM.createElement('div');
    element.setAttribute(`${constants.eventPrefix}my-event`, '');
    element.setAttribute(`${constants.eventPrefix}my-long-event-name`, '');

    let response = getEventsFromAttributes(element);
    expect(response.includes('myEvent')).toBe(true);
    expect(response.includes('myLongEventName')).toBe(true);
  });

  it('getEventsFromAttributes removes trigger or delegates from the name', () => {
    let element = DOM.createElement('div');
    element.setAttribute(`${constants.eventPrefix}my-event.trigger`, '');
    element.setAttribute(`${constants.eventPrefix}other-event.delegate`, '');

    let response = getEventsFromAttributes(element);
    expect(response.includes('myEvent')).toBe(true);
    expect(response.includes('otherEvent')).toBe(true);
  });

  it('getBindablePropertyName() applies prefix', () => {
    expect(getBindablePropertyName('test').toLowerCase()).toBe(`ktest`);
  });

  it('getBindablePropertyName() lowercases first letter', () => {
    let firstLetter = getBindablePropertyName('test')[0];
    expect(firstLetter).toBe(firstLetter.toLowerCase());
  });

  it('getBindablePropertyName() uppercases second letter', () => {
    let secondLetter = getBindablePropertyName('test')[1];
    expect(secondLetter).toBe(secondLetter.toUpperCase());
  });

  it('_hyphenate() hyphenates correctly', () => {
    expect(_hyphenate('kMyProp')).toBe('k-my-prop');
    expect(_hyphenate('abcdMyProp')).toBe('abcd-my-prop');
    expect(_hyphenate('myProp')).toBe('my-prop');
  });

  it('_unhyphenate() unhyphenates correctly', () => {
    expect(_unhyphenate('k-my-prop')).toBe('kMyProp');
    expect(_unhyphenate('abcd-my-prop')).toBe('abcdMyProp');
    expect(_unhyphenate('my-prop')).toBe('myProp');
  });

  it('addHyphenAndLower adds hyphen and lowercases the char', () => {
    expect(addHyphenAndLower('k')).toBe('-k');
    expect(addHyphenAndLower('K')).toBe('-k');
  });

  it('getKendoPropertyName', () => {
    expect(getKendoPropertyName('kTemplate')).toBe('template');
    expect(getKendoPropertyName('kPropertyName')).toBe('propertyName');
  });
});


describe('Options', () => {
  it('pruneOptions removes null properties', () => {
    let pruned = pruneOptions({
      a: null,
      b: '1',
      c: 0,
      d: undefined
    });

    expect(pruned.hasOwnProperty('a')).toBe(false);
    expect(pruned.b).toBe('1');
    expect(pruned.c).toBe(0);
    expect(pruned.hasOwnProperty('d')).toBe(false);
  });
});


describe('Events', (a) => {
  it('creates event with correct name', () => {
    initialize();

    let elem = DOM.createElement('div');
    let event = fireEvent(elem, 'test');

    expect(event.type).toBe('test');
  });

  it('creates bubbling event', () => {
    initialize();

    let elem = DOM.createElement('div');
    let event = fireEvent(elem, 'test');

    expect(event.bubbles).toBe(true);
  });

  it('adds data to the detail property', () => {
    initialize();

    let elem = DOM.createElement('div');
    let detail = {
      a: 'b'
    };
    let event = fireEvent(elem, 'test', detail);

    expect(event.detail).toBe(detail);
  });

  it('fireKendoEvent returns event', () => {
    initialize();

    let elem = DOM.createElement('div');
    let event = fireEvent(elem, 'test');

    expect(event).not.toBeUndefined();
  });

  it('fireKendoEvent adds eventprefix', () => {
    initialize();

    let elem = DOM.createElement('div');
    let event = fireKendoEvent(elem, 'test');

    expect(event.type).toBe(`k-on-test`);
  });

  it('finds templates by conventions', () => {
    expect(isTemplateProperty('test')).toBe(false);
    expect(isTemplateProperty('testTemplate')).toBe(true);
    expect(isTemplateProperty('template')).toBe(true);
  });
});
