// @ Ts-ignore
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LiaAngleRightSolid, LiaAngleLeftSolid } from "react-icons/lia";
import { SwiperBreakpoints } from "@/interface/index";
import { DestinationType } from "@/interface/destination";
import DestinationsCard from "../Cards/DestinationsCard";

import styles from "./DestinationsContainer.module.scss";

interface Props {
	heading: string;
	destinations: DestinationType[];
	breakpoints: SwiperBreakpoints;
}

const DestinationsContainer = ({
	heading,
	destinations,
	breakpoints,
}: Props) => {
	return (
		<div className={`destination-cards-container`}>
			<div className={styles.header}>
				<h2 className="size_25 bold">{heading}</h2>

				<div className={styles.header_btns}>
					<button className="dest-prev">
						<LiaAngleLeftSolid size={14} />
					</button>
					<button className="dest-next">
						<LiaAngleRightSolid size={14} />
					</button>
				</div>
			</div>

			<div className={"slider_container"}>
				<Swiper
					breakpoints={breakpoints}
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
					autoplay={{
						delay: 15000,
						disableOnInteraction: false,
					}}
					navigation={{
						nextEl: ".dest-next",
						prevEl: ".dest-prev",
					}}
					spaceBetween={15}
					modules={[Pagination, Navigation, Autoplay]}
					// cssMode={true}
					className="destination-swiper">
					{destinations.map((destination, idx: number) => {
						return (
							<SwiperSlide key={`${destination.city}${idx}`}>
								<DestinationsCard destination={destination} />
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
};

export default DestinationsContainer;
