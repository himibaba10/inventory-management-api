export type TError =
  | {
      message?: string;
      stack?: any;
    }
  | any;
