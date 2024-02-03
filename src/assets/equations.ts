import { Quantities } from "./static/quantities";

const EQUATION_REGISTRY: Equation[] = [];

export type Equation = {
	name: string;
	variables: Quantities[];
	constants: Quantities[];
};

const equationRegister = (
	name: string,
	variables: Quantities[],
	constants: Quantities[],
): void => {
	EQUATION_REGISTRY.push({
		name,
		variables,
		constants,
	});
};

export const equationSearch = (
	targetVar: Quantities,
	startingVars: Quantities[],
): Equation[] => {
	const knownVars = [...startingVars];
	let unusedEqs = [...EQUATION_REGISTRY];

	const layers: [Quantities, Equation][][] = [];
	let currentLayer = -1;

	do {
		const newLayer = equationApply(
			unusedEqs,
			knownVars,
		);

		for (const item of newLayer) {
			const [newKnownVar, usedEq] = item;

			unusedEqs = unusedEqs.filter(
				(eq) => eq !== usedEq,
			);
			knownVars.push(newKnownVar);
		}
		layers.push(newLayer);
		currentLayer++;
	} while (
		layers[currentLayer].length > 0 &&
		layers[currentLayer].filter(
			([v]) => v === targetVar,
		).length === 0
	);

	const layerRecord: Partial<
		Record<Quantities, Equation>
	> = {};

	for (const layer of layers) {
		for (const item of layer) {
			const [itemVar, itemEq] = item;
			layerRecord[itemVar] = itemEq;
		}
	}
	if (layerRecord[targetVar] === undefined) {
		return [];
	}

	const steps: Equation[] = equationRetrace(
		layerRecord,
		[[targetVar, layerRecord[targetVar]!]],
		startingVars,
	);

	return steps;
};

const equationRetrace = (
	layerRecord: Partial<
		Record<Quantities, Equation>
	>,
	goals: [Quantities, Equation][],
	knownVars: Quantities[],
): Equation[] => {
	const steps: Equation[] = [];
	const _knownVars = [...knownVars];

	for (const goal of goals) {
		const [goalVar, goalEq] = goal;
		const diffVars = goalEq.variables.filter(
			(eqVar) => !_knownVars.includes(eqVar),
		);

		if (diffVars.length === 1) {
			steps.push(goalEq);
			_knownVars.push(goalVar);
			continue;
		}

		const nextGoals: [Quantities, Equation][] =
			diffVars
				.filter((diffVar) => diffVar !== goalVar)
				.map((diffVar) => {
					return [diffVar, layerRecord[diffVar]!];
				});

		steps.push(
			goalEq,
			...equationRetrace(
				layerRecord,
				nextGoals,
				_knownVars,
			),
		);
	}

	return steps;
};

const equationApply = (
	validEqs: Equation[],
	knownVars: Quantities[],
): [Quantities, Equation][] => {
	const result: [Quantities, Equation][] = [];

	for (const eq of validEqs) {
		if (
			equationMissingIndex(eq, knownVars) === 1
		) {
			const diffVars = eq.variables.filter(
				(eqVar) => !knownVars.includes(eqVar),
			);
			result.push([diffVars[0], eq]);
		}
	}

	return result;
};

const equationMissingIndex = (
	eq: Equation,
	knownVars: Quantities[],
): number => {
	let knownVarCount = 0;
	const eqVars = eq.variables;

	for (const knownVar of knownVars) {
		if (eq.variables.includes(knownVar)) {
			knownVarCount++;
		}
	}

	return eqVars.length - knownVarCount;
};

equationRegister(
	"Ideal Gas Law",
	[
		Quantities.PRESSURE,
		Quantities.VOLUME,
		Quantities.AMOUNT_OF_SUBSTANCE,
		Quantities.TEMPERATURE,
	],
	[Quantities.IDEAL_GAS_CONSTANT],
);
equationRegister(
	"Ideal Gas Law",
	[
		Quantities.PRESSURE,
		Quantities.VOLUME,
		Quantities.NUMBER_OF_GAS_PARTICLES,
		Quantities.TEMPERATURE,
	],
	[Quantities.BOLTZMANN_CONSTANT],
);
equationRegister(
	"Definition of Pressure",
	[
		Quantities.PRESSURE,
		Quantities.FORCE,
		Quantities.AREA,
	],
	[],
);
equationRegister(
	"Definition of Density",
	[
		Quantities.DENSITY,
		Quantities.MASS,
		Quantities.VOLUME,
	],
	[],
);
equationRegister(
	"Definition of Molar Mass",
	[
		Quantities.AMOUNT_OF_SUBSTANCE,
		Quantities.MOLAR_MASS,
		Quantities.MASS,
	],
	[],
);
