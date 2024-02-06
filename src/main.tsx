import React from "react";
import ReactDOM from "react-dom/client";

import "katex/dist/katex.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { App } from "./App/App.tsx";

ReactDOM.createRoot(
	document.getElementById("root")!,
).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
