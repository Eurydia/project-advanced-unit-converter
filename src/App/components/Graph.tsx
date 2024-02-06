import { FC, Fragment } from "react";

import { Box, Typography } from "@mui/material";

import { Path } from "../../core/calculateSteps";

import { Katex } from "./Katex";

type GraphProps = {
	path: Path;
};
export const Graph: FC<GraphProps> = (props) => {
	const { path } = props;

	return (
		<Box>
			<Typography>
				Apply {path.targetRule.label} to obtain{" "}
				{path.variable.label}
			</Typography>
			<Katex>
				{path.targetRule.latexExpression}
			</Katex>
			{Object.keys(path.missingVariables).length >
			0 ? (
				<Typography>
					But missing{" "}
					{Object.keys(
						path.missingVariables,
					).join(", ")}
				</Typography>
			) : (
				<Fragment />
			)}
			<Box>
				{Object.values(path.missingVariables).map(
					(paths, uindex) => {
						{
							if (paths.length === 0) {
								return <Fragment />;
							}
							return (
								<Box
									key={`upper-${uindex}`}
									style={{ paddingLeft: "2rem" }}
								>
									{paths.map((path, index) => {
										if (index !== 0) {
											return <Fragment />;
										}
										return (
											<Graph
												key={`subgraph-${uindex}-${index}`}
												path={path}
											/>
										);
									})}
								</Box>
							);
						}
					},
				)}
			</Box>
		</Box>
	);
};
