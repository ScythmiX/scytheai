import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";

(async function initEruda() {
	if (import.meta.env.DEV) {
		const eruda = await import("eruda");
		eruda.init();
	}

	try {
		const { default: App } = await import("./App.jsx");
		createRoot(document.getElementById("root")).render(
			<StrictMode>
				<App />
			</StrictMode>,
		);
	} catch (err) {
		console.error("Error importing App.jsx:", err);
	}
})();
