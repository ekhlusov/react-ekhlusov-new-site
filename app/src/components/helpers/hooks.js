import { useState, useEffect } from "react";

const useFetch = url => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchUrl() {
		const response = await fetch(url);
		const json = await response.json();

		console.log(json);

		setData(json);
		setLoading(false);
	}

	useEffect(() => {
		fetchUrl();
		// eslint-disable-next-line
	}, []);

	return [data, loading];
};

export { useFetch };
