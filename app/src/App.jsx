import React from "react";
import Profile from "./components/Profile";
import Contacts from "./components/Contacts";
import SectionNav from "./components/SectionNav";
import RightContainer from "./components/RightContainer";
import Skeleton from "./components/Skeleton";
import { useFetch } from "./components/helpers/hooks";
import { DataContext } from "./components/helpers/data-context";

const App = () => {
	const [data, loading] = useFetch();

	if (loading) {
		return <Skeleton />;
	}

	return (
		<DataContext.Provider value={data}>
			<a className="skip-link" href="#content">
				К опыту работы
			</a>

			<Profile />

			<div className="cv">
				{/* На узком экране контакты не помещаются в шапку */}
				<div className="intro">
					<Contacts />
				</div>

				<div className="cv__body">
					<SectionNav />

					<main id="content" className="cv__content">
						<RightContainer />
					</main>
				</div>
			</div>
		</DataContext.Provider>
	);
};

export default App;
