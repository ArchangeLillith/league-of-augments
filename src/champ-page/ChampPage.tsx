import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Augment } from "../utils/types";
import { fetchAugments } from "../services/fetchAugments";
import { Build } from "../utils/types";
import { AuthContext } from "../context/AuthProvider";
import { fetchBuilds } from "../services/fetchBuilds";

const ChampPage = () => {
	// Context & routing
	const { authState } = useContext(AuthContext);
	const { state } = useLocation();
	const navigate = useNavigate();

	const championName = state?.name;
	const champImage = state?.image?.full;

	// Guard: return if state is invalid
	if (!championName || !champImage) {
		return <div>Error: Missing champion data</div>;
	}

	// State
	const [selectedAugs, setSelectedAugs] = useState<Augment[]>([]);
	const [allAugs, setAllAugs] = useState<Augment[]>([]);
	const [saveMessage, setSaveMessage] = useState<string | null>(null);
	const [currentBuild, setCurrentBuild] = useState<Build | null>(null);
	const [allBuilds, setAllBuilds] = useState<Build[]>([]);
	const [pageLoading, setPageLoading] = useState(true);

	// Refs
	const saveTimeout = useRef<number | null>(null);
	const hasFetched = useRef(false);

	// Derived aug lists
	const goldAugs = allAugs.filter((aug) => aug.tier === "Gold");
	const silverAugs = allAugs.filter((aug) => aug.tier === "Silver");
	const prismaticAugs = allAugs.filter((aug) => aug.tier === "Prismatic");

	// Initial data fetch
	useEffect(() => {
		if (hasFetched.current || !authState.userData?.id) return;
		hasFetched.current = true;

		const getInitialData = async () => {
			const builds = await fetchBuilds(championName, authState.userData.id);
			const augments = await fetchAugments();

			setAllBuilds(builds);
			setAllAugs(augments);
			setCurrentBuild(builds[0]);

			if (builds[0]?.augments[0]?.augment_id) {
				setSelectedAugs(builds[0].augments);
			}
			setPageLoading(false);
		};

		getInitialData();
	}, [authState.userData?.id, championName]);

	// Debounced save effect
	useEffect(() => {
		if (saveTimeout.current) clearTimeout(saveTimeout.current);
		saveTimeout.current = setTimeout(() => {
			saveAugments(selectedAugs);
		}, 2000);
	}, [selectedAugs]);

	const saveAugments = async (augs: Augment[]) => {
		if (!authState.userData?.id) return;

		const newDTO = {
			user_id: authState.userData.id,
			champ_name: championName,
			newAugs: augs.map((a) => a.augment_id),
		};

		try {
			const res = await fetch(`/api/builds/save`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newDTO),
			});
			if (!res.ok) throw new Error("Save failed");
			showSaveMessage("✅ Saved!");
		} catch {
			showSaveMessage("❌ Auto save error");
		}
	};

	const showSaveMessage = (message: string) => {
		setSaveMessage(message);
		setTimeout(() => setSaveMessage(null), 3000);
	};

	const toggleAug = (aug: Augment) => {
		setSelectedAugs((prev) =>
			prev.some((a) => a.augment_id === aug.augment_id)
				? prev.filter((a) => a.augment_id !== aug.augment_id)
				: [...prev, aug]
		);
	};

	const resetSelected = () => setSelectedAugs([]);
	const addBuild = () => console.log("Adding build...");

	if (pageLoading) return <div>Loading...</div>;

	return (
		<div>
			{/* Save message popup */}
			<div
				className={`save-message
					${saveMessage ? "save-message--visible" : "save-message--hidden"}
					${
						saveMessage?.includes("error")
							? "save-message--error"
							: "save-message--success"
					}`}
			>
				{saveMessage}
			</div>

			{/* Champion & Build UI */}
			<div className="top-champ-container">
				<div className="flex-row">
					<button className="btn-home" onClick={() => navigate("/home")}>
						<FaHome className="btn-icon" />
					</button>
					<img
						src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${champImage}`}
						alt={championName}
						className="champ-icon"
					/>
				</div>
				{currentBuild && <h1>{currentBuild.name}</h1>}
				{allBuilds.length > 1 && (
					<select>
						{allBuilds.map((build) => (
							<option key={build.name}>{build.name}</option>
						))}
					</select>
				)}
				<div>
					<button onClick={addBuild}>Add Build</button>
				</div>
			</div>

			{/* Selected Augments */}
			<div className="container-selected-aug">
				<div className="selected-augs-top">
					<div></div>
					<div></div>
					<h3 className="selected-augs-title">Selected Augments:</h3>
					<button onClick={resetSelected}>Reset</button>
				</div>
				{selectedAugs.length > 0 ? (
					<div className="selected-augs">
						{selectedAugs.map((aug) => (
							<div
								className={`selected-aug-background ${aug.tier}`}
								key={aug.augment_id}
							>
								<TooltipWrapper tooltipText={`${aug.description}`}>
									<button
										className="btn-aug-selected"
										onClick={() => toggleAug(aug)}
										id={aug.name}
									>
										<img
											className="aug-icon"
											src={aug.url!}
											alt={aug.name}
											width={20}
											height={20}
										/>
										{aug.name}
									</button>
								</TooltipWrapper>
							</div>
						))}
					</div>
				) : (
					<div className="selected-augs color-muted">
						Click an augment to add it!
					</div>
				)}
			</div>

			{/* Available Augments */}
			<div>
				<div className="container-prismatic">
					{prismaticAugs.map((aug) => (
						<div
							className={`btn-aug-background ${aug.tier}`}
							key={aug.augment_id}
						>
							<TooltipWrapper tooltipText={`${aug.description}`}>
								<button
									className="btn-aug"
									onClick={() => toggleAug(aug)}
									id={aug.name}
								>
									<img src={aug.url!} width={35} height={35} />
									{aug.name}
								</button>
							</TooltipWrapper>
						</div>
					))}
				</div>

				<div className="container-gold">
					{goldAugs.map((aug) => (
						<div
							className={`btn-aug-background ${aug.tier}`}
							key={aug.augment_id}
						>
							<TooltipWrapper tooltipText={`${aug.description}`}>
								<button
									className="btn-aug gold"
									onClick={() => toggleAug(aug)}
									id={aug.name}
								>
									<img src={aug.url!} />
									{aug.name}
								</button>
							</TooltipWrapper>
						</div>
					))}
				</div>

				<div className="container-silver">
					{silverAugs.map((aug) => (
						<div
							className={`btn-aug-background ${aug.tier}`}
							key={aug.augment_id}
						>
							<TooltipWrapper tooltipText={`${aug.description}`}>
								<button
									className="btn-aug silver"
									onClick={() => toggleAug(aug)}
									id={aug.name}
								>
									<img src={aug.url!} width={35} height={35} />
									{aug.name}
								</button>
							</TooltipWrapper>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ChampPage;

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
