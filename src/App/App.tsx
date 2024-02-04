import { FC } from "react";

import {
	Variable,
	variableGet,
} from "../assets/variables";
import { calculateSteps } from "../core/calculateSteps";
import { Graph } from "./components/Graph";
import { EquationRegistry } from "../assets/equations";

export const App: FC = () => {
	const targetVar = variableGet("Density");
	const givenVars: Variable[] = [
		variableGet("Pressure"),
		// variableGet("Amount of substance"),
		variableGet("Temperature"),
		// variableGet("Force"),
	];
	return (
		<div>
			<div>
				Known:{" "}
				{givenVars
					.map((givenVar) => givenVar.label)
					.join(", ")}
			</div>
			<div>To find: {targetVar.label}</div>
			<hr />
			{calculateSteps(
				targetVar,
				givenVars,
				EquationRegistry,
			).map((path, index) => {
				return (
					<div style={{ paddingLeft: "2rem" }}>
						<Graph
							first={index === 0}
							key={`topgraph-${index}`}
							path={path}
						/>
						<hr />
					</div>
				);
			})}
		</div>
	);
};
