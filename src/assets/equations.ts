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

// export const equationSearch = (
// 	targetVar: Quantities,
// 	startingVars: Quantities[],
// ): Equation[] => {
// 	const knownVars = [...startingVars];
// 	let unusedEqs = [...EQUATION_REGISTRY];

// 	const layers: [Quantities, Equation][][] = [];
// 	let currentLayer = -1;

// 	do {
// 		const newLayer = equationApply(
// 			unusedEqs,
// 			knownVars,
// 		);

// 		for (const item of newLayer) {
// 			const [newKnownVar, usedEq] = item;

// 			unusedEqs = unusedEqs.filter(
// 				(eq) => eq !== usedEq,
// 			);
// 			knownVars.push(newKnownVar);
// 		}
// 		layers.push(newLayer);
// 		currentLayer++;
// 	} while (
// 		layers[currentLayer].length > 0 &&
// 		layers[currentLayer].filter(
// 			([v]) => v === targetVar,
// 		).length === 0
// 	);

// 	const layerRecord: Partial<
// 		Record<Quantities, Equation>
// 	> = {};

// 	for (const layer of layers) {
// 		for (const item of layer) {
// 			const [itemVar, itemEq] = item;
// 			layerRecord[itemVar] = itemEq;
// 		}
// 	}
// 	if (layerRecord[targetVar] === undefined) {
// 		return [];
// 	}

// 	const steps: Equation[] = equationRetrace(
// 		layerRecord,
// 		[[targetVar, layerRecord[targetVar]!]],
// 		startingVars,
// 	);

// 	return steps;
// };

// const equationRetrace = (
// 	layerRecord: Partial<
// 		Record<Quantities, Equation>
// 	>,
// 	goals: [Quantities, Equation][],
// 	knownVars: Quantities[],
// ): Equation[] => {
// 	const steps: Equation[] = [];
// 	const _knownVars = [...knownVars];

// 	for (const goal of goals) {
// 		const [goalVar, goalEq] = goal;
// 		const diffVars = goalEq.variables.filter(
// 			(eqVar) => !_knownVars.includes(eqVar),
// 		);

// 		if (diffVars.length === 1) {
// 			steps.push(goalEq);
// 			_knownVars.push(goalVar);
// 			continue;
// 		}

// 		const nextGoals: [Quantities, Equation][] =
// 			diffVars
// 				.filter((diffVar) => diffVar !== goalVar)
// 				.map((diffVar) => {
// 					return [diffVar, layerRecord[diffVar]!];
// 				});

// 		steps.push(
// 			goalEq,
// 			...equationRetrace(
// 				layerRecord,
// 				nextGoals,
// 				_knownVars,
// 			),
// 		);
// 	}

// 	return steps;
// };

// const equationApply = (
// 	validEqs: Equation[],
// 	knownVars: Quantities[],
// ): [Quantities, Equation][] => {
// 	const result: [Quantities, Equation][] = [];

// 	for (const eq of validEqs) {
// 		if (
// 			equationMissingIndex(eq, knownVars) === 1
// 		) {
// 			const diffVars = eq.variables.filter(
// 				(eqVar) => !knownVars.includes(eqVar),
// 			);
// 			result.push([diffVars[0], eq]);
// 		}
// 	}

// 	return result;
// };

// const equationMissingIndex = (
// 	eq: Equation,
// 	knownVars: Quantities[],
// ): number => {
// 	let knownVarCount = 0;
// 	const eqVars = eq.variables;

// 	for (const knownVar of knownVars) {
// 		if (eq.variables.includes(knownVar)) {
// 			knownVarCount++;
// 		}
// 	}

// 	return eqVars.length - knownVarCount;
// };

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
	"Ideal Gas Law",
	"pV = nk_{B}N_{A}T",
	[
		variableGet("Pressure"),
		variableGet("Volume"),
		variableGet("Particle number"),
		variableGet("Temperature"),
	],
	[
		constantGet("Boltzmann constant"),
		constantGet("Avogadro constant"),
	],
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
	"Density of a regular solid",
	"\\rho = \\frac{m}{l\\times w\\times h}",
	[
		variableGet("Density"),
		variableGet("Mass"),
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
	"Vapour density",
	"\\rho = \\frac{nM}{V}",
	[
		variableGet("Amount of substance"),
		variableGet("Density"),
		variableGet("Volume"),
	],
	[constantGet("Molar mass")],
);
