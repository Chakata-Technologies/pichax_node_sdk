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
  flip: 'horizontal' | 'vertical';
};

export type CropTransform = {
  crop:
    | {
        type: 'frontal_face';
      }
    | {
        type?: never;
        x?: number;
        y?: number;
        w: number;
        h: number;
        mode?: 'centre' | 'attention' | 'entropy';
      };
};

export type EffectsTransform = {
  effects: Partial<GrayscaleEffect & SharpenEffect & BlurEffect>[];
};

type GrayscaleEffect = {
  grayscale: boolean;
};

type SharpenEffect = {
  sharpen: boolean;
};

type BlurEffect = {
  blur: number;
};

export type WatermarkTransform = {
  watermark: {
    text: string;
  };
};

export type Transformations = Partial<
  RotateTransform &
    ResizeTransform &
    FlipTransform &
    CropTransform &
    EffectsTransform &
    WatermarkTransform
>;

export type BaseParams = {
  id: string;
  expires: string | number;
};

export type TransformParams = BaseParams & {
  src: string;
  params: Transformations;
  cache?: boolean;
};

export type IdenticonParams = BaseParams & {
  name: string;
};
