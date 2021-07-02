import { useEffect, useState } from "react";

const useFetch = url => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchUrl() {
		const response = await fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: new Headers({
				Authorization: `Basic ${btoa(
					`${process.env.REACT_APP_LOGIN}:${process.env.REACT_APP_PASSWORD}`
				)}`,
			}),
		});
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
