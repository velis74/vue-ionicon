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
  it('renders for icon and doesn\'t render when name is null', async () => {
    window.ionicon_cache = {}; // Clear IonIcon cache
    const icon1 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    await flushPromises();
    expect(icon1.html()).toContain('div');
    await icon1.setProps({ name: null });
    expect(icon1.html()).toMatch('');
  });
  it('emits event when rendered and there\'s a SVG in the DOM', async () => {
    window.ionicon_cache = {}; // Clear IonIcon cache
    const icon1 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    await flushPromises();
    // await icon1.vm.$nextTick();
    expect(icon1.emitted('icon-loaded')).toStrictEqual([[true]]);
    expect(icon1.html()).toContain('svg');
  });
  it('loads the mocked SVG, not the actual requested SVG', async () => {
    window.ionicon_cache = {}; // Clear IonIcon cache
    const icon1 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    await flushPromises();
    expect(icon1.html()).toContain('340.89'); // mocked svg contains this value
  });
  it('fails loading icon and remains in ellipsis state', async () => {
    window.ionicon_cache = {}; // Clear IonIcon cache
    const iconFailed1 = shallowMount(IonIcon, { propsData: { name: 'failure' } });
    const iconFailed2 = shallowMount(IonIcon, { propsData: { name: 'failure' } });
    await flushPromises();
    expect(iconFailed1.html()).toContain('…'); // svg remains with ellipsis
    expect(iconFailed2.html()).toContain('…'); // svg remains with ellipsis
  });
  it('loads two SVGs, but only makes one request', async () => {
    const rc = requestsCount;
    window.ionicon_cache = {}; // Clear IonIcon cache
    const icon1 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    const icon2 = shallowMount(IonIcon, { propsData: { name: 'accessibility-outline' } });
    await flushPromises();
    expect(icon1.html()).toContain('340.89'); // mocked svg contains this value
    expect(icon2.html()).toContain('340.89'); // mocked svg contains this value
    expect(requestsCount).toEqual(rc + 1);
  });
  it('loads two SVGs one after the other, loading the other from cache without promises', async () => {
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
  it('loads svg from literal string', async () => {
    window.ionicon_cache = {}; // Clear IonIcon cache
    const icon1 = shallowMount(IonIcon, { propsData: { name: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 153 200">
        <g>
          <radialGradient id="m" cx="36.714" cy="24.316" r="87.42" fx="36.714" fy="24.316"
                          gradientUnits="userSpaceOnUse">
            <stop offset="0" style="stop-color:#1a9ebf"/>
            <stop offset="1" style="stop-color:#13074e"/>
          </radialGradient>
          <path fill="url(#m)" d="M81.86.045s7.844 6.765-12.175 19.143C47.463 32.926-2.21 45.541 5.228 51.546c7.436
                6.007.064-.204.064-.204l7.996 8.061s10.308-.91 51.775-21.215S100.45 2.047 81.86.045z"/>
          <linearGradient id="n" gradientUnits="userSpaceOnUse" x1="4.533" y1="55.643" x2="128.324" y2="55.643">
            <stop offset="0" style="stop-color:#f61821"/>
            <stop offset="1" style="stop-color:#7e0d07"/>
          </linearGradient>
          <path fill="url(#n)" d="M81.86.045s52.427 12.625 23.609 38.652c-28.817 26.03-66.126 40.297-66.126
                40.297S-6.141 95.482 6.875 103.229l16.113 8.057s34.396-15.492 45.859-21.688c11.463-6.197 67.238-34.396
                58.564-66 .001 0-4.031-24.795-45.551-23.553z"/>
          <radialGradient id="o" cx="61.905" cy="61.602" r="75.161" fx="61.905" fy="61.602"
                          gradientUnits="userSpaceOnUse">
            <stop offset="0" style="stop-color:#facc21"/>
            <stop offset="1" style="stop-color:#178b36"/>
          </radialGradient>
          <path fill="url(#o)" d="M87.583 145.578s26.688-13.686-23.948-39.003c0 0-25.316-13.688-44.476-20.529C0
                79.205-4.79 72.363 4.79 49.099c0 0-.676 7.685 31.015 19.8 44.19 16.896 60.11 31.354 66.439 39.404 6.328
                8.055 21.59 29.961-14.661 37.275z"/>
          <radialGradient id="p" cx="95.656" cy="109.476" r="304.402" fx="95.656" fy="109.476"
                          gradientUnits="userSpaceOnUse">
            <stop offset="0" style="stop-color:#1a9ebf"/>
            <stop offset="1" style="stop-color:#13074e"/>
          </radialGradient>
          <path fill="url(#p)" d="M133.881 22.88s28.764 28.187-9.202 61.552c-37.968 33.365-92.328 51.775-92.328
                51.775s-.049 11.855 19.315 7.424c23.872-5.461 144.632-60.059 82.215-120.751z"/>
          <radialGradient id="q" cx="37.109" cy="100.542" r="27.053" fx="37.109" fy="100.542"
                          gradientUnits="userSpaceOnUse">
            <stop offset="0" style="stop-color:#facc21"/>
            <stop offset="1" style="stop-color:#eb510f"/>
          </radialGradient>
          <path fill="url(#q)" d="M76.554 148.822s2.068-5.509-22.388-14.465c-24.453-8.957-45.118-6.848-49.25-33.022 0 0
                2.79 2.286 10.233 6.031a162.8 162.8 0 0 0 15.941 7.015c19.978 7.578 65.781 23.077 45.464 34.441z"/>
          <radialGradient id="r" cx="45.963" cy="140.565" r="23.32" fx="45.963" fy="140.565"
                          gradientUnits="userSpaceOnUse">
            <stop offset="0" style="stop-color:#facc21"/>
            <stop offset="1" style="stop-color:#178b36"/>
          </radialGradient>
          <path fill="url(#r)" d="M32.351 136.207s3.775 12.463 44.203 12.615c0 0-59.528 14.1-44.203-12.615z"/>
        </g>
      </svg>
      ` } });
    await flushPromises();
    expect(icon1.html()).toContain('#facc21');
  });
});
