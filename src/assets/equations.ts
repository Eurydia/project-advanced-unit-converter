import {
	Constant,
	constantGet,
} from "@assets/constants";
import {
	Variable,
	variableGet,
} from "@assets/variables";

export const EquationRegistry: Equation[] = [];

export type Equation = {
	label: string;
	latexExpression: string;
	variables: Variable[];
	constants: Constant[];
};

const equationRegister = (
	label: string,
	latexExpression: string,
	variables: Variable[],
	constants: Variable[],
): void => {
	EquationRegistry.push({
		label,
		latexExpression,
		variables,
		constants,
	});
};

equationRegister(
	"Ideal Gas Law",
	"pV = nRT",
	[
		variableGet("Pressure"),
		variableGet("Volume"),
		variableGet("Amount of substance"),
		variableGet("Temperature"),
	],
	[constantGet("Ideal gas constant")],
);
equationRegister(
	"Avogadro's law",
	"\\frac{V_{1}}{n_{1}} = \\frac{V_{2}}{n_{2}}",
	[
		variableGet("Volume"),
		variableGet("Amount of substance"),
	],
	[],
);
equationRegister(
	"Boyle-Mariotte's law",
	"P_{1}V_{1} = P_{2}V_{2}",
	[
		variableGet("Volume"),
		variableGet("Pressure"),
	],
	[],
);
equationRegister(
	"Charles' law",
	"\\frac{V_{1}}{T_{1}} = \\frac{V_{2}}{T_{2}}",
	[
		variableGet("Volume"),
		variableGet("Temperature"),
	],
	[],
);
equationRegister(
	"Gay-Lussac's law",
	"\\frac{P_{1}}{T_{1}} = \\frac{P_{2}}{T_{2}}",
	[
		variableGet("Pressure"),
		variableGet("Temperature"),
	],
	[],
);

equationRegister(
	"Definition of Pressure",
	"p = \\frac{F}{A}",
	[
		variableGet("Pressure"),
		variableGet("Force"),
		variableGet("Area"),
	],
	[],
);
equationRegister(
	"Definition of Density",
	"\\rho = \\frac{m}{V}",
	[
		variableGet("Density"),
		variableGet("Mass"),
		variableGet("Volume"),
	],
	[],
);

equationRegister(
	"Newton's second law of motion",
	"F = ma",
	[
		variableGet("Force"),
		variableGet("Mass"),
		variableGet("Acceleration"),
	],
	[],
);

equationRegister(
	"Definition of displacement",
	"s = \\Delta x",
	[
		variableGet("Displacement"),
		variableGet("Change in position"),
	],
	[],
);

equationRegister(
	"Average velocity",
	"v = \\frac{\\Delta x}{\\Delta t}",
	[
		variableGet("Velocity"),
		variableGet("Displacement"),
		variableGet("Duration"),
	],
	[],
);

equationRegister(
	"Average acceleration",
	"\\bold{a} = \\frac{\\Delta v}{\\Delta t}",
	[
		variableGet("Acceleration"),
		variableGet("Change in velocity"),
		variableGet("Duration"),
	],
	[],
);
