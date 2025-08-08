import { createHmac } from 'crypto';
import { URLSearchParams } from 'url';
import { TransformParams, IdenticonParams } from './types';

/**
 * Signature generator
 */
function generateSignature(
  id: string,
  expires: string | number,
  secret: string
): string {
  const data = `${id}:${expires}`;
  return createHmac('sha256', secret).update(data).digest('hex');
}

/**
 * Transform URL builder
 */
class TransformUrlBuilder {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
    private readonly apiSecret: string,
    private readonly params: TransformParams
  ) {
    if (!params.params || Object.keys(params.params).length === 0) {
      throw new Error('At least one transformation must be specified.');
    }
  }

  getUrl(): string {
    const { id, expires, src, params } = this.params;

    const signature = generateSignature(id, expires, this.apiSecret);

    const query = new URLSearchParams({
      key: this.apiKey,
      expires: expires.toString(),
      signature,
      src,
    });

    const transformUrl = `${this.baseUrl}/transform`;

    return `${transformUrl}?${query.toString()}&params=${JSON.stringify(
      params
    ).replace('/', '')}`;
  }
}

/**
 * Identicon URL builder
 */
class IdenticonUrlBuilder {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
    private readonly apiSecret: string,
    private readonly params: IdenticonParams
  ) {}

  getUrl(): string {
    const { id, expires, name } = this.params;

    const signature = generateSignature(id, expires, this.apiSecret);

    const query = new URLSearchParams({
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
export class PichaX {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly baseUrl: string = 'https://api.pichax.dev/api/v1/generate';

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  transform(params: TransformParams): TransformUrlBuilder {
    return new TransformUrlBuilder(
      this.baseUrl,
      this.apiKey,
      this.apiSecret,
      params
    );
  }

  identicon(params: IdenticonParams): IdenticonUrlBuilder {
    return new IdenticonUrlBuilder(
      this.baseUrl,
      this.apiKey,
      this.apiSecret,
      params
    );
  }
}
