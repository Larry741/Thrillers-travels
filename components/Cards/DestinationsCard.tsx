import { DestinationType } from "@/interface/destination";
import styles from "./DestinationsCard.module.scss";
import Image from "next/image";
import { PiStarFill } from "react-icons/pi";

interface Props {
	destination: DestinationType;
}

const DestinationsCard = ({ destination }: Props) => {
	return (
		<div className={styles.destination}>
			<Image
				alt={`An image of ${destination.city}`}
				width={120}
				height={120}
				src={destination.imageUrl}
			/>

			<div className={styles.destination_data}>
				<div className={styles.destination_data_loc}>
					<div className="size_20 ellipses bold">
						{destination.city}, {destination.country}{" "}
					</div>

					<div className={styles.destination_data_loc_rate}>
						<PiStarFill size={14} />{" "}
						<span className="size_12 bold">{destination.rating}/5</span>
					</div>
				</div>

				<div className={`${styles.destination_data_text} size_14`}>
					{destination.text}{" "}
				</div>

				<div className={`${styles.destination_data_amount} size_17 bold`}>
					${destination.amount.toLocaleString()}
				</div>
			</div>
		</div>
	);
};

export default DestinationsCard;
