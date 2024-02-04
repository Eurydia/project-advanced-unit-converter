export const ConstantRegistry: Record<
	string,
	Constant
> = {};

export type Constant = {
	label: string;
	latexLabel: string;
};
const constantRegister = (
	label: string,
	latexLabel: string,
): void => {
	ConstantRegistry[label] = {
		label,
		latexLabel,
	};
};

export const constantGet = (
	label: string,
): Constant => {
	if (label in ConstantRegistry) {
		return ConstantRegistry[label];
	}
	return {
		label: "Uh oh",
		latexLabel: "\\emptyset",
	};
};

constantRegister("Ideal gas constant", "R");
constantRegister("Boltzmann constant ", "k_{B}");
constantRegister("Avogadro constant", "N_{A}");
constantRegister("Molar mass", "M");
