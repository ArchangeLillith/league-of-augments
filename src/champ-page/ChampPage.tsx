import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Augment } from "../utils/types";
import { fetchAugments } from "../services/fetchAugments";
import { Build } from "../utils/types";
import { AuthContext } from "../context/AuthProvider";
import { fetchBuilds } from "../services/fetchBuilds";
import TooltipWrapper from "../componenets/TooltipWrapper";
import AugmentTile from "../componenets/AugmentTile";
import { RiQuillPenAiFill } from "react-icons/ri";

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
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [title, setTitle] = useState<string>("");
	const [triggerSave, setTriggerSave] = useState<number>(0);

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
			const builds: Build[] = await fetchBuilds(
				championName,
				authState.userData!.id
			);
			const augments = await fetchAugments();

			setAllBuilds(builds);
			setAllAugs(augments);
			setCurrentBuild(builds[0]);
			setTitle(builds[0].name);

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
			saveBuild();
		}, 2000);
	}, [selectedAugs, triggerSave]);

	const saveBuild = async () => {
		if (!authState.userData?.id) return;

		const newDTO = {
			user_id: authState.userData.id,
			champ_name: championName,
			name: title,
			newAugs: selectedAugs.map((a) => a.augment_id),
		};

		try {
			const res = await fetch(`/api/builds/save`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newDTO),
			});
			if (!res.ok) throw new Error("Save failed");
			showSaveMessage("✅ Saved!");
			return true;
		} catch {
			showSaveMessage("❌ Auto save error");
			return false;
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

	const saveTitle = () => {
		setCurrentBuild((prev) => {
			if (!prev) return prev;

			return {
				...prev,
				name: title,
			};
		});
		setIsEditing(false);
		setTriggerSave(triggerSave + 1);
	};
	const resetSelected = () => setSelectedAugs([]);
	const addBuild = async () => {
		const buildSave = await saveBuild();
		if (!buildSave) {
			setSaveMessage("❌ Something went wrong while saving!");
			return;
		}
		setCurrentBuild({
			name: `New ${championName} Build`,
			augments: [],
			items: [],
		});
		setTitle(`New ${championName} Build`);
		setAllBuilds((prev) => [
			...prev,
			{
				name: `New ${championName} Build`,
				augments: [],
				items: [],
			},
		]);
	};

	const changeBuild = (buildId: string) => {
		const selectedBuild = allBuilds.find(
			(build) => build.id === Number(buildId)
		);
		if (!selectedBuild || selectedBuild === undefined) {
			setSaveMessage("❌ Something went wrong in selecting that build");
		}
		setCurrentBuild(selectedBuild!);
		setSelectedAugs(selectedBuild!.augments);
	};

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
				{currentBuild && !isEditing && (
					<>
						<h1>{currentBuild.name}</h1>
						<button
							onClick={() => setIsEditing(!isEditing)}
							className="quill-btn"
						>
							<RiQuillPenAiFill />
						</button>
					</>
				)}
				{currentBuild && isEditing && (
					<>
						<input
							value={title}
							onChange={(e) => setTitle(e.currentTarget.value)}
						></input>
						<button onClick={saveTitle} className="quill-btn">
							<RiQuillPenAiFill />
						</button>
					</>
				)}
				{allBuilds.length > 1 && (
					<select onChange={(e) => changeBuild(e.target.id)}>
						{allBuilds.map((build) => (
							<option key={build.name} id={build.id!.toString()}>
								{build.name}
							</option>
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
					{/* Styling divs for space */}
					<div></div>
					<div></div>
					<h3 className="selected-augs-title">Selected Augments:</h3>
					<button onClick={resetSelected}>Reset Augments</button>
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
						<AugmentTile aug={aug} toggleAug={toggleAug} />
					))}
				</div>

				<div className="container-gold">
					{goldAugs.map((aug) => (
						<AugmentTile aug={aug} toggleAug={toggleAug} />
					))}
				</div>

				<div className="container-silver">
					{silverAugs.map((aug) => (
						<AugmentTile aug={aug} toggleAug={toggleAug} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ChampPage;
