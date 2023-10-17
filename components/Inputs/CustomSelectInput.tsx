import React, {
	Dispatch,
	useEffect,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { InputOptions, InputType, OptsFormat } from "@/interface/input";
import { useInput } from "@/hooks/use-Input";
import getScrollParent from "@/utils/getScrollableParent";

import styles from "./CustomSelectInput.module.scss";

export interface SelectInputProps
	extends React.InputHTMLAttributes<HTMLSelectElement> {
	label?: {
		text: string;
		className: string;
	};
	resetInput?: boolean;
	initialValue?: string;
	disabledSelection?: string;
	inputCanBeInvalid?: boolean;
	defaultSelection?: string;
	selectOptions?: InputOptions[];
	isFocusAble?: boolean;
	initRenderUpdate?: boolean;
	portalTarget: "__next" | "modal";
	setResetInput?: Dispatch<boolean>;
	setRequired?: Dispatch<boolean>;
	setState: Dispatch<InputType>;
}

interface Style {
	top?: number;
	bottom?: number;
	left: number;
	width: number;
}

export const SELECT_SELECTIONS = {
	disabled: "none",
	default: "all",
};

const CustomSelectInput = ({
	label,
	resetInput,
	selectOptions,
	initialValue,
	defaultSelection,
	disabledSelection,
	isFocusAble = true,
	portalTarget = "__next",
	inputCanBeInvalid = true,
	initRenderUpdate = false,
	setResetInput,
	setRequired,
	setState,
	...props
}: SelectInputProps) => {
	const inputContRef = useRef<HTMLDivElement>(null);
	const [dropdownIsVisible, setDropdownIsVisible] = useState<boolean>(false);
	const {
		enteredValue,
		inputIsValid,
		inputIsInvalid,
		inputIsTouched,
		inputBlured,
		inputBlurHandler,
		valueChangeHandler,
		reset,
	} = useInput(
		(val: string) => val !== SELECT_SELECTIONS.disabled,
		initialValue
			? initialValue
			: disabledSelection
			? SELECT_SELECTIONS.disabled
			: defaultSelection
			? SELECT_SELECTIONS.default
			: selectOptions && selectOptions.length > 0
			? `${selectOptions[0].key}`
			: ""
	);
	const [style, setStyle] = useState<Style>();
	const closeInputHandlerRef = useRef<() => void>();
	const dropdownListdropDownListRef = useRef<HTMLUListElement>(null);
	const scrollParentRef = useRef<any>(null);
	const inputKeyValueMap = useRef<{ [key in string]?: string }>({});
	defaultSelection
		? (inputKeyValueMap.current[SELECT_SELECTIONS.default] = defaultSelection)
		: null;
	const docWidth = 1300;

	useEffect(() => {
		// if (docWidth <= 1200) return;
		if (setState && (initRenderUpdate ? true : inputIsTouched)) {
			setState({
				value: enteredValue === SELECT_SELECTIONS.default ? "" : enteredValue,
				isValid: inputIsValid,
				isTouched: inputIsTouched,
			});
		}
	}, [
		docWidth,
		enteredValue,
		inputIsValid,
		inputIsTouched,
		setState,
		initRenderUpdate,
	]);

	useEffect(() => {
		if (setResetInput && resetInput && inputIsTouched) {
			reset();
			setResetInput(false);
		}
	}, [
		resetInput,
		inputIsTouched,
		defaultSelection,
		disabledSelection,
		initialValue,
		selectOptions,
		valueChangeHandler,
		setResetInput,
		reset,
	]);

	useEffect(() => {
		// if (docWidth <= 1200) return;
		if (props.required && inputContRef.current) {
			inputContRef.current.scrollIntoView();
		}
	}, [props.required, docWidth]);

	const inputChangeHandler = (
		e: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		e.stopPropagation();
		valueChangeHandler(`${e.currentTarget.dataset.selectVal}`);
		if (props.required && setRequired) setRequired(false);
		setDropdownIsVisible(false);
	};

	const options = useMemo<InputOptions[]>(() => {
		if (selectOptions) {
			return selectOptions.map((option) => {
				inputKeyValueMap.current[`${option.key}`] = option.value;
				return option;
			});
		} else {
			return [];
		}
	}, [selectOptions]);

	const scrollResizeEventHandler = useCallback(() => {
		setStyle(getDropdownStyle(dropdownListdropDownListRef.current!));
	}, []);

	useEffect(() => {
		// if (docWidth <= 1200) return;

		closeInputHandlerRef.current = () => {
			if (!dropdownIsVisible) return;

			if (scrollParentRef.current) {
				scrollParentRef.current.removeEventListener(
					"scroll",
					scrollResizeEventHandler
				);
			}
			window.removeEventListener("resize", scrollResizeEventHandler);

			setDropdownIsVisible(false);
			inputBlurHandler();
		};

		if (dropdownIsVisible) {
			if (scrollParentRef.current) {
				scrollParentRef.current.addEventListener(
					"scroll",
					scrollResizeEventHandler
				);
			}
			window.addEventListener("resize", scrollResizeEventHandler);
			document.documentElement.addEventListener(
				"click",
				closeInputHandlerRef.current
			);
		}

		return () => {
			if (scrollParentRef.current) {
				scrollParentRef.current.removeEventListener(
					"scroll",
					scrollResizeEventHandler
				);
			}
			document.documentElement.removeEventListener(
				"click",
				closeInputHandlerRef.current!
			);
			window.removeEventListener("resize", scrollResizeEventHandler);
		};
	}, [
		dropdownIsVisible,
		dropdownListdropDownListRef,
		inputBlurHandler,
		scrollResizeEventHandler,
	]);

	const showSelectDropdown = useCallback(
		(e: React.MouseEvent<HTMLUListElement>) => {
			const scrollContainer = getScrollParent(e.currentTarget);
			scrollParentRef.current = scrollContainer;
			if (!scrollContainer) return;

			if (!dropdownIsVisible) {
				scrollResizeEventHandler();
				setDropdownIsVisible(true);
			} else {
				setDropdownIsVisible(false);
			}
		},
		[dropdownIsVisible, scrollResizeEventHandler]
	);

	return (
		<>
			<div
				id="select_input_container"
				ref={inputContRef}
				className={`${styles.input_control}`}>
				{label ? (
					<label
						className={`${styles.label} ${label.className}`}
						htmlFor={label.text}>
						{label.text}
					</label>
				) : (
					""
				)}

				<ul
					onClick={(e: React.MouseEvent<HTMLUListElement>) => {
						if (props.disabled) return;
						e.stopPropagation();
						document.documentElement.click();
						showSelectDropdown(e);
					}}
					ref={dropdownListdropDownListRef}
					className={`${styles.dropdownListInput} ${
						dropdownIsVisible && isFocusAble ? styles.focused : ""
					} ${props.disabled ? styles.disabled : ""}  ${
						(inputIsInvalid && disabledSelection && inputCanBeInvalid) ||
						props.required
							? `${styles.invalid}`
							: ""
					} size_17 ${props.className} `}>
					<li
						className={`${styles.display_list_item} ${
							enteredValue === SELECT_SELECTIONS.disabled
								? styles.disabled_selection
								: ""
						}`}>
						{enteredValue === SELECT_SELECTIONS.disabled
							? disabledSelection
							: inputKeyValueMap.current[`${enteredValue}`]}
					</li>

					{dropdownIsVisible ? (
						<>
							{createPortal(
								<ul
									style={style}
									className={`${styles.dropdown_container} hide-scrollbar size_16`}>
									{defaultSelection && (
										<li
											onClick={inputChangeHandler}
											className={`${styles.dropdown_li}`}
											data-select-val={SELECT_SELECTIONS.default}>
											<span>{defaultSelection} </span>
										</li>
									)}

									{options.length ? (
										options.map((option, idx) => {
											return (
												<li
													key={idx}
													onClick={inputChangeHandler}
													data-select-val={`${option.key}`}
													className={`${styles.dropdown_li}`}>
													<span>{option.value}</span>
												</li>
											);
										})
									) : (
										<div className={styles.empty_list}></div>
									)}
								</ul>,
								document.body
							)}
						</>
					) : (
						<></>
					)}
				</ul>
			</div>
		</>
	);
};

export default React.memo(CustomSelectInput);

const getDropdownStyle = (targetParentElement: HTMLElement): Style => {
	const elRectBottom = targetParentElement.getBoundingClientRect().top + 352;

	let elStyle: Style = {
		left: targetParentElement.getBoundingClientRect().left,
		width: targetParentElement.getBoundingClientRect().width,
	};

	if (elRectBottom > document.documentElement.clientHeight) {
		elStyle.bottom =
			document.documentElement.clientHeight -
			targetParentElement.getBoundingClientRect().bottom +
			targetParentElement.getBoundingClientRect().height;
	} else {
		elStyle.top =
			targetParentElement.getBoundingClientRect().top +
			targetParentElement.getBoundingClientRect().height;
	}
	return elStyle;
};
