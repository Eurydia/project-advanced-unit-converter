import { FC, useEffect, useRef } from "react";

import katex from "katex";

type KatexProps = {
	children: string;
};
export const Katex: FC<KatexProps> = (props) => {
	const { children } = props;

	const containerRef =
		useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (containerRef.current === null) {
			return;
		}
		katex.render(children, containerRef.current);
	}, [children]);

	return <div ref={containerRef} />;
};
