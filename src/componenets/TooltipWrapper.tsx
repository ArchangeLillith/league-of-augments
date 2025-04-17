import { useState, useRef } from "react";
import { formatDescription } from "../utils/formatDescription";

const TooltipWrapper = ({
	children,
	tooltipText,
}: {
	children: React.ReactNode;
	tooltipText: string;
}) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [hoverTimer, setHoverTimer] = useState<number | null>(null);
	const [positionAbove, setPositionAbove] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);

	const handleMouseEnter = () => {
		const timer = window.setTimeout(() => {
			setShowTooltip(true);

			// Wait for the tooltip to render first
			setTimeout(() => {
				if (wrapperRef.current && tooltipRef.current) {
					const wrapperRect = wrapperRef.current.getBoundingClientRect();
					const tooltipRect = tooltipRef.current.getBoundingClientRect();

					const tooltipWouldOverflow =
						wrapperRect.bottom + tooltipRect.height > window.innerHeight;

					setPositionAbove(tooltipWouldOverflow);
				}
			}, 0);
		}, 500);
		setHoverTimer(timer);
	};

	const handleMouseLeave = () => {
		if (hoverTimer) clearTimeout(hoverTimer);
		setShowTooltip(false);
	};

	return (
		<div
			ref={wrapperRef}
			className="tooltip-wrapper"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
			{showTooltip && (
				<div
					ref={tooltipRef}
					className={`tooltip-box ${positionAbove ? "tooltip-box--above" : ""}`}
					dangerouslySetInnerHTML={{ __html: formatDescription(tooltipText) }}
				/>
			)}
		</div>
	);
};

export default TooltipWrapper;
