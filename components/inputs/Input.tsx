import React, { Dispatch, useEffect } from "react";
import Image from "next/image";
import { useInput } from "@/hooks/use-Input";
import { InputType } from "@/interface/input";
import { CiSearch } from "react-icons/ci";

import styles from "./Input.module.scss";
// import { redWarningIcon } from "helpers/image-paths";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	value?: string;
	label?: {
		text: string;
		className: string;
	};
	focusable?: boolean;
	canBeInvalid?: boolean;
	errorText?: string;
	initRenderUpdate?: boolean;
	resetInput?: boolean;
	setResetInput?: Dispatch<boolean>;
	setState?: Dispatch<InputType>;
	validationFn?: (value: string) => void;
}

const Input = React.memo(
	({
		value,
		label,
		errorText,
		className,
		resetInput,
		focusable = true,
		canBeInvalid = true,
		initRenderUpdate = false,
		setState,
		setResetInput,
		validationFn = (value: string) => true,
		...props
	}: InputProps) => {
		const {
			enteredValue,
			inputIsValid,
			inputIsInvalid,
			inputBlured,
			inputIsTouched,
			inputBlurHandler,
			valueChangeHandler,
			reset,
		} = useInput(validationFn, value);

		useEffect(() => {
			if (setState && (initRenderUpdate ? true : inputIsTouched)) {
				setState({
					value: enteredValue,
					isValid: inputIsValid,
					isTouched: inputIsTouched,
				});
			}
		}, [
			enteredValue,
			inputIsValid,
			inputIsTouched,
			initRenderUpdate,
			setState,
		]);

		useEffect(() => {
			if (setResetInput && resetInput && inputIsTouched) {
				reset();
				setResetInput(false);
			}
		}, [resetInput, inputIsTouched, setResetInput, reset]);

		const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
			valueChangeHandler(e.target.value);
		};

		return (
			<div className={`${styles.input_control}`}>
				{label ? (
					<label
						htmlFor={label.text}
						className={`${styles.label} ${label.className}`}>
						{label.text}
					</label>
				) : (
					""
				)}

				{props.type === "search" && (
					<div className={styles.searchIcon}>
						<CiSearch size={22} />
					</div>
				)}

				<input
					id={label?.text ?? ""}
					value={enteredValue}
					className={`${styles.input} ${focusable ? styles.focusable : ""} ${
						inputIsInvalid && focusable && canBeInvalid
							? `${styles.invalid}`
							: ""
					} ${props.type === "search" ? styles.searchInput : ""} ${
						className ? className : ""
					} size_17`}
					{...props}
					onBlur={inputBlurHandler}
					onChange={inputChangeHandler}
				/>

				{/* {canBeInvalid && !inputIsValid && inputBlured && (
          <div className={styles.input_error}>
            <Image alt="logo" src={redWarningIcon} objectFit="contain" />
						<span className={`${styles.errText}  xx-small`}>{errorText}</span>
          </div>
        )} */}
			</div>
		);
	}
);
Input.displayName = "Input";

export default Input;
