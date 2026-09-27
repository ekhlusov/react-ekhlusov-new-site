import React from "react";
import Sidebar from "./components/Sidebar";
import RightContainer from "./components/RightContainer";
import { useFetch } from "./components/helpers/hooks";
import { Col, Container, Row } from "reactstrap";
import { DataContext } from "./components/helpers/data-context";
import StickyBox from "react-sticky-box";
import Skeleton from "./components/Skeleton";

const App = () => {
	const [data, loading] = useFetch();

	if (loading) {
		return <Skeleton />;
	}

	return (
		<Container className="cv">
			<a className="skip-link" href="#content">
				К опыту работы
			</a>
			<DataContext.Provider value={data}>
				<Row>
					<Col md="4" className="cv__aside">
						<StickyBox
							offsetTop={24}
							offsetBottom={24}
							className="sticky-block"
						>
							<Sidebar />
						</StickyBox>
					</Col>

					<Col md="8" tag="main" id="content" className="cv__content">
						<RightContainer />
					</Col>
				</Row>
			</DataContext.Provider>
		</Container>
	);
};

export default App;
