import { TransformParams, IdenticonParams } from './types';
/**
 * Transform URL builder
 */
declare class TransformUrlBuilder {
    private readonly baseUrl;
    private readonly apiKey;
    private readonly apiSecret;
    private readonly params;
    constructor(baseUrl: string, apiKey: string, apiSecret: string, params: TransformParams);
    getUrl(): string;
}
/**
 * Identicon URL builder
 */
declare class IdenticonUrlBuilder {
    private readonly baseUrl;
    private readonly apiKey;
    private readonly apiSecret;
    private readonly params;
    constructor(baseUrl: string, apiKey: string, apiSecret: string, params: IdenticonParams);
    getUrl(): string;
}
/**
 * PichaX Main Class
 */
export declare class PichaX {
    private readonly apiKey;
    private readonly apiSecret;
    private readonly baseUrl;
    constructor(apiKey: string, apiSecret: string);
    transform(params: TransformParams): TransformUrlBuilder;
    identicon(params: IdenticonParams): IdenticonUrlBuilder;
}
export {};
