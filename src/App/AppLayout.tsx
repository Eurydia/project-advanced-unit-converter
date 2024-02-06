import { FC, ReactNode } from "react";

import {
	Grid,
	Stack,
	useMediaQuery,
	useTheme,
} from "@mui/material";

const AppLayoutXS: FC<AppLayoutProps> = (
	props,
) => {
	const {
		slotCenter,
		slotSide,
		slotTopLeft,
		slotTopRight,
	} = props;
	return (
		<Stack spacing={2}>
			{slotTopLeft}
			{slotTopRight}
			{slotSide}
			{slotCenter}
		</Stack>
	);
};

const AppLayoutSM: FC<AppLayoutProps> = (
	props,
) => {
	const {
		slotCenter,
		slotSide,
		slotTopLeft,
		slotTopRight,
	} = props;

	return (
		<Grid
			container
			spacing={2}
		>
			<Grid
				item
				sm={4}
			>
				{slotTopLeft}
			</Grid>
			<Grid
				item
				sm={4}
			>
				{slotTopRight}
			</Grid>
			<Grid
				item
				sm={4}
			>
				{slotSide}
			</Grid>
			<Grid
				item
				sm={12}
			>
				{slotCenter}
			</Grid>
		</Grid>
	);
};

type AppLayoutProps = {
	slotTopLeft: ReactNode;
	slotTopRight: ReactNode;
	slotSide: ReactNode;
	slotCenter: ReactNode;
};
export const AppLayout: FC<AppLayoutProps> = (
	props,
) => {
	const {
		slotCenter,
		slotSide,
		slotTopLeft,
		slotTopRight,
	} = props;

	const theme = useTheme();
	const isBreakpointXS = useMediaQuery(
		theme.breakpoints.down("sm"),
	);

	if (isBreakpointXS) {
		return (
			<AppLayoutXS
				slotTopLeft={slotTopLeft}
				slotTopRight={slotTopRight}
				slotSide={slotSide}
				slotCenter={slotCenter}
			/>
		);
	}

	return (
		<AppLayoutSM
			slotTopLeft={slotTopLeft}
			slotTopRight={slotTopRight}
			slotSide={slotSide}
			slotCenter={slotCenter}
		/>
	);
};
