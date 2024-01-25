import { FC } from "react";
import { equationSearch } from "./assets/equations";
import { Quantities } from "./assets/quantities";

export const App: FC = () => {
	const eqs = equationSearch(
		Quantities.TEMPERATURE,
		[
			Quantities.AMOUNT_OF_SUBSTANCE,
			Quantities.FORCE,
			Quantities.AREA,
			Quantities.VOLUME,
		],
	);

	return (
		<div>
			{eqs.length > 0
				? eqs.map((eq, i) => {
						return (
							<div key={`equation-result-${i}`}>
								{eq.name}
								<ul>
									{eq.variables.map((q, j) => {
										return (
											<li
												key={`equation-var-${j}`}
											>
												{q}
											</li>
										);
									}) ?? "None"}
								</ul>
								<hr />
							</div>
						);
				  })
				: "None"}
		</div>
	);
};
