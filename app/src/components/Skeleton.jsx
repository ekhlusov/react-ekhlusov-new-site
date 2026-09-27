import React from "react";

// Заглушка на время загрузки — повторяет форму страницы, чтобы она не прыгала
const Line = ({ width }) => (
	<span className="skeleton__line" style={{ width }} />
);

const Skeleton = () => (
	<div className="cv" aria-busy="true" aria-label="Резюме загружается…">
		<div className="profile">
			<span className="skeleton__photo" />
			<div className="profile__head">
				<Line width="45%" />
				<Line width="35%" />
				<Line width="70%" />
			</div>
		</div>

		<div className="cv__body">
			<div />
			<div className="cv__content">
				{[0, 1, 2].map(key => (
					<div className="skeleton__entry" key={key}>
						<Line width="30%" />
						<Line width="50%" />
						<Line width="95%" />
						<Line width="85%" />
					</div>
				))}
			</div>
		</div>
	</div>
);

export default Skeleton;
