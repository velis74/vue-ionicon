import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';

import IonIcon from './ion-icon';

let requestsCount = 0;

jest.mock('axios', () => ({
  get: async (url) => {
    requestsCount += 1;
    if (url.includes('failure')) throw new Error('bad url');
    return {
      data: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" ' +
        'viewBox="0 0 512 512"><title>Warning</title><path d="M449.07 399.08L278.64 82.58c-12.08-22.44-44.26-22.44' +
        '-56.35 0L51.87 399.08A32 32 0 0080 446.25h340.89a32 32 0 0028.18-47.17zm-198.6-1.83a20 20 0 1120-20 20 20' +
        ' 0 01-20 20zm21.72-201.15l-5.74 122a16 16 0 01-32 0l-5.74-121.95a21.73 21.73 0 0121.5-22.69h.21a21.74 21.74' +
        ' 0 0121.73 22.7z"/></svg>',
    };
  },
}));

describe('IonIcon', () => {
  it('renders for icon and doesn\'t render when name is null', async() => {
    window.ionicon_cache = {}; // Clear IonIcon cache
    const icon1 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    await flushPromises();
    expect(icon1.html()).toContain('div');
    await icon1.setProps({ name: null });
    expect(icon1.html()).toMatch('');
  });
  it('emits event when rendered and there\'s a SVG in the DOM', async() => {
    window.ionicon_cache = {}; // Clear IonIcon cache
    const icon1 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    await flushPromises();
    // await icon1.vm.$nextTick();
    expect(icon1.emitted('icon-loaded')).toStrictEqual([[true]]);
    expect(icon1.html()).toContain('svg');
  });
  it('loads the mocked SVG, not the actual requested SVG', async() => {
    window.ionicon_cache = {}; // Clear IonIcon cache
    const icon1 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    await flushPromises();
    expect(icon1.html()).toContain('340.89'); // mocked svg contains this value
  });
  it('fails loading icon and remains in ellipsis state', async() => {
    window.ionicon_cache = {}; // Clear IonIcon cache
    const iconFailed1 = shallowMount(IonIcon, { propsData: { name: 'failure' } });
    const iconFailed2 = shallowMount(IonIcon, { propsData: { name: 'failure' } });
    await flushPromises();
    expect(iconFailed1.html()).toContain('…'); // svg remains with ellipsis
    expect(iconFailed2.html()).toContain('…'); // svg remains with ellipsis
  });
  it('loads two SVGs, but only makes one request', async() => {
    const rc = requestsCount;
    window.ionicon_cache = {}; // Clear IonIcon cache
    const icon1 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    const icon2 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    await flushPromises();
    expect(icon1.html()).toContain('340.89'); // mocked svg contains this value
    expect(icon2.html()).toContain('340.89'); // mocked svg contains this value
    expect(requestsCount).toEqual(rc + 1);
  });
  it('loads two SVGs one after the other, loading the other from cache without promises', async() => {
    const rc = requestsCount;
    window.ionicon_cache = {}; // Clear IonIcon cache
    const icon1 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    await flushPromises();
    expect(icon1.html()).toContain('340.89'); // mocked svg contains this value
    const icon2 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    await flushPromises();
    expect(icon2.html()).toContain('340.89'); // mocked svg contains this value
    expect(requestsCount).toEqual(rc + 1);
  });
});
