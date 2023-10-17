import { ReactNode } from "react";
import styles from "./Buttons.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	isLoading?: boolean;
	LoaderWidth?: string;
	loaderStrokeColor?: string;
}

export const Button = ({
	children,
	className,
	LoaderWidth = "23",
	loaderStrokeColor,
	...props
}: Props) => {
	return (
		<button
			{...props}
			className={`${styles.button} ${styles.btn_filled} ${
				className ? className : ""
			}`}>
			{children}
		</button>
	);
};
