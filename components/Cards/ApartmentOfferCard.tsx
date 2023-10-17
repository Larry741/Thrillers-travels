import { useState } from "react";
import { ApartmentTypes } from "@/interface/apartments";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import styles from "./ApartmentOfferCard.module.scss";

interface Props {
	apartments: ApartmentTypes;
}

const ApartmentOfferCard = ({ apartments }: Props) => {
	const [isLiked, setIsLiked] = useState<boolean>(false);

	return (
		<Link href="/" className={styles.apartment}>
			<Image
				alt={`An image of ${apartments.name}`}
				src={apartments.imageUrl}
				width={120}
				height={120}
			/>

			<div className={styles.apartment_data}>
				<div className="size_18 ellipses bold">{apartments.name}</div>

				<div className={styles.apartment_data_loc}>
					<CiLocationOn size={19} />
					<span className="size_14 bold">
						{apartments.city} / {apartments.country}
					</span>
				</div>
			</div>

			<div className={styles.apartment_amount}>
				<div>
					<span className="size_18 bold">
						${apartments.amount.toLocaleString()}
					</span>
					/<span className="size_14">night</span>
				</div>

				<button
					className={`${styles.apartment_amount_like_btn} ${
						isLiked ? styles.isLiked : ""
					}`}
					onClick={() => setIsLiked((prevState) => !prevState)}>
					{!isLiked ? <BsHeart size={16} /> : <BsHeartFill size={16} />}
				</button>
			</div>
		</Link>
	);
};

export default ApartmentOfferCard;
