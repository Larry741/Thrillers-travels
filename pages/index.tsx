import ProfileLayout from "@/components/Layouts/ProfileLayout";
import Dashboard from "@/components/pageSpecific/Dashboard/Dashboard";
import { GetStaticPropsResult } from "next";
import { DestinationType } from "@/interface/destination";
import { APP_REVALIDATE_TIME } from "@/utils/constants";
import { apartments, destinations } from "@/utils/mock";
import { ApartmentTypes } from "@/interface/apartments";

interface Props {
	destinations: DestinationType[];
	apartments: ApartmentTypes[];
}

const IndexPage = ({ apartments, destinations }: Props) => {
	return (
		<ProfileLayout>
			<Dashboard apartments={apartments} destinations={destinations} />
		</ProfileLayout>
	);
};

export default IndexPage;

export const getStaticProps = async (): Promise<
	GetStaticPropsResult<Props>
> => {
	// fetch Apartment and destinations data

	// if (!data) {
	// 	return {
	// 		notFound: true,
	// 	};
	// }

	return {
		props: {
			apartments,
			destinations,
		},
		revalidate: APP_REVALIDATE_TIME,
	};
};
