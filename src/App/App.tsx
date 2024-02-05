import { FC, Fragment, useState } from "react";

import {
	Box,
	Container,
	CssBaseline,
	Grid,
	Typography,
} from "@mui/material";

import {
	Variable,
	VariableRegistry,
	variableGet,
} from "../assets/variables";
import { EquationRegistry } from "../assets/equations";
import { calculateSteps } from "../core/calculateSteps";

import { Graph } from "./components/Graph";
import { VariableSelector } from "./components/VariableSelector";
import { AppLayout } from "App/AppLayout";

export const App: FC = () => {
	const [targetVarLabels, setTargetVarlabels] =
		useState<string[]>([]);
	const [knownVarLabels, setKnownVarLabels] =
		useState<string[]>([]);

	const targetVar =
		targetVarLabels.length > 0
			? variableGet(targetVarLabels[0])
			: variableGet("-");
	const givenVars: Variable[] =
		knownVarLabels.map(variableGet);

	return (
		<Fragment>
			<CssBaseline />
			<AppLayout />
		</Fragment>
		// <Container maxWidth="md">
		// 	<CssBaseline />
		// 	<Grid container>
		// 		<Grid
		// 			item
		// 			xs={12}
		// 			sm
		// 		>
		// 			<Typography>To Find</Typography>
		// 			<Box
		// 				height="300px"
		// 				overflow="auto"
		// 			>
		// 				<VariableSelector
		// 					value={targetVarLabels}
		// 					onChange={setTargetVarlabels}
		// 					options={Object.keys(
		// 						VariableRegistry,
		// 					)}
		// 				/>
		// 			</Box>
		// 		</Grid>
		// 		<Grid
		// 			item
		// 			xs={12}
		// 			sm
		// 		>
		// 			<Typography>Known</Typography>
		// 			<Box
		// 				height="300px"
		// 				overflow="auto"
		// 			>
		// 				<VariableSelector
		// 					multiple
		// 					value={knownVarLabels}
		// 					onChange={setKnownVarLabels}
		// 					options={Object.keys(
		// 						VariableRegistry,
		// 					)}
		// 				/>
		// 			</Box>
		// 		</Grid>
		// 	</Grid>
		// 	<Box
		// 		sx={{
		// 			borderRadius: "0.5rem",
		// 			borderColor: "black",
		// 			borderStyle: "solid",
		// 			borderWidth: 2,
		// 			padding: 4,
		// 			margin: 4,
		// 		}}
		// 	>
		// 		{targetVar.latexLabel === "" ? (
		// 			<Fragment />
		// 		) : (
		// 			<Fragment>
		// 				{calculateSteps(
		// 					targetVar,
		// 					givenVars,
		// 					EquationRegistry,
		// 				).map((path, index) => {
		// 					return (
		// 						<Graph
		// 							key={`topgraph-${index}`}
		// 							path={path}
		// 						/>
		// 					);
		// 				})}
		// 			</Fragment>
		// 		)}
		// 	</Box>
		// </Container>
	);
};
