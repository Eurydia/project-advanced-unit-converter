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
	const [targetVarLabels, setDesiredLabels] =
		useState<string[]>([]);
	const [givenLabels, setGivenLabels] = useState<
		string[]
	>([]);
	const [
		excludedEquations,
		setExcludedEquations,
	] = useState<string[]>([]);

	const handleGivenLabelsChange = (
		labels: string[],
	) => {
		setGivenLabels(labels);
		setDesiredLabels((prevLabels) => {
			const next = [];
			for (const prevLabel of prevLabels) {
				if (labels.includes(prevLabel)) {
					continue;
				}
				next.push(prevLabel);
			}
			return next;
		});
	};

	const handleDesiredLabelsChange = (
		labels: string[],
	) => {
		setDesiredLabels(labels);
		setGivenLabels((prevLabels) => {
			const next = [];
			for (const prevLabel of prevLabels) {
				if (labels.includes(prevLabel)) {
					continue;
				}
				next.push(prevLabel);
			}
			return next;
		});
	};

	const targetVar =
		targetVarLabels.length > 0
			? variableGet(targetVarLabels[0])
			: variableGet("-");
	const givenVars: Variable[] =
		givenLabels.map(variableGet);

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
								onChange={
									handleDesiredLabelsChange
								}
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
								value={givenLabels}
								onChange={handleGivenLabelsChange}
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
						<Box
							height="100vh"
							overflow="auto"
						>
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
