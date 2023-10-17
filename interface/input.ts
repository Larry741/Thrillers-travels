export interface InputType {
  value: string;
  isValid: boolean;
  isTouched?: boolean;
}

export interface PasswordInputType extends InputType {
  includesNum: boolean;
  includesSpecialChar: boolean;
  hasMin8char: boolean;
  includesCapitalLetter: boolean;
}

export enum OptsFormat {
  CoursesLevelThrees
}

export interface InputOptions {
  key: number | string;
  value: string;
}
