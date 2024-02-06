import {
	FC,
	Fragment,
	useEffect,
	useState,
} from "react";

import {
	Box,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";

import { Path } from "../../core/calculateSteps";

import { Katex } from "./Katex";

type GraphProps = {
	path: Path;
};
export const Graph: FC<GraphProps> = (props) => {
	const { path } = props;

	const [subPathRecord, setSubPathRecord] =
		useState<Record<string, string>>(() => {
			const record: Record<string, string> = {};
			for (const entry of Object.entries(
				path.missingVariables,
			)) {
				const [label, subPath] = entry;

				record[label] =
					subPath.length > 0
						? subPath[0].targetRule
								.latexExpression
						: "";
			}
			return record;
		});

	useEffect(() => {
		setSubPathRecord(() => {
			const record: Record<string, string> = {};
			for (const entry of Object.entries(
				path.missingVariables,
			)) {
				const [label, subPath] = entry;

				record[label] =
					subPath.length > 0
						? subPath[0].targetRule
								.latexExpression
						: "";
			}
			return record;
		});
	}, [path]);

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
				{Object.entries(
					path.missingVariables,
				).map((entry, uindex) => {
					{
						const [label, subPaths] = entry;

						if (subPaths.length === 0) {
							return <Fragment />;
						}
						return (
							<Box
								key={`upper-${uindex}`}
								style={{ paddingLeft: "2rem" }}
							>
								<Select
									value={subPathRecord[label]}
									onChange={(event) => {
										setSubPathRecord((prev) => {
											const next = { ...prev };
											next[label] =
												event.target.value;
											return next;
										});
									}}
								>
									{subPaths.map(
										(subpath, index) => {
											return (
												<MenuItem
													key={`sub-label-${subpath.targetRule.label}-${index}-${uindex}`}
													value={
														subpath.targetRule
															.latexExpression
													}
												>
													<Katex>
														{
															subpath.targetRule
																.latexExpression
														}
													</Katex>{" "}
													(
													{
														subpath.targetRule
															.label
													}
													)
												</MenuItem>
											);
										},
									)}
								</Select>
								{subPaths.map(
									(subPath, index) => {
										if (
											subPath.targetRule
												.latexExpression !==
											subPathRecord[label]
										) {
											return <Fragment />;
										}
										return (
											<Graph
												key={`subgraph-${uindex}-${index}`}
												path={subPath}
											/>
										);
									},
								)}
							</Box>
						);
					}
				})}
			</Box>
		</Box>
	);
};
