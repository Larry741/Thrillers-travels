import { useState, useCallback, useRef } from "react";

export const useInput = (validationFn: Function, initialValue?: string) => {
  const [enteredValue, setEnteredValue] = useState<string>(initialValue ?? "");
  const [inputIsChanged, setInputIsChanged] = useState<boolean>(false);
  const [inputBlured, setInputIsBlur] = useState<boolean>();
  const [inputIsTouched, setInputIsTouched] = useState<boolean>(false);

  const initialValueRef = useRef<string>(initialValue ?? "");

  const inputIsValid = validationFn(enteredValue);
  const inputIsInvalid = !inputIsValid && inputBlured;

  const inputBlurHandler = useCallback(() => {
    setInputIsBlur(true);
  }, []);

  const valueChangeHandler = useCallback((value: string) => {
    setInputIsChanged(true);
    setInputIsTouched(true);
    setEnteredValue(value);
  }, []);

  const resetIsChanged = useCallback(() => {
    setInputIsChanged(false);
  }, []);

  const reset = useCallback(() => {
    setEnteredValue(initialValueRef.current);
    setInputIsChanged(false);
    setInputIsBlur(false);
    setInputIsTouched(false);
  }, []);

  return {
    enteredValue,
    inputIsValid,
    inputIsInvalid,
    inputIsChanged,
    inputIsTouched,
    inputBlured,
    inputBlurHandler,
    valueChangeHandler,
    resetIsChanged,
    reset
  };
};

export const useDateInput = (validationFn: Function, initialValue?: string) => {
  const [enteredValue, setEnteredValue] = useState(initialValue || "");
  const [inputIsChanged, setInputIsChanged] = useState(false);
  const [inputBlured, setInputIsBlur] = useState<boolean>();
  const [inputIsTouched, setInputIsTouched] = useState<boolean>(false);

  const inputIsValid = validationFn(enteredValue);
  const inputIsInvalid = !inputIsValid && inputBlured;

  const inputBlurHandler = useCallback(() => {
    setInputIsBlur(true);
  }, []);

  const valueChangeHandler = useCallback((value: string) => {
    setInputIsChanged(true);
    setEnteredValue(value);
    setInputIsTouched(true);
  }, []);

  const resetIsChanged = useCallback(() => {
    setInputIsChanged(false);
  }, []);

  const reset = useCallback(() => {
    setEnteredValue("");
    setInputIsChanged(false);
    setInputIsTouched(false);
    setInputIsBlur(false);
  }, []);

  return {
    enteredValue,
    inputIsValid,
    inputIsInvalid,
    inputIsChanged,
    inputIsTouched,
    inputBlured,
    inputBlurHandler,
    valueChangeHandler,
    resetIsChanged,
    reset
  };
};

export const usePasswordInput = (
  includesNumFn: (val: string) => boolean,
  includesSpecialCharFn: (val: string) => boolean,
  includesMinLengthFn: (val: string) => boolean,
  includesCapitalLetterFn: (val: string) => boolean
) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [inputBlured, setInputIsBlur] = useState<boolean>();

  const includesNum = includesNumFn(enteredValue);
  const includesSpecialChar = includesSpecialCharFn(enteredValue);
  const hasMin8char = includesMinLengthFn(enteredValue);
  const includesCapitalLetter = includesCapitalLetterFn(enteredValue);

  const inputIsValid =
    includesNum && includesSpecialChar && hasMin8char && includesCapitalLetter;
  const inputIsInvalid = !inputIsValid && inputBlured;

  const inputBlurHandler = useCallback(() => {
    setInputIsBlur(true);
  }, []);

  const inputFocusHandler = useCallback(() => {
    setInputIsFocused(true);
  }, []);

  const valueChangeHandler = useCallback((value: string) => {
    setEnteredValue(value);
    setInputIsTouched(true);
  }, []);

  const reset = useCallback(() => {
    setEnteredValue("");
    setInputIsTouched(false);
    setInputIsBlur(false);
  }, []);

  return {
    enteredValue,
    inputIsValid,
    inputIsInvalid,
    includesNum,
    includesSpecialChar,
    hasMin8char,
    includesCapitalLetter,
    inputIsTouched,
    inputIsFocused,
    inputBlured,
    inputFocusHandler,
    inputBlurHandler,
    valueChangeHandler,
    reset
  };
};
