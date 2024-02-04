import { FC, Fragment } from "react";
import { Path } from "../../core/calculateSteps";
import { Katex } from "./Katex";

type GraphProps = {
	path: Path;
	first?: boolean;
};
export const Graph: FC<GraphProps> = (props) => {
	const { path, first } = props;
	return (
		<div>
			<div>
				{!first ? "Or apply" : "Apply"}{" "}
				{path.targetRule.label} to obtain{" "}
				{path.variable.label}
			</div>
			<Katex>
				{path.targetRule.latexExpression}
			</Katex>
			{Object.keys(path.missingVariables).length >
			0 ? (
				<div>
					But missing{" "}
					{Object.keys(
						path.missingVariables,
					).join(", ")}
				</div>
			) : (
				<Fragment />
			)}
			<div>
				{Object.values(path.missingVariables).map(
					(path, uindex) => {
						{
							return (
								<div
									key={`upper-${uindex}`}
									style={{ paddingLeft: "2rem" }}
								>
									{path.map(
										(missingPath, index) => {
											return (
												<Graph
													key={`subgraph-${index}`}
													first={index === 0}
													path={missingPath}
												/>
											);
										},
									)}
								</div>
							);
						}
					},
				)}
			</div>
		</div>
	);
};
