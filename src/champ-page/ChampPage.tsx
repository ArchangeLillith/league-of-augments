import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Augment } from "../../types";
import { fetchAugments } from "../services/fetchAugments";
import { Build } from "../utils/types";
import { AuthContext } from "../context/AuthProvider";
import { fetchBuilds } from "../services/fetchBuilds";

const ChampPage = () => {
	const { authState } = useContext(AuthContext);
	const { state } = useLocation();
	const championName = state?.name;
	const navigate = useNavigate();
	const [selectedAugs, setSelectedAugs] = useState<Augment[]>([]);
	const [allAugs, setAllAugs] = useState<Augment[]>([]);
	const [saveMessage, setSaveMessage] = useState<string | null>(null);
	const [currentBuild, setCurrentBuild] = useState<Build | null>(null);
	const [allBuilds, setAllBuilds] = useState<Build[]>([]);
	const goldAugs = allAugs.filter((aug) => aug.tier === "Gold");
	const silverAugs = allAugs.filter((aug) => aug.tier === "Silver");
	const prismaticAugs = allAugs.filter((aug) => aug.tier === "Prismatic");
	const saveTimeout = useRef<number | null>(null);
	const hasFetched = useRef(false);
	const [pageLoading, setPageLoading] = useState(true);

	useEffect(() => {
		if (hasFetched.current) return;
		hasFetched.current = true;
		const getAugs = async () => {
			if (!authState.userData?.id) return "ERROR no id";
			const builds: Build[] = await fetchBuilds(
				championName,
				authState.userData?.id
			);
			console.log("Builds in frontend", builds);
			const allAugs = await fetchAugments();
			if (builds[0].augments[0].augment_id !== null) {
				setSelectedAugs(builds[0].augments);
			}
			setAllAugs(allAugs);
			setCurrentBuild(builds[0]);
			setAllBuilds(builds);
			setPageLoading(false);
		};
		getAugs();
	}, []);

	//Debounce the save
	useEffect(() => {
		if (saveTimeout.current) clearTimeout(saveTimeout.current);
		saveTimeout.current = setTimeout(() => {
			saveAugments(selectedAugs);
		}, 2000);
	}, [selectedAugs]);

	const showSaveMessage = (message: string) => {
		setSaveMessage(message);
		setTimeout(() => {
			setSaveMessage(null);
		}, 3000); // disappear after 3 seconds
	};

	const saveAugments = async (augs: Augment[]) => {
		const newAugs = augs.map((a) => a.augment_id);
		if (!authState.userData?.id) {
			return;
		}
		const newDTO = {
			user_id: authState.userData?.id,
			champ_name: championName,
			newAugs,
		};
		console.log(newDTO);
		try {
			const res = await fetch(`/api/builds/save`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newDTO),
			});
			if (!res.ok) throw new Error("Failed to save augments");
			showSaveMessage("✅ Saved!");
		} catch {
			showSaveMessage("❌ Auto save error");
		}
	};

	const toggleAug = (aug: Augment) => {
		console.log(aug.augment_id);
		const exists = selectedAugs.some((a) => a.augment_id === aug.augment_id);
		if (exists) {
			setSelectedAugs(
				selectedAugs.filter((a) => a.augment_id !== aug.augment_id)
			);
		} else {
			setSelectedAugs([...selectedAugs, aug]);
		}
	};

	const addBuild = () => {
		console.log("addign build");
	};
	if (pageLoading) return <div>Loading...</div>;
	if (!pageLoading)
		return (
			<div>
				<div
					className={`
					save-message
					${saveMessage ? "save-message--visible" : "save-message--hidden"}
					${
						saveMessage?.includes("error")
							? "save-message--error"
							: "save-message--success"
					}
				`}
				>
					{saveMessage}
				</div>
				<button className="btn-home" onClick={() => navigate("/home")}>
					<FaHome className="btn-icon" />
				</button>
				<div className="top-container">
					<img
						src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${state.image.full}`}
						alt={championName}
						className="champ-icon"
					/>
					{currentBuild && <h1>{currentBuild.name}</h1>}
					{allBuilds.length > 1 && (
						<select>
							{allBuilds.map((build) => (
								<option>{build.name}</option>
							))}
						</select>
					)}
					<div>
						<button onClick={addBuild}>Add Build</button>
					</div>

					{selectedAugs.length > 0 && (
						<div className="container-selected-aug">
							<h3>Selected Augments:</h3>
							{selectedAugs.map((aug) => (
								<div className={`selected-aug-background ${aug.tier}`}>
									<button
										className="btn-aug-selected"
										onClick={() => toggleAug(aug)}
										id={aug.name}
									>
										<img
											className="aug-icon"
											src={aug.url!}
											alt={championName}
											width={20}
											height={20}
										></img>
										{aug.name}
									</button>
								</div>
							))}
						</div>
					)}
				</div>
				<div>
					<div className="container-prismatic">
						<h3>Prismatic Augments:</h3>
						{prismaticAugs.map((aug) => (
							<div className={`btn-aug-background ${aug.tier}`}>
								<button
									className="btn-aug"
									onClick={() => toggleAug(aug)}
									id={aug.name}
									key={aug.augment_id}
								>
									<img src={aug.url!} width={35} height={35} />
									{aug.name}
								</button>
							</div>
						))}
					</div>
					<div className="container-gold">
						<h3>Gold Augments:</h3>
						{goldAugs.map((aug) => (
							<div className={`btn-aug-background ${aug.tier}`}>
								<button
									className="btn-aug gold"
									onClick={() => toggleAug(aug)}
									id={aug.name}
									key={aug.augment_id}
								>
									<img src={aug.url!} />
									{aug.name}
								</button>
							</div>
						))}
					</div>

					<div className="container-silver">
						<h3>Silver Augments:</h3>
						{silverAugs.map((aug) => (
							<div className={`btn-aug-background ${aug.tier}`}>
								<button
									className="btn-aug silver"
									onClick={() => toggleAug(aug)}
									id={aug.name}
									key={aug.augment_id}
								>
									<img src={aug.url!} width={35} height={35} />
									{aug.name}
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		);
};

export default ChampPage;
