# 📸 PichaX SDK (Node.js)

The official Node.js SDK for interacting with the [PichaX](https://pichax.dev) image transformation and identicon generation service.

Generate signed, expirable image URLs for transformations such as rotate, resize, flip, and identicons — fast, secure, and simple.

---
## 🚀 Installation

```bash
npm install @chakata/pichax
# or
yarn add pichax
```

## Example
```ts
import { PichaX } from '@chakata/pichax';

const picha = new PichaX('your_api_key', 'your_api_secret');

// 🔁 Transform an image
const transformUrl = picha.transform({
  id: 'img_123',
  expires: '1725168000', // Unix timestamp
  src: 'https://example.com/image.jpg',
  params: {
    rotate: { degrees: 90 },
    resize: { scale: 0.8 },
    flip: { direction: 'vertical' },
  }
}).getUrl();

console.log(transformUrl);

// 👤 Generate an identicon
const identiconUrl = picha.identicon({
  id: 'user_123',
  expires: '1725168000',
  name: 'PichaX'
}).getUrl();

console.log(identiconUrl);
```

## 🔐 Signature Generation
All URLs include a signature for security, generated using HMAC-SHA256:

```js
HMAC_SHA256(unique_key + ":" + expires, api_secret)
```

## 🧰 Transformations
Each transformation is optional and can be combined:
```ts
params: {
  rotate: { degrees: 90 },              // 0 - 360
  resize: { scale: 0.5 },               // 0 < scale <= 1
  flip: { direction: 'horizontal' },    // 'horizontal' | 'vertical'
}
```

## ✅ Type Safety
This SDK is written in TypeScript and includes full type definitions out of the box.

## Testing
```bash
npm test
```

## 🌐 Learn More
For full API documentation, visit [Docs](https://chakata.gitbook.io/pichax/)