import React from "react";
import Profile from "./components/Profile";
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

			<div className="cv">
				<Profile />

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
