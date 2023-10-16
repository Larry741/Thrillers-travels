import { ReactNode } from "react";
import styles from "./ProfileLayout.module.scss";

interface Props {
	children: ReactNode;
}

const ProfileLayout = ({ children }: Props) => {
	return (
		<main className={styles.profile}>
			<section className={styles.profile_nav}>
				<div>MimaBooking</div>
			</section>
			<section className={styles.profile_content}></section>
		</main>
	);
};

export default ProfileLayout;
