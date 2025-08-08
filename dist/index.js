"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PichaX = exports.PichaXIdenticon = exports.PichaXTransform = void 0;
exports.generateSignature = generateSignature;
const crypto_1 = require("crypto");
class PichaXTransform {
    constructor(options) {
        if (!options.params || Object.keys(options.params).length === 0) {
            throw new Error('At least one transformation must be specified.');
        }
        this.options = options;
    }
    getUrl() {
        const { key, secret, id, expires, src, params } = this.options;
        const signature = generateSignature(id, expires, secret);
        const query = new URLSearchParams({
            key,
            expires: expires.toString(),
            signature,
            id,
            src,
        });
        const baseUrl = 'https://app.pichax.dev/api/v1/generate/transform';
        // const baseUrl = 'http://localhost:4000/api/v1/generate/transform';
        return `${baseUrl}?${query.toString()}&params=${JSON.stringify(params).replace('/', '')}`;
    }
}
exports.PichaXTransform = PichaXTransform;
class PichaXIdenticon {
    constructor(options) {
        this.options = options;
    }
    getUrl() {
        const { key, secret, id, expires, name } = this.options;
        const signature = generateSignature(id, expires, secret);
        const query = new URLSearchParams({
            key,
            expires: expires.toString(),
            id,
            signature,
            name,
        });
        const baseUrl = 'https://app.pichax.dev/api/v1/generate/identicon';
        // const baseUrl = 'http://localhost:4000/api/v1/generate/identicon';
        return `${baseUrl}?${query.toString()}`;
    }
}
exports.PichaXIdenticon = PichaXIdenticon;
class PichaX {
    static transform(options) {
        return new PichaXTransform(options);
    }
    static identicon(options) {
        return new PichaXIdenticon(options);
    }
}
exports.PichaX = PichaX;
/**
 * HMAC-SHA256 Signature Generator
 */
function generateSignature(id, expires, secret) {
    const data = `${id}:${expires}`;
    return (0, crypto_1.createHmac)('sha256', secret).update(data).digest('hex');
}
