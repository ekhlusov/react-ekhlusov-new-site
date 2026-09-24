import { useEffect, useState } from "react";

import mockData from "../../mocks/cv.json";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const LOGIN = import.meta.env.VITE_LOGIN;
const PASSWORD = import.meta.env.VITE_PASSWORD;

const buildHeaders = () => {
	if (!LOGIN || !PASSWORD) {
		return undefined;
	}

	return new Headers({
		Authorization: `Basic ${btoa(`${LOGIN}:${PASSWORD}`)}`,
	});
};

const fetchCv = async () => {
	const response = await fetch(`${BACKEND_URL}/api/v1/main`, {
		method: "GET",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: buildHeaders(),
	});

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`);
	}

	const json = await response.json();

	return json?.data;
};

/*
 * Данные резюме: с бэкенда, если он настроен и отвечает, иначе — локальный мок.
 * Фоллбэк нужен, чтобы страница не висела вечно на спиннере без бэкенда.
 */
const useFetch = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		const load = async () => {
			let result = mockData;

			if (!BACKEND_URL) {
				console.warn(
					"VITE_BACKEND_URL не задан — показываем локальный мок src/mocks/cv.json"
				);
			} else {
				try {
					result = await fetchCv();
				} catch (error) {
					console.error(
						`Не удалось получить резюме с ${BACKEND_URL} — показываем локальный мок:`,
						error
					);
				}
			}

			if (!cancelled) {
				setData(result);
				setLoading(false);
			}
		};

		load();

		return () => {
			cancelled = true;
		};
	}, []);

	return [data, loading];
};

export { useFetch };
