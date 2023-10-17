import { Pagination } from "swiper";
import { Swiper } from "swiper/react";
import { SwiperBreakpoints } from "@/interface/index";

interface Props {
	children: any;
	heading: string;
	hasContainer?: boolean;
	breakpoints: SwiperBreakpoints;
}

const DestinationsContainer = ({
	children,
	heading,
	hasContainer = false,
	breakpoints,
}: Props) => {
	return (
		<div className={`stats`}>
			{heading ? <h2 className="size_16-18 bold">{heading}</h2> : null}

			<div className={"slider_container"}>
				<Swiper
					breakpoints={breakpoints}
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
					spaceBetween={15}
					modules={[Pagination]}
					// cssMode={true}
					className="stat-swiper swiper-no-padding">
					{children}
				</Swiper>
			</div>
		</div>
	);
};

export default DestinationsContainer;
