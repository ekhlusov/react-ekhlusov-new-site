import React from "react";
import { createRoot } from "react-dom/client";

import "./moment-ru";

import "./index.scss";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// Старая CRA-сборка регистрировала service worker, который продолжает отдавать
// закешированный билд. Снимаем регистрацию, иначе вернувшиеся посетители
// никогда не увидят новую версию.
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.getRegistrations()
		.then(registrations => registrations.forEach(r => r.unregister()))
		.catch(() => {});
}
