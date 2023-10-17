import ProfileLayout from "@/components/Layouts/ProfileLayout";
import Dashboard from "@/components/pageSpecific/Dashboard/Dashboard";

const IndexPage = () => {
	return (
		<ProfileLayout>
			<Dashboard />
		</ProfileLayout>
	);
};

export default IndexPage;
