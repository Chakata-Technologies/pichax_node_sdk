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

export type Transformations = Partial<
  RotateTransform & ResizeTransform & FlipTransform
>;

export type BaseParams = {
  id: string;
  expires: string | number;
};

export type TransformParams = BaseParams & {
  src: string;
  params: Transformations;
};

export type IdenticonParams = BaseParams & {
  name: string;
};
