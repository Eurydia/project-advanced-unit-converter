import { FC } from "react";
import {
	Checkbox,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { Katex } from "App/components/Katex";
import { variableGet } from "@assets/variables";

type VariableSelectorProps = {
	multiple?: boolean;
	value: string[];
	options: string[];
	onChange: (nextValue: string[]) => void;
};
export const VariableSelector: FC<
	VariableSelectorProps
> = (props) => {
	const { multiple, value, options, onChange } =
		props;

	const handleSelectedChange = (
		label: string,
	) => {
		if (multiple) {
			if (value.includes(label)) {
				const nextValue = [...value].filter(
					(v) => v !== label,
				);
				onChange(nextValue);
				return;
			}
			onChange([...value, label]);
			return;
		}

		if (value.includes(label)) {
			onChange([]);
			return;
		}
		onChange([label]);
	};

	return (
		<List dense>
			{options.map((label, index) => {
				return (
					<ListItem
						key={`target-variable-item-${index}`}
					>
						<ListItemButton
							onClick={() =>
								handleSelectedChange(label)
							}
						>
							<ListItemIcon>
								<Checkbox
									checked={value.includes(label)}
									disableRipple
								/>
							</ListItemIcon>
							<ListItemText>
								{label}{" "}
								<Katex component="span">
									{variableGet(label).latexLabel}
								</Katex>
							</ListItemText>
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};
