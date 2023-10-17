import { ReactNode, useState } from "react";
import styles from "./ProfileLayout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	IoHomeOutline,
	IoHomeSharp,
	IoNotificationsOutline,
} from "react-icons/io5";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";
import { HiMail, HiOutlineMail } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiSettingsFill, RiSettingsLine } from "react-icons/ri";
import { LiaAngleRightSolid } from "react-icons/lia";
import Input from "../Inputs/Input";
import { InputType } from "@/interface/input";
import format from "date-fns/format";
import Image from "next/image";
import { mockProfle_img } from "@/helpers/imageImports";

interface Props {
	children: ReactNode;
}

const ProfileLayout = ({ children }: Props) => {
	const router = useRouter();
	const [searchInput, setSearchInput] = useState<InputType>();

	return (
		<main className={styles.profile}>
			<section className={styles.profile_nav}>
				<div className={styles.profile_nav_header}>
					<h1 className="size_28">
						Mima<span className={styles.colored}>Booking</span>
					</h1>

					<div className={styles.profile_nav_header_avatar}>
						<div className={styles.profile_nav_header_avatar_avt}>
							<Image alt="Your profile image" src={mockProfle_img} />
						</div>

						<button className={styles.profile_nav_header_avatar_edit_btn}>
							<CiEdit size={22} />
						</button>
					</div>

					<span className={`${styles.profile_nav_header_name} size_23 bold`}>
						Ilia Jan
					</span>
				</div>

				<div className={`${styles.profile_nav_links} size_16 bold`}>
					<Link
						className={`${styles.link} ${
							router.asPath === "/" ? styles.active_link : ""
						}`}
						href={"/"}>
						{router.asPath === "/" ? (
							<IoHomeSharp size={22} />
						) : (
							<IoHomeOutline size={22} />
						)}
						Dashboard
					</Link>

					<Link
						className={`${styles.link} ${
							router.asPath === "/explore" ? styles.active_link : ""
						}`}
						href={"/"}>
						{router.asPath === "/explore" ? (
							<HiMiniSquares2X2 size={22} />
						) : (
							<HiOutlineSquares2X2 size={22} />
						)}
						Explore City
					</Link>

					<Link
						className={`${styles.link} ${
							router.asPath === "/ticket" ? styles.active_link : ""
						}`}
						href={"/"}>
						{router.asPath === "/ticket" ? (
							<HiMail size={22} />
						) : (
							<HiOutlineMail size={22} />
						)}
						Ticket
					</Link>

					<Link
						className={`${styles.link} ${
							router.asPath === "/favorite" ? styles.active_link : ""
						}`}
						href={"/"}>
						{router.asPath === "/favorite" ? (
							<AiFillHeart size={22} />
						) : (
							<AiOutlineHeart size={22} />
						)}
						Favorite
					</Link>

					<Link
						className={`${styles.link} ${
							router.asPath === "/Settings" ? styles.active_link : ""
						}`}
						href={"/"}>
						{router.asPath === "/Settings" ? (
							<RiSettingsFill size={22} />
						) : (
							<RiSettingsLine size={22} />
						)}
						Settings
					</Link>
				</div>

				<div className={`${styles.profile_nav_logout}`}>
					<span className={`${styles.profile_nav_logout_btn} size_16 bold`}>
						<div className={styles.profile_nav_logout_btn_icon}>
							<LiaAngleRightSolid size={11} />
						</div>
						Logout
					</span>
				</div>
			</section>

			<section className={styles.profile_content}>
				<nav className={styles.profile_content_nav}>
					<div className={styles.profile_content_nav_input}>
						<Input
							type="search"
							setState={setSearchInput}
							className="ubuntu"
							placeholder="Search any thing..."
							canBeInvalid={false}
						/>
					</div>

					<div className={styles.profile_content_nav_not}>
						<div className="bold">
							{format(new Date(), "EEEE, MMMM dd, yyyy")}
						</div>

						<div className={styles.profile_content_nav_not_cont}>
							<IoNotificationsOutline size={22} />

							<div
								className={`${styles.profile_content_nav_not_cont_panel} size_12`}>
								30
							</div>
						</div>
					</div>
				</nav>

				<div>{children}</div>
			</section>
		</main>
	);
};

export default ProfileLayout;
