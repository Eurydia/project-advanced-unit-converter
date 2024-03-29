export const VariableRegistry: Record<
	string,
	Variable
> = {};

export type UnitVector = [
	second: number,
	length: number,
	mass: number,
	current: number,
	temperature: number,
	amountOfSubstance: number,
	luminousIntensity: number,
];

export type Variable = {
	label: string;
	latexLabel: string;
	// unit: UnitVector;
};
const variableRegister = (
	label: string,
	latexLabel: string,
): void => {
	VariableRegistry[label] = {
		label,
		latexLabel,
	};
};

export const variableGet = (
	label: string,
): Variable => {
	if (label in VariableRegistry) {
		return VariableRegistry[label];
	}
	return {
		label: "Uh oh",
		latexLabel: "\\emptyset",
	};
};

variableRegister("Pressure", "p");
variableRegister("Area", "A");
variableRegister("Acceleration", "a");
variableRegister("Force", "F");
variableRegister("Volume", "V");
variableRegister("Displacement", "s");
variableRegister(
	"Change in position",
	"\\Delta x",
);
variableRegister("Time", "t");
variableRegister("Duration", "\\Delta t");
variableRegister("Velocity", "v");
variableRegister(
	"Change in velocity",
	"\\Delta v",
);
variableRegister("Temperature", "T");
variableRegister("Amount of substance", "n");
variableRegister("Particle number", "N");
variableRegister("Density", "\\rho");
variableRegister("Mass", "m");
