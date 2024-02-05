import {
	Box,
	Container,
	Grid,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { FC } from "react";

export const AppLayout: FC = () => {
	return (
		<Container
			maxWidth="lg"
			sx={{
				backgroundColor: blue["400"],
			}}
		>
			<Grid container>
				<Grid
					xs={12}
					item
					height="600px"
					width="100%"
					sx={{
						borderRadius: 4,
						backgroundColor: blue["600"],
					}}
				></Grid>
				<Grid
					xs={12}
					item
					height="200px"
					width="100%"
					sx={{
						borderRadius: 4,
						backgroundColor: blue["600"],
					}}
				></Grid>
				<Grid
					xs={12}
					sm={6}
					item
					height="200px"
					width="100%"
					sx={{
						borderRadius: 4,
						backgroundColor: blue["600"],
					}}
				></Grid>
				<Grid
					xs={12}
					sm={6}
					item
					height="200px"
					width="100%"
					sx={{
						borderRadius: 4,
						backgroundColor: blue["600"],
					}}
				></Grid>
			</Grid>
		</Container>
	);
};
