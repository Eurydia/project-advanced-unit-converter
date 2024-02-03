export const QuantityRegistry: Record<
	string,
	Quantity
> = {
	// PRESSURE = "Pressure",
	// AREA = "Area",
	// FORCE = "Force",
	// VOLUME = "Volume",
	// TEMPERATURE = "Temperature",
	// AMOUNT_OF_SUBSTANCE = "Amount of Substance",
	// NUMBER_OF_GAS_PARTICLES = "Number of Gas Particle",
	// DENSITY = "Density",
	// MOLAR_MASS = "Molar Mass",
	// MASS = "Mass",
	// IDEAL_GAS_CONSTANT = "Ideal Gas Constant",
	// BOLTZMANN_CONSTANT = "Boltzmann Constant",
};

export type UnitVector = [
	second: number,
	length: number,
	mass: number,
	current: number,
	temperature: number,
	amountOfSubstance: number,
	luminousIntensity: number,
];

export type Quantity = {
	label: string;
	latexLabel: string;
	// unit: UnitVector;
};
const registerQuantity = (
	label: string,
	latexLabel: string,
): void => {
	QuantityRegistry[label] = {
		label,
		latexLabel,
		// unit,
	};
};

registerQuantity("Pressure", "p");
registerQuantity("Area", "A");
registerQuantity("Force", "F");
registerQuantity("Volume", "V");
registerQuantity("Temperature", "T");
registerQuantity("Amount of substance", "n");
registerQuantity("Particle number", "N");
registerQuantity("Density", "\\rho");
registerQuantity("Mass", "m");
