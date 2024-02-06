import { Equation } from "@assets/equations";
import { Variable } from "@assets/variables";

export type Path = {
	variable: Variable;
	targetRule: Equation;
	missingVariables: Record<string, Path[]>;
	/**
	 * Let score of the current path be the average score
	 * of the best and worst paths.
	 * Lower score is better
	 */
	complexity: number;
};

const arrayDifference = (
	left: Variable[],
	right: Variable[],
): Variable[] => {
	const diff: Variable[] = [];
	for (const rightVar of right) {
		if (
			left.some((leftVar) => {
				return rightVar.label === leftVar.label;
			})
		) {
			continue;
		}
		diff.push(rightVar);
	}
	return diff;
};

export const searchRules = (
	targetVariable: Variable,
	rules: Equation[],
): Equation[] => {
	const relatedRules: Equation[] = [];

	if (rules.length === 0) {
		return [];
	}

	for (const rule of rules) {
		// Cannot do "targetVariable in rule.variables"
		// since objects comparison is not deep by default
		for (const variable of rule.variables) {
			if (
				variable.label === targetVariable.label &&
				variable.latexLabel ===
					targetVariable.latexLabel
			) {
				relatedRules.push(rule);
				break;
			}
		}
	}
	return relatedRules;
};

export const calculateSteps = (
	targetVariable: Variable,
	givenVariables: Variable[],
	relatedRules: Equation[],
) => {
	const result: Path[] = [];
	if (
		givenVariables
			.map((givenVar) => givenVar.latexLabel)
			.includes(targetVariable.latexLabel)
	) {
		return [];
	}

	if (relatedRules.length === 0) {
		return [];
	}

	const relatedEquations = searchRules(
		targetVariable,
		relatedRules,
	);

	for (const relatedEquation of relatedEquations) {
		const missingVariables = arrayDifference(
			[targetVariable, ...givenVariables],
			relatedEquation.variables,
		);

		const missingPathToVar: Record<
			string,
			Path[]
		> = {};

		for (const missingVar of missingVariables) {
			const restrictedRules = relatedRules.filter(
				(rule) => {
					if (
						rule.latexExpression ===
						relatedEquation.latexExpression
					) {
						return false;
					}

					for (const ruleVar of rule.variables) {
						if (
							ruleVar.latexLabel ===
							missingVar.latexLabel
						) {
							continue;
						}

						for (const missingVar of missingVariables) {
							if (
								missingVar.latexLabel ===
								ruleVar.latexLabel
							) {
								return false;
							}
						}
					}
					return true;
				},
			);

			const paths = calculateSteps(
				missingVar,
				givenVariables,
				restrictedRules,
			).sort(
				(a, b) => a.complexity - b.complexity,
			);
			missingPathToVar[missingVar.label] = paths;
		}

		const staticComplexityCost =
			Object.keys(missingPathToVar).length * 1000;

		const missingVariableComplexityCost =
			Object.values(missingPathToVar)
				.map(
					(paths) =>
						paths
							.map((path) => path.complexity)
							.reduce(
								(prev, curr) => prev + curr,
								0,
							) /
						(paths.length + 1),
				)
				.reduce((prev, curr) => curr + prev, 0);

		result.push({
			variable: targetVariable,
			targetRule: relatedEquation,
			missingVariables: missingPathToVar,
			complexity:
				staticComplexityCost +
				missingVariableComplexityCost,
		});
	}
	return result;
};
