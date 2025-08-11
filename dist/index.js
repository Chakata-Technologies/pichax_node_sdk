"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PichaX = void 0;
const crypto_1 = require("crypto");
const url_1 = require("url");
/**
 * Signature generator
 */
function generateSignature(id, expires, secret) {
    const data = `${id}:${expires}`;
    return (0, crypto_1.createHmac)('sha256', secret).update(data).digest('hex');
}
/**
 * Transform URL builder
 */
class TransformUrlBuilder {
    constructor(baseUrl, apiKey, apiSecret, params) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.params = params;
        if (!params.params || Object.keys(params.params).length === 0) {
            throw new Error('At least one transformation must be specified.');
        }
    }
    getUrl() {
        const { id, expires, src, params } = this.params;
        const signature = generateSignature(id, expires, this.apiSecret);
        const query = new url_1.URLSearchParams({
            key: this.apiKey,
            expires: expires.toString(),
            signature,
            src,
        });
        const transformUrl = `${this.baseUrl}/transform`;
        return `${transformUrl}?${query.toString()}&params=${JSON.stringify(params).replace('/', '')}`;
    }
}
/**
 * Identicon URL builder
 */
class IdenticonUrlBuilder {
    constructor(baseUrl, apiKey, apiSecret, params) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.params = params;
    }
    getUrl() {
        const { id, expires, name } = this.params;
        const signature = generateSignature(id, expires, this.apiSecret);
        const query = new url_1.URLSearchParams({
            key: this.apiKey,
            expires: expires.toString(),
            signature,
            name,
        });
        const identiconUrl = `${this.baseUrl}/identicon`;
        return `${identiconUrl}?${query.toString()}`;
    }
}
/**
 * PichaX Main Class
 */
class PichaX {
    constructor(apiKey, apiSecret) {
        this.baseUrl = 'https://api.pichax.dev/api/v1/generate';
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }
    transform(params) {
        return new TransformUrlBuilder(this.baseUrl, this.apiKey, this.apiSecret, params);
    }
    identicon(params) {
        return new IdenticonUrlBuilder(this.baseUrl, this.apiKey, this.apiSecret, params);
    }
}
exports.PichaX = PichaX;
