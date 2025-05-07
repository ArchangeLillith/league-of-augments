import { useState, useRef } from "react";
import { formatDescription } from "../utils/formatDescription";
import { TooltipItemBody } from "./TooltipItemBody";
import { TooltipWrapperProps } from "../utils/interfaces";

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
	children,
	tooltipText,
	gem = false,
	item = false,
	itemObj = null,
}) => {
	//States
	const [showTooltip, setShowTooltip] = useState(false);
	const [hoverTimer, setHoverTimer] = useState<number | null>(null);
	const [positionAbove, setPositionAbove] = useState(false);
	//Refs and constants
	const wrapperRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const delayTime = gem || item ? 200 : 400;
	/**
	 * Handles the tooltip display with where the mouse is
	 */
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
		}, delayTime);
		setHoverTimer(timer);
	};

	/**
	 * Handles cleaning up the tooltip when the mouse leaves
	 * @param e - the div the mouse is leaving
	 * @returns void as an ignore
	 */
	const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
		const leavingTo = e.relatedTarget as Node | null;

		if (
			wrapperRef.current &&
			tooltipRef.current &&
			(wrapperRef.current.contains(leavingTo) ||
				tooltipRef.current.contains(leavingTo))
		) {
			// Pointer still inside tooltip or wrapper, ignore
			return;
		}

		if (hoverTimer) clearTimeout(hoverTimer);
		setShowTooltip(false);
	};

	/**
	 * If we have an item that we're making a tooltip for, it's a bit more complicated as there are a lof of stat
	 */
	if (item && itemObj) {
		return (
			<div
				ref={wrapperRef}
				className={gem ? "tooltip-wrapper gem" : "tooltip-wrapper"}
				onMouseEnter={handleMouseEnter}
				onPointerLeave={handlePointerLeave}
			>
				{children}
				{showTooltip && (
					<div
						ref={tooltipRef}
						className={`tooltip-box ${
							positionAbove ? "tooltip-box--above" : ""
						}`}
					>
						<TooltipItemBody itemObj={itemObj} />
					</div>
				)}
			</div>
		);
	}
	return (
		<div
			ref={wrapperRef}
			className={gem ? "tooltip-wrapper gem" : "tooltip-wrapper"}
			onMouseEnter={handleMouseEnter}
			onPointerLeave={handlePointerLeave}
		>
			{children}
			{showTooltip && (
				<div
					ref={tooltipRef}
					className={`tooltip-box ${positionAbove ? "tooltip-box--above" : ""}`}
					dangerouslySetInnerHTML={
						gem
							? { __html: tooltipText }
							: { __html: formatDescription(tooltipText) }
					}
				/>
			)}
		</div>
	);
};

export default TooltipWrapper;
