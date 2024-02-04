import { Equation } from "../assets/equations";
import { Variable } from "../assets/variables";

export type Path = {
	variable: Variable;
	targetRule: Equation;
	missingVariables: Record<string, Path[]>;
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
			break;
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

		// const restrictedRules = relatedRules.filter(
		// 	(rule) => {
		// 		for (const v of rule.variables) {
		// 			if (
		// 				v.latexLabel ===
		// 				targetVariable.latexLabel
		// 			) {
		// 				return false;
		// 			}
		// 		}
		// 		return true;
		// 	},
		// );

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

					for (const v of rule.variables) {
						if (
							v.latexLabel ===
							missingVar.latexLabel
						) {
							continue;
						}

						for (const missingVar of missingVariables) {
							if (
								missingVar.latexLabel ===
								v.latexLabel
							) {
								return false;
							}
						}
					}
					return true;
				},
			);

			missingPathToVar[missingVar.label] =
				calculateSteps(
					missingVar,
					givenVariables,
					restrictedRules,
				);
		}

		result.push({
			variable: targetVariable,
			targetRule: relatedEquation,
			missingVariables: missingPathToVar,
		});
	}
	return result;
};
