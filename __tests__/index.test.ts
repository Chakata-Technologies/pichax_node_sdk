import { PichaX } from '../src';

const instance = new PichaX('test_key', 'test_secret');

describe('PichaX.transform', () => {
  it('returns a signed transform URL', () => {
    const url = instance
      .transform({
        id: 'img_123',
        expires: '1725168000',
        src: 'https://example.com/test.jpg',
        params: {
          rotate: { degrees: 90 },
          resize: { scale: 0.5 },
          flip: { direction: 'horizontal' },
        },
      })
      .getUrl();

    expect(url).toContain('key=test_key');
    expect(url).toContain('signature=');
    expect(url).toContain('params=');
  });
});

describe('PichaX.identicon', () => {
  it('returns a signed identicon URL', () => {
    const url = instance
      .identicon({
        id: 'img_123',
        expires: '1725168000',
        name: 'PichaX',
      })
      .getUrl();

    expect(url).toContain('name=PichaX');
    expect(url).toContain('signature=');
    expect(url).toContain('key=test_key');
  });
});
