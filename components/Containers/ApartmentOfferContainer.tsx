// @ts-ignore
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LiaAngleRightSolid, LiaAngleLeftSolid } from "react-icons/lia";
import { SwiperBreakpoints } from "@/interface/index";

import styles from "./DestinationsContainer.module.scss";
import { ApartmentTypes } from "@/interface/apartments";
import Link from "next/link";
import ApartmentOfferCard from "../Cards/ApartmentOfferCard";

interface Props {
	heading: string;
	apartmentOffers: ApartmentTypes[];
	breakpoints: SwiperBreakpoints;
}

const ApartmentOfferContainer = ({
	heading,
	apartmentOffers,
	breakpoints,
}: Props) => {
	return (
		<div className={`destination-cards-container`}>
			<div className={styles.header}>
				<h2 className="size_25 lighter">{heading}</h2>

				<div className={styles.header_btns}>
					<Link href={"/"} className={`${styles.link} bold size_13`}>
						View All
					</Link>
				</div>
			</div>

			<div className={"slider_container"}>
				<Swiper
					breakpoints={breakpoints}
					navigation={{
						nextEl: ".apt-next",
						prevEl: ".apt-prev",
					}}
					spaceBetween={15}
					modules={[Navigation]}
					// cssMode={true}
					className="destination-swiper">
					{apartmentOffers.map((apartment, idx: number) => {
						return (
							<SwiperSlide key={`${apartment.city}${idx}`}>
								<ApartmentOfferCard apartments={apartment} />
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
};

export default ApartmentOfferContainer;
