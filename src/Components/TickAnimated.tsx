import { SVGProps } from "react";

export const TickAnimated = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg width="150" height="100" viewBox="-20 -21 150 150" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M20 50 L50 80 L100 20"
				fill="none"
				stroke="gray"
				strokeWidth="20"
				strokeDasharray="200"
				strokeDashoffset="200"
				id="tickPath"
				strokeLinecap="round"
				className="translate-x-[1%] translate-y-[6%]"
				opacity={0.3}
			>
				<animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="0s" fill="freeze" />
			</path>
			<path
				d="M20 50 L50 80 L100 20"
				fill="none"
				stroke="currentColor"
				strokeWidth="15"
				strokeDasharray="200"
				strokeDashoffset="200"
				id="tickPath"
				strokeLinecap="round"
			>
				<animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="0s" fill="freeze" />
			</path>
		</svg>
	);
};
