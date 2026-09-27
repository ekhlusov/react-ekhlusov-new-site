import React from "react";
import Profile from "./components/Profile";
import Contacts from "./components/Contacts";
import SectionNav from "./components/SectionNav";
import RightContainer from "./components/RightContainer";
import { DataContext } from "./components/helpers/data-context";
// Резюме хранится прямо в репозитории — бэкенда и базы нет.
// Чтобы поменять текст на сайте, правьте этот файл.
import cv from "./data/cv.json";

const App = () => {
	return (
		<DataContext.Provider value={cv}>
			<a className="skip-link" href="#content">
				Перейти к содержимому
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
