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
	"Definition of volume",
	"V = l\\times w\\times h",
	[
		variableGet("Volume"),
		variableGet("Length"),
		variableGet("Width"),
		variableGet("Height"),
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
	"Vapour density",
	"\\rho = \\frac{nM}{V}",
	[
		variableGet("Amount of substance"),
		variableGet("Density"),
		variableGet("Volume"),
	],
	[constantGet("Molar mass")],
);

equationRegister(
	"First equation of motion",
	"v = u + at",
	[
		variableGet("Speed"),
		variableGet("Acceleration"),
		variableGet("Time"),
	],
	[],
);

equationRegister(
	"Second equation of motion",
	"s = ut + \\frac{1}{2}at^{2}",
	[
		variableGet("Distance"),
		variableGet("Acceleration"),
		variableGet("Speed"),
		variableGet("Time"),
	],
	[],
);
