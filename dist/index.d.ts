export type RotateTransform = {
    rotate: {
        degrees: number;
    };
};
export type ResizeTransform = {
    resize: {
        scale: number;
    };
};
export type FlipTransform = {
    flip: {
        direction: 'horizontal' | 'vertical';
    };
};
export type Transformations = Partial<RotateTransform & ResizeTransform & FlipTransform>;
export interface BaseOptions {
    key: string;
    secret: string;
    id: string;
    expires: string | number;
}
export interface TransformOptions extends BaseOptions {
    src: string;
    params: Transformations;
}
export interface IdenticonOptions extends BaseOptions {
    name: string;
}
export declare class PichaXTransform {
    private options;
    constructor(options: TransformOptions);
    getUrl(): string;
}
export declare class PichaXIdenticon {
    private options;
    constructor(options: IdenticonOptions);
    getUrl(): string;
}
export declare class PichaX {
    static transform(options: TransformOptions): PichaXTransform;
    static identicon(options: IdenticonOptions): PichaXIdenticon;
}
/**
 * HMAC-SHA256 Signature Generator
 */
export declare function generateSignature(id: string, expires: string | number, secret: string): string;
