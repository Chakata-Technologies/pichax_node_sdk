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
      };
};

export type GrayscaleTransform = {
  grayscale: boolean;
};

export type Transformations = Partial<
  RotateTransform &
    ResizeTransform &
    FlipTransform &
    CropTransform &
    GrayscaleTransform
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
