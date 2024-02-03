import { FC } from "react";
import { QuantityRegistry } from "../assets/static/quantities";
import { Katex } from "./components/KaTeX";

export const App: FC = () => {
	return (
		<div>
			{Object.values(QuantityRegistry).map(
				(value, index) => (
					<div key={`item-${index}`}>
						<Katex>{value.latexLabel}</Katex>
						<span>{value.label}</span>
					</div>
				),
			)}
		</div>
	);
};
