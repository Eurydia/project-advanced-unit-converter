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
	"V\\propto n",
	[
		variableGet("Volume"),
		variableGet("Amount of substance"),
	],
	[],
);
equationRegister(
	"Boyle's law",
	"P\\propto \\frac{1}{V}",
	[
		variableGet("Volume"),
		variableGet("Pressure"),
	],
	[],
);
equationRegister(
	"Charles' law",
	"V\\propto T",
	[
		variableGet("Volume"),
		variableGet("Temperature"),
	],
	[],
);
equationRegister(
	"Gay-Lussac's law",
	"P\\propto T",
	[
		variableGet("Pressure"),
		variableGet("Temperature"),
	],
	[],
);

// equationRegister(
// 	"Ideal Gas Law",
// 	"pV = nk_{B}N_{A}T",
// 	[
// 		variableGet("Pressure"),
// 		variableGet("Volume"),
// 		variableGet("Particle number"),
// 		variableGet("Temperature"),
// 	],
// 	[
// 		constantGet("Boltzmann constant"),
// 		constantGet("Avogadro constant"),
// 	],
// );
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
	"Archimedes' principle",
	"F_{a} = \\rho_{\\text{fluid}} V_{\\text{displaced}}g",
	[
		variableGet("Force"),
		variableGet("Density"),
		variableGet("Volume"),
	],
	[constantGet("Gravitational acceleration")],
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
		variableGet("Initial speed"),
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
		variableGet("Initial speed"),
		variableGet("Time"),
	],
	[],
);
