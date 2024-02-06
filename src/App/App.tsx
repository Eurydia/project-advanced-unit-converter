import { FC, Fragment, useState } from "react";

import {
	Box,
	CssBaseline,
	Divider,
	Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import {
	EquationRegistry,
	Variable,
	VariableRegistry,
	variableGet,
} from "@assets";

import { AppLayout } from "App/AppLayout";
import { VariableSelector } from "App/components/VariableSelector";
import { EquationSelector } from "App/components/EquationSelector";
import { Graph } from "App/components/Graph";
import { calculateSteps } from "@core/calculateSteps";

export const App: FC = () => {
	const [targetVarLabels, setTargetVarlabels] =
		useState<string[]>([]);
	const [knownVarLabels, setKnownVarLabels] =
		useState<string[]>([]);
	const [
		excludedEquations,
		setExcludedEquations,
	] = useState<string[]>([]);

	const targetVar =
		targetVarLabels.length > 0
			? variableGet(targetVarLabels[0])
			: variableGet("-");
	const givenVars: Variable[] =
		knownVarLabels.map(variableGet);

	return (
		<Fragment>
			<CssBaseline />
			<Box
				padding={2}
				sx={{
					backgroundColor: grey["400"],
				}}
			>
				<AppLayout
					slotTopLeft={
						<Box
							height={{
								xs: "200px",
								sm: "400px",
							}}
							sx={{
								overflowY: "auto",
								scrollbarWidth: "thin",
								backgroundColor: "white",
								borderRadius: 4,
							}}
						>
							<VariableSelector
								value={targetVarLabels}
								onChange={setTargetVarlabels}
								options={Object.keys(
									VariableRegistry,
								)}
							/>
						</Box>
					}
					slotTopRight={
						<Box
							height={{
								xs: "200px",
								sm: "400px",
							}}
							sx={{
								overflowY: "auto",
								scrollbarWidth: "thin",
								backgroundColor: "white",
								borderRadius: 4,
							}}
						>
							<VariableSelector
								multiple
								value={knownVarLabels}
								onChange={setKnownVarLabels}
								options={Object.keys(
									VariableRegistry,
								)}
							/>
						</Box>
					}
					slotSide={
						<Box
							height={{
								xs: "200px",
								sm: "400px",
							}}
							sx={{
								overflowY: "auto",
								scrollbarWidth: "thin ",
								backgroundColor: "white",
								borderRadius: 4,
							}}
						>
							<EquationSelector
								multiple
								value={excludedEquations}
								onChange={setExcludedEquations}
								options={EquationRegistry.map(
									(eq) => eq.latexExpression,
								)}
							/>
						</Box>
					}
					slotCenter={
						<Box>
							{calculateSteps(
								targetVar,
								givenVars,
								EquationRegistry,
							)
								.sort(
									(a, b) =>
										a.complexity - b.complexity,
								)
								.map((path, index) => {
									return (
										<Fragment
											key={`solution-${index}`}
										>
											<Typography>
												Solution {index + 1}
											</Typography>
											<Graph path={path} />
											<Divider />
										</Fragment>
									);
								})}
						</Box>
					}
				/>
			</Box>
		</Fragment>
	);
};
