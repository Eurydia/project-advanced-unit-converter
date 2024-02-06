import { FC } from "react";

import {
	Checkbox,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme,
} from "@mui/material";
import {
	CheckBoxOutlineBlankRounded,
	CheckBoxRounded,
} from "@mui/icons-material";

import { Katex } from "App/components/Katex";

type EquationSelectorProps = {
	multiple?: boolean;
	value: string[];
	options: string[];
	onChange: (nextValue: string[]) => void;
};
export const EquationSelector: FC<
	EquationSelectorProps
> = (props) => {
	const { multiple, value, options, onChange } =
		props;

	const theme = useTheme();

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
						key={`target-equation-item-${index}`}
					>
						<ListItemButton
							onClick={() =>
								handleSelectedChange(label)
							}
						>
							<ListItemText
								sx={{
									color: value.includes(label)
										? theme.palette.text.disabled
										: undefined,
								}}
							>
								<Katex component="span">
									{label}
								</Katex>
							</ListItemText>
							<ListItemIcon>
								<Checkbox
									checked={value.includes(label)}
									disableRipple
									icon={<CheckBoxRounded />}
									checkedIcon={
										<CheckBoxOutlineBlankRounded />
									}
									sx={{
										"color":
											theme.palette.primary.main,
										"&.Mui-checked": {
											color:
												theme.palette.grey[600],
										},
									}}
								/>
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};
