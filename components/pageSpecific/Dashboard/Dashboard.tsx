import { useState } from "react";
import Image from "next/image";
import { hero_img } from "@/helpers/imageImports";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { HiMiniCalendar } from "react-icons/hi2";
import CustomSelectInput from "@/components/Inputs/CustomSelectInput";
import { InputType } from "@/interface/input";
import Input from "@/components/Inputs/Input";
import { Button } from "@/components/Ui/Buttons";
import {
	apartmentOffersCardsBP,
	destinationCardsBreakpoints,
} from "@/utils/swiperBreakpoints";
import DestinationsContainer from "@/components/Containers/DestinationsContainer";
import { DestinationType } from "@/interface/destination";
import { ApartmentTypes } from "@/interface/apartments";
import ApartmentOfferContainer from "@/components/Containers/ApartmentOfferContainer";
import ExplorePlacesContainer from "@/components/Containers/ExplorePlacesContainer";

import styles from "./Dashboard.module.scss";
interface Props {
	destinations: DestinationType[];
	apartments: ApartmentTypes[];
}

const Dashboard = ({ apartments, destinations }: Props) => {
	const [destinationInput, setDestinationInput] = useState<InputType>();

	return (
		<>
			<div className={styles.hero}>
				<div className={styles.hero_img}>
					<Image alt="Image of an apartment" src={hero_img} priority />
				</div>

				<form className={styles.search_form}>
					<div
						className={`${styles.search_form_input} ${styles.search_form_input_1}`}>
						<CiLocationOn size={28} />
						<CustomSelectInput
							className={`${styles.no_border} bold`}
							portalTarget="__next"
							setState={setDestinationInput}
							disabledSelection="Where Are You Going?"
							selectOptions={[
								{ value: "London", key: "london" },
								{ value: "New York", key: "new york" },
								{ value: "Amsterdam", key: "amsterdam" },
								{ value: "Venice", key: "venice" },
								{ value: "Rome", key: "rome" },
							]}
						/>
					</div>

					<div
						className={`${styles.search_form_input} ${styles.search_form_input_2}`}>
						<HiMiniCalendar size={28} />
						<Input
							className={`${styles.no_border} bold`}
							setState={setDestinationInput}
							type="date"
							placeholder="Check-in Date"
						/>
					</div>

					<div
						className={`${styles.search_form_input} ${styles.search_form_input_3}`}>
						<CiUser size={28} />
						<CustomSelectInput
							className={`${styles.no_border} bold`}
							portalTarget="__next"
							setState={setDestinationInput}
							selectOptions={[
								{ value: "3 Adults", key: "3" },
								{ value: "1 Adult", key: "1" },
								{ value: "Couples", key: "couple" },
								{ value: "Adults with children", key: "adults-and-children" },
							]}
						/>
					</div>

					<div className={styles.btn}>
						<Button className="bold">Search</Button>
					</div>
				</form>
			</div>

			<DestinationsContainer
				destinations={destinations}
				heading="Trending Destinations"
				breakpoints={destinationCardsBreakpoints}
			/>

			<ApartmentOfferContainer
				apartmentOffers={apartments}
				breakpoints={apartmentOffersCardsBP}
				heading="Best Offers"
			/>

			<ExplorePlacesContainer
				destinations={destinations}
				heading="Explore France"
				breakpoints={destinationCardsBreakpoints}
			/>
		</>
	);
};

export default Dashboard;
