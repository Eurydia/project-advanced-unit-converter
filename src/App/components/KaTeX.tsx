import { FC, useEffect, useRef } from "react";

import katex from "katex";
import {
	Typography,
	TypographyProps,
} from "@mui/material";

type KatexProps = Omit<
	TypographyProps,
	"children"
> & {
	children: string;
};
export const Katex: FC<KatexProps> = (props) => {
	const { children, ...rest } = props;

	const containerRef = useRef<HTMLElement | null>(
		null,
	);

	useEffect(() => {
		if (containerRef.current === null) {
			return;
		}
		katex.render(children, containerRef.current, {
			throwOnError: false,
		});
	}, [children]);

	return (
		<Typography
			ref={containerRef}
			{...rest}
		/>
	);
};
