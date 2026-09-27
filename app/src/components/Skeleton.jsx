import React from "react";
import { Col, Container, Row } from "reactstrap";

// Заглушка на время загрузки — повторяет форму страницы, чтобы она не прыгала
const Line = ({ width }) => (
	<span className="skeleton__line" style={{ width }} />
);

const Skeleton = () => (
	<Container className="cv" aria-busy="true" aria-label="Резюме загружается…">
		<Row>
			<Col md="4" className="cv__aside">
				<span className="skeleton__photo" />
				<Line width="80%" />
				<Line width="65%" />
				<Line width="50%" />
			</Col>

			<Col md="8" className="cv__content">
				<Line width="35%" />
				{[0, 1, 2].map(key => (
					<div className="skeleton__entry" key={key}>
						<Line width="100%" />
						<div>
							<Line width="45%" />
							<Line width="95%" />
							<Line width="90%" />
							<Line width="70%" />
						</div>
					</div>
				))}
			</Col>
		</Row>
	</Container>
);

export default Skeleton;
